"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import HomeButton from "@/components/HomeButton";

const moonPhases = [
  { id: 1, name: "New Moon", isCorrect: false },
  { id: 2, name: "Waxing Crescent", isCorrect: true }, // 17 Dec 2004
  { id: 3, name: "First Quarter", isCorrect: false },
  { id: 4, name: "Waxing Gibbous", isCorrect: false },
  { id: 5, name: "Full Moon", isCorrect: false },
  { id: 6, name: "Waning Gibbous", isCorrect: false },
  { id: 7, name: "Last Quarter", isCorrect: false },
  { id: 8, name: "Waning Crescent", isCorrect: false },
];

export default function MoonPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const handleMoonClick = (phase: typeof moonPhases[0]) => {
    if (phase.isCorrect) {
      setMessage("ว้าว");
      setMessageType("success");
      setTimeout(() => {
        router.push("/gift");
      }, 1500);
    } else {
      setMessage("ห้ะ");
      setMessageType("error");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <HomeButton />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-5xl mx-auto pt-20"
      >
        <motion.h2
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl md:text-5xl font-bold text-center text-pink-400 mb-12"
        >
          🌝 Which one is yours ⁉️
        </motion.h2>

        {/* Moon Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {moonPhases.map((phase, index) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMoonClick(phase)}
              className="cursor-pointer"
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all">
                <div className="aspect-square bg-linear-to-br from-indigo-200 to-purple-200 rounded-full mb-4 flex items-center justify-center text-4xl">
                  {getMoonEmoji(phase.name)}
                </div>
                <p className="text-center text-sm md:text-base font-semibold text-purple-400">
                  {phase.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Message */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`text-center text-2xl font-semibold mt-12 ${
                messageType === "success" ? "text-green-500" : "text-red-400"
              }`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function getMoonEmoji(phase: string): string {
  const emojiMap: { [key: string]: string } = {
    "New Moon": "🌑",
    "Waxing Crescent": "🌒",
    "First Quarter": "🌓",
    "Waxing Gibbous": "🌔",
    "Full Moon": "🌕",
    "Waning Gibbous": "🌖",
    "Last Quarter": "🌗",
    "Waning Crescent": "🌘",
  };
  return emojiMap[phase] || "🌙";
}
