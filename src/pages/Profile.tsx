import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, Settings } from "lucide-react";
import { toast } from "sonner";
import tonnectLogo from "@/assets/tonnect-logo.jpeg";
import { getBalance } from "@/lib/balance";
import { getTelegramUser } from "@/telegram";

const Profile = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const tgUser = getTelegramUser();
    setUser(tgUser);
  }, []);

  const handleConnectWallet = () => {
    toast.info("TON Wallet connection coming soon!");
  };

  const fallbackUsername = "Guest#" + Math.floor(1000 + Math.random() * 9000);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold glow-text">Profile</h1>
        <p className="text-muted-foreground">Manage your account</p>
      </div>

      {/* Profile Header */}
      <div className="cyber-card rounded-2xl p-6 space-y-4">
        <div className="text-center">
          <div className="inline-block relative mb-4">
            <img
              src={tonnectLogo}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-primary animate-glow-pulse"
            />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-background" />
          </div>

          <h2 className="text-2xl font-bold mb-1">
            {user
              ? user.username || `${user.firstName} ${user.lastName || ""}`
              : fallbackUsername}
          </h2>

          <p className="text-sm text-muted-foreground">
            {user ? `ID: ${user.id}` : "user@example.com"}
          </p>
          <p className="text-xs text-muted-foreground mt-2">Member since January 2025</p>
        </div>
      </div>

      {/* Wallet Connection */}
      <div className="cyber-card rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Wallet className="w-5 h-5 text-primary" />
          TON Wallet
        </h2>

        <div className="space-y-3">
          <div className="p-4 bg-muted/50 rounded-lg border border-primary/20">
            <p className="text-sm text-muted-foreground">
              Connect your TON wallet to withdraw tokens and access Web3 features
            </p>
          </div>
          <Button
            onClick={handleConnectWallet}
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          >
            <Wallet className="w-4 h-4 mr-2" />
            Connect TON Wallet
          </Button>
        </div>
      </div>

      {/* Account Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="cyber-card rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Balance</p>
          <p className="text-2xl font-bold text-primary">{getBalance().toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">TONNECT</p>
        </div>

        <div className="cyber-card rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-1">Referrals</p>
          <p className="text-2xl font-bold text-accent">0</p>
          <p className="text-xs text-muted-foreground">Active users</p>
        </div>
      </div>

      {/* Task Coming Soon */}
      <div className="cyber-card rounded-2xl p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
          <Settings className="w-8 h-8 text-muted-foreground animate-spin-slow" />
        </div>
        <h3 className="font-bold mb-2">Tasks Feature</h3>
        <p className="text-sm text-muted-foreground">
          Complete daily tasks to earn bonus TONNECT. Coming soon!
        </p>
      </div>
    </div>
  );
};

export default Profile;

