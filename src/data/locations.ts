export interface Location {
  city: string;
  country: string;
  flag: string;
  role: string;
  lat: number;
  lng: number;
  isHQ?: boolean;
}

export const locations: Location[] = [
  {
    city: "Pittsburgh",
    country: "PA",
    flag: "🏠",
    role: "Headquarters",
    lat: 40.4406,
    lng: -79.9959,
    isHQ: true,
  },
  {
    city: "Cleveland",
    country: "OH",
    flag: "🎓",
    role: "CWRU Network",
    lat: 41.4993,
    lng: -81.6944,
  },
  {
    city: "San Francisco",
    country: "CA",
    flag: "🌉",
    role: "Tech Partners",
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    city: "London",
    country: "UK",
    flag: "🇬🇧",
    role: "Research Partners",
    lat: 51.5074,
    lng: -0.1278,
  },
  {
    city: "Kilimanjaro",
    country: "Tanzania",
    flag: "🏔️",
    role: "teKsafari / BlackSnow",
    lat: -3.0674,
    lng: 37.3556,
  },
  {
    city: "Beijing",
    country: "China",
    flag: "🇨🇳",
    role: "Manufacturing",
    lat: 39.9042,
    lng: 116.4074,
  },
  {
    city: "Cape Town",
    country: "South Africa",
    flag: "🇿🇦",
    role: "Research Network",
    lat: -33.9249,
    lng: 18.4241,
  },
];
