"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, MapPin, Zap, MoreVertical, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const upcomingBookings = [
  {
    id: "EV12345",
    stationName: "PowerHub Central",
    address: "123 Main St, Downtown",
    date: "Today",
    time: "2:00 PM - 3:00 PM",
    status: "confirmed",
    cost: "₹240",
    chargerType: "DC Fast",
  },
  {
    id: "EV12346",
    stationName: "GreenCharge Mall",
    address: "456 Shopping Center",
    date: "Tomorrow",
    time: "10:00 AM - 12:00 PM",
    status: "confirmed",
    cost: "₹320",
    chargerType: "AC Slow",
  },
]

const pastBookings = [
  {
    id: "EV12344",
    stationName: "Highway Express",
    address: "789 Highway Junction",
    date: "Dec 25, 2024",
    time: "4:00 PM - 5:00 PM",
    status: "completed",
    cost: "₹300",
    chargerType: "DC Ultra Fast",
  },
  {
    id: "EV12343",
    stationName: "PowerHub Central",
    address: "123 Main St, Downtown",
    date: "Dec 20, 2024",
    time: "11:00 AM - 12:00 PM",
    status: "completed",
    cost: "₹240",
    chargerType: "DC Fast",
  },
  {
    id: "EV12342",
    stationName: "City Center Charge",
    address: "321 Business District",
    date: "Dec 15, 2024",
    time: "3:00 PM - 4:00 PM",
    status: "cancelled",
    cost: "₹0",
    chargerType: "DC Fast",
  },
]

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
              <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4 mt-6">
              {upcomingBookings.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No upcoming bookings</h3>
                    <p className="text-gray-600 mb-4">Book your next charging session to get started.</p>
                    <Link href="/">
                      <Button>Find Charging Stations</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                upcomingBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{booking.stationName}</h3>
                            <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                          </div>
                          <p className="text-gray-600 flex items-center mb-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {booking.address}
                          </p>
                          <p className="text-gray-600 flex items-center mb-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            {booking.date}
                          </p>
                          <p className="text-gray-600 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {booking.time}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-green-600 mb-2">{booking.cost}</p>
                          <Badge variant="outline">{booking.chargerType}</Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Booking ID:</span>
                          <span className="font-mono text-sm">{booking.id}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <QrCode className="h-4 w-4 mr-2" />
                            Show QR
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="ghost">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Get Directions</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Cancel Booking</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4 mt-6">
              {pastBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{booking.stationName}</h3>
                          <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                        </div>
                        <p className="text-gray-600 flex items-center mb-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {booking.address}
                        </p>
                        <p className="text-gray-600 flex items-center mb-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {booking.date}
                        </p>
                        <p className="text-gray-600 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {booking.time}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold mb-2">{booking.cost}</p>
                        <Badge variant="outline">{booking.chargerType}</Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Booking ID:</span>
                        <span className="font-mono text-sm">{booking.id}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {booking.status === "completed" && (
                          <Button size="sm" variant="outline">
                            Rate & Review
                          </Button>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                            {booking.status === "completed" && <DropdownMenuItem>Book Again</DropdownMenuItem>}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
