import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardRootPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const role = (session.user as any)?.role || "BUSINESS_OWNER";

  if (role === "ADMIN" || role === "BUSINESS_OWNER") {
    redirect("/dashboard/admin");
  } else if (role === "STAFF") {
    redirect("/dashboard/staff");
  } else if (role === "CUSTOMER") {
    redirect("/dashboard/customer");
  }

  redirect("/dashboard/admin");
}
