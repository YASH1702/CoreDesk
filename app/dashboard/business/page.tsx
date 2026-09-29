import { redirect } from "next/navigation";

export default function DashboardBusinessRedirect() {
  redirect("/dashboard/admin/cms");
}
