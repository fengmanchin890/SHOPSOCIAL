"use client"

import { AddRestaurantForm } from "./AddRestaurantForm"
import { AddRentalForm } from "./AddRentalForm"
import { AddTravelActivityForm } from "./AddTravelActivityForm"
import { AddLanguageClassForm } from "./AddLanguageClassForm"
import { AddCourseRegistrationForm } from "./AddCourseRegistrationForm"

interface AddActivityFormProps {
  moduleType: "food" | "accommodation" | "travel" | "language" | "courses"
  onSuccess: () => void
  onCancel: () => void
}

export function AddActivityForm({ moduleType, onSuccess, onCancel }: AddActivityFormProps) {
  switch (moduleType) {
    case "food":
      return <AddRestaurantForm onSuccess={onSuccess} onCancel={onCancel} />
    case "accommodation":
      return <AddRentalForm onSuccess={onSuccess} onCancel={onCancel} />
    case "travel":
      return <AddTravelActivityForm onSuccess={onSuccess} onCancel={onCancel} />
    case "language":
      return <AddLanguageClassForm onSuccess={onSuccess} onCancel={onCancel} />
    case "courses":
      return <AddCourseRegistrationForm onSuccess={onSuccess} onCancel={onCancel} />
    default:
      return null
  }
}