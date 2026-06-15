// "use client"

// import { useState } from "react"
// import { usePathname } from "next/navigation"
// import { Check, AlertCircle, Loader2 } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { toast } from "sonner"
// import axios from "axios"
// import { loadStripe } from "@stripe/stripe-js"
// import { formatMongoDate } from "@/lib/methods"

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!)

// const plans = [
//   {
//     name: "Basic",
//     price: "20",
//     tokens: 10000,
//     image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&fit=crop&q=60",
//     features: ["20k tokens", "3 Custom Subjects", "Basic Analytics", "Email Support", "20 quizzes", "Limited Access"],
//     current: false,
//   },
//   {
//     name: "Pro",
//     price: "40",
//     tokens: 20000,
//     image: "https://images.unsplash.com/photo-1626908013351-800ddd734b8a?w=800&auto=format&fit=crop&q=60",
//     features: [
//       "40k tokens",
//       "6 Custom Subjects",
//       "Advanced Analytics",
//       "Priority Support",
//       "Email Support",
//       "40 quizzes",
//     ],
//     current: false,
//   },
//   {
//     name: "Premium",
//     price: "60",
//     tokens: 30000,
//     image: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=800&auto=format&fit=crop&q=60",
//     features: [
//       "60k tokens",
//       "Unlimited Custom Subjects",
//       "Early Access of Upcoming features",
//       "Unlimited quizzes",
//       "24/7 phone support",
//       "Dedicated account integration",
//     ],
//     current: false,
//   },
// ]

// export function BillingPlans({ user , data }: { user: any; data: any }) {
//   const [isLoading, setIsLoading] = useState<string | null>(null)
//   const pathname = usePathname()

//   const handleSubscription = async (plan: (typeof plans)[0]) => {
//     try {
//       setIsLoading(plan.name)

//       const response = await axios.post(`${process.env.NEXT_PUBLIC_AI4ALL_SERVER}/subscription/createPayment`, {
//         planName: plan.name,
//         image: plan.image,
//         amount: Number.parseInt(plan.price),
//         path: typeof window !== "undefined" ? window.location.origin + pathname : "",
//         onComplete: "transaction-successful",
//         onFailure: "transaction-failed",
//         _id: user?.id,
//         credit: plan.tokens,
//       })

//       const { id: sessionId } = response.data

//       const stripe = await stripePromise
//       if (!stripe) {
//         throw new Error("Stripe failed to initialize")
//       }

//       const { error } = await stripe.redirectToCheckout({
//         sessionId,
//       })

//       if (error) {
//         throw new Error(error.message)
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         toast.error(error.response?.data?.message || "Failed to initiate payment")
//         console.error("Payment error:", error.response?.data)
//       } else {
//         toast.error("An unexpected error occurred")
//         console.error("Payment error:", error)
//       }
//     } finally {
//       setIsLoading(null)
//     }
//   }
//   return (
//     <Card className="bg-white/10 backdrop-blur-sm border-0">
//       <CardHeader>
//         <CardTitle className="text-white">Billing Plans</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         {data && (
//           <Alert className="bg-purple-500/20 border-purple-500/50 text-white">
//             <AlertCircle className="h-4 w-4" />
//             <AlertTitle>Current Plan: {data?.planType}</AlertTitle>
//             <AlertDescription>
//               You are currently on the {data?.planType} plan. Your next billing date is on {formatMongoDate(data?.expire,0)}.
//             </AlertDescription>
//           </Alert>
//         )}

//         <div className="grid md:grid-cols-3 gap-6">
//           {plans.map((plan) => (
//             <Card
//               key={plan.name}
//               className={`border-0 ${plan.current ? "bg-gradient-to-br from-purple-400 to-pink-400" : "bg-white/10"}`}
//             >
//               <CardHeader>
//                 <CardTitle className="text-white">{plan.name}</CardTitle>
//                 <p className="text-2xl font-bold text-white">
//                   ${plan.price}
//                   <span className="text-sm font-normal">/month</span>
//                 </p>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-2">
//                   {plan.features.map((feature) => (
//                     <li key={feature} className="flex items-center gap-2 text-white/70">
//                       <Check className="w-4 h-4 text-white" />
//                       <span>{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//                 <Button
//                   className={`w-full mt-6  ${
//                     plan.current
//                       ? "bg-white text-purple-600 hover:bg-white/90"
//                       : "bg-white/20 hover:bg-pink-400  text-white"
//                   }`}
//                   onClick={() => !plan.current && handleSubscription(plan)}
//                   disabled={plan.current || isLoading === plan.name}
//                 >
//                   {isLoading === plan.name ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin hover:bg-pink-400" />
//                       Processing
//                     </>
//                   ) : plan.current ? (
//                     "Current Plan"
//                   ) : (
//                     "Subscribe"
//                   )}
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Check, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "sonner"
import axios from "axios"
import { loadStripe } from "@stripe/stripe-js"
import { formatMongoDate } from "@/lib/methods"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!)

const plans = [
  {
    name: "Basic",
    price: "30",
    tokens: 50000,
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&fit=crop&q=60",
    features: ["50k tokens", "Custom Subjects", "Video Lecture", "Email Support", "Quizzes", "Limited Access"],
  },
  {
    name: "Pro",
    price: "60",
    tokens: 100000,
    image: "https://images.unsplash.com/photo-1626908013351-800ddd734b8a?w=800&auto=format&fit=crop&q=60",
    features: [
      "100k tokens",
      "Custom Subjects",
      "Advanced Analytics",
      "Video Lecture",
      "Email Support",
      "Quizzes",
    ],
  },
  {
    name: "Premium",
    price: "90",
    tokens: 150000,
    image: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=800&auto=format&fit=crop&q=60",
    features: [
      "150k tokens",
      "Unlimited Custom Subjects",
      "Early Access of Upcoming features",
      "Unlimited quizzes",
      "24/7 phone support",
      "Dedicated account integration",
    ],
  },
]

export function BillingPlans({ user, data }: { user: any; data: any }) {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const pathname = usePathname()

  const handleSubscription = async (plan: (typeof plans)[0]) => {
    try {
      setIsLoading(plan.name)

      const response = await axios.post(`${process.env.NEXT_PUBLIC_AI4ALL_SERVER}subscription/createPayment`, {
        planName: plan.name,
        planImage: "http://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg?auto=compress&cs=tinysrgb&w=1200",
        amount: Number.parseInt(plan.price),
        path: typeof window !== "undefined" ? window.location.origin + pathname : "http://localhost:3000",
        onComplete: "transaction-successful",
        onFailure: "transaction-failed",
        _id: user?.id,
        credit: plan.tokens,
      })

      const { id: sessionId } = response.data

      const stripe = await stripePromise
      if (!stripe) {
        throw new Error("Stripe failed to initialize")
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      })

      if (error) {
        throw new Error(error.message)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to initiate payment")
        console.error("Payment error:", error.response?.data)
      } else {
        toast.error("An unexpected error occurred")
        console.error("Payment error:", error)
      }
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <Card className="bg-white/10 max-w-full backdrop-blur-sm border-0">
      <CardHeader>
        <CardTitle className="text-white">Billing Plans</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {data  && (
          <Alert className="bg-purple-500/20 border-purple-500/50 text-white">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Current Plan: {data?.planType}</AlertTitle>
            <AlertDescription>
              You are currently on the {data?.planType} plan. Your next billing date is on {formatMongoDate(data?.expire, 0)}.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isCurrentPlan = data?.planType === plan.name
            return (
              <Card
                key={plan.name}
                className={`border-0 ${isCurrentPlan ? "bg-gradient-to-br from-purple-400 to-pink-400" : "bg-white/10"}`}
              >
                <CardHeader>
                  <CardTitle className="text-white">{plan.name}</CardTitle>
                  <p className="text-2xl font-bold text-white">
                    ${plan.price}
                    <span className="text-sm font-normal">/month</span>
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-white/70">
                        <Check className="w-4 h-4 text-white" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-6  ${
                      isCurrentPlan
                        ? "bg-white text-purple-600 hover:bg-white/90"
                        : "bg-white/20 hover:bg-pink-400  text-white"
                    }`}
                    onClick={() => !isCurrentPlan && handleSubscription(plan)}
                    disabled={isCurrentPlan || isLoading === plan.name}
                  >
                    {isLoading === plan.name ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin hover:bg-pink-400" />
                        Processing
                      </>
                    ) : isCurrentPlan ? (
                      "Current Plan"
                    ) : (
                      "Subscribe"
                    )}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

