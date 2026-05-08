export interface AreaDeveloper {
  name: string;
  notableProjects: string;
}

export interface LocationInsight {
  slug: string;
  name: string;
  summary: string;
  lifestyle: string;
  connectivity: string;
  strengths: string[];
  weaknesses: string[];
  futureGrowth: string;
  pastPerformance: string;
  imageHints: string[];
  topDevelopers: AreaDeveloper[];
}

/** Alphabetical by display name */
export const NAVI_MUMBAI_LOCATIONS: LocationInsight[] = [
  {
    slug: "airoli",
    name: "Airoli",
    summary:
      "Knowledge corridor coupling—office absorption influences residential rentals more than lifestyle imagery.",
    lifestyle:
      "Tech park weekdays dominate rhythm; evening quiet versus central NM nodes; improving creek-road aesthetics.",
    connectivity:
      "Strong rail access and quick links to the Airoli IT belt; bridge corridors decide peak-hour friction toward central nodes.",
    strengths: [
      "Proximity to MIDC and Airoli IT clusters underpins rentals",
      "Solid upgrade demand from stable salary cohorts",
      "Ongoing road widening narratives reduce friction premiums",
    ],
    weaknesses: [
      "Weekend retail thinner versus Vashi/Nerul",
      "Older inventory stock competes with new towers",
      "Flooding headlines in extreme monsoon windows hurt sentiment",
    ],
    futureGrowth:
      "Metro arc completion plus creek-side upgrades could lift micro-markets tied to office walkshed.",
    pastPerformance:
      "Rental yields steadier than pure price CAGR—investors anchor on occupancy metrics.",
    imageHints: ["IT park glass façades", "Creek road widening", "Sector 19 towers"],
    topDevelopers: [
      { name: "Office-adjacent residential specialists", notableProjects: "Walk-to-work stacks" },
      { name: "Value-engineered tower makers", notableProjects: "Compact investor formats" },
    ],
  },
  {
    slug: "belapur",
    name: "Belapur",
    summary:
      "Administrative and judicial hub with CBD gravitas—steady institutional demand but differentiated from suburban residential buzz.",
    lifestyle:
      "Daytime office cadence, evening thinning versus station belts; improving curated dining near civic blocks.",
    connectivity:
      "CBD station + interchange narratives support access; micro-connectors and parking frictions matter near civic blocks.",
    strengths: [
      "CBD concentration anchors weekday footfall",
      "Metro interchange narratives tighten connectivity story",
      "Select premium pockets maintain scarcity positioning",
    ],
    weaknesses: [
      "Evening lull versus Vashi-style retail energy",
      "Older commercial stock competes with newer fringe nodes",
      "Parking pressure near civic complexes",
    ],
    futureGrowth:
      "Transit-oriented redevelopment on selected parcels could blend residential depth with office retention.",
    pastPerformance:
      "Long-cycle stability with premiums clustered around interchange proximity and low-density fringe villas.",
    imageHints: ["CBD skyline silhouettes", "Metro plaza approaches", "Judicial district corridors"],
    topDevelopers: [
      { name: "CBD-led mixed-use builders", notableProjects: "Transit-adjacent towers" },
      { name: "Regional civic-contract specialists", notableProjects: "Institutional-adjacent housing" },
    ],
  },
  {
    slug: "dronagiri",
    name: "Dronagiri",
    summary:
      "Industrial-port adjacent frontier node—buyer narratives tied to employment corridors and patient infrastructure timelines.",
    lifestyle:
      "Industrial weekday rhythm; emerging plotted and tower supply; longer drives to central NM retail.",
    connectivity:
      "Access is corridor-led (port / logistics arcs); timelines of last-mile links and road milestones set real usability.",
    strengths: [
      "Industrial employment base supports rental baselines",
      "Greenfield pricing can lag mature belts",
      "Port and logistics adjacency for niche investor cohorts",
    ],
    weaknesses: [
      "Social infrastructure still scaling versus older nodes",
      "Liquidity thinner—exit windows less predictable",
      "Environmental headlines around industrial adjacency",
    ],
    futureGrowth:
      "Road and coastal infrastructure milestones will dictate rerating velocity—track quarterly delivery credibility.",
    pastPerformance:
      "Higher volatility than inner NM—early movers traded liquidity for entry discounts.",
    imageHints: ["Coastal industrial horizons", "Emerging avenue grids", "Port-linked skylines"],
    topDevelopers: [
      { name: "Industrial-adjacent township makers", notableProjects: "Phased plotted sectors" },
      { name: "NM challenger brands", notableProjects: "Value towers near arterials" },
    ],
  },
  {
    slug: "ghansoli",
    name: "Ghansoli",
    summary:
      "Bridge-linked residential belt between Airoli logic and node maturity—rentals sensitive to IT corridor spillovers.",
    lifestyle:
      "Mixed old-new societies; improving mall and clinic access; commute oscillates with creek bridges.",
    connectivity:
      "Creek bridge approaches are the choke points; rail access supports daily commutes and drives resale liquidity.",
    strengths: [
      "Relative affordability versus Nerul/Vashi premiums",
      "Bridge connectivity unlocks office walkshed stories",
      "Upgrade buyer funnel from dense legacy pockets",
    ],
    weaknesses: [
      "Traffic spikes at choke bridges during peaks",
      "Uneven society vintage creates valuation dispersion",
      "Retail depth patchier than Vashi core",
    ],
    futureGrowth:
      "Bridge widening and selective densification could normalize yields—watch absorption vs launches locally.",
    pastPerformance:
      "Tracked Airoli cycles with a lag—liquidity improved as branded supply concentrated near arterials.",
    imageHints: ["Creek bridge approaches", "Mixed-era towers", "Local high-street stretches"],
    topDevelopers: [
      { name: "Mid-market tower specialists", notableProjects: "Bridge-proximate stacks" },
      { name: "Redevelopment-led locals", notableProjects: "Society cluster pilots" },
    ],
  },
  {
    slug: "juinagar",
    name: "Juinagar",
    summary:
      "Rail-first residential pocket with strong feeder-road connectivity—liquidity tied to transit upgrades and society vintage.",
    lifestyle:
      "Dense weekday commuter rhythm; improving neighbourhood retail; quieter evenings than Palm Beach belts.",
    connectivity:
      "Station walkshed is the core value; connector roads determine last-mile convenience to major employment belts.",
    strengths: [
      "Rail accessibility supports baseline rental demand",
      "Compact formats liquid among first-upgrade cohort",
      "Proximity debates versus Nerul price arb opportunities",
    ],
    weaknesses: [
      "Congestion near station approaches",
      "Older stock capex narratives",
      "Premium storytelling competes with Nerul creek positioning",
    ],
    futureGrowth:
      "Station-area upgrades and selective redevelopment could unlock marginal yield expansion.",
    pastPerformance:
      "Steady mid-band performance—outliers tied to station walkshed and wider formats.",
    imageHints: ["Station vicinity avenues", "Mid-rise residential stacks", "Connector roads"],
    topDevelopers: [
      { name: "Transit-proximate tower makers", notableProjects: "Compact commuter formats" },
      { name: "Legacy society redevelopers", notableProjects: "Cluster pilots near rail" },
    ],
  },
  {
    slug: "kalamboli",
    name: "Kalamboli",
    summary:
      "Industrial-residential blend along NH corridors—pricing Discovery trades congestion noise against affordability thesis.",
    lifestyle:
      "Industrial weekday cadence; widening arterial narratives; family buyers weighing ticket size versus commute.",
    connectivity:
      "Highway-led access is strong, but heavy-vehicle corridors create peak-hour drag—watch widening and interchange upgrades.",
    strengths: [
      "Affordable entry versus inner NM belts",
      "Industrial employment supports rentals in pockets",
      "Expressway access stories for patient commuters",
    ],
    weaknesses: [
      "Heavy vehicle movement on key roads",
      "Retail and schooling depth uneven by pocket",
      "Oversupply risk when launch cadence spikes",
    ],
    futureGrowth:
      "Logistics and industrial expansions could deepen tenant pools—monitor road upgrades quarterly.",
    pastPerformance:
      "Cyclical—volume-led phases alternate with consolidation when pipeline overshoots absorption.",
    imageHints: ["Expressway silhouettes", "Industrial skylines", "New township hoardings"],
    topDevelopers: [
      { name: "Affordable township builders", notableProjects: "NH-adjacent phased sectors" },
      { name: "Speed-to-market regional brands", notableProjects: "Compact towers" },
    ],
  },
  {
    slug: "kalwa",
    name: "Kalwa",
    summary:
      "Thane-NM fringe crossover—buyers arbitrage ticket size against Mumbai-side commute friction.",
    lifestyle:
      "Dense old-city texture beside newer towers; strong local services; peak-hour strain on bridges.",
    connectivity:
      "Bridge and rail links shape day-to-day experience; commute friction is the pricing discount driver versus core nodes.",
    strengths: [
      "Lower ticket floors versus premium NM nodes",
      "Established daily-needs ecosystems",
      "Redevelopment clauses unlocking modern supply",
    ],
    weaknesses: [
      "Commute friction to central NM employment pockets",
      "Congestion and parking stress in older cores",
      "Buyer sentiment splits on fringe positioning",
    ],
    futureGrowth:
      "Bridge and arterial upgrades could rerate select micro-markets—track civic timelines.",
    pastPerformance:
      "Stability over glamour—rentals follow salary corridors more than lifestyle headlines.",
    imageHints: ["Dense avenue sections", "Redevelopment cranes", "Creek-side connectors"],
    topDevelopers: [
      { name: "Redevelopment-first locals", notableProjects: "Cluster housing pilots" },
      { name: "Value tower builders", notableProjects: "Transit-buffer zones" },
    ],
  },
  {
    slug: "kamothe",
    name: "Kamothe",
    summary:
      "Established Panvel-belt residential depth with expressway proximity—investor sentiment sensitive to launch pacing.",
    lifestyle:
      "Young family-heavy launches; improving hospitals and schools; periodic construction phases along arterials.",
    connectivity:
      "Expressway proximity is the headline; internal arterials and junction congestion decide actual commute reliability.",
    strengths: [
      "Mature daily-needs depth versus newer greenfields",
      "Relative affordability with NM brand recognition",
      "Expressway connectivity narratives",
    ],
    weaknesses: [
      "Peak congestion until elevated networks mature",
      "Pipeline-heavy belts risk intermittent oversupply",
      "Liquidity variance by society vintage",
    ],
    futureGrowth:
      "Multi-modal upgrades and selective CBD spillovers could stabilize yields—watch absorption dashboards.",
    pastPerformance:
      "Tracked broader Panvel-belt cycles—patient buyers favored phased credible developers.",
    imageHints: ["Township avenues", "Expressway approaches", "Hospital anchors"],
    topDevelopers: [
      { name: "Township-first majors", notableProjects: "Multi-phase corridors" },
      { name: "Regional compact tower brands", notableProjects: "Investor-led formats" },
    ],
  },
  {
    slug: "kharghar",
    name: "Kharghar",
    summary:
      "Planned node with central park spine, strong schools corridor, and steady mid-premium residential absorption.",
    lifestyle:
      "Family-centric neighbourhoods, metro connectivity via CBD Belapur line (planned extensions), weekend recreation around Pandavkada hills fringe.",
    connectivity:
      "Rail + planned metro arcs support access; peak-hour exit corridors toward Mumbai create the main friction narrative.",
    strengths: [
      "Structured CIDCO layout and wider roads versus older suburbs",
      "Education cluster attracts long-stay tenants",
      "Relative ticket sizes still approachable for upgrade buyers",
    ],
    weaknesses: [
      "Peak-hour choke toward Mumbai exits",
      "Retail depth still catching up to population scale",
      "Some pockets oversupplied in compact 2-BHK inventory",
    ],
    futureGrowth:
      "NAINA influence on southern fringe, metro progression, and office spillover from Belapur can lift rentals—especially larger formats.",
    pastPerformance:
      "2018–2022 saw granular consolidation; 2023–2026 showed selective appreciation on metro-adjacent towers and park-facing units.",
    imageHints: ["Central park greens against skyline", "Metro station plaza rendering", "Tidy avenue sections near sector 20"],
    topDevelopers: [
      { name: "CIDCO-allotted plotted segments", notableProjects: "Sector-wise towers mix" },
      { name: "Regional branded developers", notableProjects: "Park-facing mid-rises" },
      { name: "Listed residential majors", notableProjects: "Metro corridor launches" },
    ],
  },
  {
    slug: "koparkhairane",
    name: "Koparkhairane",
    summary:
      "Ghansoli-adjacent residential belt with rail access—liquidity clusters around station walkshed and newer branded towers.",
    lifestyle:
      "Commuter-heavy weekdays; improving clinics and markets; creek connectivity debates versus Airoli.",
    connectivity:
      "Rail-first daily movement with quick links to neighbouring belts; last-mile station access and road width matter most.",
    strengths: [
      "Rail-first baseline demand",
      "Relative value versus Palm Beach premiums",
      "Redevelopment potential in older lanes",
    ],
    weaknesses: [
      "Peak congestion near station belts",
      "Uneven society quality inflates variance",
      "Retail energy below Vashi core",
    ],
    futureGrowth:
      "Station precinct upgrades and creek-bridge narratives could tighten yields—monitor launches locally.",
    pastPerformance:
      "Moderate CAGR with outperformers on interchange proximity and gated newer stacks.",
    imageHints: ["Station approaches", "Mid-rise skyline strips", "Connector arterials"],
    topDevelopers: [
      { name: "Transit-buffer tower makers", notableProjects: "Station walkshed stacks" },
      { name: "Redevelopment collectives", notableProjects: "Cluster housing pilots" },
    ],
  },
  {
    slug: "nerul",
    name: "Nerul",
    summary:
      "Upscale residential perception along creek-facing belts with yacht club adjacency driving niche premiums.",
    lifestyle:
      "Low-rise pockets merge into newer towers; boating clubs and creek views anchor leisure-led positioning.",
    connectivity:
      "Palm Beach Road and rail access keep commutes workable; creek-front pockets trade access for premium views.",
    strengths: [
      "Premium perception versus median Navi Mumbai",
      "Select creek-front inventory scarce by definition",
      "Connectivity bridges toward Uran industrial corridor",
    ],
    weaknesses: [
      "Ticket sizes temper velocity outside marquee towers",
      "Infrastructure ageing in older villa lanes",
      "Buyer cohort thinner—needs sharper differentiation",
    ],
    futureGrowth:
      "Waterfront placemaking and upgraded arterial links could widen buyer funnel beyond pure ultra-HNI.",
    pastPerformance:
      "High variance—view-led stacks compounded faster; interior sectors mirrored broader city averages.",
    imageHints: ["Creek horizon", "Club-house led society stacks", "Palm Beach connectors"],
    topDevelopers: [
      { name: "Premium waterfront specialists", notableProjects: "Creek-facing stacks" },
      { name: "Established NM majors", notableProjects: "Sector 44–56 corridor" },
    ],
  },
  {
    slug: "rabale",
    name: "Rabale",
    summary:
      "MIDC-adjacent residential-industrial blend—rentals often salary-corridor led rather than lifestyle marketed.",
    lifestyle:
      "Weekday industrial rhythm; pockets of newer towers; thinner weekend leisure versus coastal nodes.",
    connectivity:
      "Employment adjacency is the core: rail + arterial links support tenants; industrial access roads set daily friction.",
    strengths: [
      "Employment adjacency supports occupancy baselines",
      "Affordable tickets versus premium belts",
      "Upgrade funnel from legacy rental stock",
    ],
    weaknesses: [
      "Industrial proximity headlines for some buyer cohorts",
      "Retail and schooling uneven by micro-pocket",
      "Liquidity thinner than station giants",
    ],
    futureGrowth:
      "Infrastructure upgrades along employment belts could stabilize rents—track logistics expansions.",
    pastPerformance:
      "Yield-led narrative historically—price arcs smoother than speculative frontier nodes.",
    imageHints: ["Industrial skylines", "Mid-rise grids", "Arterial widening zones"],
    topDevelopers: [
      { name: "Salary-corridor tower makers", notableProjects: "Compact workforce formats" },
      { name: "Local redevelopment pilots", notableProjects: "Society cluster phases" },
    ],
  },
  {
    slug: "sanpada",
    name: "Sanpada",
    summary:
      "Palm Beach-linked residential belt with rail access—valuation debates hinge on view, vintage, and choke-point friction.",
    lifestyle:
      "Mixed tower and society texture; strong connectivity toward Vashi; evening breeze-led positioning on select stacks.",
    connectivity:
      "Palm Beach connectors + rail access drive premiums; choke-point junctions decide peak-hour delays.",
    strengths: [
      "Palm Beach proximity premium pockets",
      "Rail accessibility supports commuter liquidity",
      "Redevelopment upside in older societies",
    ],
    weaknesses: [
      "Peak-hour choke toward connectors",
      "Valuation dispersion across vintages",
      "Parking stress near hub roads",
    ],
    futureGrowth:
      "Waterfront upgrades and selective densification could tighten spreads versus Nerul peers.",
    pastPerformance:
      "Outperformers tied to creek-facing inventory and interchange adjacency.",
    imageHints: ["Palm Beach connectors", "Tower skylines", "Station feeder roads"],
    topDevelopers: [
      { name: "Water-adjacent premium builders", notableProjects: "View-led stacks" },
      { name: "Established NM brands", notableProjects: "Redevelopment-led societies" },
    ],
  },
  {
    slug: "seawoods",
    name: "Seawoods",
    summary:
      "Metro-linked megaproject perception node—buyer sentiment mixes mall gravitas with congestion realities.",
    lifestyle:
      "Retail-heavy weekends; office weekday spillovers; dense tower clusters around interchange.",
    connectivity:
      "Interchange-led connectivity is strong, but congestion clusters near mall/metro nodes—last-mile planning is key.",
    strengths: [
      "Strong mall and services gravity",
      "Metro narratives widen buyer funnel",
      "Premium inventory scarcity in view-led stacks",
    ],
    weaknesses: [
      "Congestion around interchange peaks",
      "Oversupply risk in compact formats during launch waves",
      "Parking and drop-off friction narratives",
    ],
    futureGrowth:
      "Office absorption beside residential depth could lift blended yields—monitor leasing headlines.",
    pastPerformance:
      "Dispersion high—mall-adjacent and interchange stacks led curves; interior pockets moderated.",
    imageHints: ["Mall plaza silhouettes", "Metro interchange", "High-rise clusters"],
    topDevelopers: [
      { name: "Megaproject integrators", notableProjects: "Mixed-use precincts" },
      { name: "Premium tower majors", notableProjects: "Interchange walkshed" },
    ],
  },
  {
    slug: "taloja",
    name: "Taloja",
    summary:
      "Affordable mid-corridor node balancing metro storytelling with industrial adjacency and patchy social infra pacing.",
    lifestyle:
      "Young buyer-heavy launches; improving arterial links; periodic dust and construction phases.",
    connectivity:
      "Metro milestones and arterial widening are the unlock; day-to-day depends on last-mile roads and junction flow.",
    strengths: [
      "Ticket floors attractive for first-home cohort",
      "Metro execution milestones can rerate strips quickly",
      "Industrial employment supports rentals in pockets",
    ],
    weaknesses: [
      "Schooling and healthcare depth uneven",
      "Traffic narratives during widening windows",
      "Liquidity follows credible delivery brands",
    ],
    futureGrowth:
      "Metro progression plus road widening could normalize yields—track civic timelines quarterly.",
    pastPerformance:
      "Higher beta than inner NM—selective outperformers tied to station proximity.",
    imageHints: ["Metro viaduct perspectives", "Emerging township grids", "Industrial horizons"],
    topDevelopers: [
      { name: "Affordable township specialists", notableProjects: "Phased corridor launches" },
      { name: "Speed builders", notableProjects: "Compact investor stacks" },
    ],
  },
  {
    slug: "turbhe",
    name: "Turbhe",
    summary:
      "Station-adjacent residential belt with industrial-employment undertone—liquidity clusters near rail and main roads.",
    lifestyle:
      "Dense commuter weekdays; local markets mature; quieter leisure positioning versus coastal peers.",
    connectivity:
      "Station adjacency supports rentals; access to industrial belts is strong, while hub-road congestion is the watch-out.",
    strengths: [
      "Rail accessibility supports rentals",
      "Affordable formats versus premium creek belts",
      "Industrial spillovers for tenant demand",
    ],
    weaknesses: [
      "Industrial proximity headlines for selective buyers",
      "Congestion near hub connectors",
      "Premium storytelling competes with Sanpada/Nerul",
    ],
    futureGrowth:
      "Station precinct upgrades and road widening could lift micro-markets—monitor redevelopment filings.",
    pastPerformance:
      "Yield-stable arcs historically—price leaders tied to interchange proximity.",
    imageHints: ["Station vicinities", "Industrial skylines", "Dense avenue grids"],
    topDevelopers: [
      { name: "Transit-buffer builders", notableProjects: "Commuter-led towers" },
      { name: "Regional value brands", notableProjects: "Compact resale-friendly formats" },
    ],
  },
  {
    slug: "ulwe",
    name: "Ulwe",
    summary:
      "Greenfield node balancing airport proximity optimism with timeline-sensitive buyer patience.",
    lifestyle:
      "Emerging daily-needs retail, wide avenues on paper, periodic construction dust phases.",
    connectivity:
      "Connectivity is milestone-driven (road/rail/airport narrative); usable last-mile networks dictate real livability today.",
    strengths: [
      "Greenfield pricing discovery still forming upside cases",
      "NAINA-linked storytelling for patient capital",
      "Lower legacy congestion versus mature belts",
    ],
    weaknesses: [
      "Social infrastructure lag can stretch holding periods",
      "Liquidity thinner—exit windows less predictable",
      "Sentiment swings with airport headline cadence",
    ],
    futureGrowth:
      "Road-rail-air convergence thesis—monitor quarterly launch-to-sales ratios instead of narrative alone.",
    pastPerformance:
      "Earlier boom–cool cycles; recent stabilization favors phased builders with delivery credibility.",
    imageHints: ["Wide arterial perspectives", "NAINA hoardings", "Sunset flat horizons"],
    topDevelopers: [
      { name: "Township-first builders", notableProjects: "Multi-phase sectors" },
      { name: "NM challenger brands", notableProjects: "Cost-led towers" },
    ],
  },
  {
    slug: "vashi",
    name: "Vashi",
    summary:
      "Established retail and services spine of Navi Mumbai with mature rentals but ageing micro-markets in pockets.",
    lifestyle:
      "Walkable sectors near station, strong healthcare and schooling access, evening economy along Palm Beach feeder roads.",
    connectivity:
      "Best-in-class rail + arterial access for Navi Mumbai; station belts are walkable but congestion/parking shape comfort.",
    strengths: [
      "Highest liquidity for resale in Navi Mumbai",
      "Rail-first commuters retain baseline rental demand",
      "Commercial spillovers support compact office leasing",
    ],
    weaknesses: [
      "Congestion and parking stress near station belts",
      "Older societies may need capex for modernization",
      "Premium new supply competes with Thane micro-markets",
    ],
    futureGrowth:
      "Focused redevelopment clauses and selective densification on transit plots could unlock marginal yield expansion.",
    pastPerformance:
      "Long horizon stability with modest CAGR versus frontier nodes; outperformers tied to Palm Beach proximity.",
    imageHints: ["Sector 17 market bustle", "Station interchange approaches", "Inorbit corridor"],
    topDevelopers: [
      { name: "Legacy society redevelopers", notableProjects: "Cluster redevelopment pilots" },
      { name: "Retail-led mixed-use builders", notableProjects: "High-street integrations" },
    ],
  },
];

export function getLocation(slug: string): LocationInsight | undefined {
  return NAVI_MUMBAI_LOCATIONS.find((l) => l.slug === slug);
}
