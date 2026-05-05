import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin } from 'lucide-react'

export function ProfileHeader({user}:{user:any}) {
  return (
    <Card className="bg-white/10  backdrop-blur-sm border-0">
      <CardContent className="p-4 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user?.imageUrl ?? '/one.avif'} alt="Profile picture" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            {/* <Button 
              size="icon" 
              variant="secondary"
              className="absolute bottom-0 right-0 rounded-full bg-white/20 hover:bg-white/30 text-white"
            > */}
              {/* <Camera className="w-4 h-4" /> */}
            {/* </Button> */}
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-white">{user?.fullName ?? ""}</h2>
              <p className="text-white/70">Educational Technology Specialist</p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-white/70">
                <Mail className="w-4 h-4" />
                <span>{user?.primaryEmailAddress?.emailAddress ?? ""}</span>
              </div>
              {/* <div className="flex items-center gap-2 text-white/70">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div> */}
            </div>
          </div>
          
          {/* <Button 
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white border-0"
          >
            Edit Profile
          </Button> */}
        </div>
      </CardContent>
    </Card>
  )
}

