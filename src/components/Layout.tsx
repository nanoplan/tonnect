import { useEffect, useState, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Zap, Gift, Users, Trophy, User } from "lucide-react";
import { signInWithTelegram } from "@/lib/auth";
import { UserContext } from "@/context/UserContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const profile = await signInWithTelegram();
        if (profile?.id) {
          setUserId(profile.id);
        } else {
          console.warn("⚠️ Telegram user not detected. Fallback to guest mode.");
          setUserId("guest");
        }
      } catch (err) {
        console.error("Telegram init failed:", err);
        setUserId("guest");
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-white">⏳ Initializing Tonnect...</div>;
  }

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/mining", icon: Zap, label: "Mining" },
    { path: "/spin", icon: Gift, label: "Spin" },
    { path: "/referral", icon: Users, label: "Referral" },
    { path: "/leaderboard", icon: Trophy, label: "Leaderboard" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <UserContext.Provider value={{ userId }}>
      <div className="min-h-screen pb-20 bg-background text-foreground">
        <main className="container mx-auto px-4 py-6 max-w-lg">
          {children}
        </main>

        <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-primary/30 z-50">
          <div className="container mx-auto max-w-lg">
            <div className="grid grid-cols-6 gap-1 py-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all ${
                      isActive
                        ? "text-primary glow-text"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 mb-1 ${
                        isActive ? "animate-glow-pulse" : ""
                      }`}
                    />
                    <span className="text-xs font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </UserContext.Provider>
  );
}
