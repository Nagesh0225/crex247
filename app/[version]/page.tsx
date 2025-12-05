import { useParams } from "next/navigation";

export default function VersionPage() {
  const params = useParams();
  const version = typeof params.version === "string" ? params.version : Array.isArray(params.version) ? params.version[0] : "v1";
  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to {version} Version</h1>
      <p>This is the main page for <b>{version}</b>.</p>
      <p>To manage rolls and admins, go to <code>/{version}/admin</code>.</p>
    </main>
  );
}
