"use client";

import { FC, useEffect, useState } from "react";

import { MAX_FREE_COUNTS } from "@/constants";
import useProModal from "@/hooks/use-pro-modal";
import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";

interface FreeCounterProps {
  apiLimitCount: number;
  isPro: boolean;
}

export const FreeCounter: FC<FreeCounterProps> = ({ apiLimitCount = 0, isPro = false }) => {
  const [mounted, setMounted] = useState(false);
  const proModal = useProModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isPro) {
    return null;
  }

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress className="h-3" value={(apiLimitCount / MAX_FREE_COUNTS) * 100} />
          </div>
          <Button variant="premium" className="w-full" onClick={proModal.onOpen}>
            Upgrade <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
