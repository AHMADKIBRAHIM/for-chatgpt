import { AppShell } from "../components/layout/AppShell";
import { Card } from "../components/ui/Card";

export function TodayPage() {
  return (
    <AppShell>
      <div className="py-6 space-y-4">
        <h1 className="text-2xl font-bold">Today</h1>
        <Card>
          <p className="text-sm text-slate-500">Progress</p>
          <p className="text-3xl font-bold">65%</p>
        </Card>
        <Card>
          <p className="font-medium">Daily motivation</p>
          <p className="text-slate-500">Small steps every day build extraordinary results.</p>
        </Card>
      </div>
    </AppShell>
  );
}
