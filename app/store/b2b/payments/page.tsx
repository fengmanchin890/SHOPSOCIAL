"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { useI18n } from "@/contexts/i18n-context"
import { 
  CreditCard, 
  DollarSign, 
  Calendar, 
  ArrowDownUp, 
  FileText, 
  Download, 
  Filter, 
  Plus,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react"

export default function PaymentsPage() {
  // Use state with useEffect for client-side only initialization
  const [isClient, setIsClient] = useState(false)
  const { t } = useI18n()
  const [activeTab, setActiveTab] = useState("all")
  
  // Set isClient to true after component mounts to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Mock payment data - only used after client-side hydration
  const payments = isClient ? [
    {
      id: "PAY-001",
      orderId: "ORD-001",
      amount: 17500,
      currency: "USD",
      status: "completed",
      method: "bank_transfer",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      from: "Import Solutions Inc",
      to: "Your Company",
      reference: "INV-2024-001",
    },
    {
      id: "PAY-002",
      orderId: "ORD-003",
      amount: 4500,
      currency: "USD",
      status: "pending",
      method: "letter_credit",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      from: "Global Distributors Ltd",
      to: "Your Company",
      reference: "INV-2024-003",
    },
    {
      id: "PAY-003",
      orderId: "ORD-004",
      amount: 8750,
      currency: "USD",
      status: "processing",
      method: "wire_transfer",
      date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      from: "European Retailers",
      to: "Your Company",
      reference: "INV-2024-004",
    },
    {
      id: "PAY-004",
      orderId: "ORD-002",
      amount: 1680,
      currency: "USD",
      status: "failed",
      method: "bank_transfer",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      from: "Tech Innovations Co",
      to: "Your Company",
      reference: "INV-2024-002",
    },
  ] : []

  // Statistics - only calculated after client-side hydration
  const stats = isClient ? {
    totalReceived: payments
      .filter(p => p.status === "completed")
      .reduce((sum, p) => sum + p.amount, 0),
    totalPending: payments
      .filter(p => p.status === "pending" || p.status === "processing")
      .reduce((sum, p) => sum + p.amount, 0),
    completedCount: payments.filter(p => p.status === "completed").length,
    pendingCount: payments.filter(p => p.status === "pending" || p.status === "processing").length,
  } : { totalReceived: 0, totalPending: 0, completedCount: 0, pendingCount: 0 }

  // Filter payments based on active tab
  const filteredPayments = isClient ? payments.filter(payment => {
    if (activeTab === "all") return true
    if (activeTab === "completed") return payment.status === "completed"
    if (activeTab === "pending") return payment.status === "pending" || payment.status === "processing"
    if (activeTab === "failed") return payment.status === "failed"
    return true
  }) : []

  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Get payment method icon
  const getMethodIcon = (method: string) => {
    switch (method) {
      case "bank_transfer":
        return <ArrowDownUp className="h-4 w-4 text-blue-600" />
      case "letter_credit":
        return <FileText className="h-4 w-4 text-purple-600" />
      case "wire_transfer":
        return <DollarSign className="h-4 w-4 text-green-600" />
      default:
        return <CreditCard className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Payments</h1>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Payment
            </Button>
          </div>

          {/* Only render content after client-side hydration */}
          {isClient && (
            <>
              {/* Payment Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-green-100 rounded-full">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Completed Payments</p>
                        <div className="flex items-baseline">
                          <h3 className="text-2xl font-bold">{stats.completedCount}</h3>
                          <p className="ml-2 text-sm text-gray-500">transactions</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-yellow-100 rounded-full">
                        <Clock className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Pending Payments</p>
                        <div className="flex items-baseline">
                          <h3 className="text-2xl font-bold">{stats.pendingCount}</h3>
                          <p className="ml-2 text-sm text-gray-500">transactions</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-green-100 rounded-full">
                        <DollarSign className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Received</p>
                        <h3 className="text-2xl font-bold">${stats.totalReceived.toLocaleString()}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-yellow-100 rounded-full">
                        <DollarSign className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Pending Amount</p>
                        <h3 className="text-2xl font-bold">${stats.totalPending.toLocaleString()}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Payments List */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Payment Transactions</CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                      <TabsTrigger value="pending">Pending</TabsTrigger>
                      <TabsTrigger value="failed">Failed</TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab} className="mt-4">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 font-medium">ID</th>
                              <th className="text-left py-3 px-4 font-medium">Date</th>
                              <th className="text-left py-3 px-4 font-medium">From</th>
                              <th className="text-left py-3 px-4 font-medium">To</th>
                              <th className="text-left py-3 px-4 font-medium">Amount</th>
                              <th className="text-left py-3 px-4 font-medium">Method</th>
                              <th className="text-left py-3 px-4 font-medium">Status</th>
                              <th className="text-left py-3 px-4 font-medium">Reference</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredPayments.map((payment) => (
                              <tr key={payment.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4 font-mono text-sm">{payment.id}</td>
                                <td className="py-3 px-4 text-sm">
                                  {new Date(payment.date).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-4">{payment.from}</td>
                                <td className="py-3 px-4">{payment.to}</td>
                                <td className="py-3 px-4 font-medium">
                                  ${payment.amount.toLocaleString()} {payment.currency}
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center">
                                    {getMethodIcon(payment.method)}
                                    <span className="ml-2 capitalize">
                                      {payment.method.replace("_", " ")}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-3 px-4">{getStatusBadge(payment.status)}</td>
                                <td className="py-3 px-4 font-mono text-sm">{payment.reference}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {filteredPayments.length === 0 && (
                        <div className="text-center py-8">
                          <AlertCircle className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                          <p className="text-gray-500">No payments found matching your criteria</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </>
          )}
        </main>
      </div>
    </div>
  )
}