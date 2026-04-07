import i18n from "../i18n";
import { AppShell } from "../components/layout/AppShell";

export function SettingsPage() {
  return (
    <AppShell>
      <div className="py-6 space-y-3">
        <h1 className="text-2xl font-bold">Settings</h1>
        <div className="flex gap-2">
          <button className="rounded-xl border px-3 py-2" onClick={() => i18n.changeLanguage("en")}>English</button>
          <button className="rounded-xl border px-3 py-2" onClick={() => i18n.changeLanguage("ar")}>العربية</button>
        </div>
      </div>
    </AppShell>
  );
}
