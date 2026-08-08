"use client";

import { useEffect } from "react";
import Script from "next/script";
import { captureUtms, trackEvent } from "@/lib/pixels";

const META_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
const REDDIT_ID = process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID ?? "";

/**
 * Injects the Meta + Reddit base pixels when their IDs are configured
 * (Amplify env vars, inlined at build). Also captures first-touch UTMs and
 * auto-tracks high-intent link clicks (Stripe checkout, Cal.com booking)
 * so individual components don't each need wiring.
 */
export default function AdPixels() {
  useEffect(() => {
    captureUtms();

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      if (a.href.includes("buy.stripe.com")) trackEvent("InitiateCheckout");
      else if (a.href.includes("cal.com")) trackEvent("ScheduleCall");
    };
    document.addEventListener("click", onClick, { capture: true, passive: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return (
    <>
      {META_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_ID}');fbq('track','PageView');`}
        </Script>
      )}
      {REDDIT_ID && (
        <Script id="reddit-pixel" strategy="afterInteractive">
          {`!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js";t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','${REDDIT_ID}');rdt('track','PageVisit');`}
        </Script>
      )}
    </>
  );
}
