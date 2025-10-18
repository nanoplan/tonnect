import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

async function fetchStats(userId: string) {
  const { data, error } = await supabase.rpc("get_user_stats", { user_id: userId });
  if (error) throw error;
  return data[0];
}

export default function BalanceCard({ userId }: { userId: string }) {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["stats", userId],
    queryFn: () => fetchStats(userId),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="cyber-card p-6 text-center">
      <h2 className="text-lg font-bold mb-2">Your Balance</h2>
      <p className="text-4xl font-bold text-primary">{stats?.total ?? 0}</p>
      <p className="text-xs text-muted-foreground mb-4">TONNECT</p>

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-blue-500 font-bold">+{stats?.today ?? 0}</p>
          <p className="text-muted-foreground">Today</p>
        </div>
        <div>
          <p className="text-purple-500 font-bold">+{stats?.this_week ?? 0}</p>
          <p className="text-muted-foreground">This Week</p>
        </div>
        <div>
          <p className="font-bold">{stats?.rank ?? "-"}</p>
          <p className="text-muted-foreground">Rank</p>
        </div>
      </div>
    </div>
  );
}
