import AdminDashboard from "../../admin/dashboard/page";
import { useParams } from "next/navigation";

export default function DynamicVersionAdminDashboard() {
  const params = useParams();
  // params.version will be the dynamic version from the URL
  const version = typeof params.version === "string" ? params.version : Array.isArray(params.version) ? params.version[0] : "v1";
  return <AdminDashboard version={version} />;
}
