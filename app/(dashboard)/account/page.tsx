import { Topbar } from "@/components/topbar"
import { ProfileSettings } from "@/components/account/profile-settings"
import { SecuritySettings } from "@/components/account/security-settings"
import { PreferencesSettings } from "@/components/account/preferences-settings"

export default function AccountPage() {
  return (
    <>
      <Topbar 
        title="Account Settings" 
        description="Manage your profile and preferences" 
      />
      <div className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <ProfileSettings />
          <SecuritySettings />
          <PreferencesSettings />
        </div>
      </div>
    </>
  )
}
