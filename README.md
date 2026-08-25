# RMonaghan Venture Studios

Portfolio website for RMonaghan Venture Studios LLC - a digital innovation lab specializing in AI-integrated iOS apps and end-to-end product development.

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Custom CSS (futuristic blue theme)
- **Forms**: React Hook Form + Zod
- **Email**: Resend
- **Hosting**: AWS Amplify (app `dn1zrfm6bzj7a`, account rmvs-workload)
- **Domain**: https://rmvs.org — registrar Squarespace, nameservers Route 53 zone `Z06944291HFSI0MT2571Z`, Amplify domain AVAILABLE
- **Analytics**: Plausible (cookieless, live). Meta Pixel + Conversions API: dataset `1050783991020921` (`RMVS ADS DATA SET WEB`) on `rmvs.org` only. Do not reuse this ID on client sites.

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
| `NEXT_PUBLIC_META_PIXEL_ID` | Events Manager dataset / Pixel ID (build-time). Live: `1050783991020921` |
| `META_CAPI_ACCESS_TOKEN` | Server-only Conversions API token from dataset Settings |
| `META_CAPI_TEST_EVENT_CODE` | Optional. Routes CAPI to Events Manager Test events; unset in production |

## Pages

- `/` - Home page with intro, projects, and skills
- `/about` - Full bio and background
- `/projects` - Portfolio overview
- `/projects/[slug]` - Individual project pages
- `/contact` - Contact form
- `/privacy` - Privacy policy
- `/terms` - Terms of use

## Projects Featured

- **VerbaLearn** - AI-powered learning suite (formerly ePrescience)
- **Auron Intelligence** - Medical AI for arterial CT analysis
- **Orchard** - Agent-native IDE for Apple platforms
- **We Make Pages** - Website builds and digital presence management
- **Sunkist Goofbox** - YouTube car channel
- **Unplugged PGH** - Music festivals & events

## Deployment (AWS Amplify)

Pushes to `main` on github.com/VerbaLearnTeam/rmvs-website auto-build on
Amplify app `dn1zrfm6bzj7a` (CLI profile `rmvs-workload`). Env vars are set on
the Amplify app, not in this repo.

DNS records (including future Meta domain-verification TXT) go in Route 53,
not Squarespace. Squarespace is registrar-only.

There is no Railway deploy for this site anymore.

## License

Copyright © 2026 RMonaghan Venture Studios LLC. All rights reserved.
