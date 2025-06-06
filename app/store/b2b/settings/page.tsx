"use client"

import { useState } from "react"
import { 
  Settings as SettingsIcon, 
  User, 
  Building, 
  CreditCard, 
  Bell, 
  Lock, 
  Globe, 
  Mail, 
  Smartphone, 
  Save,
  Users,
  FileText,
  Database,
  Shield,
  RefreshCw,
  HelpCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { useI18n } from "@/contexts/i18n-context"

export default function SettingsPage() {
  const { t } = useI18n()
  const [activeTab, setActiveTab] = useState("profile")
  
  // Company profile state
  const [companyProfile, setCompanyProfile] = useState({
    name: "Trading Solutions Ltd",
    email: "admin@tradingsolutions.com",
    phone: "+886 2 1234 5678",
    website: "www.tradingsolutions.com",
    address: "No. 123, Section 1, Taipei City, Taiwan",
    description: "International trading company specializing in electronics and consumer goods.",
    taxId: "12345678",
    logo: null as File | null,
  })
  
  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    quoteRequests: true,
    paymentNotifications: true,
    systemUpdates: false,
    marketingEmails: false,
  })
  
  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
    ipRestriction: false,
  })
  
  // Integration settings state
  const [integrationSettings, setIntegrationSettings] = useState({
    erp: "",
    crm: "",
    accounting: "",
    shipping: "",
    apiKey: "sk_test_abcdefghijklmnopqrstuvwxyz123456",
    webhookUrl: "",
  })
  
  // Team members state
  const [teamMembers, setTeamMembers] = useState([
    {
      id: "1",
      name: "John Smith",
      email: "john@tradingsolutions.com",
      role: "Admin",
      status: "active",
    },
    {
      id: "2",
      name: "Jane Doe",
      email: "jane@tradingsolutions.com",
      role: "Manager",
      status: "active",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@tradingsolutions.com",
      role: "Staff",
      status: "inactive",
    },
  ])
  
  // New team member state
  const [newTeamMember, setNewTeamMember] = useState({
    name: "",
    email: "",
    role: "",
  })
  
  // Document templates state
  const [documentTemplates, setDocumentTemplates] = useState({
    quoteTemplate: "default",
    invoiceTemplate: "default",
    purchaseOrderTemplate: "default",
    packingListTemplate: "default",
  })
  
  const handleSaveCompanyProfile = () => {
    alert("Company profile saved successfully!")
  }
  
  const handleSaveNotificationSettings = () => {
    alert("Notification settings saved successfully!")
  }
  
  const handleSaveSecuritySettings = () => {
    alert("Security settings saved successfully!")
  }
  
  const handleSaveIntegrationSettings = () => {
    alert("Integration settings saved successfully!")
  }
  
  const handleAddTeamMember = () => {
    if (!newTeamMember.name || !newTeamMember.email || !newTeamMember.role) {
      alert("Please fill in all required fields")
      return
    }
    
    const newMember = {
      id: (teamMembers.length + 1).toString(),
      name: newTeamMember.name,
      email: newTeamMember.email,
      role: newTeamMember.role,
      status: "active",
    }
    
    setTeamMembers([...teamMembers, newMember])
    setNewTeamMember({
      name: "",
      email: "",
      role: "",
    })
    
    alert("Team member added successfully!")
  }
  
  const handleSaveDocumentTemplates = () => {
    alert("Document templates saved successfully!")
  }
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCompanyProfile({
        ...companyProfile,
        logo: e.target.files[0],
      })
    }
  }
  
  const regenerateApiKey = () => {
    const newApiKey = "sk_test_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    setIntegrationSettings({
      ...integrationSettings,
      apiKey: newApiKey,
    })
    alert("API key regenerated successfully!")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      
      <div className="flex flex-1">
        <DashboardNav />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">{t("settings")}</h1>
              <p className="text-gray-500">Manage your B2B platform settings</p>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
              <TabsTrigger value="profile" className="flex items-center">
                <Building className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Company Profile</span>
                <span className="md:hidden">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="team" className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Team Members</span>
                <span className="md:hidden">Team</span>
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Document Templates</span>
                <span className="md:hidden">Docs</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center">
                <Bell className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Notifications</span>
                <span className="md:hidden">Alerts</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Security</span>
                <span className="md:hidden">Security</span>
              </TabsTrigger>
              <TabsTrigger value="integrations" className="flex items-center">
                <Database className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Integrations</span>
                <span className="md:hidden">API</span>
              </TabsTrigger>
              <TabsTrigger value="help" className="flex items-center">
                <HelpCircle className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Help & Support</span>
                <span className="md:hidden">Help</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Company Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Company Profile</CardTitle>
                  <CardDescription>
                    Manage your company information and branding
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input 
                        id="company-name" 
                        value={companyProfile.name}
                        onChange={(e) => setCompanyProfile({...companyProfile, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tax-id">Tax ID / Business Registration Number</Label>
                      <Input 
                        id="tax-id" 
                        value={companyProfile.taxId}
                        onChange={(e) => setCompanyProfile({...companyProfile, taxId: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company-email">Email Address</Label>
                      <Input 
                        id="company-email" 
                        type="email"
                        value={companyProfile.email}
                        onChange={(e) => setCompanyProfile({...companyProfile, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-phone">Phone Number</Label>
                      <Input 
                        id="company-phone" 
                        value={companyProfile.phone}
                        onChange={(e) => setCompanyProfile({...companyProfile, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company-website">Website</Label>
                    <Input 
                      id="company-website" 
                      value={companyProfile.website}
                      onChange={(e) => setCompanyProfile({...companyProfile, website: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company-address">Address</Label>
                    <Textarea 
                      id="company-address" 
                      value={companyProfile.address}
                      onChange={(e) => setCompanyProfile({...companyProfile, address: e.target.value})}
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company-description">Company Description</Label>
                    <Textarea 
                      id="company-description" 
                      value={companyProfile.description}
                      onChange={(e) => setCompanyProfile({...companyProfile, description: e.target.value})}
                      rows={4}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company-logo">Company Logo</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-20 w-20 bg-gray-100 rounded-md flex items-center justify-center">
                        {companyProfile.logo ? (
                          <img 
                            src={URL.createObjectURL(companyProfile.logo)} 
                            alt="Company Logo" 
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <Building className="h-10 w-10 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <Input 
                          id="company-logo" 
                          type="file" 
                          accept="image/*"
                          onChange={handleLogoChange}
                        />
                        <p className="text-xs text-gray-500 mt-1">Recommended size: 200x200px. Max file size: 2MB.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveCompanyProfile}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Team Members Tab */}
            <TabsContent value="team">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>
                    Manage users who have access to your B2B platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                      <div className="col-span-4">Name</div>
                      <div className="col-span-4">Email</div>
                      <div className="col-span-2">Role</div>
                      <div className="col-span-2">{t("status")}</div>
                    </div>
                    
                    {teamMembers.map((member) => (
                      <div key={member.id} className="grid grid-cols-12 items-center border-b px-4 py-3 hover:bg-muted/50">
                        <div className="col-span-4 font-medium">{member.name}</div>
                        <div className="col-span-4">{member.email}</div>
                        <div className="col-span-2">{member.role}</div>
                        <div className="col-span-2">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            member.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}>
                            {member.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Add Team Member</CardTitle>
                  <CardDescription>
                    Invite a new user to your B2B platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="member-name">Name</Label>
                      <Input 
                        id="member-name" 
                        value={newTeamMember.name}
                        onChange={(e) => setNewTeamMember({...newTeamMember, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="member-email">Email</Label>
                      <Input 
                        id="member-email" 
                        type="email"
                        value={newTeamMember.email}
                        onChange={(e) => setNewTeamMember({...newTeamMember, email: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="member-role">Role</Label>
                    <Select 
                      value={newTeamMember.role}
                      onValueChange={(value) => setNewTeamMember({...newTeamMember, role: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
                        <SelectItem value="Staff">Staff</SelectItem>
                        <SelectItem value="Viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleAddTeamMember}>
                    Add Team Member
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Document Templates Tab */}
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Document Templates</CardTitle>
                  <CardDescription>
                    Customize templates for quotes, invoices, and other documents
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="quote-template">Quote Template</Label>
                    <Select 
                      value={documentTemplates.quoteTemplate}
                      onValueChange={(value) => setDocumentTemplates({...documentTemplates, quoteTemplate: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default Template</SelectItem>
                        <SelectItem value="professional">Professional Template</SelectItem>
                        <SelectItem value="minimal">Minimal Template</SelectItem>
                        <SelectItem value="detailed">Detailed Template</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="invoice-template">Invoice Template</Label>
                    <Select 
                      value={documentTemplates.invoiceTemplate}
                      onValueChange={(value) => setDocumentTemplates({...documentTemplates, invoiceTemplate: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default Template</SelectItem>
                        <SelectItem value="professional">Professional Template</SelectItem>
                        <SelectItem value="minimal">Minimal Template</SelectItem>
                        <SelectItem value="detailed">Detailed Template</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="purchase-order-template">Purchase Order Template</Label>
                    <Select 
                      value={documentTemplates.purchaseOrderTemplate}
                      onValueChange={(value) => setDocumentTemplates({...documentTemplates, purchaseOrderTemplate: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default Template</SelectItem>
                        <SelectItem value="professional">Professional Template</SelectItem>
                        <SelectItem value="minimal">Minimal Template</SelectItem>
                        <SelectItem value="detailed">Detailed Template</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="packing-list-template">Packing List Template</Label>
                    <Select 
                      value={documentTemplates.packingListTemplate}
                      onValueChange={(value) => setDocumentTemplates({...documentTemplates, packingListTemplate: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default Template</SelectItem>
                        <SelectItem value="professional">Professional Template</SelectItem>
                        <SelectItem value="minimal">Minimal Template</SelectItem>
                        <SelectItem value="detailed">Detailed Template</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-2">Template Customization</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      You can customize the appearance of your documents by selecting different templates. Each template has a different layout and style.
                    </p>
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Preview Templates
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveDocumentTemplates}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Configure how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch 
                        id="email-notifications" 
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="order-updates">Order Updates</Label>
                        <p className="text-sm text-muted-foreground">Notifications about order status changes</p>
                      </div>
                      <Switch 
                        id="order-updates" 
                        checked={notificationSettings.orderUpdates}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, orderUpdates: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="quote-requests">Quote Requests</Label>
                        <p className="text-sm text-muted-foreground">Notifications about new quote requests</p>
                      </div>
                      <Switch 
                        id="quote-requests" 
                        checked={notificationSettings.quoteRequests}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, quoteRequests: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="payment-notifications">Payment Notifications</Label>
                        <p className="text-sm text-muted-foreground">Notifications about payments received or due</p>
                      </div>
                      <Switch 
                        id="payment-notifications" 
                        checked={notificationSettings.paymentNotifications}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, paymentNotifications: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="system-updates">System Updates</Label>
                        <p className="text-sm text-muted-foreground">Notifications about platform updates and maintenance</p>
                      </div>
                      <Switch 
                        id="system-updates" 
                        checked={notificationSettings.systemUpdates}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, systemUpdates: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketing-emails">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">Receive promotional emails and newsletters</p>
                      </div>
                      <Switch 
                        id="marketing-emails" 
                        checked={notificationSettings.marketingEmails}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, marketingEmails: checked})}
                      />
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-2">Notification Delivery Methods</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="delivery-email" checked readOnly />
                        <Label htmlFor="delivery-email">Email</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="delivery-dashboard" checked readOnly />
                        <Label htmlFor="delivery-dashboard">Dashboard</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="delivery-sms" disabled />
                        <Label htmlFor="delivery-sms" className="text-gray-500">SMS (Coming Soon)</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="delivery-mobile" disabled />
                        <Label htmlFor="delivery-mobile" className="text-gray-500">Mobile Push (Coming Soon)</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveNotificationSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Configure security options for your B2B platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor-auth">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Require a verification code in addition to password</p>
                    </div>
                    <Switch 
                      id="two-factor-auth" 
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Select 
                      value={securitySettings.sessionTimeout}
                      onValueChange={(value) => setSecuritySettings({...securitySettings, sessionTimeout: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="240">4 hours</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">Automatically log out users after period of inactivity</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                    <Select 
                      value={securitySettings.passwordExpiry}
                      onValueChange={(value) => setSecuritySettings({...securitySettings, passwordExpiry: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">Force password change after specified period</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="ip-restriction">IP Address Restriction</Label>
                      <p className="text-sm text-muted-foreground">Limit access to specific IP addresses</p>
                    </div>
                    <Switch 
                      id="ip-restriction" 
                      checked={securitySettings.ipRestriction}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, ipRestriction: checked})}
                    />
                  </div>
                  
                  {securitySettings.ipRestriction && (
                    <div className="space-y-2">
                      <Label htmlFor="allowed-ips">Allowed IP Addresses</Label>
                      <Textarea 
                        id="allowed-ips" 
                        placeholder="Enter IP addresses, one per line"
                        rows={3}
                      />
                      <p className="text-xs text-gray-500">Enter IP addresses or CIDR ranges, one per line</p>
                    </div>
                  )}
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-2">Security Recommendations</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Enable two-factor authentication for all admin accounts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Set a reasonable session timeout to prevent unauthorized access</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Regularly review user access and permissions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Use strong, unique passwords for all accounts</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveSecuritySettings}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Integrations Tab */}
            <TabsContent value="integrations">
              <Card>
                <CardHeader>
                  <CardTitle>Integrations & API</CardTitle>
                  <CardDescription>
                    Connect your B2B platform with other business systems
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="erp-integration">ERP System</Label>
                      <Select 
                        value={integrationSettings.erp}
                        onValueChange={(value) => setIntegrationSettings({...integrationSettings, erp: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select ERP system" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sap">SAP</SelectItem>
                          <SelectItem value="oracle">Oracle</SelectItem>
                          <SelectItem value="microsoft">Microsoft Dynamics</SelectItem>
                          <SelectItem value="netsuite">NetSuite</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="crm-integration">CRM System</Label>
                      <Select 
                        value={integrationSettings.crm}
                        onValueChange={(value) => setIntegrationSettings({...integrationSettings, crm: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select CRM system" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="salesforce">Salesforce</SelectItem>
                          <SelectItem value="hubspot">HubSpot</SelectItem>
                          <SelectItem value="zoho">Zoho CRM</SelectItem>
                          <SelectItem value="dynamics">Microsoft Dynamics</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="accounting-integration">Accounting System</Label>
                      <Select 
                        value={integrationSettings.accounting}
                        onValueChange={(value) => setIntegrationSettings({...integrationSettings, accounting: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select accounting system" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quickbooks">QuickBooks</SelectItem>
                          <SelectItem value="xero">Xero</SelectItem>
                          <SelectItem value="sage">Sage</SelectItem>
                          <SelectItem value="freshbooks">FreshBooks</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="shipping-integration">Shipping Provider</Label>
                      <Select 
                        value={integrationSettings.shipping}
                        onValueChange={(value) => setIntegrationSettings({...integrationSettings, shipping: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select shipping provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fedex">FedEx</SelectItem>
                          <SelectItem value="ups">UPS</SelectItem>
                          <SelectItem value="dhl">DHL</SelectItem>
                          <SelectItem value="usps">USPS</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="api-key">API Key</Label>
                      <Button variant="outline" size="sm" onClick={regenerateApiKey}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Regenerate
                      </Button>
                    </div>
                    <div className="relative">
                      <Input 
                        id="api-key" 
                        value={integrationSettings.apiKey}
                        readOnly
                        type="password"
                      />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => {
                          navigator.clipboard.writeText(integrationSettings.apiKey)
                          alert("API key copied to clipboard!")
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">Your API key provides access to the B2B platform API. Keep it secure.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input 
                      id="webhook-url" 
                      value={integrationSettings.webhookUrl}
                      onChange={(e) => setIntegrationSettings({...integrationSettings, webhookUrl: e.target.value})}
                      placeholder="https://your-domain.com/webhook"
                    />
                    <p className="text-xs text-gray-500">URL to receive webhook notifications for events like new orders, quote responses, etc.</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-2">Available API Endpoints</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs">/api/v1/products</code>
                        <span className="text-green-600">GET, POST</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs">/api/v1/orders</code>
                        <span className="text-green-600">GET, POST, PUT</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs">/api/v1/quotes</code>
                        <span className="text-green-600">GET, POST, PUT</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs">/api/v1/customers</code>
                        <span className="text-green-600">GET, POST</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm">
                        View API Documentation
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveIntegrationSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Help & Support Tab */}
            <TabsContent value="help">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Help & Documentation</CardTitle>
                    <CardDescription>
                      Resources to help you use the B2B platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-blue-600" />
                        User Guides
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Comprehensive guides for using all features of the B2B platform
                      </p>
                      <Button variant="outline" size="sm">View User Guides</Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center">
                        <HelpCircle className="h-5 w-5 mr-2 text-purple-600" />
                        FAQs
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Answers to commonly asked questions about the platform
                      </p>
                      <Button variant="outline" size="sm">View FAQs</Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center">
                        <Globe className="h-5 w-5 mr-2 text-green-600" />
                        API Documentation
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Technical documentation for developers integrating with our API
                      </p>
                      <Button variant="outline" size="sm">View API Docs</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Support</CardTitle>
                    <CardDescription>
                      Get help from our support team
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="support-subject">Subject</Label>
                      <Input id="support-subject" placeholder="Enter the subject of your inquiry" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="support-message">Message</Label>
                      <Textarea 
                        id="support-message" 
                        placeholder="Describe your issue or question in detail"
                        rows={5}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="support-attachments">Attachments (optional)</Label>
                      <Input id="support-attachments" type="file" multiple />
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium mb-2">Support Hours</h3>
                      <p className="text-sm text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM (GMT+8)
                      </p>
                      <p className="text-sm text-gray-600">
                        Expected response time: Within 24 hours
                      </p>
                    </div>
                    
                    <Button className="w-full">
                      Submit Support Request
                    </Button>
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