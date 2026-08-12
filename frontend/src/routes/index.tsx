import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL ?? "";

export function HomePage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["root"],
    queryFn: () => fetch(`${API_URL}/`).then((r) => r.json()),
  });

  return (
    <div>
      <h1>Home</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Failed to fetch backend.</p>}
      {data && <p>{data.message}</p>}
    </div>
  );
}
