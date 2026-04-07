import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4 pb-20">
      <main>{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-3">
        <div className="mx-auto max-w-3xl flex justify-around text-sm">
          <Link to="/">{t("today")}</Link>
          <Link to="/habits">{t("habits")}</Link>
          <Link to="/analytics">{t("analytics")}</Link>
          <Link to="/settings">{t("settings")}</Link>
        </div>
      </nav>
    </div>
  );
}
