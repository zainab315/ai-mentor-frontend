"use client"
import { Get_Active_Subscription, Get_User } from "@/lib/query"
import { BillingPlans } from "./components/Billing-Plans"
import { ProfileHeader } from "./components/Profile-Header"
import { useUser } from "@clerk/nextjs"
import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import { PurchaseHistory } from "./components/Purchase-History"
import { Coins } from "lucide-react"

function formatCredits(credits: number): string {
  const formatted = Math.floor((credits / 1_000_000) * 10) / 10 // Rounds down to 1 decimal place
  return formatted % 1 === 0 ? formatted.toFixed(0) : formatted.toFixed(1)
}

export default function ProfilePage() {
  const { user } = useUser()

  const {
    data: activeSubscription,
    error,
    refetch,
  } = useQuery(Get_Active_Subscription(), {
    variables: { userId: user?.id },
    skip: !user?.id,
  })

  const {
    data: credits,
    loading: load,
    error: err,
    refetch: fetch,
  } = useQuery(Get_User, {
    variables: user?.id ? { descopeId: user.id } : undefined,
    skip: !user?.id,
  })

  useEffect(() => {
    if (user?.id) {
      fetch()
    }
  }, [user, fetch])

  useEffect(() => {
    if (user?.id) {
      refetch().then((res) => console.log(res))
    }
  }, [user, refetch])

  if (error) console.error(error)
  if (err) console.error(err)

  useEffect(() => {
    console.log("credits", credits?.getUser?.credits)
  }, [credits])

  const userCredits = credits?.getUser?.credits || 0
  console.log(userCredits)
  const formattedCredits = userCredits

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-black">
      <div className="container mx-auto md:p-4 py-6 sm:py-8 max-w-7xl relative">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Profile & Settings</h1>
          <div className="mt-4 sm:mt-0">
            <div className="bg-gradient-to-r from-purple-700 to-pink-600 rounded-xl shadow-lg p-2 sm:p-3 flex items-center gap-1 sm:gap-2 transform hover:scale-105 transition-transform duration-300 border border-purple-300/20">
              <Coins className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-300" />
              <div className="flex gap-1 sm:gap-2 justify-center items-center">
                <span className="text-xs text-purple-100 font-medium">Credits</span>
                <span className="text-sm sm:text-lg font-bold text-white">{formattedCredits}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4  sm:gap-6 md:gap-8"> 
          <div className="w-[98%]">
          <ProfileHeader user={user} /> 
          </div>
          {activeSubscription?.getActiveSubscription && ( 
                      <div className="w-[98%]">
            <BillingPlans user={user} data={activeSubscription.getActiveSubscription} /> 
            </div>

          )}
          {activeSubscription?.getSubscriptions?.data?.length > 0 && ( 
                      <div className="w-[98%]">

            <PurchaseHistory data={activeSubscription.getSubscriptions.data} /> 
            </div>

          )}
        </div>
      </div>
    </div>
  )
}

