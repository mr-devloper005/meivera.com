"use client";

import { MapPin, Globe, ExternalLink, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContentImage } from "@/components/shared/content-image";
import { ShareButton } from "@/components/shared/share-button";
import type { SitePost } from "@/lib/site-connector";

type PostContent = {
  category?: string;
  location?: string;
  address?: string;
  website?: string;
  description?: string;
  logo?: string;
  images?: string[];
};

interface ProfileHeaderCardProps {
  post: SitePost;
  content: PostContent;
  category: string;
  location?: string;
}

// Helper function to strip HTML tags and return plain text
const stripHtml = (html: string): string => {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/&nbsp;/g, " ") // Replace non-breaking spaces
    .replace(/&amp;/g, "&") // Replace HTML entities
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
};

export function ProfileHeaderCard({ post, content, category, location }: ProfileHeaderCardProps) {
  const logoUrl = content.logo || (Array.isArray(content.images) && content.images[0]);
  const website = content.website;
  const domain = website ? website.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : undefined;

  return (
    <div className="space-y-8">
      {/* Clean Header Section */}
      <div className="text-center space-y-4">
        {/* Title */}
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">
          {post.title}
        </h1>

        {/* Subtitle with company name */}
        <div className="space-y-2">
          {category && (
            <div className="text-lg text-muted-foreground font-medium">
              {category.toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* Description Section */}
      {(content.description || post.summary) && (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 md:p-8">
            <div className="prose prose-gray max-w-none">
              <p className="text-base leading-relaxed text-muted-foreground">
                {stripHtml(content.description || post.summary || "")}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Section */}
      <div className="flex flex-col items-center gap-4">
        {website && (
          <Button asChild size="lg" className="gap-2 px-8">
            <a href={website} target="_blank" rel="noopener noreferrer">
              <Globe className="h-5 w-5" />
              {category || "Visit Website"}
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          )}
          <ShareButton />
        </div>
      </div>

      {/* Additional Details (Optional) */}
      {(website || location) && (
        <Card className="border-border/30 bg-muted/30">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              {website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground hover:underline transition-colors"
                  >
                    {domain || website}
                  </a>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{location}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
