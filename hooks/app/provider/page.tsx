"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Building, Plus, MapPin, Zap, TrendingUp, Calendar, Settings, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const providerStations = [
  {
    id: 1,
    name: "PowerHub Central",
    address: "123 Main St, Downtown",
    totalPorts: 6,
    activePorts: 4,
    revenue: "₹12,450",
    bookings: 28,
    rating: 4.5,
    status: "active",
  },
  {
    id: 2,
    name: "Highway Express",
    address: "789 Highway Junction",
    totalPorts: 8,
    activePorts: 6,
    revenue: "₹18,200",
    bookings: 42,
    rating: 4.8,
    status: "active",
  },
]

const recentBookings = [
  {
    id: "BK001",
    customerName: "Rajesh K.",
    stationName: "PowerHub Central",
    date: "Today",
    time: "2:00 PM",
    duration: "1 hour",
    amount: "₹240",
    status: "active",
  },
  {
    id: "BK002",
    customerName: "Priya S.",
    stationName: "Highway Express",
    date: "Today",
    time: "11:00 AM",
    duration: "2 hours",
    amount: "₹480",
    status: "completed",
  },
]

export default function ProviderPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showAddStation, setShowAddStation] = useState(false)

  const totalRevenue = providerStations.reduce(
    (sum, station) => sum + Number.parseInt(station.revenue.replace("₹", "").replace(",", "")),
    0,
  )
  const totalBookings = providerStations.reduce((sum, station) => sum + station.bookings, 0)
  const totalPorts = providerStations.reduce((sum, station) => sum + station.totalPorts, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/auth">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Building className="h-6 w-6 text-green-600" />
                <span className="font-semibold">Provider Portal</span>
              </div>
            </div>
            <Button onClick={() => setShowAddStation(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Station
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Welcome back, GreenPower Solutions</h1>
            <p className="text-gray-600">Manage your charging stations and track performance</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="stations">Stations</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6 mt-6">
              {/* Stats Cards */}
              <div className="grid md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Revenue</p>
                        <p className="text-2xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Bookings</p>
                        <p className="text-2xl font-bold">{totalBookings}</p>
                      </div>
                      <Calendar className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Active Stations</p>
                        <p className="text-2xl font-bold">{providerStations.length}</p>
                      </div>
                      <Building className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Ports</p>
                        <p className="text-2xl font-bold">{totalPorts}</p>
                      </div>
                      <Zap className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentBookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{booking.customerName}</p>
                            <p className="text-sm text-gray-600">{booking.stationName}</p>
                            <p className="text-sm text-gray-600">
                              {booking.date} • {booking.time}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{booking.amount}</p>
                            <Badge variant={booking.status === "active" ? "default" : "secondary"}>
                              {booking.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Station Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {providerStations.map((station) => (
                        <div key={station.id} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{station.name}</h4>
                            <Badge variant="outline">
                              {station.activePorts}/{station.totalPorts} active
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Revenue</p>
                              <p className="font-semibold text-green-600">{station.revenue}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Bookings</p>
                              <p className="font-semibold">{station.bookings}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Stations Tab */}
            <TabsContent value="stations" className="space-y-6 mt-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">My Charging Stations</h2>
                <Button onClick={() => setShowAddStation(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Station
                </Button>
              </div>

              <div className="grid gap-4">
                {providerStations.map((station) => (
                  <Card key={station.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{station.name}</h3>
                          <p className="text-gray-600 flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {station.address}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={station.status === "active" ? "default" : "secondary"}>
                            {station.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Total Ports</p>
                          <p className="text-lg font-semibold">{station.totalPorts}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Active Ports</p>
                          <p className="text-lg font-semibold text-green-600">{station.activePorts}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Monthly Revenue</p>
                          <p className="text-lg font-semibold">{station.revenue}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Rating</p>
                          <p className="text-lg font-semibold">{station.rating} ⭐</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="font-medium">{booking.customerName}</p>
                              <p className="text-sm text-gray-600">Booking ID: {booking.id}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Station</p>
                              <p className="font-medium">{booking.stationName}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Date & Time</p>
                              <p className="font-medium">
                                {booking.date} • {booking.time}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Duration</p>
                              <p className="font-medium">{booking.duration}</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">{booking.amount}</p>
                          <Badge variant={booking.status === "active" ? "default" : "secondary"}>
                            {booking.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6 mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Revenue Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Revenue Chart Placeholder</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Usage Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Peak Hours</span>
                        <span className="font-semibold">2PM - 6PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Session</span>
                        <span className="font-semibold">1.5 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Utilization Rate</span>
                        <span className="font-semibold">68%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Customer Satisfaction</span>
                        <span className="font-semibold">4.6/5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Add Station Modal */}
          {showAddStation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Add New Charging Station</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="stationName">Station Name</Label>
                    <Input id="stationName" placeholder="Enter station name" />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Enter full address" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="totalPorts">Total Ports</Label>
                      <Input id="totalPorts" type="number" placeholder="6" />
                    </div>
                    <div>
                      <Label htmlFor="chargerType">Charger Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ac">AC Slow</SelectItem>
                          <SelectItem value="dc">DC Fast</SelectItem>
                          <SelectItem value="ultra">DC Ultra Fast</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="price">Price per kWh (₹)</Label>
                    <Input id="price" type="number" placeholder="12" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="active" />
                    <Label htmlFor="active">Make station active immediately</Label>
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" onClick={() => setShowAddStation(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button onClick={() => setShowAddStation(false)} className="flex-1">
                      Add Station
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
