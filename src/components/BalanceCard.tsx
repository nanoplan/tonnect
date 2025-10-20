import React, { useContext } from "react";
import { UserContext } from "@/context/UserContext";

interface BalanceCardProps {
  tokenName?: string;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ tokenName = "TONNECT" }) => {
  const { balance } = useContext(UserContext);

  return (
    <div className="w-full bg-white shadow-md rounded-xl p-4 text-center">
      <h3 className="text-gray-600 text-sm font-medium">Balance</h3>
      <p className="text-2xl font-bold text-gray-900 mt-2">
        {balance?.toLocaleString()} {tokenName}
      </p>
    </div>
  );
};

export default BalanceCard;
