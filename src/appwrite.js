import { Client, Databases, ID, Query } from "appwrite"

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID

const client = new Client()
.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
.setProject(PROJECT_ID)

const database = new Databases(client)

export const updateSearchCount = async (searchTerm , movie) => {
    try {

        const results = await database.listDocuments(DATABASE_ID , COLLECTION_ID , [
            Query.equal("searchTerm" , searchTerm)
        ]);

        if(results.documents.length > 0) // this movie already exists . we have to only update the count.
        {
            const doc = results.documents[0];
            await database.updateDocument(DATABASE_ID , COLLECTION_ID , doc.$id , {
                count : doc.count + 1
            });
        }
        else
        {
            await database.createDocument(DATABASE_ID , COLLECTION_ID , ID.unique() , {
                searchTerm: searchTerm,
                count : 1,
                movieId: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,

            })
        }

    } 
    catch (error) {
        console.log("Error from appwrite.js file in catch block.")    
        console.log(error)
    }
}

export const getTrendingMovies = async() => {
    try {
        const results = await database.listDocuments(DATABASE_ID , COLLECTION_ID , [
            Query.limit(10),
            Query.orderDesc('count'),
        ])    
        if(!results.documents)
        {
            console.log("Error while fetching database in getTrendingMovies function from try block in app.jsx.");
            return []
        }
        return results.documents;
    } 
    catch (error) {
        console.log("Error while fetching database in getTrendingMovies function from catch block in app.jsx.", error);
    }
}