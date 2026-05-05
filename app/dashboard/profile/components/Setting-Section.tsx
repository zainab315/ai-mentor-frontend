import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SettingsSection() {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-0">
      <CardHeader>
        <CardTitle className="text-white">Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Notifications</h3>
          <div className="space-y-4">
            {[
              "Email notifications",
              "Push notifications",
              "Weekly digest",
              "Monthly report"
            ].map((item) => (
              <div key={item} className="flex items-center justify-between">
                <Label htmlFor={item} className="text-white/70">
                  {item}
                </Label>
                <Switch id={item} />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Preferences</h3>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="language" className="text-white/70">
                Language
              </Label>
              <Select defaultValue="en">
                <SelectTrigger id="language" className="bg-white/10 border-0 text-white">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-white/70">
                Timezone
              </Label>
              <Select defaultValue="pst">
                <SelectTrigger id="timezone" className="bg-white/10 border-0 text-white">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pst">Pacific Time</SelectItem>
                  <SelectItem value="est">Eastern Time</SelectItem>
                  <SelectItem value="utc">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

