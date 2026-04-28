"use client";

import { useState, useCallback } from "react";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShareButton({ variant = "outline", size = "sm" }: { variant?: "outline" | "ghost" | "default"; size?: "sm" | "default" | "lg" }) {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(() => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (url) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }).catch(() => {
        // Silent fail
      });
    }
  }, []);

  return (
    <Button
      variant={variant}
      size={size}
      className="gap-2"
      onClick={handleShare}
    >
      <Share2 className="h-4 w-4" />
      {copied ? "Copied!" : "Share"}
    </Button>
  );
}
