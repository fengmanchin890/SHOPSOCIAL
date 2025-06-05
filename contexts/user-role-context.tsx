"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type UserRole = "middleman" | "supplier" | "customer"

interface UserRoleContextType {
  userRole: UserRole
  setUserRole: (role: UserRole) => void
  isMiddleman: boolean
  isSupplier: boolean
  isCustomer: boolean
}

const UserRoleContext = createContext<UserRoleContextType | null>(null)

export function UserRoleProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>("middleman")

  const isMiddleman = userRole === "middleman"
  const isSupplier = userRole === "supplier"
  const isCustomer = userRole === "customer"

  return (
    <UserRoleContext.Provider
      value={{
        userRole,
        setUserRole,
        isMiddleman,
        isSupplier,
        isCustomer,
      }}
    >
      {children}
    </UserRoleContext.Provider>
  )
}

export function useUserRole() {
  const context = useContext(UserRoleContext)
  if (!context) {
    throw new Error("useUserRole must be used within a UserRoleProvider")
  }
  return context
}
