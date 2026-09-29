import { redirect } from "next/navigation";

export default function DashboardCustomersRedirect() {
  redirect("/dashboard/admin/customers");
}
