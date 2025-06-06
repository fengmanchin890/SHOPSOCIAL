"use client"

import { useState } from "react"
import { 
  DollarSign, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Upload, 
  CreditCard, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  FileText,
  BarChart,
  PieChart,
  MoreHorizontal,
  Check,
  X,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { useB2B } from "@/components/store/B2BProvider"
import { 
  BarChart as BarChartComponent, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as PieChartComponent,
  Pie,
  Cell
} from "recharts"

const COLORS = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6"]

// Mock financial data
const mockInvoices = [
  {
    id: "INV-001",
    client: "Import Solutions Inc",
    clientId: "user-customer-1",
    amount: 17500,
    currency: "USD",
    status: "paid",
    issueDate: new Date("2024-06-15").getTime(),
    dueDate: new Date("2024-07-15").getTime(),
    paidDate: new Date("2024-06-20").getTime(),
    items: [
      { description: "Product Sourcing Services", quantity: 1, unitPrice: 15000, total: 15000 },
      { description: "Market Research Report", quantity: 1, unitPrice: 2500, total: 2500 },
    ],
    notes: "Thank you for your business!",
  },
  {
    id: "INV-002",
    client: "European Distributors",
    clientId: "user-customer-2",
    amount: 8500,
    currency: "USD",
    status: "pending",
    issueDate: new Date("2024-06-25").getTime(),
    dueDate: new Date("2024-07-25").getTime(),
    items: [
      { description: "Supplier Evaluation", quantity: 1, unitPrice: 5000, total: 5000 },
      { description: "Logistics Optimization", quantity: 1, unitPrice: 3500, total: 3500 },
    ],
    notes: "Net 30 payment terms",
  },
  {
    id: "INV-003",
    client: "Import Solutions Inc",
    clientId: "user-customer-1",
    amount: 12000,
    currency: "USD",
    status: "overdue",
    issueDate: new Date("2024-05-15").getTime(),
    dueDate: new Date("2024-06-15").getTime(),
    items: [
      { description: "Consulting Services", quantity: 20, unitPrice: 600, total: 12000 },
    ],
    notes: "Please remit payment as soon as possible",
  },
]

const mockExpenses = [
  {
    id: "EXP-001",
    category: "Office Supplies",
    amount: 450,
    currency: "USD",
    date: new Date("2024-06-10").getTime(),
    vendor: "Office Depot",
    description: "Quarterly office supplies",
    status: "approved",
    receipt: true,
  },
  {
    id: "EXP-002",
    category: "Travel",
    amount: 1250,
    currency: "USD",
    date: new Date("2024-06-15").getTime(),
    vendor: "Various",
    description: "Client meeting in New York",
    status: "pending",
    receipt: true,
  },
  {
    id: "EXP-003",
    category: "Software",
    amount: 99,
    currency: "USD",
    date: new Date("2024-06-01").getTime(),
    vendor: "Adobe",
    description: "Monthly subscription",
    status: "approved",
    receipt: false,
  },
]

// Financial summary data
const financialSummary = {
  revenue: {
    current: 38000,
    previous: 32000,
    change: 18.75,
  },
  expenses: {
    current: 12500,
    previous: 11000,
    change: 13.64,
  },
  profit: {
    current: 25500,
    previous: 21000,
    change: 21.43,
  },
  outstanding: {
    current: 20500,
    previous: 18000,
    change: 13.89,
  }
}

// Chart data
const monthlyRevenueData = [
  { name: "Jan", revenue: 28000, expenses: 10000 },
  { name: "Feb", revenue: 32000, expenses: 11000 },
  { name: "Mar", revenue: 30000, expenses: 10500 },
  { name: "Apr", revenue: 34000, expenses: 12000 },
  { name: "May", revenue: 32000, expenses: 11000 },
  { name: "Jun", revenue: 38000, expenses: 12500 },
]

const expenseCategoryData = [
  { name: "Office Supplies", value: 2500 },
  { name: "Travel", value: 5000 },
  { name: "Software", value: 3000 },
  { name: "Marketing", value: 4500 },
  { name: "Other", value: 1500 },
]

export default function FinancialPage() {
  const { users } = useB2B()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [invoices, setInvoices] = useState(mockInvoices)
  const [expenses, setExpenses] = useState(mockExpenses)
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)
  const [showAddInvoiceDialog, setShowAddInvoiceDialog] = useState(false)
  const [showAddExpenseDialog, setShowAddExpenseDialog] = useState(false)
  const [showInvoiceDetailsDialog, setShowInvoiceDetailsDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("invoices")
  
  // Form state for new invoice
  const [newInvoice, setNewInvoice] = useState({
    client: "",
    issueDate: "",
    dueDate: "",
    items: [{ description: "", quantity: 1, unitPrice: 0 }],
    notes: "",
  })
  
  // Form state for new expense
  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: "",
    date: "",
    vendor: "",
    description: "",
    receipt: null as File | null,
  })
  
  // Filter invoices based on search and status
  const filteredInvoices = invoices.filter(invoice => {
    // Filter by search query
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Filter by status
    const matchesStatus = 
      statusFilter === "all" || 
      invoice.status === statusFilter
    
    return matchesSearch && matchesStatus
  })
  
  // Filter expenses based on search
  const filteredExpenses = expenses.filter(expense => {
    // Filter by search query
    const matchesSearch = 
      expense.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesSearch
  })
  
  const handleAddInvoice = () => {
    // Validate form
    if (!newInvoice.client || !newInvoice.issueDate || !newInvoice.dueDate) {
      alert("Please fill in all required fields")
      return
    }
    
    // Calculate total amount
    const amount = newInvoice.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
    
    // Create new invoice
    const invoice = {
      id: `INV-${(invoices.length + 1).toString().padStart(3, '0')}`,
      client: newInvoice.client,
      clientId: users.find(u => u.company === newInvoice.client)?.id || "",
      amount,
      currency: "USD",
      status: "pending",
      issueDate: new Date(newInvoice.issueDate).getTime(),
      dueDate: new Date(newInvoice.dueDate).getTime(),
      items: newInvoice.items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.quantity * item.unitPrice,
      })),
      notes: newInvoice.notes,
    }
    
    // Add invoice to list
    setInvoices([...invoices, invoice])
    
    // Reset form and close dialog
    setNewInvoice({
      client: "",
      issueDate: "",
      dueDate: "",
      items: [{ description: "", quantity: 1, unitPrice: 0 }],
      notes: "",
    })
    setShowAddInvoiceDialog(false)
  }
  
  const handleAddExpense = () => {
    // Validate form
    if (!newExpense.category || !newExpense.amount || !newExpense.date || !newExpense.vendor) {
      alert("Please fill in all required fields")
      return
    }
    
    // Create new expense
    const expense = {
      id: `EXP-${(expenses.length + 1).toString().padStart(3, '0')}`,
      category: newExpense.category,
      amount: parseFloat(newExpense.amount),
      currency: "USD",
      date: new Date(newExpense.date).getTime(),
      vendor: newExpense.vendor,
      description: newExpense.description,
      status: "pending",
      receipt: !!newExpense.receipt,
    }
    
    // Add expense to list
    setExpenses([...expenses, expense])
    
    // Reset form and close dialog
    setNewExpense({
      category: "",
      amount: "",
      date: "",
      vendor: "",
      description: "",
      receipt: null,
    })
    setShowAddExpenseDialog(false)
  }
  
  const handleAddInvoiceItem = () => {
    setNewInvoice({
      ...newInvoice,
      items: [...newInvoice.items, { description: "", quantity: 1, unitPrice: 0 }]
    })
  }
  
  const handleRemoveInvoiceItem = (index: number) => {
    setNewInvoice({
      ...newInvoice,
      items: newInvoice.items.filter((_, i) => i !== index)
    })
  }
  
  const handleInvoiceItemChange = (index: number, field: string, value: any) => {
    setNewInvoice({
      ...newInvoice,
      items: newInvoice.items.map((item, i) => {
        if (i === index) {
          return { ...item, [field]: value }
        }
        return item
      })
    })
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewExpense({
        ...newExpense,
        receipt: e.target.files[0],
      })
    }
  }
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString()
  }
  
  const calculateInvoiceTotal = (items: any[]) => {
    return items.reduce((sum, item) => sum + item.total, 0)
  }
  
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "paid":
        return "default"
      case "pending":
        return "secondary"
      case "overdue":
        return "destructive"
      default:
        return "outline"
    }
  }
  
  const getExpenseStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "default"
      case "pending":
        return "secondary"
      case "rejected":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      
      <div className="flex flex-1">
        <DashboardNav />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Financial Management</h1>
              <p className="text-gray-500">Manage invoices, expenses, and financial reports</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setShowAddInvoiceDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Invoice
              </Button>
              <Button variant="outline" onClick={() => setShowAddExpenseDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Expense
              </Button>
            </div>
          </div>
          
          {/* Financial Summary */}
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">${financialSummary.revenue.current.toLocaleString()}</div>
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    {financialSummary.revenue.change}%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">vs. ${financialSummary.revenue.previous.toLocaleString()} last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-muted-foreground">Expenses</p>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">${financialSummary.expenses.current.toLocaleString()}</div>
                  <div className="flex items-center text-sm text-red-600">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    {financialSummary.expenses.change}%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">vs. ${financialSummary.expenses.previous.toLocaleString()} last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-muted-foreground">Profit</p>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">${financialSummary.profit.current.toLocaleString()}</div>
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    {financialSummary.profit.change}%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">vs. ${financialSummary.profit.previous.toLocaleString()} last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-muted-foreground">Outstanding</p>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">${financialSummary.outstanding.current.toLocaleString()}</div>
                  <div className="flex items-center text-sm text-red-600">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    {financialSummary.outstanding.change}%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">vs. ${financialSummary.outstanding.previous.toLocaleString()} last month</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts */}
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue vs. Expenses</CardTitle>
                <CardDescription>Monthly comparison for the current year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChartComponent data={monthlyRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`$${value}`, '']}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Bar dataKey="revenue" name="Revenue" fill="#3B82F6" />
                      <Bar dataKey="expenses" name="Expenses" fill="#EF4444" />
                    </BarChartComponent>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Expenses by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChartComponent>
                      <Pie
                        data={expenseCategoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {expenseCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`$${value}`, '']} />
                    </PieChartComponent>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Invoices and Expenses Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="reports">Financial Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="invoices">
              {/* Filters and Search */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="md:col-span-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search invoices..."
                          className="pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Filter className="h-4 w-4 mr-2" />
                        More Filters
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Invoice List */}
              <div className="rounded-md border">
                <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                  <div className="col-span-3">Invoice</div>
                  <div className="col-span-3">Client</div>
                  <div className="col-span-2">Amount</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2 text-right">Actions</div>
                </div>
                
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice) => (
                    <div key={invoice.id} className="grid grid-cols-12 items-center border-b px-4 py-3 hover:bg-muted/50">
                      <div className="col-span-3">
                        <p className="font-medium">{invoice.id}</p>
                        <p className="text-xs text-muted-foreground">
                          Issued: {formatDate(invoice.issueDate)} • Due: {formatDate(invoice.dueDate)}
                        </p>
                      </div>
                      <div className="col-span-3">{invoice.client}</div>
                      <div className="col-span-2 font-medium">${invoice.amount.toLocaleString()}</div>
                      <div className="col-span-2">
                        <Badge variant={getStatusBadgeVariant(invoice.status)}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="col-span-2 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => {
                              setSelectedInvoice(invoice)
                              setShowInvoiceDetailsDialog(true)
                            }}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download PDF
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Check className="h-4 w-4 mr-2" />
                              Mark as Paid
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit Invoice</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Delete Invoice
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-muted-foreground">
                    No invoices found matching your criteria
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="expenses">
              {/* Filters and Search */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="md:col-span-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search expenses..."
                          className="pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="office">Office Supplies</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                        <SelectItem value="software">Software</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Filter className="h-4 w-4 mr-2" />
                        More Filters
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Expense List */}
              <div className="rounded-md border">
                <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                  <div className="col-span-2">ID</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-2">Category</div>
                  <div className="col-span-2">Vendor</div>
                  <div className="col-span-2">Amount</div>
                  <div className="col-span-2 text-right">Status</div>
                </div>
                
                {filteredExpenses.length > 0 ? (
                  filteredExpenses.map((expense) => (
                    <div key={expense.id} className="grid grid-cols-12 items-center border-b px-4 py-3 hover:bg-muted/50">
                      <div className="col-span-2 font-medium">{expense.id}</div>
                      <div className="col-span-2">{formatDate(expense.date)}</div>
                      <div className="col-span-2">{expense.category}</div>
                      <div className="col-span-2">{expense.vendor}</div>
                      <div className="col-span-2">${expense.amount.toLocaleString()}</div>
                      <div className="col-span-2 text-right">
                        <Badge variant={getExpenseStatusBadgeVariant(expense.status)}>
                          {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-muted-foreground">
                    No expenses found matching your criteria
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="reports">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Profit & Loss</CardTitle>
                    <CardDescription>Summary of revenue and expenses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Revenue</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Sales</span>
                            <span>${(financialSummary.revenue.current * 0.95).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Consulting</span>
                            <span>${(financialSummary.revenue.current * 0.05).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between font-medium">
                            <span>Total Revenue</span>
                            <span>${financialSummary.revenue.current.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Expenses</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Office Supplies</span>
                            <span>${(financialSummary.expenses.current * 0.1).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Travel</span>
                            <span>${(financialSummary.expenses.current * 0.3).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Software</span>
                            <span>${(financialSummary.expenses.current * 0.2).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Marketing</span>
                            <span>${(financialSummary.expenses.current * 0.25).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Other</span>
                            <span>${(financialSummary.expenses.current * 0.15).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between font-medium">
                            <span>Total Expenses</span>
                            <span>${financialSummary.expenses.current.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <div className="flex justify-between font-bold">
                          <span>Net Profit</span>
                          <span>${financialSummary.profit.current.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground mt-1">
                          <span>Profit Margin</span>
                          <span>{((financialSummary.profit.current / financialSummary.revenue.current) * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Cash Flow</CardTitle>
                    <CardDescription>Summary of cash inflows and outflows</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Cash Inflows</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Invoice Payments</span>
                            <span>${(financialSummary.revenue.current * 0.9).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Other Income</span>
                            <span>${(financialSummary.revenue.current * 0.1).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between font-medium">
                            <span>Total Inflows</span>
                            <span>${financialSummary.revenue.current.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Cash Outflows</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Operational Expenses</span>
                            <span>${(financialSummary.expenses.current * 0.7).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Supplier Payments</span>
                            <span>${(financialSummary.expenses.current * 0.3).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between font-medium">
                            <span>Total Outflows</span>
                            <span>${financialSummary.expenses.current.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <div className="flex justify-between font-bold">
                          <span>Net Cash Flow</span>
                          <span>${financialSummary.profit.current.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground mt-1">
                          <span>Cash Flow Ratio</span>
                          <span>{((financialSummary.profit.current / financialSummary.revenue.current) * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Add Invoice Dialog */}
          <Dialog open={showAddInvoiceDialog} onOpenChange={setShowAddInvoiceDialog}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Create New Invoice</DialogTitle>
                <DialogDescription>
                  Enter the invoice details to create a new invoice.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">Client *</Label>
                    <Select 
                      value={newInvoice.client}
                      onValueChange={(value) => setNewInvoice({...newInvoice, client: value})}
                    >
                      <SelectTrigger id="client">
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        {users
                          .filter(user => user.role === "customer")
                          .map(client => (
                            <SelectItem key={client.id} value={client.company}>
                              {client.company}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select defaultValue="USD">
                      <SelectTrigger id="currency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="issueDate">Issue Date *</Label>
                    <Input 
                      id="issueDate" 
                      type="date"
                      value={newInvoice.issueDate}
                      onChange={(e) => setNewInvoice({...newInvoice, issueDate: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date *</Label>
                    <Input 
                      id="dueDate" 
                      type="date"
                      value={newInvoice.dueDate}
                      onChange={(e) => setNewInvoice({...newInvoice, dueDate: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Invoice Items *</Label>
                    <Button type="button" variant="outline" size="sm" onClick={handleAddInvoiceItem}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                  
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                      <div className="col-span-6">Description</div>
                      <div className="col-span-2">Quantity</div>
                      <div className="col-span-2">Unit Price</div>
                      <div className="col-span-1">Total</div>
                      <div className="col-span-1"></div>
                    </div>
                    
                    {newInvoice.items.map((item, index) => (
                      <div key={index} className="grid grid-cols-12 items-center border-b px-4 py-3">
                        <div className="col-span-6">
                          <Input 
                            value={item.description}
                            onChange={(e) => handleInvoiceItemChange(index, "description", e.target.value)}
                            placeholder="Item description"
                          />
                        </div>
                        <div className="col-span-2">
                          <Input 
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleInvoiceItemChange(index, "quantity", parseInt(e.target.value))}
                          />
                        </div>
                        <div className="col-span-2">
                          <Input 
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.unitPrice}
                            onChange={(e) => handleInvoiceItemChange(index, "unitPrice", parseFloat(e.target.value))}
                          />
                        </div>
                        <div className="col-span-1 font-medium">
                          ${(item.quantity * item.unitPrice).toLocaleString()}
                        </div>
                        <div className="col-span-1 text-right">
                          {newInvoice.items.length > 1 && (
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRemoveInvoiceItem(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    <div className="grid grid-cols-12 items-center px-4 py-3 bg-muted/50">
                      <div className="col-span-10 text-right font-medium">Total:</div>
                      <div className="col-span-2 font-bold">
                        ${newInvoice.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea 
                    id="notes" 
                    value={newInvoice.notes}
                    onChange={(e) => setNewInvoice({...newInvoice, notes: e.target.value})}
                    placeholder="Enter any additional notes for this invoice"
                    rows={3}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddInvoiceDialog(false)}>Cancel</Button>
                <Button onClick={handleAddInvoice}>Create Invoice</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Add Expense Dialog */}
          <Dialog open={showAddExpenseDialog} onOpenChange={setShowAddExpenseDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>
                  Enter the expense details to add a new expense.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select 
                      value={newExpense.category}
                      onValueChange={(value) => setNewExpense({...newExpense, category: value})}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                        <SelectItem value="Travel">Travel</SelectItem>
                        <SelectItem value="Software">Software</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount *</Label>
                    <Input 
                      id="amount" 
                      type="number"
                      min="0"
                      step="0.01"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input 
                      id="date" 
                      type="date"
                      value={newExpense.date}
                      onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vendor">Vendor *</Label>
                    <Input 
                      id="vendor" 
                      value={newExpense.vendor}
                      onChange={(e) => setNewExpense({...newExpense, vendor: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                    placeholder="Enter expense description"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="receipt">Receipt</Label>
                  <Input 
                    id="receipt" 
                    type="file"
                    onChange={handleFileChange}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Upload a receipt or invoice for this expense (PDF, JPG, PNG)</p>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddExpenseDialog(false)}>Cancel</Button>
                <Button onClick={handleAddExpense}>Add Expense</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Invoice Details Dialog */}
          {selectedInvoice && (
            <Dialog open={showInvoiceDetailsDialog} onOpenChange={setShowInvoiceDetailsDialog}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <div className="flex items-center justify-between">
                    <DialogTitle>Invoice {selectedInvoice.id}</DialogTitle>
                    <Badge variant={getStatusBadgeVariant(selectedInvoice.status)}>
                      {selectedInvoice.status.charAt(0).toUpperCase() + selectedInvoice.status.slice(1)}
                    </Badge>
                  </div>
                </DialogHeader>
                
                <div className="grid grid-cols-2 gap-6 py-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">From</h3>
                    <p className="font-medium">Trading Solutions Ltd</p>
                    <p className="text-sm">123 Business Street</p>
                    <p className="text-sm">Taipei, Taiwan</p>
                    <p className="text-sm">admin@tradingsolutions.com</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">To</h3>
                    <p className="font-medium">{selectedInvoice.client}</p>
                    <p className="text-sm">Client Address</p>
                    <p className="text-sm">City, Country</p>
                    <p className="text-sm">client@example.com</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-6 py-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Invoice Number</h3>
                    <p>{selectedInvoice.id}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Issue Date</h3>
                    <p>{formatDate(selectedInvoice.issueDate)}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Due Date</h3>
                    <p>{formatDate(selectedInvoice.dueDate)}</p>
                  </div>
                </div>
                
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                    <div className="col-span-6">Description</div>
                    <div className="col-span-2">Quantity</div>
                    <div className="col-span-2">Unit Price</div>
                    <div className="col-span-2">Total</div>
                  </div>
                  
                  {selectedInvoice.items.map((item: any, index: number) => (
                    <div key={index} className="grid grid-cols-12 items-center border-b px-4 py-3">
                      <div className="col-span-6">{item.description}</div>
                      <div className="col-span-2">{item.quantity}</div>
                      <div className="col-span-2">${item.unitPrice.toLocaleString()}</div>
                      <div className="col-span-2">${item.total.toLocaleString()}</div>
                    </div>
                  ))}
                  
                  <div className="grid grid-cols-12 items-center px-4 py-3 bg-muted/50">
                    <div className="col-span-10 text-right font-medium">Total:</div>
                    <div className="col-span-2 font-bold">
                      ${calculateInvoiceTotal(selectedInvoice.items).toLocaleString()}
                    </div>
                  </div>
                </div>
                
                {selectedInvoice.notes && (
                  <div className="py-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Notes</h3>
                    <p className="text-sm">{selectedInvoice.notes}</p>
                  </div>
                )}
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  {selectedInvoice.status === "pending" && (
                    <Button>
                      <Check className="h-4 w-4 mr-2" />
                      Mark as Paid
                    </Button>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </main>
      </div>
    </div>
  )
}