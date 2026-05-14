"use client";

import { useMemo, useState } from "react";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { SITE_CONFIG } from "@/lib/site-config";
import { ContactLeadForm } from "@/components/shared/contact-lead-form";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const contactOptions = useMemo(
    () => [
      { title: "Support", detail: `support@${SITE_CONFIG.domain}`, tag: "Email" },
      { title: "Partnerships", detail: `partners@${SITE_CONFIG.domain}`, tag: "Business" },
      { title: "Press", detail: `press@${SITE_CONFIG.domain}`, tag: "Media" },
    ],
    []
  );

  return (
    <PageShell
      title="Contact"
      description={`Reach the ${SITE_CONFIG.name} team for support, partnerships, or media queries.`}
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <ContactLeadForm />
          </CardContent>
        </Card>
        <div className="space-y-4">
          {contactOptions.map((option) => (
            <Card key={option.title} className="border-border bg-card">
              <CardContent className="p-6">
                <Badge variant="secondary">{option.tag}</Badge>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{option.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{option.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
