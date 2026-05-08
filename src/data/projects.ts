export type ProjectKind = "under_construction" | "resale" | "rental";
export type LandType = "agricultural" | "na_plot";

export interface ProjectCard {
  id: string;
  name: string;
  developer: string;
  locationSlug: string;
  segmentSlug: string;
  kind: ProjectKind;
  landType?: LandType;
  /** Optional image URL to override default card/hero imagery. */
  imageUrl?: string;
  possessionLabel: string;
  brief: string;
  strengths: string[];
  weaknesses: string[];
  nearbyServices: string[];
}

export const PROJECTS: ProjectCard[] = [
  {
    id: "p1",
    name: "Harbourline Residences",
    developer: "Sample Developers Ltd.",
    locationSlug: "vashi",
    segmentSlug: "residential",
    kind: "under_construction",
    possessionLabel: "Q4 2027",
    brief: "Metro walkshed compact towers targeting young professionals.",
    strengths: ["Walk-to-transit convenience", "High rental enquiry from office belts", "New-build amenity package"],
    weaknesses: ["Delivery timeline risk", "Construction-phase disturbance", "Pricing premium vs older resale stock"],
    nearbyServices: ["Station / transit hub", "Supermarket cluster", "Clinic", "School", "Café strip"],
  },
  {
    id: "p2",
    name: "Creekglass Towers",
    developer: "Waterfront Collective",
    locationSlug: "nerul",
    segmentSlug: "residential",
    kind: "under_construction",
    possessionLabel: "Q2 2028",
    brief: "Low-density creek-view stacks with club-led amenities.",
    strengths: ["View-led differentiation", "Low-density layouts", "Premium buyer perception"],
    weaknesses: ["Longer absorption cycles", "Higher ticket sizes narrow buyer pool", "Amenity maintenance costs"],
    nearbyServices: ["Creekfront promenade", "Hospital", "Mall", "School", "Palm Beach connector"],
  },
  {
    id: "p3",
    name: "Sector 36 Heights",
    developer: "NM Delta Homes",
    locationSlug: "kharghar",
    segmentSlug: "residential",
    kind: "resale",
    possessionLabel: "Ready since 2019",
    brief: "Park-adjacent resale inventory with stable rental traction.",
    strengths: ["Stable resale liquidity", "School catchment access", "Park adjacency"],
    weaknesses: ["Society ageing CAPEX over time", "Parking tightness in peak hours", "Limited new-age amenities vs launches"],
    nearbyServices: ["Central park", "School corridor", "Local market", "Metro/rail access", "Clinic"],
  },
  {
    id: "p4",
    name: "Airoli Exchange Offices",
    developer: "Latitude Commercial",
    locationSlug: "airoli",
    segmentSlug: "commercial",
    kind: "under_construction",
    possessionLabel: "Q1 2027",
    brief: "Grade-B office bays targeting tech SME expansions.",
    strengths: ["Office cluster adjacency", "Flexible bay sizing", "Potential lease-up from SME demand"],
    weaknesses: ["Hybrid work sensitivity", "Fit-out CAPEX for tenants", "Competition from newer micro-markets"],
    nearbyServices: ["IT park belt", "Transit access", "Food court", "Banking", "Pharmacy"],
  },
  {
    id: "p5",
    name: "Ulwe Runway Gardens",
    developer: "Greenfield Alliance",
    locationSlug: "ulwe",
    segmentSlug: "residential",
    kind: "under_construction",
    possessionLabel: "Q3 2029",
    brief: "Phased township blocks hedging airport-corridor thesis.",
    strengths: ["Greenfield entry pricing", "Phased township planning", "Airport-corridor optionality"],
    weaknesses: ["Long holding periods", "Infra timeline dependency", "Liquidity volatility"],
    nearbyServices: ["Arterial connector", "Retail strip (emerging)", "Clinic (emerging)", "Station access", "School (planned)"],
  },
  {
    id: "p6",
    name: "Taloja Junction Arcade",
    developer: "Frontier Retailworks",
    locationSlug: "taloja",
    segmentSlug: "commercial",
    kind: "resale",
    possessionLabel: "Leasing since 2016",
    brief: "Mixed high-street with stabilized FOHO tenants.",
    strengths: ["Stabilized tenancy", "High-street visibility", "Income-led underwriting"],
    weaknesses: ["CAPEX refresh needs", "Footfall depends on catchment growth", "Parking friction"],
    nearbyServices: ["Market road", "Bus stop", "Industrial belt", "Clinic", "Banking"],
  },
  {
    id: "p9",
    name: "Kharghar Lease Lofts",
    developer: "Illustrative Rentals",
    locationSlug: "kharghar",
    segmentSlug: "residential",
    kind: "rental",
    possessionLabel: "Available now",
    brief: "Rental-led inventory for salary-corridor demand (illustrative listing).",
    strengths: ["Immediate occupancy", "Lower commitment vs buy", "Flexible tenure"],
    weaknesses: ["Rent escalations over time", "Limited customization", "Availability can shift quickly"],
    nearbyServices: ["Station access", "Café strip", "Gym", "School", "Clinic"],
  },
  {
    id: "p10",
    name: "Belapur Workpods",
    developer: "Illustrative Rentals",
    locationSlug: "belapur",
    segmentSlug: "commercial",
    kind: "rental",
    possessionLabel: "Available now",
    brief: "Small office bays offered on lease terms (illustrative listing).",
    strengths: ["Low upfront cost vs purchase", "Flexible lease terms", "CBD adjacency"],
    weaknesses: ["Fit-out varies by unit", "Rent revisions", "Parking constraints near civic blocks"],
    nearbyServices: ["CBD station", "Food court", "Banking", "Metro interchange", "Clinic"],
  },
  {
    id: "p11",
    name: "Rabale Warehouse Lease",
    developer: "Illustrative Rentals",
    locationSlug: "rabale",
    segmentSlug: "industrial",
    kind: "rental",
    possessionLabel: "Available now",
    brief: "Industrial floor plates available for lease (illustrative listing).",
    strengths: ["Operational flexibility", "Lease-based scaling", "Employment belt adjacency"],
    weaknesses: ["Access roads congestion risk", "Power / loading constraints by unit", "Industrial headline sensitivity"],
    nearbyServices: ["MIDC belt", "Highway access", "Fuel station", "Food stalls", "Rail access"],
  },
  {
    id: "p7",
    name: "Ulwe Greenbelt Parcels",
    developer: "Illustrative Land Desk",
    locationSlug: "ulwe",
    segmentSlug: "land",
    kind: "resale",
    landType: "agricultural",
    possessionLabel: "Title verification required",
    brief: "Agricultural parcels for patient buyers tracking access milestones (illustrative listing).",
    strengths: ["Lower ticket entry vs NA parcels", "Optionality if access improves", "Patient capital upside profile"],
    weaknesses: ["Regulatory and title diligence required", "Long holding periods", "Thin liquidity"],
    nearbyServices: ["Arterial corridor (planned)", "Village market", "School", "Clinic", "Bus stop"],
  },
  {
    id: "p8",
    name: "Panvel NA Plot Cluster",
    developer: "Illustrative Land Desk",
    locationSlug: "kamothe",
    segmentSlug: "land",
    kind: "resale",
    landType: "na_plot",
    possessionLabel: "NA status check required",
    brief: "NA plots near arterial corridors (illustrative listing).",
    strengths: ["Clearer usability than agricultural", "Potential faster liquidity", "Arterial adjacency"],
    weaknesses: ["Pricing spreads by paperwork quality", "Approval / zoning risk", "Speculative sentiment cycles"],
    nearbyServices: ["Arterial connector", "Market", "Banking", "Clinic", "School"],
  },
];
