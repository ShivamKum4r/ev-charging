"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, MapPin, Zap, Clock, Star, Phone, Navigation, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const stationData = {
  id: 1,
  name: "PowerHub Central",
  address: "123 Main St, Downtown, City 12345",
  phone: "+91 98765 43210",
  price: "₹12/kWh",
  type: "DC Fast Charging",
  totalPorts: 6,
  availablePorts: 4,
  rating: 4.5,
  totalReviews: 128,
  amenities: ["WiFi", "Restroom", "Cafe", "Parking"],
  operatingHours: "24/7",
  images: [
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ],
  chargerTypes: [
    { type: "CCS2", power: "50kW", ports: 4, available: 3 },
    { type: "CHAdeMO", power: "50kW", ports: 2, available: 1 },
  ],
}

const reviews = [
  {
    id: 1,
    user: "Rajesh K.",
    rating: 5,
    comment: "Excellent charging station! Fast charging and clean facilities.",
    date: "2 days ago",
  },
  {
    id: 2,
    user: "Priya S.",
    rating: 4,
    comment: "Good location and reliable charging. Could use more shade.",
    date: "1 week ago",
  },
  {
    id: 3,
    user: "Amit P.",
    rating: 5,
    comment: "Perfect for highway travel. Quick and efficient service.",
    date: "2 weeks ago",
  },
]

export default function StationDetailsPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-green-600" />
                <span className="font-semibold">EVCharge</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video relative">
                  <img
                    src={stationData.images[selectedImage] || "/placeholder.svg"}
                    alt={stationData.name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <div className="flex gap-2">
                    {stationData.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-20 h-16 rounded-md overflow-hidden border-2 ${
                          selectedImage === index ? "border-green-500" : "border-gray-200"
                        }`}
                      >
                        <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Station Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{stationData.name}</CardTitle>
                    <p className="text-gray-600 flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {stationData.address}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="text-lg font-semibold ml-1">{stationData.rating}</span>
                    </div>
                    <p className="text-sm text-gray-500">{stationData.totalReviews} reviews</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Zap className="h-5 w-5 text-green-600 mr-2" />
                    <span className="font-medium">Price: {stationData.price}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Open {stationData.operatingHours}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-600 mr-2" />
                    <span>{stationData.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Car className="h-5 w-5 text-purple-600 mr-2" />
                    <span>
                      {stationData.availablePorts}/{stationData.totalPorts} ports available
                    </span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">Charger Types</h3>
                  <div className="space-y-2">
                    {stationData.chargerTypes.map((charger, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">{charger.type}</span>
                          <span className="text-gray-600 ml-2">({charger.power})</span>
                        </div>
                        <Badge variant={charger.available > 0 ? "default" : "secondary"}>
                          {charger.available}/{charger.ports} available
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {stationData.amenities.map((amenity) => (
                      <Badge key={amenity} variant="outline">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{review.user}</p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Book Charging Slot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stationData.availablePorts}</div>
                  <div className="text-sm text-gray-600">Ports Available Now</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Charging Rate:</span>
                    <span className="font-medium">{stationData.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Time:</span>
                    <span className="font-medium">45-60 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Cost:</span>
                    <span className="font-medium">₹240-320</span>
                  </div>
                </div>

                <Separator />

                <Link href={`/booking/${stationData.id}`}>
                  <Button className="w-full" size="lg">
                    Book Now
                  </Button>
                </Link>

                <Button variant="outline" className="w-full bg-transparent">
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
