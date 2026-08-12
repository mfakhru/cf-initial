import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL ?? "";

export function HealthPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["health"],
    queryFn: () => fetch(`${API_URL}/health`).then((r) => r.json()),
  });

  return (
    <div>
      <h1>Health Check</h1>
      {isLoading && <p>Checking...</p>}
      {isError && <p>Backend unreachable.</p>}
      {data && (
        <p>Status: <strong>{data.status}</strong></p>
      )}
    </div>
  );
}
