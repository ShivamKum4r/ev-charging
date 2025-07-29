"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, User, Car, Bell, Shield, CreditCard, HelpCircle, LogOut, Edit, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const userProfile = {
  name: "Rajesh Kumar",
  email: "rajesh.kumar@email.com",
  phone: "+91 98765 43210",
  vehicleModel: "Tata Nexon EV",
  preferredChargerType: "DC Fast",
  maxDistance: "10",
  avatar: "/placeholder.svg?height=100&width=100",
}

const preferences = {
  notifications: {
    bookingReminders: true,
    priceAlerts: false,
    newStations: true,
    promotions: false,
  },
  charging: {
    autoBook: false,
    preferredTime: "morning",
    maxPrice: "15",
  },
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(userProfile)
  const [settings, setSettings] = useState(preferences)

  const handleSave = () => {
    setIsEditing(false)
    // Save profile logic here
  }

  const handleCancel = () => {
    setProfile(userProfile)
    setIsEditing(false)
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
                <User className="h-6 w-6 text-green-600" />
                <span className="font-semibold">Profile</span>
              </div>
            </div>
            <Button variant={isEditing ? "default" : "outline"} onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? (
                <>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                  <AvatarFallback className="text-lg">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold">{profile.name}</h1>
                  <p className="text-gray-600">{profile.email}</p>
                  <p className="text-gray-600">{profile.phone}</p>
                </div>
                {isEditing && (
                  <div className="flex space-x-2">
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="vehicle">Vehicle Model</Label>
                  <Input
                    id="vehicle"
                    value={profile.vehicleModel}
                    onChange={(e) => setProfile({ ...profile, vehicleModel: e.target.value })}
                    disabled={!isEditing}
                    placeholder="e.g., Tesla Model 3, Tata Nexon EV"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charging Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Car className="h-5 w-5 mr-2" />
                Charging Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="chargerType">Preferred Charger Type</Label>
                  <Select
                    value={profile.preferredChargerType}
                    onValueChange={(value) => setProfile({ ...profile, preferredChargerType: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AC Slow">AC Slow</SelectItem>
                      <SelectItem value="DC Fast">DC Fast</SelectItem>
                      <SelectItem value="DC Ultra Fast">DC Ultra Fast</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="maxDistance">Max Search Distance (km)</Label>
                  <Select
                    value={profile.maxDistance}
                    onValueChange={(value) => setProfile({ ...profile, maxDistance: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 km</SelectItem>
                      <SelectItem value="10">10 km</SelectItem>
                      <SelectItem value="20">20 km</SelectItem>
                      <SelectItem value="50">50 km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="maxPrice">Max Price Alert (₹/kWh)</Label>
                  <Input
                    id="maxPrice"
                    value={settings.charging.maxPrice}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        charging: { ...settings.charging, maxPrice: e.target.value },
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="preferredTime">Preferred Charging Time</Label>
                  <Select
                    value={settings.charging.preferredTime}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        charging: { ...settings.charging, preferredTime: value },
                      })
                    }
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (6AM - 12PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12PM - 6PM)</SelectItem>
                      <SelectItem value="evening">Evening (6PM - 12AM)</SelectItem>
                      <SelectItem value="night">Night (12AM - 6AM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Booking Reminders</p>
                    <p className="text-sm text-gray-600">Get notified before your charging session</p>
                  </div>
                  <Switch
                    checked={settings.notifications.bookingReminders}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, bookingReminders: checked },
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Price Alerts</p>
                    <p className="text-sm text-gray-600">Notify when prices drop at nearby stations</p>
                  </div>
                  <Switch
                    checked={settings.notifications.priceAlerts}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, priceAlerts: checked },
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Stations</p>
                    <p className="text-sm text-gray-600">Get notified about new charging stations nearby</p>
                  </div>
                  <Switch
                    checked={settings.notifications.newStations}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, newStations: checked },
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Promotions</p>
                    <p className="text-sm text-gray-600">Receive promotional offers and discounts</p>
                  </div>
                  <Switch
                    checked={settings.notifications.promotions}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, promotions: checked },
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payment Methods
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy & Security
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help & Support
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
