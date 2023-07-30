"use client";

import axios from "axios";
import { Zap } from "lucide-react";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "./ui/button";

interface SubscriptionButtonProps {
  isPro: boolean;
}

export const SubscriptionButton: FC<SubscriptionButtonProps> = ({ isPro = false }) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      console.log("[BILLING_ERROR]", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button disabled={loading} variant={isPro ? "default" : "premium"} onClick={onClick}>
      {isPro ? "Manage Subscription" : "Upgrade to Pro"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};
