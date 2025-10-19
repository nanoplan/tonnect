import { useState, useEffect } from "react";
import { Coins } from "lucide-react";
import tonnectLogo from "@/assets/tonnect-logo.jpeg";
import { getBalance, getTotalClaimed } from "@/lib/balance";
import BalanceCard from "@/components/ui/BalanceCard";
import { useUser } from "@/context/UserContext";

const Dashboard = () => {
  const { userId } = useUser();

  const [totalSupply] = useState(10_000_000_000);
  const [claimedTokens, setClaimedTokens] = useState(0);
  const [userBalance, setUserBalance] = useState(0);

  useEffect(() => {
    setUserBalance(getBalance());
    setClaimedTokens(getTotalClaimed());

    const balanceInterval = setInterval(() => {
      setUserBalance(getBalance());
      setClaimedTokens(getTotalClaimed());
    }, 1000);

    return () => clearInterval(balanceInterval);
  }, []);

  const remainingSupply = totalSupply - claimedTokens;
  const claimedPercentage = ((claimedTokens / totalSupply) * 100).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <img
            src={tonnectLogo}
            alt="TONNECT Logo"
            className="w-24 h-24 rounded-full animate-glow-pulse"
          />
        </div>
        <h1 className="text-4xl font-bold glow-text">TONNECT</h1>
        <p className="text-lg text-accent">Mining Carnival</p>
      </div>

      <div className="cyber-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Coins className="w-6 h-6 text-primary" />
            Total Supply
          </h2>
          <span className="text-sm text-muted-foreground">Live</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Claimed</span>
            <span className="text-primary font-bold">{claimedPercentage}%</span>
          </div>

          <div className="relative h-4 bg-muted rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 animate-glow-pulse"
              style={{ width: `${claimedPercentage}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <p className="text-xs text-muted-foreground">Claimed</p>
              <p className="text-lg font-bold text-primary">
                {claimedTokens.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Remaining</p>
              <p className="text-lg font-bold text-secondary">
                {remainingSupply.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <BalanceCard userId={userId || "unknown-user"} />

      <div className="grid grid-cols-2 gap-4">
        <a
          href="/mining"
          className="cyber-card rounded-xl p-4 text-center hover:scale-105 transition-transform"
        >
          <div className="text-5xl mb-2 animate-float">⛏️</div>
          <p className="font-bold">Start Mining</p>
        </a>
        <a
          href="/spin"
          className="cyber-card rounded-xl p-4 text-center hover:scale-105 transition-transform"
        >
          <div className="text-5xl mb-2 animate-float">🎰</div>
          <p className="font-bold">Spin Now</p>
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <a
          href="/tasks"
          className="cyber-card rounded-xl p-4 text-center hover:scale-105 transition-transform"
        >
          <div className="text-5xl mb-2 animate-float">📋</div>
          <p className="font-bold">Tasks</p>
        </a>
        <div className="cyber-card rounded-xl p-4 text-center opacity-75">
          <div className="text-5xl mb-2 animate-float">🏪</div>
          <p className="font-bold">Store</p>
          <p className="text-xs text-muted-foreground mt-1">Coming Soon</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
