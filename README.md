# RMonaghan Venture Studios

Portfolio website for RMonaghan Venture Studios LLC - a digital innovation lab specializing in AI-integrated iOS apps and end-to-end product development.

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Custom CSS (futuristic blue theme)
- **Forms**: React Hook Form + Zod
- **Email**: Resend
- **Hosting**: Railway

## Quick Start

```bash
npm install
cp .env.example .env
# Edit .env with your Resend API key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Your Resend API key (from resend.com) |
| `EMAIL_FROM` | Sender email address |
| `NOTIFY_EMAIL` | Email to receive contact form submissions |

## Pages

- `/` - Home page with intro, projects, and skills
- `/about` - Full bio and background
- `/projects` - Portfolio overview
- `/projects/[slug]` - Individual project pages
- `/contact` - Contact form
- `/privacy` - Privacy policy
- `/terms` - Terms of use

## Projects Featured

- **ePrescience** - AI-powered learning suite (formerly VerbaLearn)
- **Spec'd** - Car ownership/maintenance iOS app
- **Auron Intelligence** - Medical AI for arterial CT analysis
- **Neura** - Smart sleep mask (Case Western collab)
- **Sunkist Goofbox** - YouTube car channel
- **Unplugged PGH** - Music festivals & events

## Deployment (Railway)

1. Create a Railway project from this GitHub repo
2. Add environment variables:
   - `RESEND_API_KEY`
   - `EMAIL_FROM`
   - `NOTIFY_EMAIL`
3. Generate a public domain in Networking settings
4. Deploy!

No database needed - this is a static marketing site with email delivery.

## License

Copyright © 2026 RMonaghan Venture Studios LLC. All rights reserved.
