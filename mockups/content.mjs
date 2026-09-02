/**
 * The single source of truth for the fictional demonstration business
 * used in the /services "Conversion Redline" comparison.
 *
 * Both the 2004-era "before" site and the modern "after" site are
 * rendered from this object, so "same business, same information"
 * is literally true.
 *
 * All details are fictional:
 * - No phone or fax number appears anywhere — contact is email/request-form
 *   only, so no real business's number can ever be implied.
 * - The .example TLD is reserved (RFC 2606) and can never resolve.
 * - No contractor license number is shown anywhere.
 * - No third-party brand logos (card networks, financing, social) appear.
 * - No named reviewer or fabricated testimonial appears.
 */
export const business = {
  name: "Bluevane Heating & Cooling",
  shortName: "Bluevane",
  domain: "bluevaneheating.example",
  email: "service@bluevaneheating.example",
  area: "Greater Pittsburgh",
  since: "1998",
  credentials: "Licensed and insured",
  coreOffer: "Same-day heating and air-conditioning repair",
  services: [
    { name: "AC repair", blurb: "Fast diagnosis and same-day cooling repair for all makes and models." },
    { name: "Furnace repair", blurb: "No heat? We restore safe, efficient heating — quickly." },
    { name: "System installation", blurb: "High-efficiency systems sized and installed right the first time." },
    { name: "Seasonal maintenance", blurb: "Tune-ups that extend system life and prevent breakdowns." },
  ],
  hours: [
    ["Monday – Friday", "8:00 AM – 5:00 PM"],
    ["Saturday", "8:00 AM – 12:00 PM"],
    ["Sunday", "Emergency service only"],
  ],
  technicianPhoto: "technician.png",
};
