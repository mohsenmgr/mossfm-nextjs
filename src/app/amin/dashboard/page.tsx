import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // must export authOptions in your auth route
import DashboardClient from "@/components/DashboardClient";

export const dynamic = "force-dynamic"; // ensure no caching of session checks

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // if no session, redirect to login page (which is /admin)
    redirect("/amin");
  }

  // Pass session to client component if needed
  return <DashboardClient session={session} />;
}