"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Zap, CreditCard, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const stationData = {
  id: 1,
  name: "PowerHub Central",
  address: "123 Main St, Downtown",
  price: 12,
  type: "DC Fast Charging",
}

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
]

export default function BookingPage({ params }: { params: { id: string } }) {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [duration, setDuration] = useState("1")
  const [paymentMethod, setPaymentMethod] = useState("wallet")
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  const estimatedCost = Number.parseInt(duration) * stationData.price * 20 // Assuming 20kWh per hour

  const handleBooking = () => {
    setBookingConfirmed(true)
    setStep(4)
  }

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-white">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-green-600" />
              <span className="font-semibold">EVCharge</span>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600 mb-6">Your charging slot has been successfully booked.</p>

            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Booking ID:</span>
                    <span className="font-mono">#EV12345</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Station:</span>
                    <span className="font-medium">{stationData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date & Time:</span>
                    <span>
                      {selectedDate} at {selectedTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{duration} hour(s)</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total Cost:</span>
                    <span>₹{estimatedCost}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Link href="/bookings">
                <Button className="w-full">View My Bookings</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full bg-transparent">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={`/station/${params.id}`}>
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
        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNum}
                </div>
                {stepNum < 3 && <div className={`w-16 h-1 mx-2 ${step > stepNum ? "bg-green-600" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>

          {/* Station Info */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">{stationData.name}</h2>
                  <p className="text-sm text-gray-600">{stationData.address}</p>
                </div>
                <Badge>{stationData.type}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Step 1: Date & Time Selection */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Select Date & Time
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Select Date</Label>
                  <Select value={selectedDate} onValueChange={setSelectedDate}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose a date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Today">Today</SelectItem>
                      <SelectItem value="Tomorrow">Tomorrow</SelectItem>
                      <SelectItem value="Dec 30, 2024">Dec 30, 2024</SelectItem>
                      <SelectItem value="Dec 31, 2024">Dec 31, 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-medium">Select Time Slot</Label>
                  <RadioGroup
                    value={selectedTime}
                    onValueChange={setSelectedTime}
                    className="grid grid-cols-4 gap-3 mt-2"
                  >
                    {timeSlots.map((time) => (
                      <div key={time}>
                        <RadioGroupItem value={time} id={time} className="peer sr-only" />
                        <Label
                          htmlFor={time}
                          className="flex items-center justify-center p-2 border rounded-md cursor-pointer peer-checked:bg-green-600 peer-checked:text-white peer-checked:border-green-600 hover:bg-gray-50"
                        >
                          {time}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-base font-medium">Duration</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="2">2 hours</SelectItem>
                      <SelectItem value="3">3 hours</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full" onClick={() => setStep(2)} disabled={!selectedDate || !selectedTime}>
                  Continue
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Payment Method */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="wallet" id="wallet" />
                    <Label htmlFor="wallet" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span>Wallet Balance</span>
                        <span className="text-green-600 font-medium">₹1,250</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex-1 cursor-pointer">
                      UPI Payment
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      Credit/Debit Card
                    </Label>
                  </div>
                </RadioGroup>

                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)} className="flex-1">
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Confirm Booking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Station:</span>
                    <span className="font-medium">{stationData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span>{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{duration} hour(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rate:</span>
                    <span>₹{stationData.price}/kWh</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Cost:</span>
                    <span>₹{estimatedCost}</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleBooking} className="flex-1">
                    Confirm & Pay
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
