import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Loader = ({ size = 64, color = '#21cde8' }) => {
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % 3);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Animated dots with trail effect */}
      <div className="flex items-center justify-center gap-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="rounded-full"
            style={{
              width: size / 4,
              height: size / 4,
              backgroundColor: color,
            }}
            animate={{
              scale: activeDot === index ? [1, 1.5, 1] : 1,
              opacity: activeDot === index ? [0.6, 1, 0.6] : 0.4,
            }}
            transition={{
              duration: 0.6,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Circular progress with morphing effect */}
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <motion.div
          className="absolute rounded-full border-t-2 border-b-2"
          style={{
            width: '100%',
            height: '100%',
            borderColor: color,
          }}
          animate={{
            borderRadius: ['50%', '40%', '50%'],
            borderWidth: [2, 4, 2],
          }}
          transition={{
            duration: 1.5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </motion.div>

     
    </div>
  );
};

export default Loader;