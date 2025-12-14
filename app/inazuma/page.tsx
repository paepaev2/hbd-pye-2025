"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import HomeButton from "@/components/HomeButton";

type Character = {
  id: number;
  value: number;
  placed: boolean;
};

export default function PuzzlePage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const [characters, setCharacters] = useState<Character[]>([
    { id: 1, value: 1, placed: false },
    { id: 2, value: 2, placed: false },
    { id: 3, value: 3, placed: false },
    { id: 4, value: 4, placed: false },
    { id: 5, value: 5, placed: false },
    { id: 6, value: 6, placed: false },
    { id: 7, value: 7, placed: false },
    { id: 8, value: 8, placed: false },
    { id: 9, value: 9, placed: false },
    { id: 10, value: 10, placed: false },
    { id: 11, value: 11, placed: false },
    { id: 12, value: 12, placed: false },
    { id: 13, value: 13, placed: false },
    { id: 14, value: 14, placed: false },
    { id: 15, value: 15, placed: false },
    { id: 16, value: 16, placed: false },
  ]);

  const [slots, setSlots] = useState<(Character | null)[]>([
    null,
    null,
    {
        id: -1,
        value: -1,
        placed: true,
    },
    null,
    null,
  ]);

  const handleCharacterClick = (character: Character) => {
    if (character.placed) {
        character.placed = false;
      // Remove from slot and place back to list
      const slotIndex = slots.findIndex((s) => s?.id === character.id);
      if (slotIndex !== -1) {
        const newSlots = [...slots];
        newSlots[slotIndex] = null;
        setSlots(newSlots);

        setCharacters(
          characters.map((c) =>
            c.id === character.id ? { ...c, placed: false } : c
          )
        );
      }
    } else {
        character.placed = true;
      // Add to first empty slot (skip index 2 which is the X)
      const emptyIndex = slots.findIndex((s, i) => i !== 2 && s === null);
      if (emptyIndex !== -1) {
        const newSlots = [...slots];
        newSlots[emptyIndex] = character;
        setSlots(newSlots);

        setCharacters(
          characters.map((c) =>
            c.id === character.id ? { ...c, placed: true } : c
          )
        );
      }
    }

    // console.log(slots);
    // console.log(characters);
  };

  const handleReset = () => {
    setSlots([
        null, 
        null, 
        {
            id: -1,
            value: -1,
            placed: true,
        }, 
        null, 
        null
]);
    setCharacters(
      characters.map((c) => ({ ...c, placed: false }))
    );
    setMessage("");
    setMessageType("");
  };

  const handleSubmit = () => {
    // console.log("Submitting", slots);
    // Check if all slots are filled
    if (slots.some((s) => s === null)) {
      setMessage("Please fill all spaces! 😡");
      setMessageType("error");
      return;
    }

    const answer = slots.map((s) => s!.value);
    
    // Check if answer is [5,3,9,7] or [9,7,5,3]
    // Slots are [0,1,X,2,3] so we check positions 0,1,3,4
    const isCorrect =
      (answer[0] === 5 && answer[1] === 3 && answer[3] === 9 && answer[4] === 7) ||
      (answer[0] === 9 && answer[1] === 7 && answer[3] === 5 && answer[4] === 3);

    if (isCorrect) {
      setMessage("Sakka yaro ze! ⚽🔓");
      setMessageType("success");
      setTimeout(() => {
        router.push("/moon");
      }, 1500);
    } else {
      setMessage("ฟุตบอลกำลังร้องไห้นะ 😢⚽");
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <HomeButton />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto pt-20"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-pink-400 mb-8">
          ⚽ Ganbatte ne 🔒
        </h2>

        {/* Equation Display */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-xl">
          <div className="flex items-center justify-center gap-4 mb-4 flex-wrap">
            <CharacterBox value={5} />
            <CharacterBox value={1} />
            <CharacterBox value={4} />
            <CharacterBox value={1} />
          </div>

          <div className="text-center text-3xl font-bold text-purple-400 mb-4">
            =
          </div>

          {/* Answer Slots */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {slots.map((slot, index) => (
              <div key={index}>
                {index === 2 ? (
                  <div className="text-4xl font-bold text-purple-400 mx-2">
                    ×
                  </div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border-4 border-dashed border-pink-300 bg-white/40 flex items-center justify-center cursor-pointer"
                    onClick={() => slot && handleCharacterClick(slot)}
                  >
                    {slot ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-full h-full bg-linear-to-br from-pink-200 to-purple-200 rounded-xl flex items-center justify-center text-3xl font-bold text-white shadow-lg"
                      >
                        {slot.value}
                      </motion.div>
                    ) : (
                      <span className="text-pink-200 text-4xl">?</span>
                    )}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Character Grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-8">
          {characters.map((char) => (
            <motion.div
              key={char.id}
              whileHover={{ scale: char.placed ? 1 : 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleCharacterClick(char)}
              className={`aspect-square rounded-2xl flex items-center justify-center text-2xl font-bold cursor-pointer shadow-lg transition-all ${
                char.placed
                  ? "bg-gray-300 opacity-30"
                  : "bg-linear-to-br from-purple-200 to-pink-200 text-white hover:shadow-xl"
              }`}
            >
              {char.placed ? "" : char.value}
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
              className={`mb-6 text-center text-xl font-semibold ${
                messageType === "success" ? "text-green-500" : "text-red-400"
              }`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="bg-linear-to-r from-pink-400 to-purple-400 text-white px-12 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-2xl transition-all"
          >
            อัคคีสลาตัน 🔥🌪️
          </motion.button>
        </div>

        {/* Reset Button */}
        <div className="text-center">
            <button
                onClick={handleReset}
                className="text-purple-400 px-12 py-4 text-xl font-semibold transition-all"
            >
                Resetto 🔄
            </button>
        </div>
      </motion.div>
    </div>
  );
}

function CharacterBox({ value }: { value: number }) {
  return (
    <div className="w-16 h-16 md:w-20 md:h-20 bg-linear-to-br from-pink-300 to-purple-300 rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-bold text-white shadow-lg">
      {value}
    </div>
  );
}