import { redirect } from "next/navigation";

export default function DashboardIndex() {
    // Default to the first tab (Global Market Intel)
    redirect("/dashboard/intelligence");
}
