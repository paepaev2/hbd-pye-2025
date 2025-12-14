"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <h1 className="text-5xl md:text-5xl font-bold text-pink-400 mb-4">
            ☃️ Happy Birthday to PYE 🎂
          </h1>
          <p className="text-2xl md:text-3xl text-purple-300 mb-8">
            17 Dec 2025
          </p>
        </motion.div>

        <div className="relative w-64 h-64 mx-auto mb-8 rounded-2xl shadow-lg">
          <Image
            src="/us.jpg"
            alt="us photo"
            fill
            className="mx-auto mb-8 rounded-2xl shadow-lg"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push("/inazuma")}
          className="bg-linear-to-r from-pink-300 to-purple-300 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-2xl transition-all"
        >
          🤓 Click here to get 1 year older ☝️
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-pink-300 mt-12"
        >
          From PAE 🧚‍♀️🌟
        </motion.p>
      </motion.div>
    </div>
  );
}
