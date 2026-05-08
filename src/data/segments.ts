export interface SegmentProfile {
  slug: string;
  title: string;
  summary: string;
  pastPerformance: string;
  presentPerformance: string;
  strengths: string[];
  weaknesses: string[];
}

export const SEGMENTS: SegmentProfile[] = [
  {
    slug: "residential",
    title: "RESIDENTIAL",
    summary:
      "Apartments, societies, and end-user driven demand—compare liveability, liquidity, and rental pull by node.",
    pastPerformance:
      "Cycles tracked household income bands and commute friction more than headline launches.",
    presentPerformance:
      "Velocity stays strongest where transit, schools, and daily-needs depth converge—pricing spreads by micro-pocket.",
    strengths: ["Broad buyer funnel", "Resale depth in mature belts", "Rental demand around salary corridors"],
    weaknesses: ["Thin differentiation can cause discounting", "Amenity maintenance / service charges creep over time"],
  },
  {
    slug: "commercial",
    title: "COMMERCIAL",
    summary:
      "Offices and retail—micro-location dominance, catchment depth, and tenant mix decide durability.",
    pastPerformance:
      "Hybrid work tempered pure office expansion; retail stabilized faster in mature catchments.",
    presentPerformance:
      "Best performers pair walkable access with strong residential density and low churn tenants.",
    strengths: ["Sticky demand when catchments mature", "Yield-led underwriting possible on stabilized assets"],
    weaknesses: ["CAPEX heavier", "Liquidity can be lumpy versus residential"],
  },
  {
    slug: "industrial",
    title: "INDUSTRIAL",
    summary:
      "Industrial and logistics belts—tenancy follows power, access, and efficient floor plates.",
    pastPerformance:
      "Rent curves steadier than capital appreciation; execution quality drove tenant upgrades.",
    presentPerformance:
      "Demand clusters near credible infra and access routes; headlines can swing sentiment quickly.",
    strengths: ["Occupancy-led underwriting", "Longer leases when fit-out aligns with operations"],
    weaknesses: ["Environmental narratives matter", "Infrastructure shocks can disrupt access"],
  },
  {
    slug: "land",
    title: "LAND",
    summary:
      "Plots and land-led bets—pure patience asset class where approvals, access, and timelines dominate outcomes.",
    pastPerformance:
      "Re-rating arrived in bursts around infra milestones; liquidity thinned outside prime belts.",
    presentPerformance:
      "Best used for long-horizon positioning with clear exit paths; avoid story-only parcels.",
    strengths: ["Large optionality when access improves", "Lower carry costs than built inventory (case-dependent)"],
    weaknesses: ["Regulatory / title risk", "Longer holding periods and thinner liquidity"],
  },
];

export function getSegment(slug: string): SegmentProfile | undefined {
  return SEGMENTS.find((s) => s.slug === slug);
}
