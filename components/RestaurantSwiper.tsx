"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import RestaurantCard from "./RestaurantCard"
import { restaurants } from "../data/mockRestaurants"
import { X, Heart } from "lucide-react"

export default function RestaurantSwiper() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<"left" | "right" | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleSwipe = (swipeDirection: "left" | "right") => {
    setDirection(swipeDirection)
    if (swipeDirection === "right") {
      console.log("Liked restaurant:", restaurants[currentIndex].name)
    } else {
      console.log("Disliked restaurant:", restaurants[currentIndex].name)
    }

    // Animate the card
    if (cardRef.current) {
      const animation = {
        x: swipeDirection === "left" ? -300 : 300,
        opacity: 0,
        transition: { duration: 0.3 },
      }
      cardRef.current.animate(animation, { duration: 300 })
    }

    // Change to the next card after animation
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % restaurants.length)
      setDirection(null)
    }, 300)
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -100) handleSwipe("left")
    else if (info.offset.x > 100) handleSwipe("right")
  }

  return (
    <div className="w-full h-full flex flex-col justify-between pb-20">
      <div className="relative flex-1 w-full max-w-sm mx-auto">
        <AnimatePresence>
          <motion.div
            ref={cardRef}
            key={restaurants[currentIndex].id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{
              scale: 0.8,
              opacity: 0,
              x: direction === "left" ? -300 : direction === "right" ? 300 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute inset-0"
          >
            <RestaurantCard restaurant={restaurants[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center mt-4 space-x-4 mb-4">
        <button
          className="bg-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 hover:shadow-xl active:shadow-md"
          onClick={() => handleSwipe("left")}
        >
          <X className="w-8 h-8 text-red-500" />
        </button>
        <button
          className="bg-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 hover:shadow-xl active:shadow-md"
          onClick={() => handleSwipe("right")}
        >
          <Heart className="w-8 h-8 text-green-500" />
        </button>
      </div>
    </div>
  )
}

