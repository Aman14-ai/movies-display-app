import { motion, AnimatePresence } from "framer-motion";

const ErrorMessageDisplay = ({ errorMessage }) => {
  return (
    <AnimatePresence>
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", damping: 10, stiffness: 200 }
          }}
          exit={{
            opacity: 0,
            y: -10,
            scale: 0.98,
            transition: { duration: 0.2 }
          }}
          className="origin-top"
        >
          <motion.p
            className="text-red-500 mt-2 text-center px-4 py-2 rounded-lg shadow-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              initial={{ x: -5 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", bounce: 0.6 }}
              className="flex items-center justify-center gap-2"
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                initial={{ rotate: -20, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.15 }}
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </motion.svg>
              {errorMessage}
            </motion.span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorMessageDisplay;