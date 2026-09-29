import { redirect } from "next/navigation";

export default function DashboardServicesRedirect() {
  redirect("/dashboard/admin/services");
}
