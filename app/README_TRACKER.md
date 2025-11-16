### Tracker helpers

`src/lib/analytics.ts` exposes `trackEvent`, `trackLead`, and `trackPageView`.  
Make sure you set both environment variables in `.env` before using them.  
Analytics only run when the app environment resolves to `production` via `NEXT_PUBLIC_VERCEL_ENV`, `NEXT_PUBLIC_APP_ENV`, or `NODE_ENV`, so local development and staging/preview deploys will skip tracking unless you explicitly opt in.

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=123456789
```

### Example usage

```tsx
"use client";

import type { FormEvent } from "react";

import { trackEvent, trackLead } from "@/lib/analytics";

export function CTAButton() {
  const handleClick = () => {
    trackEvent("cta_click", { location: "hero_section" });
  };

  return (
    <button type="button" onClick={handleClick}>
      สมัครเรียนเลย
    </button>
  );
}

export function LeadForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Submit form logic ...
    trackLead({ source: "lead_form", course: "frontend-bootcamp" });
  };

  return <form onSubmit={handleSubmit}>{/* form fields */}</form>;
}
```

Page views are tracked automatically via `AnalyticsPageViewTracker`, already mounted in `src/app/layout.tsx`.
