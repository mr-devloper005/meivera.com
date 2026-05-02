"use client";

import { useState, useCallback } from "react";
import { Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShareButton({ variant = "outline", size = "sm" }: { variant?: "outline" | "ghost" | "default"; size?: "sm" | "default" | "lg" }) {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (url) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy URL:", error);
        // Fallback: try older method
        try {
          const textArea = document.createElement("textarea");
          textArea.value = url;
          textArea.style.position = "fixed";
          textArea.style.left = "-999999px";
          textArea.style.top = "-999999px";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (fallbackError) {
          console.error("Fallback copy failed:", fallbackError);
        }
      }
    }
  }, []);

  return (
    <Button
      variant={variant}
      size={size}
      className={`gap-2 transition-all duration-200 ${copied ? "bg-green-500 hover:bg-green-600 text-white border-green-500" : ""}`}
      onClick={handleShare}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          <span className="font-medium">URL Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </>
      )}
    </Button>
  );
}
