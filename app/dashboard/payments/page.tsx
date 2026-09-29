import { redirect } from "next/navigation";

export default function DashboardPaymentsRedirect() {
  redirect("/dashboard/admin/invoices");
}
