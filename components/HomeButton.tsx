"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomeButton() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-6 left-6 z-50"
    >
      <Link
        href="/"
        className="bg-white/80 backdrop-blur-sm text-pink-400 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all font-semibold"
      >
        🏠 Home
      </Link>
    </motion.div>
  );
}