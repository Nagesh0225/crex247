import AdminLayout from "../../admin/Adminsidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout version="v3">{children}</AdminLayout>;
}