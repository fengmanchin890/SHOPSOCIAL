"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "supplier" | "middleman" | "customer"
  company: string
  country: string
  verified: boolean
  avatar?: string
}

interface Product {
  id: string
  name: string
  category: string
  description: string
  image: string
  specifications: Record<string, string>
  moq: number // Minimum Order Quantity
  leadTime: number // days
  supplierId: string
}

interface Quote {
  id: string
  productId: string
  supplierId: string
  middlemanId?: string
  customerId?: string
  quantity: number
  costPrice: number // Supplier's cost price
  sellingPrice?: number // Middleman's price to customer
  margin?: number // Middleman's markup percentage
  currency: string
  terms: "EXW" | "FOB" | "CIF" | "DDP"
  validUntil: number
  status: "draft" | "sent" | "accepted" | "rejected" | "expired"
  notes?: string
  createdAt: number
}

interface Order {
  id: string
  quoteId: string
  customerId: string
  middlemanId: string
  supplierId: string
  status: "pending" | "confirmed" | "paid" | "shipped" | "delivered" | "completed"
  totalAmount: number
  currency: string
  paymentStatus: "pending" | "paid" | "partial"
  shippingAddress: Address
  documents: Document[]
  timeline: OrderEvent[]
  createdAt: number
}

interface Address {
  company: string
  street: string
  city: string
  state: string
  country: string
  postalCode: string
  contact: string
  phone: string
}

interface Document {
  id: string
  type: "proforma_invoice" | "commercial_invoice" | "packing_list" | "bill_of_lading" | "certificate_origin"
  issuedBy: string
  sentTo: string
  url: string
  createdAt: number
}

interface OrderEvent {
  id: string
  type: "created" | "quote_sent" | "payment_received" | "shipped" | "delivered"
  description: string
  timestamp: number
  userId: string
}

interface Payment {
  id: string
  orderId: string
  fromUserId: string
  toUserId: string
  amount: number
  currency: string
  status: "pending" | "completed" | "failed"
  method: "bank_transfer" | "letter_credit" | "crypto"
  timestamp: number
}

interface B2BContextType {
  currentUser: User | null
  users: User[]
  products: Product[]
  quotes: Quote[]
  orders: Order[]
  payments: Payment[]

  // User Management
  setCurrentUser: (user: User) => void
  registerUser: (userData: Omit<User, "id" | "verified">) => Promise<string>
  verifyUser: (userId: string) => void

  // Product Management
  addProduct: (product: Omit<Product, "id">) => string
  updateProduct: (productId: string, updates: Partial<Product>) => void

  // Quote Management
  createQuote: (quoteData: Omit<Quote, "id" | "createdAt" | "status">) => string
  updateQuote: (quoteId: string, updates: Partial<Quote>) => void
  sendQuote: (quoteId: string, recipientId: string) => void
  acceptQuote: (quoteId: string) => string // Returns order ID

  // Order Management
  createOrder: (orderData: Omit<Order, "id" | "createdAt" | "timeline">) => string
  updateOrderStatus: (orderId: string, status: Order["status"]) => void
  addOrderEvent: (orderId: string, event: Omit<OrderEvent, "id">) => void

  // Document Management
  generateDocument: (orderId: string, type: Document["type"]) => Promise<string>

  // Payment Management
  processPayment: (paymentData: Omit<Payment, "id" | "timestamp" | "status">) => Promise<string>

  // Analytics
  getProfitAnalysis: (middlemanId: string) => {
    totalRevenue: number
    totalCost: number
    profit: number
    margin: number
    orderCount: number
  }

  // Notifications
  getNotifications: (userId: string) => Array<{
    id: string
    type: string
    message: string
    timestamp: number
    read: boolean
  }>
}

const B2BContext = createContext<B2BContextType | undefined>(undefined)

export function B2BProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: "user-middleman-1",
    name: "Trading Solutions Ltd",
    email: "admin@tradingsolutions.com",
    role: "middleman",
    company: "Trading Solutions Ltd",
    country: "Taiwan",
    verified: true,
    avatar: "/placeholder.svg?height=40&width=40",
  })

  const [users, setUsers] = useState<User[]>([
    {
      id: "user-supplier-1",
      name: "Global Manufacturing Co",
      email: "sales@globalmanuf.com",
      role: "supplier",
      company: "Global Manufacturing Co",
      country: "China",
      verified: true,
    },
    {
      id: "user-supplier-2",
      name: "Tech Components Ltd",
      email: "info@techcomponents.com",
      role: "supplier",
      company: "Tech Components Ltd",
      country: "South Korea",
      verified: true,
    },
    {
      id: "user-customer-1",
      name: "Import Solutions Inc",
      email: "purchasing@importsolutions.com",
      role: "customer",
      company: "Import Solutions Inc",
      country: "United States",
      verified: true,
    },
    {
      id: "user-customer-2",
      name: "European Distributors",
      email: "orders@eudist.com",
      role: "customer",
      company: "European Distributors",
      country: "Germany",
      verified: true,
    },
  ])

  const [products, setProducts] = useState<Product[]>([
    {
      id: "prod-1",
      name: "Wireless Bluetooth Headphones",
      category: "Electronics",
      description: "High-quality wireless headphones with noise cancellation",
      image: "/placeholder.svg?height=300&width=300",
      specifications: {
        "Battery Life": "30 hours",
        Connectivity: "Bluetooth 5.0",
        Weight: "250g",
        "Color Options": "Black, White, Blue",
      },
      moq: 100,
      leadTime: 15,
      supplierId: "user-supplier-1",
    },
    {
      id: "prod-2",
      name: "Smart Watch Series X",
      category: "Electronics",
      description: "Advanced smartwatch with health monitoring features",
      image: "/placeholder.svg?height=300&width=300",
      specifications: {
        Display: "1.4 inch AMOLED",
        Battery: "7 days",
        "Water Resistance": "IP68",
        Sensors: "Heart rate, GPS, Accelerometer",
      },
      moq: 50,
      leadTime: 20,
      supplierId: "user-supplier-2",
    },
  ])

  const [quotes, setQuotes] = useState<Quote[]>([
    {
      id: "quote-1",
      productId: "prod-1",
      supplierId: "user-supplier-1",
      middlemanId: "user-middleman-1",
      customerId: "user-customer-1",
      quantity: 500,
      costPrice: 25.0,
      sellingPrice: 35.0,
      margin: 40,
      currency: "USD",
      terms: "FOB",
      validUntil: Date.now() + 7 * 24 * 60 * 60 * 1000,
      status: "sent",
      createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    },
    {
      id: "quote-2",
      productId: "prod-2",
      supplierId: "user-supplier-2",
      middlemanId: "user-middleman-1",
      quantity: 200,
      costPrice: 80.0,
      currency: "USD",
      terms: "EXW",
      validUntil: Date.now() + 5 * 24 * 60 * 60 * 1000,
      status: "draft",
      createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    },
  ])

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "order-1",
      quoteId: "quote-1",
      customerId: "user-customer-1",
      middlemanId: "user-middleman-1",
      supplierId: "user-supplier-1",
      status: "confirmed",
      totalAmount: 17500,
      currency: "USD",
      paymentStatus: "paid",
      shippingAddress: {
        company: "Import Solutions Inc",
        street: "123 Business Ave",
        city: "New York",
        state: "NY",
        country: "United States",
        postalCode: "10001",
        contact: "John Smith",
        phone: "+1-555-0123",
      },
      documents: [],
      timeline: [
        {
          id: "event-1",
          type: "created",
          description: "Order created from accepted quote",
          timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
          userId: "user-customer-1",
        },
        {
          id: "event-2",
          type: "payment_received",
          description: "Payment received from customer",
          timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
          userId: "user-middleman-1",
        },
      ],
      createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
    },
  ])

  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "payment-1",
      orderId: "order-1",
      fromUserId: "user-customer-1",
      toUserId: "user-middleman-1",
      amount: 17500,
      currency: "USD",
      status: "completed",
      method: "bank_transfer",
      timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
    },
  ])

  const registerUser = async (userData: Omit<User, "id" | "verified">): Promise<string> => {
    const newUser: User = {
      ...userData,
      id: `user-${userData.role}-${Date.now()}`,
      verified: false,
    }

    setUsers((prev) => [...prev, newUser])
    return newUser.id
  }

  const verifyUser = (userId: string) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, verified: true } : user)))
  }

  const addProduct = (product: Omit<Product, "id">): string => {
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`,
    }

    setProducts((prev) => [...prev, newProduct])
    return newProduct.id
  }

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((product) => (product.id === productId ? { ...product, ...updates } : product)))
  }

  const createQuote = (quoteData: Omit<Quote, "id" | "createdAt" | "status">): string => {
    const newQuote: Quote = {
      ...quoteData,
      id: `quote-${Date.now()}`,
      status: "draft",
      createdAt: Date.now(),
    }

    setQuotes((prev) => [...prev, newQuote])
    return newQuote.id
  }

  const updateQuote = (quoteId: string, updates: Partial<Quote>) => {
    setQuotes((prev) => prev.map((quote) => (quote.id === quoteId ? { ...quote, ...updates } : quote)))
  }

  const sendQuote = (quoteId: string, recipientId: string) => {
    updateQuote(quoteId, { status: "sent" })
  }

  const acceptQuote = (quoteId: string): string => {
    const quote = quotes.find((q) => q.id === quoteId)
    if (!quote) throw new Error("Quote not found")

    updateQuote(quoteId, { status: "accepted" })

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      quoteId,
      customerId: quote.customerId!,
      middlemanId: quote.middlemanId!,
      supplierId: quote.supplierId,
      status: "pending",
      totalAmount: (quote.sellingPrice || quote.costPrice) * quote.quantity,
      currency: quote.currency,
      paymentStatus: "pending",
      shippingAddress: {
        company: "",
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        contact: "",
        phone: "",
      },
      documents: [],
      timeline: [
        {
          id: `event-${Date.now()}`,
          type: "created",
          description: "Order created from accepted quote",
          timestamp: Date.now(),
          userId: quote.customerId!,
        },
      ],
      createdAt: Date.now(),
    }

    setOrders((prev) => [...prev, newOrder])
    return newOrder.id
  }

  const createOrder = (orderData: Omit<Order, "id" | "createdAt" | "timeline">): string => {
    const newOrder: Order = {
      ...orderData,
      id: `order-${Date.now()}`,
      timeline: [
        {
          id: `event-${Date.now()}`,
          type: "created",
          description: "Order created",
          timestamp: Date.now(),
          userId: orderData.customerId,
        },
      ],
      createdAt: Date.now(),
    }

    setOrders((prev) => [...prev, newOrder])
    return newOrder.id
  }

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)))
  }

  const addOrderEvent = (orderId: string, event: Omit<OrderEvent, "id">) => {
    const newEvent: OrderEvent = {
      ...event,
      id: `event-${Date.now()}`,
    }

    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, timeline: [...order.timeline, newEvent] } : order)),
    )
  }

  const generateDocument = async (orderId: string, type: Document["type"]): Promise<string> => {
    // Simulate document generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newDocument: Document = {
      id: `doc-${Date.now()}`,
      type,
      issuedBy: currentUser?.id || "",
      sentTo: "",
      url: `/documents/${type}-${orderId}.pdf`,
      createdAt: Date.now(),
    }

    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, documents: [...order.documents, newDocument] } : order)),
    )

    return newDocument.url
  }

  const processPayment = async (paymentData: Omit<Payment, "id" | "timestamp" | "status">): Promise<string> => {
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const newPayment: Payment = {
      ...paymentData,
      id: `payment-${Date.now()}`,
      status: "completed",
      timestamp: Date.now(),
    }

    setPayments((prev) => [...prev, newPayment])

    // Update order payment status
    setOrders((prev) =>
      prev.map((order) => (order.id === paymentData.orderId ? { ...order, paymentStatus: "paid" } : order)),
    )

    return newPayment.id
  }

  const getProfitAnalysis = (middlemanId: string) => {
    const middlemanOrders = orders.filter((order) => order.middlemanId === middlemanId)
    const middlemanQuotes = quotes.filter((quote) => quote.middlemanId === middlemanId)

    const totalRevenue = middlemanOrders.reduce((sum, order) => sum + order.totalAmount, 0)

    const totalCost = middlemanOrders.reduce((sum, order) => {
      const quote = middlemanQuotes.find((q) => q.id === order.quoteId)
      return sum + (quote ? quote.costPrice * quote.quantity : 0)
    }, 0)

    const profit = totalRevenue - totalCost
    const margin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0

    return {
      totalRevenue,
      totalCost,
      profit,
      margin,
      orderCount: middlemanOrders.length,
    }
  }

  const getNotifications = (userId: string) => {
    const notifications = []

    // Quote expiration notifications
    quotes.forEach((quote) => {
      if (quote.validUntil < Date.now() + 24 * 60 * 60 * 1000 && quote.status === "sent") {
        notifications.push({
          id: `notif-quote-${quote.id}`,
          type: "quote_expiring",
          message: `Quote ${quote.id} expires in less than 24 hours`,
          timestamp: Date.now(),
          read: false,
        })
      }
    })

    // Payment notifications
    orders.forEach((order) => {
      if (order.paymentStatus === "pending" && order.status === "confirmed") {
        notifications.push({
          id: `notif-payment-${order.id}`,
          type: "payment_pending",
          message: `Payment pending for order ${order.id}`,
          timestamp: Date.now(),
          read: false,
        })
      }
    })

    return notifications
  }

  return (
    <B2BContext.Provider
      value={{
        currentUser,
        users,
        products,
        quotes,
        orders,
        payments,
        setCurrentUser,
        registerUser,
        verifyUser,
        addProduct,
        updateProduct,
        createQuote,
        updateQuote,
        sendQuote,
        acceptQuote,
        createOrder,
        updateOrderStatus,
        addOrderEvent,
        generateDocument,
        processPayment,
        getProfitAnalysis,
        getNotifications,
      }}
    >
      {children}
    </B2BContext.Provider>
  )
}

export function useB2B() {
  const context = useContext(B2BContext)
  if (context === undefined) {
    throw new Error("useB2B must be used within a B2BProvider")
  }
  return context
}
