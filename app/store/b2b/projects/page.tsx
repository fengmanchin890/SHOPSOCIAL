"use client"

import { useState } from "react"
import { 
  Briefcase, 
  Search, 
  Plus, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  FileText,
  MessageSquare,
  Edit,
  Trash2,
  Filter,
  Download
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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

// Mock project data
const mockProjects = [
  {
    id: "proj-001",
    name: "Global Expansion Strategy",
    client: "Import Solutions Inc",
    clientId: "user-customer-1",
    startDate: new Date("2024-06-01").getTime(),
    endDate: new Date("2024-09-30").getTime(),
    status: "in-progress",
    progress: 45,
    priority: "high",
    team: ["user-middleman-1"],
    description: "Develop a comprehensive strategy for expanding into European markets",
    tasks: [
      { id: "task-001", name: "Market Research", status: "completed", assignee: "user-middleman-1", dueDate: new Date("2024-06-15").getTime() },
      { id: "task-002", name: "Competitor Analysis", status: "completed", assignee: "user-middleman-1", dueDate: new Date("2024-06-30").getTime() },
      { id: "task-003", name: "Strategy Document", status: "in-progress", assignee: "user-middleman-1", dueDate: new Date("2024-07-15").getTime() },
      { id: "task-004", name: "Client Presentation", status: "not-started", assignee: "user-middleman-1", dueDate: new Date("2024-07-30").getTime() },
    ],
    milestones: [
      { id: "ms-001", name: "Research Phase Complete", dueDate: new Date("2024-06-30").getTime(), completed: true },
      { id: "ms-002", name: "Strategy Draft", dueDate: new Date("2024-07-15").getTime(), completed: false },
      { id: "ms-003", name: "Final Presentation", dueDate: new Date("2024-08-15").getTime(), completed: false },
    ],
    comments: [
      { id: "com-001", userId: "user-customer-1", text: "Looking forward to the initial findings", timestamp: new Date("2024-06-10").getTime() },
      { id: "com-002", userId: "user-middleman-1", text: "Research phase is progressing well, we've identified key markets", timestamp: new Date("2024-06-12").getTime() },
    ],
    documents: [
      { id: "doc-001", name: "Initial Research.pdf", uploadedBy: "user-middleman-1", timestamp: new Date("2024-06-05").getTime() },
      { id: "doc-002", name: "Competitor Analysis.xlsx", uploadedBy: "user-middleman-1", timestamp: new Date("2024-06-20").getTime() },
    ],
    timeTracking: {
      estimated: 120, // hours
      logged: 52, // hours
      billable: 48, // hours
    }
  },
  {
    id: "proj-002",
    name: "Product Sourcing Optimization",
    client: "European Distributors",
    clientId: "user-customer-2",
    startDate: new Date("2024-05-15").getTime(),
    endDate: new Date("2024-07-15").getTime(),
    status: "in-progress",
    progress: 70,
    priority: "medium",
    team: ["user-middleman-1"],
    description: "Identify new suppliers and optimize the sourcing process for cost reduction",
    tasks: [
      { id: "task-005", name: "Current Supplier Audit", status: "completed", assignee: "user-middleman-1", dueDate: new Date("2024-05-30").getTime() },
      { id: "task-006", name: "New Supplier Research", status: "completed", assignee: "user-middleman-1", dueDate: new Date("2024-06-15").getTime() },
      { id: "task-007", name: "Cost Analysis", status: "in-progress", assignee: "user-middleman-1", dueDate: new Date("2024-06-30").getTime() },
      { id: "task-008", name: "Recommendation Report", status: "not-started", assignee: "user-middleman-1", dueDate: new Date("2024-07-10").getTime() },
    ],
    milestones: [
      { id: "ms-004", name: "Supplier Audit Complete", dueDate: new Date("2024-05-30").getTime(), completed: true },
      { id: "ms-005", name: "New Suppliers Identified", dueDate: new Date("2024-06-15").getTime(), completed: true },
      { id: "ms-006", name: "Final Recommendations", dueDate: new Date("2024-07-10").getTime(), completed: false },
    ],
    comments: [
      { id: "com-003", userId: "user-customer-2", text: "We need to focus on quality as well as cost", timestamp: new Date("2024-05-20").getTime() },
      { id: "com-004", userId: "user-middleman-1", text: "Agreed, we're evaluating suppliers based on both metrics", timestamp: new Date("2024-05-21").getTime() },
    ],
    documents: [
      { id: "doc-003", name: "Supplier Evaluation Matrix.xlsx", uploadedBy: "user-middleman-1", timestamp: new Date("2024-06-01").getTime() },
    ],
    timeTracking: {
      estimated: 80, // hours
      logged: 60, // hours
      billable: 55, // hours
    }
  },
  {
    id: "proj-003",
    name: "Logistics Optimization",
    client: "Import Solutions Inc",
    clientId: "user-customer-1",
    startDate: new Date("2024-07-01").getTime(),
    endDate: new Date("2024-08-31").getTime(),
    status: "not-started",
    progress: 0,
    priority: "low",
    team: ["user-middleman-1"],
    description: "Analyze and optimize the logistics and shipping processes to reduce costs and delivery times",
    tasks: [
      { id: "task-009", name: "Current Process Mapping", status: "not-started", assignee: "user-middleman-1", dueDate: new Date("2024-07-15").getTime() },
      { id: "task-010", name: "Bottleneck Analysis", status: "not-started", assignee: "user-middleman-1", dueDate: new Date("2024-07-30").getTime() },
      { id: "task-011", name: "Improvement Recommendations", status: "not-started", assignee: "user-middleman-1", dueDate: new Date("2024-08-15").getTime() },
    ],
    milestones: [
      { id: "ms-007", name: "Process Mapping Complete", dueDate: new Date("2024-07-15").getTime(), completed: false },
      { id: "ms-008", name: "Final Recommendations", dueDate: new Date("2024-08-15").getTime(), completed: false },
    ],
    comments: [],
    documents: [],
    timeTracking: {
      estimated: 60, // hours
      logged: 0, // hours
      billable: 0, // hours
    }
  },
]

export default function ProjectsPage() {
  const { users } = useB2B()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [projects, setProjects] = useState(mockProjects)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  const [showAddProjectDialog, setShowAddProjectDialog] = useState(false)
  const [showProjectDetailsDialog, setShowProjectDetailsDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  
  // Form state for new project
  const [newProject, setNewProject] = useState({
    name: "",
    client: "",
    startDate: "",
    endDate: "",
    priority: "medium",
    description: "",
  })
  
  // Form state for new task
  const [newTask, setNewTask] = useState({
    name: "",
    assignee: "",
    dueDate: "",
    description: "",
  })
  
  // Form state for new comment
  const [newComment, setNewComment] = useState("")
  
  // Filter projects based on search and status
  const filteredProjects = projects.filter(project => {
    // Filter by search query
    const matchesSearch = 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Filter by status
    const matchesStatus = 
      statusFilter === "all" || 
      project.status === statusFilter
    
    return matchesSearch && matchesStatus
  })
  
  const handleAddProject = () => {
    // Validate form
    if (!newProject.name || !newProject.client || !newProject.startDate || !newProject.endDate) {
      alert("Please fill in all required fields")
      return
    }
    
    // Create new project
    const project = {
      id: `proj-${Date.now().toString().slice(-3)}`,
      name: newProject.name,
      client: newProject.client,
      clientId: users.find(u => u.company === newProject.client)?.id || "",
      startDate: new Date(newProject.startDate).getTime(),
      endDate: new Date(newProject.endDate).getTime(),
      status: "not-started",
      progress: 0,
      priority: newProject.priority,
      team: ["user-middleman-1"],
      description: newProject.description,
      tasks: [],
      milestones: [],
      comments: [],
      documents: [],
      timeTracking: {
        estimated: 0,
        logged: 0,
        billable: 0,
      }
    }
    
    // Add project to list
    setProjects([...projects, project])
    
    // Reset form and close dialog
    setNewProject({
      name: "",
      client: "",
      startDate: "",
      endDate: "",
      priority: "medium",
      description: "",
    })
    setShowAddProjectDialog(false)
  }
  
  const handleAddTask = () => {
    // Validate form
    if (!newTask.name || !newTask.dueDate) {
      alert("Please fill in all required fields")
      return
    }
    
    if (!selectedProject) return
    
    // Create new task
    const task = {
      id: `task-${Date.now().toString().slice(-3)}`,
      name: newTask.name,
      status: "not-started",
      assignee: newTask.assignee || "user-middleman-1",
      dueDate: new Date(newTask.dueDate).getTime(),
      description: newTask.description,
    }
    
    // Add task to project
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProject.id) {
        return {
          ...project,
          tasks: [...project.tasks, task]
        }
      }
      return project
    })
    
    setProjects(updatedProjects)
    
    // Update selected project
    setSelectedProject({
      ...selectedProject,
      tasks: [...selectedProject.tasks, task]
    })
    
    // Reset form
    setNewTask({
      name: "",
      assignee: "",
      dueDate: "",
      description: "",
    })
  }
  
  const handleAddComment = () => {
    if (!newComment.trim() || !selectedProject) return
    
    // Create new comment
    const comment = {
      id: `com-${Date.now().toString().slice(-3)}`,
      userId: "user-middleman-1",
      text: newComment,
      timestamp: Date.now(),
    }
    
    // Add comment to project
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProject.id) {
        return {
          ...project,
          comments: [...project.comments, comment]
        }
      }
      return project
    })
    
    setProjects(updatedProjects)
    
    // Update selected project
    setSelectedProject({
      ...selectedProject,
      comments: [...selectedProject.comments, comment]
    })
    
    // Reset form
    setNewComment("")
  }
  
  const toggleExpandProject = (projectId: string) => {
    if (expandedProject === projectId) {
      setExpandedProject(null)
    } else {
      setExpandedProject(projectId)
    }
  }
  
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "in-progress":
        return "secondary"
      case "not-started":
        return "outline"
      case "on-hold":
        return "destructive"
      default:
        return "outline"
    }
  }
  
  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "outline"
    }
  }
  
  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "not-started":
        return <XCircle className="h-4 w-4 text-gray-400" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
    }
  }
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString()
  }
  
  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId)
    return user ? user.name : "Unknown User"
  }
  
  const calculateDaysLeft = (endDate: number) => {
    const today = new Date().getTime()
    const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24))
    return daysLeft
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      
      <div className="flex flex-1">
        <DashboardNav />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Project Management</h1>
              <p className="text-gray-500">Manage your client projects and workflows</p>
            </div>
            <Button onClick={() => setShowAddProjectDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
          
          {/* Filters and Search */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search projects..."
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
                    <SelectItem value="not-started">Not Started</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
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
          
          {/* Project Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Project List */}
          <div className="space-y-4">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div 
                      className="p-6 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => toggleExpandProject(project.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Briefcase className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium text-lg">{project.name}</h3>
                            <p className="text-sm text-muted-foreground">{project.client}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="hidden md:block">
                            <Badge variant={getStatusBadgeVariant(project.status)}>
                              {project.status === "in-progress" ? "In Progress" : 
                               project.status === "not-started" ? "Not Started" : 
                               project.status === "on-hold" ? "On Hold" : "Completed"}
                            </Badge>
                          </div>
                          <div className="hidden md:block">
                            <Badge variant={getPriorityBadgeVariant(project.priority)}>
                              {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)} Priority
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-right">
                              <p className="text-sm font-medium">{project.progress}% Complete</p>
                              <p className="text-xs text-muted-foreground">
                                {formatDate(project.startDate)} - {formatDate(project.endDate)}
                              </p>
                            </div>
                            {expandedProject === project.id ? (
                              <ChevronUp className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    </div>
                    
                    {expandedProject === project.id && (
                      <div className="border-t p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-2">Project Details</h4>
                            <p className="text-sm mb-4">{project.description}</p>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Start Date:</span>
                                <span>{formatDate(project.startDate)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">End Date:</span>
                                <span>{formatDate(project.endDate)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Days Left:</span>
                                <span>{calculateDaysLeft(project.endDate)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Team:</span>
                                <span>{project.team.length} members</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-2">Tasks</h4>
                            <div className="space-y-2">
                              {project.tasks.slice(0, 4).map((task) => (
                                <div key={task.id} className="flex items-center justify-between text-sm">
                                  <div className="flex items-center gap-2">
                                    {getTaskStatusIcon(task.status)}
                                    <span>{task.name}</span>
                                  </div>
                                  <span className="text-xs text-muted-foreground">{formatDate(task.dueDate)}</span>
                                </div>
                              ))}
                              {project.tasks.length > 4 && (
                                <div className="text-xs text-muted-foreground text-center mt-2">
                                  + {project.tasks.length - 4} more tasks
                                </div>
                              )}
                              {project.tasks.length === 0 && (
                                <div className="text-xs text-muted-foreground text-center py-2">
                                  No tasks created yet
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-2">Milestones</h4>
                            <div className="space-y-2">
                              {project.milestones.slice(0, 3).map((milestone) => (
                                <div key={milestone.id} className="flex items-center justify-between text-sm">
                                  <div className="flex items-center gap-2">
                                    {milestone.completed ? (
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <Clock className="h-4 w-4 text-blue-500" />
                                    )}
                                    <span>{milestone.name}</span>
                                  </div>
                                  <span className="text-xs text-muted-foreground">{formatDate(milestone.dueDate)}</span>
                                </div>
                              ))}
                              {project.milestones.length > 3 && (
                                <div className="text-xs text-muted-foreground text-center mt-2">
                                  + {project.milestones.length - 3} more milestones
                                </div>
                              )}
                              {project.milestones.length === 0 && (
                                <div className="text-xs text-muted-foreground text-center py-2">
                                  No milestones created yet
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => {
                            setSelectedProject(project)
                            setShowProjectDetailsDialog(true)
                          }}>
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                Generate Report
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Message Client
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Project
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No projects found</h3>
                  <p className="text-muted-foreground mb-4">No projects match your current filters</p>
                  <Button onClick={() => setShowAddProjectDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Project
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Add Project Dialog */}
          <Dialog open={showAddProjectDialog} onOpenChange={setShowAddProjectDialog}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Enter the project details to create a new project.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Project Name *</Label>
                    <Input 
                      id="name" 
                      value={newProject.name}
                      onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client">Client *</Label>
                    <Select 
                      value={newProject.client}
                      onValueChange={(value) => setNewProject({...newProject, client: value})}
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
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input 
                      id="startDate" 
                      type="date"
                      value={newProject.startDate}
                      onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input 
                      id="endDate" 
                      type="date"
                      value={newProject.endDate}
                      onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select 
                    value={newProject.priority}
                    onValueChange={(value) => setNewProject({...newProject, priority: value})}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    placeholder="Enter project description"
                    rows={4}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddProjectDialog(false)}>Cancel</Button>
                <Button onClick={handleAddProject}>Create Project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Project Details Dialog */}
          {selectedProject && (
            <Dialog open={showProjectDetailsDialog} onOpenChange={setShowProjectDetailsDialog}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <DialogTitle className="text-xl">{selectedProject.name}</DialogTitle>
                      <DialogDescription>
                        {selectedProject.client} • {formatDate(selectedProject.startDate)} - {formatDate(selectedProject.endDate)}
                      </DialogDescription>
                    </div>
                    <Badge variant={getStatusBadgeVariant(selectedProject.status)}>
                      {selectedProject.status === "in-progress" ? "In Progress" : 
                       selectedProject.status === "not-started" ? "Not Started" : 
                       selectedProject.status === "on-hold" ? "On Hold" : "Completed"}
                    </Badge>
                  </div>
                </DialogHeader>
                
                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    <TabsTrigger value="milestones">Milestones</TabsTrigger>
                    <TabsTrigger value="time">Time Tracking</TabsTrigger>
                    <TabsTrigger value="files">Files & Comments</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="col-span-2">
                        <CardHeader>
                          <CardTitle className="text-lg">Project Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{selectedProject.description}</p>
                          
                          <div className="mt-6">
                            <h4 className="text-sm font-medium mb-2">Project Progress</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Overall Completion</span>
                                <span>{selectedProject.progress}%</span>
                              </div>
                              <Progress value={selectedProject.progress} className="h-2" />
                            </div>
                          </div>
                          
                          <div className="mt-6 grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium mb-2">Tasks Status</h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span>Completed</span>
                                  <span>{selectedProject.tasks.filter(t => t.status === "completed").length}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>In Progress</span>
                                  <span>{selectedProject.tasks.filter(t => t.status === "in-progress").length}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Not Started</span>
                                  <span>{selectedProject.tasks.filter(t => t.status === "not-started").length}</span>
                                </div>
                                <div className="flex justify-between font-medium">
                                  <span>Total</span>
                                  <span>{selectedProject.tasks.length}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium mb-2">Time Tracking</h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span>Estimated Hours</span>
                                  <span>{selectedProject.timeTracking.estimated}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Hours Logged</span>
                                  <span>{selectedProject.timeTracking.logged}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Billable Hours</span>
                                  <span>{selectedProject.timeTracking.billable}</span>
                                </div>
                                <div className="flex justify-between font-medium">
                                  <span>Completion</span>
                                  <span>
                                    {selectedProject.timeTracking.estimated > 0 
                                      ? Math.round((selectedProject.timeTracking.logged / selectedProject.timeTracking.estimated) * 100)
                                      : 0}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Project Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Timeline</p>
                              <p>{formatDate(selectedProject.startDate)} - {formatDate(selectedProject.endDate)}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Users className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Team</p>
                              <p>{selectedProject.team.length} team members</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Days Remaining</p>
                              <p>{calculateDaysLeft(selectedProject.endDate)} days</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <AlertCircle className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Priority</p>
                              <p className="capitalize">{selectedProject.priority}</p>
                            </div>
                          </div>
                          
                          <div className="pt-4 mt-4 border-t">
                            <Button variant="outline" className="w-full">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Project
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedProject.comments.length > 0 ? (
                            selectedProject.comments.map((comment) => (
                              <div key={comment.id} className="flex items-start gap-3 border-b pb-4 last:border-0 last:pb-0">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  <Users className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">{getUserName(comment.userId)}</p>
                                  <p className="text-sm">{comment.text}</p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {new Date(comment.timestamp).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-4 text-muted-foreground">
                              <p>No activity yet</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="tasks" className="pt-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg">Tasks</CardTitle>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Task
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-md border">
                          <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                            <div className="col-span-5">Task Name</div>
                            <div className="col-span-2">Status</div>
                            <div className="col-span-2">Assignee</div>
                            <div className="col-span-2">Due Date</div>
                            <div className="col-span-1 text-right">Actions</div>
                          </div>
                          
                          {selectedProject.tasks.length > 0 ? (
                            selectedProject.tasks.map((task) => (
                              <div key={task.id} className="grid grid-cols-12 items-center border-b px-4 py-3 hover:bg-muted/50">
                                <div className="col-span-5 font-medium flex items-center gap-2">
                                  {getTaskStatusIcon(task.status)}
                                  <span>{task.name}</span>
                                </div>
                                <div className="col-span-2">
                                  <Badge variant={getStatusBadgeVariant(task.status)}>
                                    {task.status === "in-progress" ? "In Progress" : 
                                     task.status === "not-started" ? "Not Started" : 
                                     task.status === "on-hold" ? "On Hold" : "Completed"}
                                  </Badge>
                                </div>
                                <div className="col-span-2">{getUserName(task.assignee)}</div>
                                <div className="col-span-2">{formatDate(task.dueDate)}</div>
                                <div className="col-span-1 text-right">
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-8 text-center text-muted-foreground">
                              No tasks created yet
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-6">
                          <h4 className="text-sm font-medium mb-4">Add New Task</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="taskName">Task Name *</Label>
                              <Input 
                                id="taskName" 
                                value={newTask.name}
                                onChange={(e) => setNewTask({...newTask, name: e.target.value})}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="taskAssignee">Assignee</Label>
                              <Select 
                                value={newTask.assignee}
                                onValueChange={(value) => setNewTask({...newTask, assignee: value})}
                              >
                                <SelectTrigger id="taskAssignee">
                                  <SelectValue placeholder="Select assignee" />
                                </SelectTrigger>
                                <SelectContent>
                                  {users
                                    .filter(user => user.role === "middleman")
                                    .map(user => (
                                      <SelectItem key={user.id} value={user.id}>
                                        {user.name}
                                      </SelectItem>
                                    ))
                                  }
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="taskDueDate">Due Date *</Label>
                              <Input 
                                id="taskDueDate" 
                                type="date"
                                value={newTask.dueDate}
                                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                                required
                              />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="taskDescription">Description</Label>
                              <Textarea 
                                id="taskDescription" 
                                value={newTask.description}
                                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                                placeholder="Enter task description"
                                rows={3}
                              />
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button onClick={handleAddTask}>Add Task</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="milestones" className="pt-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg">Milestones</CardTitle>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Milestone
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-md border">
                          <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                            <div className="col-span-6">Milestone</div>
                            <div className="col-span-3">Due Date</div>
                            <div className="col-span-2">Status</div>
                            <div className="col-span-1 text-right">Actions</div>
                          </div>
                          
                          {selectedProject.milestones.length > 0 ? (
                            selectedProject.milestones.map((milestone) => (
                              <div key={milestone.id} className="grid grid-cols-12 items-center border-b px-4 py-3 hover:bg-muted/50">
                                <div className="col-span-6 font-medium">{milestone.name}</div>
                                <div className="col-span-3">{formatDate(milestone.dueDate)}</div>
                                <div className="col-span-2">
                                  <Badge variant={milestone.completed ? "default" : "outline"}>
                                    {milestone.completed ? "Completed" : "Pending"}
                                  </Badge>
                                </div>
                                <div className="col-span-1 text-right">
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-8 text-center text-muted-foreground">
                              No milestones created yet
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="time" className="pt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Time Tracking</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                          <Card>
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between space-y-0 pb-2">
                                <p className="text-sm font-medium">Estimated Hours</p>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <div className="text-2xl font-bold">{selectedProject.timeTracking.estimated}</div>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between space-y-0 pb-2">
                                <p className="text-sm font-medium">Hours Logged</p>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <div className="text-2xl font-bold">{selectedProject.timeTracking.logged}</div>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between space-y-0 pb-2">
                                <p className="text-sm font-medium">Billable Hours</p>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <div className="text-2xl font-bold">{selectedProject.timeTracking.billable}</div>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Time Utilization</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>
                                  {selectedProject.timeTracking.estimated > 0 
                                    ? Math.round((selectedProject.timeTracking.logged / selectedProject.timeTracking.estimated) * 100)
                                    : 0}%
                                </span>
                              </div>
                              <Progress 
                                value={selectedProject.timeTracking.estimated > 0 
                                  ? (selectedProject.timeTracking.logged / selectedProject.timeTracking.estimated) * 100
                                  : 0} 
                                className="h-2" 
                              />
                            </div>
                          </div>
                          
                          <div className="mt-6">
                            <h4 className="text-sm font-medium mb-4">Log Time</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="task">Task</Label>
                                <Select>
                                  <SelectTrigger id="task">
                                    <SelectValue placeholder="Select task" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {selectedProject.tasks.map(task => (
                                      <SelectItem key={task.id} value={task.id}>
                                        {task.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="hours">Hours</Label>
                                <Input id="hours" type="number" min="0" step="0.5" placeholder="0.0" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input id="date" type="date" />
                              </div>
                              <div className="space-y-2 md:col-span-3">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" placeholder="Enter description of work done" rows={2} />
                              </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                              <Button>Log Time</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="files" className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                          <CardTitle className="text-lg">Documents</CardTitle>
                          <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Upload File
                          </Button>
                        </CardHeader>
                        <CardContent>
                          {selectedProject.documents.length > 0 ? (
                            <div className="space-y-4">
                              {selectedProject.documents.map((document) => (
                                <div key={document.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                  <div className="flex items-center gap-3">
                                    <FileText className="h-8 w-8 text-blue-500" />
                                    <div>
                                      <p className="font-medium">{document.name}</p>
                                      <p className="text-xs text-muted-foreground">
                                        Uploaded by {getUserName(document.uploadedBy)} on {formatDate(document.timestamp)}
                                      </p>
                                    </div>
                                  </div>
                                  <Button variant="ghost" size="sm">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-muted-foreground">
                              <p>No documents uploaded yet</p>
                              <Button variant="outline" className="mt-4">
                                <Plus className="h-4 w-4 mr-2" />
                                Upload First Document
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Comments</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4 max-h-[300px] overflow-y-auto">
                            {selectedProject.comments.length > 0 ? (
                              selectedProject.comments.map((comment) => (
                                <div key={comment.id} className="flex items-start gap-3 border-b pb-4 last:border-0 last:pb-0">
                                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Users className="h-4 w-4 text-primary" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">{getUserName(comment.userId)}</p>
                                    <p className="text-sm">{comment.text}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {new Date(comment.timestamp).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-center py-4 text-muted-foreground">
                                <p>No comments yet</p>
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-4 space-y-2">
                            <Label htmlFor="comment">Add Comment</Label>
                            <Textarea 
                              id="comment" 
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              placeholder="Type your comment here..."
                              rows={3}
                            />
                            <div className="flex justify-end">
                              <Button onClick={handleAddComment}>Post Comment</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          )}
        </main>
      </div>
    </div>
  )
}