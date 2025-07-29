"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Wallet,
  Plus,
  CreditCard,
  Smartphone,
  Building,
  History,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

const transactions = [
  {
    id: "TXN001",
    type: "debit",
    description: "Charging at PowerHub Central",
    amount: 240,
    date: "Dec 28, 2024",
    time: "2:30 PM",
    status: "completed",
  },
  {
    id: "TXN002",
    type: "credit",
    description: "Wallet Recharge",
    amount: 500,
    date: "Dec 27, 2024",
    time: "10:15 AM",
    status: "completed",
  },
  {
    id: "TXN003",
    type: "debit",
    description: "Charging at GreenCharge Mall",
    amount: 180,
    date: "Dec 25, 2024",
    time: "4:45 PM",
    status: "completed",
  },
  {
    id: "TXN004",
    type: "credit",
    description: "Refund - Cancelled Booking",
    amount: 120,
    date: "Dec 24, 2024",
    time: "11:20 AM",
    status: "completed",
  },
]

const paymentMethods = [
  {
    id: "card1",
    type: "card",
    name: "HDFC Credit Card",
    number: "**** **** **** 1234",
    icon: CreditCard,
  },
  {
    id: "upi1",
    type: "upi",
    name: "UPI",
    number: "user@paytm",
    icon: Smartphone,
  },
  {
    id: "netbanking1",
    type: "netbanking",
    name: "Net Banking",
    number: "HDFC Bank",
    icon: Building,
  },
]

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState("balance")
  const [rechargeAmount, setRechargeAmount] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card1")
  const [showRechargeForm, setShowRechargeForm] = useState(false)

  const walletBalance = 1250
  const quickAmounts = [100, 250, 500, 1000, 2000]

  const handleRecharge = () => {
    // Handle recharge logic here
    setShowRechargeForm(false)
    setRechargeAmount("")
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
                <Wallet className="h-6 w-6 text-green-600" />
                <span className="font-semibold">Wallet</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Wallet Balance Card */}
          <Card className="mb-6 bg-gradient-to-r from-green-600 to-green-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 mb-2">Available Balance</p>
                  <p className="text-3xl font-bold">₹{walletBalance.toLocaleString()}</p>
                </div>
                <Wallet className="h-12 w-12 text-green-200" />
              </div>
              <div className="flex items-center space-x-4 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setShowRechargeForm(true)}
                  className="bg-white text-green-700 hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Money
                </Button>
                <Button variant="outline" className="border-green-200 text-white hover:bg-green-600 bg-transparent">
                  <History className="h-4 w-4 mr-2" />
                  Transaction History
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recharge Form Modal */}
          {showRechargeForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Recharge Wallet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="amount">Enter Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={rechargeAmount}
                    onChange={(e) => setRechargeAmount(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-base font-medium">Quick Select</Label>
                  <div className="grid grid-cols-5 gap-2 mt-2">
                    {quickAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        onClick={() => setRechargeAmount(amount.toString())}
                        className="h-10"
                      >
                        ₹{amount}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Payment Method</Label>
                  <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} className="mt-2">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <Label htmlFor={method.id} className="flex items-center space-x-3 cursor-pointer flex-1">
                          <method.icon className="h-5 w-5 text-gray-600" />
                          <div>
                            <p className="font-medium">{method.name}</p>
                            <p className="text-sm text-gray-600">{method.number}</p>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => setShowRechargeForm(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleRecharge} disabled={!rechargeAmount} className="flex-1">
                    Recharge ₹{rechargeAmount}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="balance">Balance & Recharge</TabsTrigger>
              <TabsTrigger value="transactions">Transaction History</TabsTrigger>
            </TabsList>

            <TabsContent value="balance" className="space-y-6 mt-6">
              {/* Quick Actions */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Recharge</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {quickAmounts.slice(0, 4).map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          onClick={() => {
                            setRechargeAmount(amount.toString())
                            setShowRechargeForm(true)
                          }}
                        >
                          ₹{amount}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {paymentMethods.slice(0, 2).map((method) => (
                        <div key={method.id} className="flex items-center space-x-3 p-2 border rounded">
                          <method.icon className="h-4 w-4 text-gray-600" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{method.name}</p>
                            <p className="text-xs text-gray-600">{method.number}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                      Manage Payment Methods
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Transactions Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {transactions.slice(0, 3).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`p-2 rounded-full ${
                              transaction.type === "credit" ? "bg-green-100" : "bg-red-100"
                            }`}
                          >
                            {transaction.type === "credit" ? (
                              <ArrowDownLeft className="h-4 w-4 text-green-600" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4 text-red-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-gray-600">
                              {transaction.date} • {transaction.time}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-semibold ${
                              transaction.type === "credit" ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {transaction.type === "credit" ? "+" : "-"}₹{transaction.amount}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    View All Transactions
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((transaction, index) => (
                      <div key={transaction.id}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`p-2 rounded-full ${
                                transaction.type === "credit" ? "bg-green-100" : "bg-red-100"
                              }`}
                            >
                              {transaction.type === "credit" ? (
                                <ArrowDownLeft className="h-4 w-4 text-green-600" />
                              ) : (
                                <ArrowUpRight className="h-4 w-4 text-red-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              <p className="text-sm text-gray-600">
                                {transaction.date} • {transaction.time}
                              </p>
                              <p className="text-xs text-gray-500">ID: {transaction.id}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p
                              className={`font-semibold ${
                                transaction.type === "credit" ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {transaction.type === "credit" ? "+" : "-"}₹{transaction.amount}
                            </p>
                            <Badge variant="outline" className="text-xs">
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                        {index < transactions.length - 1 && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
