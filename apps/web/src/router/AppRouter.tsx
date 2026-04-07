import { Navigate, Route, Routes } from "react-router-dom";
import { TodayPage } from "../pages/TodayPage";
import { LoginPage } from "../pages/LoginPage";
import { HabitsPage } from "../pages/HabitsPage";
import { AnalyticsPage } from "../pages/AnalyticsPage";
import { SettingsPage } from "../pages/SettingsPage";
import { useAuthStore } from "../store/auth.store";

function Protected({ children }: { children: JSX.Element }) {
  const user = useAuthStore((s) => s.user);
  return user ? children : <Navigate to="/login" replace />;
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <Protected>
            <TodayPage />
          </Protected>
        }
      />
      <Route path="/habits" element={<Protected><HabitsPage /></Protected>} />
      <Route path="/analytics" element={<Protected><AnalyticsPage /></Protected>} />
      <Route path="/settings" element={<Protected><SettingsPage /></Protected>} />
    </Routes>
  );
}
