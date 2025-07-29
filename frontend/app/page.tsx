"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MapPin, Filter, Search, Zap, Clock, Star, Navigation, Loader2, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { calculateDistance, formatDistance } from "@/lib/utils"

const mockStations = [
  {
    id: 1,
    name: "Tata Power EZ Charge",
    address: "Connaught Place, New Delhi, Delhi 110001",
    distance: "0.5 km",
    price: "₹10/kWh",
    type: "DC Fast",
    available: "3/4",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300",
    lat: 28.6315,
    lng: 77.2167,
  },
  {
    id: 2,
    name: "Ather Grid Station",
    address: "Select City Walk Mall, Saket, New Delhi 110017",
    distance: "1.8 km",
    price: "₹8/kWh",
    type: "AC Fast",
    available: "2/3",
    rating: 4.4,
    image: "/placeholder.svg?height=200&width=300",
    lat: 28.5244,
    lng: 77.2066,
  },
  {
    id: 3,
    name: "Fortum Charge & Drive",
    address: "DLF Cyber City, Gurugram, Haryana 122002",
    distance: "12.5 km",
    price: "₹12/kWh",
    type: "DC Ultra Fast",
    available: "5/6",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
    lat: 28.4940,
    lng: 77.0838,
  },
  {
    id: 4,
    name: "Zeon EV Station",
    address: "India Gate Metro Station, New Delhi 110001",
    distance: "2.1 km",
    price: "₹9/kWh",
    type: "AC Slow",
    available: "1/2",
    rating: 4.2,
    image: "/placeholder.svg?height=200&width=300",
    lat: 28.6129,
    lng: 77.2295,
  },
  {
    id: 5,
    name: "Statiq EV Charging Hub",
    address: "Ambience Mall, Vasant Kunj, New Delhi 110070",
    distance: "8.3 km",
    price: "₹11/kWh",
    type: "DC Fast",
    available: "4/5",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300",
    lat: 28.5175,
    lng: 77.1497,
  },
  {
    id: 6,
    name: "ChargeZone Hub",
    address: "AIIMS Metro Station, New Delhi 110029",
    distance: "3.7 km",
    price: "₹7/kWh",
    type: "AC Slow",
    available: "2/4",
    rating: 4.1,
    image: "/placeholder.svg?height=200&width=300",
    lat: 28.5677,
    lng: 77.2072,
  }
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceFilter, setPriceFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [userLocation, setUserLocation] = useState(null)
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationError, setLocationError] = useState(null)
  const [watchId, setWatchId] = useState<number | null>(null)

  useEffect(() => {
    // Auto-get location on mount
    getCurrentLocation()

    // Cleanup watch on unmount
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId)
      }
    }
  }, [])

  const getCurrentLocation = () => {
    setLocationLoading(true)
    setLocationError(null)

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.")
      setLocationLoading(false)
      return
    }

    // Get current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setUserLocation(newLocation)
        setLocationLoading(false)

        // Start watching for location changes
        const id = navigator.geolocation.watchPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          },
          (error) => {
            console.error("Location watch error:", error)
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000, // Cache for 1 minute
          }
        )
        setWatchId(id)
      },
      (error) => {
        let errorMessage = "Failed to retrieve location."
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user."
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable."
            break
          case error.TIMEOUT:
            errorMessage = "Location request timed out."
            break
        }
        setLocationError(errorMessage)
        setLocationLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    )
  }

  const stopLocationTracking = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId)
      setWatchId(null)
    }
    setUserLocation(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">EVCharge</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/bookings" className="text-gray-600 hover:text-gray-900">
                My Bookings
              </Link>
              <Link href="/wallet" className="text-gray-600 hover:text-gray-900">
                Wallet
              </Link>
              <Link href="/profile" className="text-gray-600 hover:text-gray-900">
                Profile
              </Link>
              <Link href="/auth">
                <Button>Login</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by address or destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Location Controls */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                {userLocation ? (
                  <div className="flex items-center text-green-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      Location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                    </span>
                  </div>
                ) : locationError ? (
                  <div className="text-red-600 text-sm">{locationError}</div>
                ) : (
                  <div className="text-gray-500 text-sm">Location not available</div>
                )}
              </div>
              <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                onClick={getCurrentLocation}
                disabled={locationLoading}
                className="md:w-auto"
              >
                {locationLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Navigation className="h-4 w-4 mr-2" />
                )}
                {locationLoading ? "Getting Location..." : "Use My Location"}
              </Button>

              {userLocation && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={stopLocationTracking}
                  className="text-red-600 hover:text-red-700"
                >
                  Stop Tracking
                </Button>
              )}
            </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="low">Under ₹10</SelectItem>
                <SelectItem value="medium">₹10-15</SelectItem>
                <SelectItem value="high">Above ₹15</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="ac">AC Slow</SelectItem>
                <SelectItem value="dc">DC Fast</SelectItem>
                <SelectItem value="ultra">DC Ultra Fast</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Map Section */}
          <div className="order-2 lg:order-1">
            <Card className="h-[500px]">
              <CardContent className="p-0 h-full">
                <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Interactive Map</p>
                    <p className="text-sm text-gray-400">Showing {mockStations.length} nearby stations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stations List */}
          <div className="order-1 lg:order-2">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Nearby Charging Stations</h2>
              {mockStations.map((station) => {
                const distance = userLocation 
                  ? calculateDistance(userLocation.lat, userLocation.lng, station.lat, station.lng)
                  : null

                return (
                <Card key={station.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={station.image || "/placeholder.svg"}
                        alt={station.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{station.name}</h3>
                            <p className="text-gray-600 text-sm flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {station.address}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center mb-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm ml-1">{station.rating}</span>
                            </div>
                            {distance && (
                              <div className="flex items-center text-xs text-blue-600">
                                <Navigation className="h-3 w-3 mr-1" />
                                {formatDistance(distance)}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mb-3">
                          <Badge variant="secondary">{station.type}</Badge>
                          {!userLocation && (
                            <span className="text-sm text-gray-600">{station.distance}</span>
                          )}
                          <span className="text-sm font-medium text-green-600">{station.price}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <div className="flex items-center text-xs text-gray-600">
                            <Zap className="h-3 w-3 mr-1" />
                            {station.type}
                          </div>
                          <div className="flex items-center text-xs text-gray-600">
                            <Car className="h-3 w-3 mr-1" />
                            {station.available}
                          </div>
                          <div className="flex items-center text-xs font-medium text-green-600">
                            <span>{station.price}</span>
                          </div>
                          <div className="flex justify-end">
                            <Link href={`/station/${station.id}`}>
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}