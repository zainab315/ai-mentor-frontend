"use client"

import type React from "react"

import { useState } from "react"
import { z } from "zod"
import { Loader2 } from "lucide-react" 

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  state: z.string().min(1, "State is required"),
})

type FormData = z.infer<typeof formSchema>

export default function JoinCourseForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phoneNumber: "",
    state: "",
  })

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleStateChange = (value: string) => {
    setFormData((prev) => ({ ...prev, state: value }))

    // Clear error when user selects
    if (errors.state) {
      setErrors((prev) => ({ ...prev, state: undefined }))
    }
  }

  const validateForm = () => {
    try {
      formSchema.parse(formData)
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof FormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof FormData] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))


      const response = await fetch(`${process.env.NEXT_PUBLIC_AI4ALL_SERVER}user/googleSheet`, {
        redirect:"follow",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phoneNumber,
          state: formData.state,
        }),
      })


      if (!response.ok) throw new Error("Failed to submit")

      setSubmitSuccess(true)
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        state: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      setErrors({ state: "Failed to submit. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="text-center py-8">
        <div className="bg-green-500/20 text-green-300 p-4 rounded-lg mb-4">
          <h3 className="text-xl font-bold mb-2">Registration Successful!</h3>
          <p>Thank you for registering. We've sent the details to your email.</p>
        </div>
        <Button onClick={() => setSubmitSuccess(false)} className="bg-pink-600 hover:bg-pink-700 rounded-2xl">
          Register Again
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`bg-white/5 border-white/20 focus:border-blue-400 rounded-xl ${errors.name ? "border-red-500" : ""}`}
          placeholder="Your full name"
        />
        {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={`bg-white/5 border-white/20 focus:border-blue-400 rounded-xl ${errors.email ? "border-red-500" : ""}`}
          placeholder="your.email@example.com"
        />
        {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleChange}
          className={`bg-white/5 border-white/20 focus:border-blue-400 rounded-xl ${errors.phoneNumber ? "border-red-500" : ""}`}
          placeholder="(123) 456-7890"
        />
        {errors.phoneNumber && <p className="text-red-400 text-sm">{errors.phoneNumber}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="state">State</Label>
        <Select  value={formData.state} onValueChange={handleStateChange}>
          <SelectTrigger
            className={`bg-white text-black  border-white/20 focus:border-blue-400 rounded-xl ${errors.state ? "border-red-500" : ""}`}
          >
            <SelectValue placeholder="Select your state" />
          </SelectTrigger>
          <SelectContent className="max-h-[200px] bg-white text-black hover:bg-gray-200">
          <SelectItem value="Alabama">Alabama</SelectItem>
<SelectItem value="Alaska">Alaska</SelectItem>
<SelectItem value="Arizona">Arizona</SelectItem>
<SelectItem value="Arkansas">Arkansas</SelectItem>
<SelectItem value="California">California</SelectItem>
<SelectItem value="Colorado">Colorado</SelectItem>
<SelectItem value="Connecticut">Connecticut</SelectItem>
<SelectItem value="Delaware">Delaware</SelectItem>
<SelectItem value="Florida">Florida</SelectItem>
<SelectItem value="Georgia">Georgia</SelectItem>
<SelectItem value="Hawaii">Hawaii</SelectItem>
<SelectItem value="Idaho">Idaho</SelectItem>
<SelectItem value="Illinois">Illinois</SelectItem>
<SelectItem value="Indiana">Indiana</SelectItem>
<SelectItem value="Iowa">Iowa</SelectItem>
<SelectItem value="Kansas">Kansas</SelectItem>
<SelectItem value="Kentucky">Kentucky</SelectItem>
<SelectItem value="Louisiana">Louisiana</SelectItem>
<SelectItem value="Maine">Maine</SelectItem>
<SelectItem value="Maryland">Maryland</SelectItem>
<SelectItem value="Massachusetts">Massachusetts</SelectItem>
<SelectItem value="Michigan">Michigan</SelectItem>
<SelectItem value="Minnesota">Minnesota</SelectItem>
<SelectItem value="Mississippi">Mississippi</SelectItem>
<SelectItem value="Missouri">Missouri</SelectItem>
<SelectItem value="Montana">Montana</SelectItem>
<SelectItem value="Nebraska">Nebraska</SelectItem>
<SelectItem value="Nevada">Nevada</SelectItem>
<SelectItem value="New Hampshire">New Hampshire</SelectItem>
<SelectItem value="New Jersey">New Jersey</SelectItem>
<SelectItem value="New Mexico">New Mexico</SelectItem>
<SelectItem value="New York">New York</SelectItem>
<SelectItem value="North Carolina">North Carolina</SelectItem>
<SelectItem value="North Dakota">North Dakota</SelectItem>
<SelectItem value="Ohio">Ohio</SelectItem>
<SelectItem value="Oklahoma">Oklahoma</SelectItem>
<SelectItem value="Oregon">Oregon</SelectItem>
<SelectItem value="Pennsylvania">Pennsylvania</SelectItem>
<SelectItem value="Rhode Island">Rhode Island</SelectItem>
<SelectItem value="South Carolina">South Carolina</SelectItem>
<SelectItem value="South Dakota">South Dakota</SelectItem>
<SelectItem value="Tennessee">Tennessee</SelectItem>
<SelectItem value="Texas">Texas</SelectItem>
<SelectItem value="Utah">Utah</SelectItem>
<SelectItem value="Vermont">Vermont</SelectItem>
<SelectItem value="Virginia">Virginia</SelectItem>
<SelectItem value="Washington">Washington</SelectItem>
<SelectItem value="West Virginia">West Virginia</SelectItem>
<SelectItem value="Wisconsin">Wisconsin</SelectItem>
<SelectItem value="Wyoming">Wyoming</SelectItem>

          </SelectContent>
        </Select>
        {errors.state && <p className="text-red-400 text-sm">{errors.state}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-3 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Register Now"
        )}
      </Button>

      <p className="text-center text-sm text-blue-200">Limited spots available! Secure your place today.</p>
    </form>
  )
}

