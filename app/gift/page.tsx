"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import HomeButton from "@/components/HomeButton";
import Image from "next/image";

export default function GiftPage() {
  // Generate random values once using useState with function initializer
  const [decorations] = useState(() =>
    [...Array(10)].map((_, i) => ({
      id: i,
      emoji: ["🎈", "🎉", "🎊", "✨", "🌟"][Math.floor(Math.random() * 5)],
      x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 5,
    }))
  );

  return (
    <div className="min-h-screen p-4 md:p-8">
      <HomeButton />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto pt-20 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-pink-400 mb-6">
            Happy Birthday 2️⃣1️⃣
          </h1>
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-purple-400 mb-8"
        >
          ว้าวๆๆๆๆ 😮❗❕❗❕
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl md:text-2xl font-semibold text-pink-300 mb-8"
        >
          💃💃⬇️ Here is your birthday gift ⬇️💃💃
        </motion.p>

        {/* Gift Image Placeholder */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.7, type: "spring", duration: 1 }}
          className="bg-linear-to-br from-pink-200 to-purple-200 rounded-3xl p-8 mb-8 shadow-2xl mx-auto max-w-md"
        >
          <div className="aspect-square bg-white/60 rounded-2xl flex items-center justify-center">
            <div className="text-center relative w-full h-full">
              <Image
                src="/gift.webp"
                alt="Birthday Gift"
                fill
                className="mx-auto rounded-2xl"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="space-y-4"
        >
          <p className="text-2xl md:text-2xl font-medium text-pink-300">
            (รอรับที่ไทยนะ)
          </p>
          <p className="text-2xl md:text-2xl font-semibold text-purple-400 mt-8">from แพ 😈</p>
        </motion.div>

        {/* Floating decorations */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {decorations.map((decoration) => (
            <motion.div
              key={decoration.id}
              className="absolute text-4xl"
              initial={{
                x: decoration.x,
                y: -50,
              }}
              animate={{
                y: typeof window !== "undefined" ? window.innerHeight + 50 : 1000,
              }}
              transition={{
                duration: decoration.duration,
                repeat: Infinity,
                delay: decoration.delay,
              }}
            >
              {decoration.emoji}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}