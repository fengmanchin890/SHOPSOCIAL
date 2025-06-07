"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  CreditCard, 
  Save, 
  X, 
  Calendar, 
  DollarSign,
  Building,
  User,
  FileText,
  ArrowRight,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { useB2B } from "@/components/store/B2BProvider"
import { useI18n } from "@/contexts/i18n-context"

export default function NewPaymentPage() {
  const router = useRouter()
  const { users, orders, processPayment } = useB2B()
  const { t } = useI18n()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentStep, setPaymentStep] = useState(1)
  
  // Payment form state
  const [payment, setPayment] = useState({
    orderId: "",
    fromUserId: "",
    toUserId: "",
    amount: 0,
    currency: "USD",
    method: "bank_transfer" as "bank_transfer" | "letter_credit" | "crypto",
    reference: "",
    notes: "",
  })
  
  // Bank transfer details
  const [bankDetails, setBankDetails] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
    swiftCode: "",
    routingNumber: "",
  })
  
  // Letter of credit details
  const [locDetails, setLocDetails] = useState({
    issuingBank: "",
    beneficiary: "",
    expiryDate: "",
    documentRequired: "",
  })
  
  // Get customers and suppliers from users
  const customers = users.filter(user => user.role === "customer")
  const suppliers = users.filter(user => user.role === "supplier")
  
  // Get unpaid orders
  const unpaidOrders = orders.filter(order => order.paymentStatus !== "paid")
  
  const handleNextStep = () => {
    // Validate current step
    if (paymentStep === 1) {
      if (!payment.orderId || !payment.fromUserId || !payment.toUserId || !payment.amount || !payment.currency || !payment.method) {
        alert("Please fill in all required fields")
        return
      }
    }
    
    if (paymentStep === 2) {
      if (payment.method === "bank_transfer") {
        if (!bankDetails.accountName || !bankDetails.accountNumber || !bankDetails.bankName) {
          alert("Please fill in all required bank details")
          return
        }
      } else if (payment.method === "letter_credit") {
        if (!locDetails.issuingBank || !locDetails.beneficiary || !locDetails.expiryDate) {
          alert("Please fill in all required letter of credit details")
          return
        }
      }
    }
    
    setPaymentStep(paymentStep + 1)
  }
  
  const handlePreviousStep = () => {
    setPaymentStep(paymentStep - 1)
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Process payment
      await processPayment({
        orderId: payment.orderId,
        fromUserId: payment.fromUserId,
        toUserId: payment.toUserId,
        amount: payment.amount,
        currency: payment.currency,
        method: payment.method,
      })
      
      // Show success message
      alert("Payment processed successfully!")
      
      // Redirect to payments page
      router.push("/store/b2b/payments")
    } catch (error) {
      console.error("Error processing payment:", error)
      alert("Failed to process payment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // When order is selected, auto-fill some fields
  const handleOrderChange = (orderId: string) => {
    const selectedOrder = orders.find(order => order.id === orderId)
    if (selectedOrder) {
      setPayment({
        ...payment,
        orderId,
        fromUserId: selectedOrder.customerId,
        toUserId: selectedOrder.supplierId,
        amount: selectedOrder.totalAmount,
        currency: selectedOrder.currency,
      })
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
              <h1 className="text-3xl font-bold">New Payment</h1>
              <p className="text-gray-500">Process a new payment transaction</p>
            </div>
            <Button variant="outline" onClick={() => router.push("/store/b2b/payments")}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-muted-foreground" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      paymentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                    }`}>
                      {paymentStep > 1 ? <Check className="h-5 w-5" /> : "1"}
                    </div>
                    <span className="text-sm mt-2">Basic Info</span>
                  </div>
                  <div className="flex-1 h-1 mx-2 bg-gray-200">
                    <div className={`h-full ${paymentStep >= 2 ? "bg-blue-600" : "bg-gray-200"}`} style={{ width: paymentStep >= 2 ? "100%" : "0%" }}></div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      paymentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                    }`}>
                      {paymentStep > 2 ? <Check className="h-5 w-5" /> : "2"}
                    </div>
                    <span className="text-sm mt-2">Payment Method</span>
                  </div>
                  <div className="flex-1 h-1 mx-2 bg-gray-200">
                    <div className={`h-full ${paymentStep >= 3 ? "bg-blue-600" : "bg-gray-200"}`} style={{ width: paymentStep >= 3 ? "100%" : "0%" }}></div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      paymentStep >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                    }`}>
                      3
                    </div>
                    <span className="text-sm mt-2">Confirmation</span>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleSubmit}>
                {/* Step 1: Basic Payment Information */}
                {paymentStep === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="order">Order *</Label>
                      <Select 
                        value={payment.orderId}
                        onValueChange={handleOrderChange}
                        required
                      >
                        <SelectTrigger id="order">
                          <SelectValue placeholder="Select order" />
                        </SelectTrigger>
                        <SelectContent>
                          {unpaidOrders.map(order => (
                            <SelectItem key={order.id} value={order.id}>
                              {order.id} - ${order.totalAmount.toLocaleString()} {order.currency}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="from">From (Payer) *</Label>
                        <Select 
                          value={payment.fromUserId}
                          onValueChange={(value) => setPayment({...payment, fromUserId: value})}
                          required
                        >
                          <SelectTrigger id="from">
                            <SelectValue placeholder="Select payer" />
                          </SelectTrigger>
                          <SelectContent>
                            {customers.map(customer => (
                              <SelectItem key={customer.id} value={customer.id}>
                                {customer.company}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="to">To (Payee) *</Label>
                        <Select 
                          value={payment.toUserId}
                          onValueChange={(value) => setPayment({...payment, toUserId: value})}
                          required
                        >
                          <SelectTrigger id="to">
                            <SelectValue placeholder="Select payee" />
                          </SelectTrigger>
                          <SelectContent>
                            {suppliers.map(supplier => (
                              <SelectItem key={supplier.id} value={supplier.id}>
                                {supplier.company}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount *</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                          <Input 
                            id="amount" 
                            type="number"
                            value={payment.amount || ""}
                            onChange={(e) => setPayment({...payment, amount: parseFloat(e.target.value) || 0})}
                            className="pl-10"
                            placeholder="Enter amount"
                            min="0.01"
                            step="0.01"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="currency">Currency *</Label>
                        <Select 
                          value={payment.currency}
                          onValueChange={(value) => setPayment({...payment, currency: value})}
                          required
                        >
                          <SelectTrigger id="currency">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD - US Dollar</SelectItem>
                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                            <SelectItem value="GBP">GBP - British Pound</SelectItem>
                            <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                            <SelectItem value="CNY">CNY - Chinese Yuan</SelectItem>
                            <SelectItem value="TWD">TWD - Taiwan Dollar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Payment Method *</Label>
                      <RadioGroup 
                        value={payment.method}
                        onValueChange={(value: "bank_transfer" | "letter_credit" | "crypto") => 
                          setPayment({...payment, method: value})
                        }
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        <div className="flex items-center space-x-2 border rounded-md p-4">
                          <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                          <Label htmlFor="bank_transfer" className="flex-1 cursor-pointer">
                            Bank Transfer
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-4">
                          <RadioGroupItem value="letter_credit" id="letter_credit" />
                          <Label htmlFor="letter_credit" className="flex-1 cursor-pointer">
                            Letter of Credit
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-4">
                          <RadioGroupItem value="crypto" id="crypto" />
                          <Label htmlFor="crypto" className="flex-1 cursor-pointer">
                            Cryptocurrency
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reference">Reference Number</Label>
                      <Input 
                        id="reference" 
                        value={payment.reference}
                        onChange={(e) => setPayment({...payment, reference: e.target.value})}
                        placeholder="Enter reference number (optional)"
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="button" onClick={handleNextStep}>
                        Next Step
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Payment Method Details */}
                {paymentStep === 2 && (
                  <div className="space-y-6">
                    {/* Bank Transfer Details */}
                    {payment.method === "bank_transfer" && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-medium">Bank Transfer Details</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="accountName">Account Name *</Label>
                            <Input 
                              id="accountName" 
                              value={bankDetails.accountName}
                              onChange={(e) => setBankDetails({...bankDetails, accountName: e.target.value})}
                              placeholder="Enter account name"
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="accountNumber">Account Number *</Label>
                            <Input 
                              id="accountNumber" 
                              value={bankDetails.accountNumber}
                              onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                              placeholder="Enter account number"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="bankName">Bank Name *</Label>
                            <Input 
                              id="bankName" 
                              value={bankDetails.bankName}
                              onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
                              placeholder="Enter bank name"
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="swiftCode">SWIFT/BIC Code</Label>
                            <Input 
                              id="swiftCode" 
                              value={bankDetails.swiftCode}
                              onChange={(e) => setBankDetails({...bankDetails, swiftCode: e.target.value})}
                              placeholder="Enter SWIFT/BIC code"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="routingNumber">Routing Number</Label>
                            <Input 
                              id="routingNumber" 
                              value={bankDetails.routingNumber}
                              onChange={(e) => setBankDetails({...bankDetails, routingNumber: e.target.value})}
                              placeholder="Enter routing number"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Letter of Credit Details */}
                    {payment.method === "letter_credit" && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-medium">Letter of Credit Details</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="issuingBank">Issuing Bank *</Label>
                            <Input 
                              id="issuingBank" 
                              value={locDetails.issuingBank}
                              onChange={(e) => setLocDetails({...locDetails, issuingBank: e.target.value})}
                              placeholder="Enter issuing bank name"
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="beneficiary">Beneficiary *</Label>
                            <Input 
                              id="beneficiary" 
                              value={locDetails.beneficiary}
                              onChange={(e) => setLocDetails({...locDetails, beneficiary: e.target.value})}
                              placeholder="Enter beneficiary name"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date *</Label>
                            <Input 
                              id="expiryDate" 
                              type="date"
                              value={locDetails.expiryDate}
                              onChange={(e) => setLocDetails({...locDetails, expiryDate: e.target.value})}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="documentRequired">Documents Required</Label>
                            <Input 
                              id="documentRequired" 
                              value={locDetails.documentRequired}
                              onChange={(e) => setLocDetails({...locDetails, documentRequired: e.target.value})}
                              placeholder="Enter required documents"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Cryptocurrency Details */}
                    {payment.method === "crypto" && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-medium">Cryptocurrency Payment</h3>
                        
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <p className="text-blue-800">
                            Cryptocurrency payments are processed through our secure crypto payment gateway. 
                            After clicking "Next Step", you will be provided with wallet addresses and payment instructions.
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Supported Cryptocurrencies</Label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            <div className="border rounded-md p-3 text-center">Bitcoin (BTC)</div>
                            <div className="border rounded-md p-3 text-center">Ethereum (ETH)</div>
                            <div className="border rounded-md p-3 text-center">USDT</div>
                            <div className="border rounded-md p-3 text-center">USDC</div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <Label htmlFor="notes">Payment Notes</Label>
                      <Textarea 
                        id="notes" 
                        value={payment.notes}
                        onChange={(e) => setPayment({...payment, notes: e.target.value})}
                        placeholder="Enter any additional notes or instructions"
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={handlePreviousStep}>
                        Back
                      </Button>
                      <Button type="button" onClick={handleNextStep}>
                        Next Step
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Step 3: Confirmation */}
                {paymentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Payment Confirmation</h3>
                    
                    <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Order</p>
                          <p className="font-medium">{payment.orderId}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Amount</p>
                          <p className="font-medium">${payment.amount.toLocaleString()} {payment.currency}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">From</p>
                          <p className="font-medium">{customers.find(c => c.id === payment.fromUserId)?.company || payment.fromUserId}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">To</p>
                          <p className="font-medium">{suppliers.find(s => s.id === payment.toUserId)?.company || payment.toUserId}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Payment Method</p>
                          <p className="font-medium">{payment.method.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Reference</p>
                          <p className="font-medium">{payment.reference || "N/A"}</p>
                        </div>
                      </div>
                      
                      {payment.method === "bank_transfer" && (
                        <div className="mt-4 pt-4 border-t">
                          <h4 className="font-medium mb-2">Bank Transfer Details</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Account Name</p>
                              <p className="font-medium">{bankDetails.accountName}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Account Number</p>
                              <p className="font-medium">{bankDetails.accountNumber}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Bank Name</p>
                              <p className="font-medium">{bankDetails.bankName}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">SWIFT/BIC Code</p>
                              <p className="font-medium">{bankDetails.swiftCode || "N/A"}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {payment.method === "letter_credit" && (
                        <div className="mt-4 pt-4 border-t">
                          <h4 className="font-medium mb-2">Letter of Credit Details</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Issuing Bank</p>
                              <p className="font-medium">{locDetails.issuingBank}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Beneficiary</p>
                              <p className="font-medium">{locDetails.beneficiary}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Expiry Date</p>
                              <p className="font-medium">{locDetails.expiryDate}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Documents Required</p>
                              <p className="font-medium">{locDetails.documentRequired || "N/A"}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {payment.notes && (
                        <div className="mt-4 pt-4 border-t">
                          <h4 className="font-medium mb-2">Notes</h4>
                          <p>{payment.notes}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-yellow-800 text-sm">
                        Please review the payment details carefully before proceeding. Once submitted, this payment will be processed and cannot be easily reversed.
                      </p>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={handlePreviousStep}>
                        Back
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin mr-2">⟳</span>
                            Processing...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Process Payment
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}