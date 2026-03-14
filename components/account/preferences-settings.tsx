"use client"

import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Field, FieldLabel, FieldGroup, FieldContent, FieldDescription } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"

export function PreferencesSettings() {
  const [isSaving, setIsSaving] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [appointmentReminders, setAppointmentReminders] = useState(true)
  const [systemUpdates, setSystemUpdates] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSaving(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>Customize your application settings and notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="language">Language</FieldLabel>
            <Select defaultValue="en">
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="pt">Portuguese</SelectItem>
                <SelectItem value="fr">French</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="timezone">Timezone</FieldLabel>
            <Select defaultValue="america-new_york">
              <SelectTrigger id="timezone">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="america-new_york">America/New York (EST)</SelectItem>
                <SelectItem value="america-los_angeles">America/Los Angeles (PST)</SelectItem>
                <SelectItem value="america-chicago">America/Chicago (CST)</SelectItem>
                <SelectItem value="europe-london">Europe/London (GMT)</SelectItem>
                <SelectItem value="europe-madrid">Europe/Madrid (CET)</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="dateFormat">Date Format</FieldLabel>
            <Select defaultValue="mdy">
              <SelectTrigger id="dateFormat">
                <SelectValue placeholder="Select date format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <div className="pt-4">
            <h3 className="text-sm font-medium mb-4">Notifications</h3>
            <div className="space-y-4">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldLabel className="font-normal">Email Notifications</FieldLabel>
                  <FieldDescription>
                    Receive email notifications for important updates
                  </FieldDescription>
                </FieldContent>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </Field>

              <Field orientation="horizontal">
                <FieldContent>
                  <FieldLabel className="font-normal">Appointment Reminders</FieldLabel>
                  <FieldDescription>
                    Get reminders for upcoming patient appointments
                  </FieldDescription>
                </FieldContent>
                <Switch
                  checked={appointmentReminders}
                  onCheckedChange={setAppointmentReminders}
                />
              </Field>

              <Field orientation="horizontal">
                <FieldContent>
                  <FieldLabel className="font-normal">System Updates</FieldLabel>
                  <FieldDescription>
                    Receive notifications about new features and updates
                  </FieldDescription>
                </FieldContent>
                <Switch
                  checked={systemUpdates}
                  onCheckedChange={setSystemUpdates}
                />
              </Field>
            </div>
          </div>
        </FieldGroup>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving && <Spinner className="mr-2" />}
            {isSaving ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
