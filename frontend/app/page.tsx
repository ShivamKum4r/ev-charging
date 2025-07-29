"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Filter, Search, Zap, Clock, Star, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockStations = [
  {
    id: 1,
    name: "PowerHub Central",
    address: "123 Main St, Downtown",
    distance: "0.5 km",
    price: "₹12/kWh",
    type: "DC Fast",
    available: "4/6",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "GreenCharge Mall",
    address: "456 Shopping Center",
    distance: "1.2 km",
    price: "₹8/kWh",
    type: "AC Slow",
    available: "2/4",
    rating: 4.2,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Highway Express",
    address: "789 Highway Junction",
    distance: "2.1 km",
    price: "₹15/kWh",
    type: "DC Ultra Fast",
    available: "6/8",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceFilter, setPriceFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

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
            <Button variant="outline" className="md:w-auto bg-transparent">
              <Navigation className="h-4 w-4 mr-2" />
              Use Current Location
            </Button>
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
              {mockStations.map((station) => (
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
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm ml-1">{station.rating}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mb-3">
                          <Badge variant="secondary">{station.type}</Badge>
                          <span className="text-sm text-gray-600">{station.distance}</span>
                          <span className="text-sm font-medium text-green-600">{station.price}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-1 text-green-500" />
                            <span className="text-green-600">{station.available} available</span>
                          </div>
                          <Link href={`/station/${station.id}`}>
                            <Button size="sm">View Details</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
