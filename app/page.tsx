"use client"

import { useState } from "react"
import RestaurantSwiper from "../components/RestaurantSwiper"
import AIChat from "../components/AIChat"
import Profile from "../components/Profile"
import BottomNavigation from "../components/BottomNavigation"

export default function Home() {
  const [activeTab, setActiveTab] = useState("swipe")

  return (
    <main className="flex flex-col min-h-screen bg-gray-100">
      <header className="w-full bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold text-center text-yellow-500">NumNum</h1>
      </header>
      <div className="flex-1 w-full max-w-sm mx-auto overflow-y-auto p-4">
        {activeTab === "swipe" && <RestaurantSwiper />}
        {activeTab === "chat" && <AIChat />}
        {activeTab === "profile" && <Profile />}
      </div>
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </main>
  )
}

