"use client"

import { useState, useRef, useEffect } from "react"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Sliders,
  Pizza,
  Sandwich,
  Coffee,
  Fish,
  Beef,
  Wheat,
  Milk,
  Egg,
  Utensils,
  Apple,
  Carrot,
  Salad,
  Soup,
  IceCream,
  Lock,
  LogOut,
  Settings,
  ChevronRight,
} from "lucide-react"
import EditProfileModal from "./EditProfileModal"
import { motion, AnimatePresence } from "framer-motion"
import PasswordChangeModal from "./PasswordChangeModal" // Import the PasswordChangeModal component

export default function Profile() {
  const [profileData, setProfileData] = useState({
    name: "Kevin Valencia",
    email: "Vrvalencia@gmail.com",
    phone: "+1 234 567 8900",
    location: "Oakville, ON",
    profilePicture: "/placeholder-user.jpg", // Add this line
  })
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false) // Add state for password modal

  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [selectedDietaryRestrictions, setSelectedDietaryRestrictions] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState(2)
  const [maxDistance, setMaxDistance] = useState(10)

  const settingsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const cuisineTypes = [
    { name: "Chinese", icon: Soup },
    { name: "French", icon: Utensils },
    { name: "Hamburger", icon: Sandwich },
    { name: "Indian", icon: Utensils },
    { name: "Italian", icon: Pizza },
    { name: "Japanese", icon: Fish },
    { name: "Korean", icon: Soup },
    { name: "Mexican", icon: Utensils },
    { name: "Middle Eastern", icon: Coffee },
    { name: "Pizza", icon: Pizza },
    { name: "Seafood", icon: Fish },
    { name: "Thai", icon: Soup },
    { name: "Vietnamese", icon: Soup },
    { name: "American", icon: Sandwich },
    { name: "Vegetarian", icon: Carrot },
    { name: "Dessert", icon: IceCream },
  ]

  const dietaryRestrictions = [
    { name: "Vegetarian", icon: Beef },
    { name: "Gluten-Free", icon: Wheat },
    { name: "Dairy-Free", icon: Milk },
    { name: "Egg-Free", icon: Egg },
  ]

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines((prev) => (prev.includes(cuisine) ? prev.filter((c) => c !== cuisine) : [...prev, cuisine]))
  }

  const toggleDietaryRestriction = (restriction: string) => {
    setSelectedDietaryRestrictions((prev) =>
      prev.includes(restriction) ? prev.filter((r) => r !== restriction) : [...prev, restriction],
    )
  }

  const handleSaveProfile = (newProfileData: typeof profileData) => {
    setProfileData(newProfileData)
    // Here you would typically send the updated profile to your backend
    console.log("Saving profile:", newProfileData)
  }

  const handleChangePassword = (oldPassword: string, newPassword: string) => {
    // Here you would typically send the old and new passwords to your backend
    console.log("Changing password", { oldPassword, newPassword })
    // For demo purposes, we'll just show an alert
    alert("Password changed successfully!")
  }

  const handleLogout = () => {
    // Here you would typically clear the user's session and redirect to login page
    console.log("Logging out")
  }

  const handleOpenPasswordModal = () => {
    // Add function to open password modal
    setIsSettingsOpen(false)
    setIsPasswordModalOpen(true)
  }

  return (
    <div className="flex flex-col h-full p-4 space-y-6 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center overflow-hidden">
            <img
              src={profileData.profilePicture || "/placeholder.svg"}
              alt={profileData.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{profileData.name}</h2>
            <p className="text-gray-600">NumNum Foodie</p>
          </div>
        </div>
        <div className="relative" ref={settingsRef}>
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
          >
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
          <AnimatePresence>
            {isSettingsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
              >
                <ul className="py-1">
                  <li>
                    <button
                      onClick={() => {
                        setIsSettingsOpen(false)
                        setIsEditModalOpen(true)
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Edit Profile
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleOpenPasswordModal} // Update button onClick handler
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center justify-between"
                    >
                      <span>Change Password</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Mail className="w-5 h-5 text-gray-500" />
          <span>{profileData.email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="w-5 h-5 text-gray-500" />
          <span>{profileData.phone}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-gray-500" />
          <span>{profileData.location}</span>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Preferences</h3>

        <div>
          <h4 className="text-lg font-medium mb-2">Cuisine Types</h4>
          <div className="grid grid-cols-4 gap-4">
            {cuisineTypes.map((cuisine) => (
              <div key={cuisine.name} className="flex flex-col items-center">
                <button
                  onClick={() => toggleCuisine(cuisine.name)}
                  className={`p-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 ${
                    selectedCuisines.includes(cuisine.name) ? "bg-green-500 text-white" : "bg-gray-200"
                  }`}
                >
                  <cuisine.icon className="w-6 h-6" />
                </button>
                <span className="text-xs mt-1 text-gray-600 text-center w-full">{cuisine.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-medium mb-2">Dietary Restrictions</h4>
          <div className="flex flex-wrap gap-4">
            {dietaryRestrictions.map((restriction) => (
              <button
                key={restriction.name}
                onClick={() => toggleDietaryRestriction(restriction.name)}
                className={`p-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 ${
                  selectedDietaryRestrictions.includes(restriction.name) ? "bg-gray-200" : "bg-gray-200"
                }`}
              >
                <restriction.icon className="w-6 h-6" />
                {selectedDietaryRestrictions.includes(restriction.name) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full border-2 border-red-500 rounded-full animate-pulse" />
                    <div className="absolute w-8 h-0.5 bg-red-500 transform -rotate-45" />
                  </div>
                )}
              </button>
            ))}
          </div>
          <div className="mt-2 text-sm">
            {selectedDietaryRestrictions.map((restriction) => (
              <div key={restriction} className="text-gray-600">
                {restriction}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-medium mb-2">Price Range</h4>
          <input
            type="range"
            min="1"
            max="4"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between mt-2">
            <span>$</span>
            <span>$$</span>
            <span>$$$</span>
            <span>$$$$</span>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-medium mb-2">Max Distance</h4>
          <input
            type="range"
            min="1"
            max="20"
            value={maxDistance}
            onChange={(e) => setMaxDistance(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between mt-2">
            <span>1 mile</span>
            <span>{maxDistance} miles</span>
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
        initialData={profileData}
      />
      <PasswordChangeModal // Add PasswordChangeModal component
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onChangePassword={handleChangePassword}
      />
    </div>
  )
}

