import { notFound } from "next/navigation";
import { REDLINE_VARIANTS, RedlineLanding } from "../RedlineLanding";

export function generateStaticParams() {
  return Object.keys(REDLINE_VARIANTS).map((industry) => ({ industry }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await params;
  const variant = REDLINE_VARIANTS[industry];
  if (!variant) return {};
  return {
    title: `${variant.headline} | RMVS`,
    description: `${variant.sub} Start with a free homepage redline.`,
  };
}

export default async function IndustryRedlinePage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await params;
  const variant = REDLINE_VARIANTS[industry];
  if (!variant) notFound();
  return <RedlineLanding variant={variant} />;
}
