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

export function ProfileHeaderCard({ post, content, category, location }: ProfileHeaderCardProps) {
  const logoUrl = content.logo || (Array.isArray(content.images) && content.images[0]);
  const website = content.website;
  const domain = website ? website.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : undefined;

  return (
    <Card className="overflow-hidden border-border bg-gradient-to-br from-card to-muted/30 shadow-sm">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
          {/* Circular Logo/Image */}
          <div className="flex-shrink-0">
            <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-background bg-muted shadow-lg ring-2 ring-border md:h-36 md:w-36">
              {logoUrl ? (
                <ContentImage
                  src={logoUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="144px"
                  intrinsicWidth={144}
                  intrinsicHeight={144}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 text-3xl font-bold text-primary md:text-4xl">
                  {post.title.slice(0, 1).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h1 className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
              {post.title}
            </h1>

            {/* Category */}
            <div className="mt-2">
              <Badge variant="secondary" className="inline-flex items-center gap-1 text-sm">
                <Tag className="h-3.5 w-3.5" />
                {category}
              </Badge>
            </div>

            {/* Location */}
            {location && (
              <div className="mt-3 flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{location}</span>
              </div>
            )}

            {/* Website Link */}
            {website && (
              <div className="mt-3">
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 hover:underline"
                >
                  <Globe className="h-4 w-4" />
                  {domain || website}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-5 flex items-center gap-3">
              <ShareButton />
              {website && (
                <Button asChild size="sm" className="gap-2">
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Visit Site
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
