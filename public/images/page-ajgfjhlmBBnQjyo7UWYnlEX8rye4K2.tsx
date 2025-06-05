import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Search, Download, CreditCard, DollarSign, AlertCircle, CheckCircle } from "lucide-react"

export default function PaymentsPage() {
  const transactions = [
    {
      id: "TXN-12345",
      orderId: "ORD-12345",
      customer: "John Smith",
      amount: 129.99,
      currency: "USD",
      method: "Credit Card",
      status: "completed",
      date: "2024-01-15",
      gateway: "Stripe",
      fee: 3.89,
    },
    {
      id: "TXN-12344",
      orderId: "ORD-12344",
      customer: "Sarah Johnson",
      amount: 89.5,
      currency: "USD",
      method: "PayPal",
      status: "completed",
      date: "2024-01-14",
      gateway: "PayPal",
      fee: 2.69,
    },
    {
      id: "TXN-12343",
      orderId: "ORD-12343",
      customer: "Michael Brown",
      amount: 245.75,
      currency: "USD",
      method: "Credit Card",
      status: "pending",
      date: "2024-01-13",
      gateway: "Stripe",
      fee: 7.37,
    },
    {
      id: "TXN-12342",
      orderId: "ORD-12342",
      customer: "Emily Davis",
      amount: 59.99,
      currency: "USD",
      method: "Bank Transfer",
      status: "failed",
      date: "2024-01-12",
      gateway: "Wise",
      fee: 0,
    },
  ]

  const paymentMethods = [
    {
      name: "Stripe",
      status: "active",
      transactions: 156,
      volume: 45231.89,
      fee: "2.9% + $0.30",
    },
    {
      name: "PayPal",
      status: "active",
      transactions: 89,
      volume: 23456.78,
      fee: "3.4% + $0.30",
    },
    {
      name: "Wise",
      status: "active",
      transactions: 23,
      volume: 8765.43,
      fee: "0.5% - 2%",
    },
    {
      name: "VNPAY",
      status: "inactive",
      transactions: 0,
      volume: 0,
      fee: "2.5%",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      case "failed":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardNav />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Payments</h1>
              <p className="text-muted-foreground">Manage payment methods and transaction history</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button>Add Payment Method</Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$77,454.10</div>
                <p className="text-xs text-muted-foreground">+12.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">268</div>
                <p className="text-xs text-muted-foreground">+8.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Processing Fees</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,298.45</div>
                <p className="text-xs text-muted-foreground">2.97% of total revenue</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="transactions" className="space-y-6">
            <TabsList>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="methods">Payment Methods</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>All payment transactions and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4 mb-4">
                    <div className="md:col-span-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search transactions..." className="pl-8" />
                      </div>
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Gateway" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Gateways</SelectItem>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="wise">Wise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Transaction ID</th>
                          <th className="text-left py-3 px-4 font-medium">Customer</th>
                          <th className="text-left py-3 px-4 font-medium">Amount</th>
                          <th className="text-left py-3 px-4 font-medium">Method</th>
                          <th className="text-left py-3 px-4 font-medium">Status</th>
                          <th className="text-left py-3 px-4 font-medium">Date</th>
                          <th className="text-left py-3 px-4 font-medium">Fee</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((transaction) => (
                          <tr key={transaction.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div>
                                <div className="font-medium">{transaction.id}</div>
                                <div className="text-xs text-muted-foreground">{transaction.orderId}</div>
                              </div>
                            </td>
                            <td className="py-3 px-4">{transaction.customer}</td>
                            <td className="py-3 px-4 font-medium">
                              ${transaction.amount.toFixed(2)} {transaction.currency}
                            </td>
                            <td className="py-3 px-4">
                              <div>
                                <div>{transaction.method}</div>
                                <div className="text-xs text-muted-foreground">{transaction.gateway}</div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge variant="secondary" className={getStatusColor(transaction.status)}>
                                <div className="flex items-center space-x-1">
                                  {getStatusIcon(transaction.status)}
                                  <span className="capitalize">{transaction.status}</span>
                                </div>
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-sm">{transaction.date}</td>
                            <td className="py-3 px-4">${transaction.fee.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="methods">
              <div className="grid gap-6 md:grid-cols-2">
                {paymentMethods.map((method) => (
                  <Card key={method.name}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{method.name}</CardTitle>
                        <Badge variant={method.status === "active" ? "default" : "secondary"}>{method.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium">Transactions</div>
                          <div className="text-muted-foreground">{method.transactions}</div>
                        </div>
                        <div>
                          <div className="font-medium">Volume</div>
                          <div className="text-muted-foreground">${method.volume.toLocaleString()}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="font-medium">Processing Fee</div>
                          <div className="text-muted-foreground">{method.fee}</div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                        <Button variant={method.status === "active" ? "destructive" : "default"} size="sm">
                          {method.status === "active" ? "Disable" : "Enable"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Settings</CardTitle>
                    <CardDescription>Configure global payment preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Default Currency</label>
                      <Select defaultValue="usd">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD - US Dollar</SelectItem>
                          <SelectItem value="eur">EUR - Euro</SelectItem>
                          <SelectItem value="gbp">GBP - British Pound</SelectItem>
                          <SelectItem value="vnd">VND - Vietnamese Dong</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Payment Timeout (minutes)</label>
                      <Input type="number" defaultValue="15" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Auto-capture payments</label>
                      <p className="text-xs text-muted-foreground mb-2">Automatically capture authorized payments</p>
                      <Select defaultValue="enabled">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enabled">Enabled</SelectItem>
                          <SelectItem value="disabled">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Webhook Settings</CardTitle>
                    <CardDescription>Configure payment webhook endpoints</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Webhook URL</label>
                      <Input defaultValue="https://your-domain.com/webhooks/payments" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Webhook Secret</label>
                      <Input type="password" placeholder="Enter webhook secret" className="mt-1" />
                    </div>
                    <Button>Test Webhook</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
