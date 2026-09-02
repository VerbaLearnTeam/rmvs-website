import { DEFAULT_VARIANT, RedlineLanding } from "./RedlineLanding";

export const metadata = {
  title: "Free Homepage Redline | RMVS",
  description:
    "Send your current homepage and get an annotated redline plus a proposed new hero — free, no call required, no obligation. Five-day websites for service businesses.",
};

export default function RedlinePage() {
  return <RedlineLanding variant={DEFAULT_VARIANT} />;
}
