/**
 * Approximate micro-market centres, highlight polygons, and illustrative POIs for dossier maps.
 * Coordinates are representative for storytelling — refine with your GIS layer as needed.
 */

export type MapPoiCategory = "connectivity" | "hospital" | "school" | "cafe" | "employment";

export interface MapPoi {
  lat: number;
  lng: number;
  label: string;
  category: MapPoiCategory;
}

export interface LocationMapData {
  center: { lat: number; lng: number };
  /** Google Maps zoom; omit uses component default */
  zoom?: number;
  /** Closed polygon path highlighting the micro-market */
  highlightPath: { lat: number; lng: number }[];
  pois: MapPoi[];
}

function rectPath(lat: number, lng: number, dLat = 0.011, dLng = 0.013): { lat: number; lng: number }[] {
  return [
    { lat: lat + dLat, lng: lng - dLng },
    { lat: lat + dLat, lng: lng + dLng },
    { lat: lat - dLat, lng: lng + dLng },
    { lat: lat - dLat, lng: lng - dLng },
    { lat: lat + dLat, lng: lng - dLng },
  ];
}

export const MAP_POI_CATEGORY_LABEL: Record<MapPoiCategory, string> = {
  connectivity: "Connectivity",
  hospital: "Hospitals",
  school: "Schools",
  cafe: "Cafés & F&B",
  employment: "Jobs & offices",
};

/** Centres & boxes tuned per node (Navi Mumbai belt) */
export const LOCATION_MAP_BY_SLUG: Record<string, LocationMapData> = {
  airoli: {
    center: { lat: 19.151, lng: 72.996 },
    zoom: 14,
    highlightPath: rectPath(19.151, 72.996, 0.012, 0.014),
    pois: [
      { lat: 19.154, lng: 72.998, label: "Airoli railway station", category: "connectivity" },
      { lat: 19.149, lng: 72.992, label: "Eastern freeway / Thane link spine", category: "connectivity" },
      { lat: 19.153, lng: 72.99, label: "Reliance Hospital belt", category: "hospital" },
      { lat: 19.148, lng: 72.999, label: "Schools corridor (Airoli sectors)", category: "school" },
      { lat: 19.152, lng: 72.994, label: "Hiranandani / retail & cafés", category: "cafe" },
      { lat: 19.155, lng: 72.993, label: "MIDC / IT office catchment", category: "employment" },
    ],
  },
  belapur: {
    center: { lat: 19.018, lng: 73.042 },
    zoom: 14,
    highlightPath: rectPath(19.018, 73.042, 0.01, 0.012),
    pois: [
      { lat: 19.02, lng: 73.04, label: "Belapur CBD railway / bus hub", category: "connectivity" },
      { lat: 19.016, lng: 73.045, label: "NMMT & Palm Beach connectors", category: "connectivity" },
      { lat: 19.021, lng: 73.038, label: "MGM / specialty hospital catchment", category: "hospital" },
      { lat: 19.015, lng: 73.041, label: "DAV / Ryan belt (sectors)", category: "school" },
      { lat: 19.022, lng: 73.044, label: "CBD cafés & courts-side retail", category: "cafe" },
      { lat: 19.019, lng: 73.046, label: "Judicial & administrative employment node", category: "employment" },
    ],
  },
  dronagiri: {
    center: { lat: 18.927, lng: 73.015 },
    zoom: 13,
    highlightPath: rectPath(18.927, 73.015, 0.014, 0.016),
    pois: [
      { lat: 18.93, lng: 73.018, label: "Coastal road / port corridor", category: "connectivity" },
      { lat: 18.924, lng: 73.012, label: "JNPT approach & logistics spine", category: "connectivity" },
      { lat: 18.929, lng: 73.01, label: "Emerging hospital cluster (Ulwe–Dronagiri belt)", category: "hospital" },
      { lat: 18.925, lng: 73.017, label: "New township school belts", category: "school" },
      { lat: 18.928, lng: 73.013, label: "Highway diner & local F&B", category: "cafe" },
      { lat: 18.931, lng: 73.014, label: "Port, logistics & industrial employment", category: "employment" },
    ],
  },
  ghansoli: {
    center: { lat: 19.126, lng: 73.001 },
    zoom: 14,
    highlightPath: rectPath(19.126, 73.001, 0.011, 0.013),
    pois: [
      { lat: 19.128, lng: 73.003, label: "Ghansoli railway station", category: "connectivity" },
      { lat: 19.124, lng: 72.998, label: "Airoli creek bridge approaches", category: "connectivity" },
      { lat: 19.127, lng: 72.996, label: "Multi-specialty hospital belt", category: "hospital" },
      { lat: 19.123, lng: 73.002, label: "NMMC schools / CBSE belt", category: "school" },
      { lat: 19.125, lng: 72.999, label: "Sector high-street cafés", category: "cafe" },
      { lat: 19.129, lng: 72.997, label: "Rabale–MIDC office spillover", category: "employment" },
    ],
  },
  juinagar: {
    center: { lat: 19.058, lng: 73.063 },
    zoom: 14,
    highlightPath: rectPath(19.058, 73.063, 0.01, 0.012),
    pois: [
      { lat: 19.06, lng: 73.065, label: "Juinagar railway station", category: "connectivity" },
      { lat: 19.056, lng: 73.06, label: "Nerul & Palm Beach connectors", category: "connectivity" },
      { lat: 19.059, lng: 73.061, label: "Hospital belt toward Nerul", category: "hospital" },
      { lat: 19.057, lng: 73.066, label: "Schools around station walkshed", category: "school" },
      { lat: 19.055, lng: 73.064, label: "Local café & market streets", category: "cafe" },
      { lat: 19.061, lng: 73.062, label: "CBD Belapur commute corridor", category: "employment" },
    ],
  },
  kalamboli: {
    center: { lat: 19.029, lng: 73.104 },
    zoom: 13,
    highlightPath: rectPath(19.029, 73.104, 0.013, 0.015),
    pois: [
      { lat: 19.032, lng: 73.108, label: "Sion–Panvel highway & Kalamboli junction", category: "connectivity" },
      { lat: 19.026, lng: 73.1, label: "Expressway access to Mumbai / Pune", category: "connectivity" },
      { lat: 19.031, lng: 73.102, label: "Hospital cluster (Panvel belt)", category: "hospital" },
      { lat: 19.027, lng: 73.106, label: "School belt — township sectors", category: "school" },
      { lat: 19.03, lng: 73.099, label: "NH-side eateries & diners", category: "cafe" },
      { lat: 19.033, lng: 73.103, label: "Industrial & logistics employment", category: "employment" },
    ],
  },
  kalwa: {
    center: { lat: 19.193, lng: 72.993 },
    zoom: 14,
    highlightPath: rectPath(19.193, 72.993, 0.012, 0.014),
    pois: [
      { lat: 19.196, lng: 72.99, label: "Kalwa railway & Thane creek bridges", category: "connectivity" },
      { lat: 19.19, lng: 72.996, label: "Eastern corridor toward Navi Mumbai", category: "connectivity" },
      { lat: 19.194, lng: 72.991, label: "Thane–Kalwa hospital catchment", category: "hospital" },
      { lat: 19.191, lng: 72.995, label: "Established school neighbourhoods", category: "school" },
      { lat: 19.192, lng: 72.998, label: "Old-city markets & street food", category: "cafe" },
      { lat: 19.195, lng: 72.994, label: "MIDC & service-sector commutes", category: "employment" },
    ],
  },
  kamothe: {
    center: { lat: 18.998, lng: 73.104 },
    zoom: 14,
    highlightPath: rectPath(18.998, 73.104, 0.012, 0.014),
    pois: [
      { lat: 19.002, lng: 73.108, label: "Mumbai–Pune expressway access", category: "connectivity" },
      { lat: 18.995, lng: 73.1, label: "Panvel–Kalamboli arterial connectors", category: "connectivity" },
      { lat: 19.001, lng: 73.102, label: "Hospital belt (Kamothe sectors)", category: "hospital" },
      { lat: 18.996, lng: 73.106, label: "CBSE / ICSE school corridor", category: "school" },
      { lat: 18.999, lng: 73.099, label: "Sector markets & cafés", category: "cafe" },
      { lat: 19.003, lng: 73.105, label: "IT / back-office spillover — Belapur line", category: "employment" },
    ],
  },
  kharghar: {
    center: { lat: 19.048, lng: 73.066 },
    zoom: 14,
    highlightPath: rectPath(19.048, 73.066, 0.014, 0.016),
    pois: [
      { lat: 19.051, lng: 73.069, label: "Kharghar railway station", category: "connectivity" },
      { lat: 19.045, lng: 73.063, label: "Central park & Palm Beach road", category: "connectivity" },
      { lat: 19.05, lng: 73.064, label: "Tata / MGM hospital catchment", category: "hospital" },
      { lat: 19.046, lng: 73.068, label: "Schools belt — sectors 12–35", category: "school" },
      { lat: 19.049, lng: 73.062, label: "Little world & high-street F&B", category: "cafe" },
      { lat: 19.052, lng: 73.065, label: "Corporate parks — CBD spillover", category: "employment" },
    ],
  },
  koparkhairane: {
    center: { lat: 19.103, lng: 73.01 },
    zoom: 14,
    highlightPath: rectPath(19.103, 73.01, 0.011, 0.013),
    pois: [
      { lat: 19.105, lng: 73.012, label: "Koparkhairane railway station", category: "connectivity" },
      { lat: 19.101, lng: 73.007, label: "Thane–Belapur road spine", category: "connectivity" },
      { lat: 19.104, lng: 73.008, label: "Hospital cluster toward Vashi", category: "hospital" },
      { lat: 19.1, lng: 73.011, label: "NMMC & CBSE belt", category: "school" },
      { lat: 19.102, lng: 73.013, label: "Local cafés & sector markets", category: "cafe" },
      { lat: 19.106, lng: 73.009, label: "MIDC / IT corridor access", category: "employment" },
    ],
  },
  nerul: {
    center: { lat: 19.034, lng: 73.01 },
    zoom: 14,
    highlightPath: rectPath(19.034, 73.01, 0.012, 0.014),
    pois: [
      { lat: 19.036, lng: 73.012, label: "Nerul railway station", category: "connectivity" },
      { lat: 19.032, lng: 73.006, label: "Palm Beach Road — creek views", category: "connectivity" },
      { lat: 19.035, lng: 73.008, label: "Hospital belt — Nerul east", category: "hospital" },
      { lat: 19.031, lng: 73.011, label: "APEEJAY / Ryan belt", category: "school" },
      { lat: 19.033, lng: 73.013, label: "Waterfront clubs & café culture", category: "cafe" },
      { lat: 19.037, lng: 73.009, label: "CBD / commercial micro-markets", category: "employment" },
    ],
  },
  rabale: {
    center: { lat: 19.137, lng: 73.018 },
    zoom: 14,
    highlightPath: rectPath(19.137, 73.018, 0.011, 0.013),
    pois: [
      { lat: 19.139, lng: 73.02, label: "Rabale railway station", category: "connectivity" },
      { lat: 19.135, lng: 73.015, label: "Thane–Belapur industrial road", category: "connectivity" },
      { lat: 19.138, lng: 73.016, label: "Hospital access (Ghansoli / Rabale)", category: "hospital" },
      { lat: 19.134, lng: 73.019, label: "Workforce housing school belts", category: "school" },
      { lat: 19.136, lng: 73.021, label: "Industrial belt eateries", category: "cafe" },
      { lat: 19.14, lng: 73.017, label: "MIDC / manufacturing employment", category: "employment" },
    ],
  },
  sanpada: {
    center: { lat: 19.065, lng: 73.006 },
    zoom: 14,
    highlightPath: rectPath(19.065, 73.006, 0.01, 0.012),
    pois: [
      { lat: 19.067, lng: 73.008, label: "Sanpada railway station", category: "connectivity" },
      { lat: 19.063, lng: 73.003, label: "Palm Beach connectors to Vashi", category: "connectivity" },
      { lat: 19.066, lng: 73.004, label: "Hospital belt toward Vashi / Nerul", category: "hospital" },
      { lat: 19.064, lng: 73.009, label: "Schools along station belt", category: "school" },
      { lat: 19.062, lng: 73.007, label: "Seaside cafés & societies’ retail", category: "cafe" },
      { lat: 19.068, lng: 73.005, label: "Commercial belt — Palm Beach offices", category: "employment" },
    ],
  },
  seawoods: {
    center: { lat: 19.021, lng: 73.018 },
    zoom: 15,
    highlightPath: rectPath(19.021, 73.018, 0.009, 0.011),
    pois: [
      { lat: 19.023, lng: 73.02, label: "Seawoods–Darave railway / interchange", category: "connectivity" },
      { lat: 19.019, lng: 73.015, label: "Palm Beach & Uran road split", category: "connectivity" },
      { lat: 19.022, lng: 73.016, label: "Fortis / specialty access", category: "hospital" },
      { lat: 19.018, lng: 73.019, label: "International school cluster", category: "school" },
      { lat: 19.024, lng: 73.017, label: "Seawoods Grand Central F&B", category: "cafe" },
      { lat: 19.025, lng: 73.019, label: "IT & offices — Grand Central precinct", category: "employment" },
    ],
  },
  taloja: {
    center: { lat: 19.085, lng: 73.095 },
    zoom: 14,
    highlightPath: rectPath(19.085, 73.095, 0.013, 0.015),
    pois: [
      { lat: 19.088, lng: 73.098, label: "Taloja metro / Kharghar interchange stories", category: "connectivity" },
      { lat: 19.082, lng: 73.092, label: "NH-48 industrial corridor", category: "connectivity" },
      { lat: 19.086, lng: 73.093, label: "Emerging hospital cluster", category: "hospital" },
      { lat: 19.083, lng: 73.096, label: "New school belts — township phases", category: "school" },
      { lat: 19.087, lng: 73.094, label: "Highway diners & local markets", category: "cafe" },
      { lat: 19.089, lng: 73.091, label: "Industrial & logistics parks", category: "employment" },
    ],
  },
  turbhe: {
    center: { lat: 19.077, lng: 73.018 },
    zoom: 14,
    highlightPath: rectPath(19.077, 73.018, 0.01, 0.012),
    pois: [
      { lat: 19.079, lng: 73.02, label: "Turbhe railway station", category: "connectivity" },
      { lat: 19.075, lng: 73.015, label: "Vashi–Palm Beach connectors", category: "connectivity" },
      { lat: 19.078, lng: 73.016, label: "Hospital access (Vashi spillover)", category: "hospital" },
      { lat: 19.074, lng: 73.019, label: "Schools near station belt", category: "school" },
      { lat: 19.076, lng: 73.021, label: "Commuter cafés & daily needs", category: "cafe" },
      { lat: 19.08, lng: 73.017, label: "MIDC / Airoli employment spine", category: "employment" },
    ],
  },
  ulwe: {
    center: { lat: 18.981, lng: 73.032 },
    zoom: 13,
    highlightPath: rectPath(18.981, 73.032, 0.014, 0.016),
    pois: [
      { lat: 18.984, lng: 73.035, label: "Ulwe station / coastal road narrative", category: "connectivity" },
      { lat: 18.978, lng: 73.029, label: "JNPT & NAINA corridor", category: "connectivity" },
      { lat: 18.982, lng: 73.03, label: "Growing hospital cluster", category: "hospital" },
      { lat: 18.979, lng: 73.033, label: "New school projects — sectors", category: "school" },
      { lat: 18.983, lng: 73.028, label: "Township retail & cafés", category: "cafe" },
      { lat: 18.985, lng: 73.031, label: "Port, logistics & services jobs", category: "employment" },
    ],
  },
  vashi: {
    center: { lat: 19.078, lng: 72.994 },
    zoom: 14,
    highlightPath: rectPath(19.078, 72.994, 0.012, 0.014),
    pois: [
      { lat: 19.081, lng: 72.996, label: "Vashi railway station", category: "connectivity" },
      { lat: 19.075, lng: 72.99, label: "Palm Beach Road & Sion–Panvel highway", category: "connectivity" },
      { lat: 19.08, lng: 72.992, label: "Fortis / speciality hospital belt", category: "hospital" },
      { lat: 19.076, lng: 72.997, label: "Sector 28–53 school corridor", category: "school" },
      { lat: 19.074, lng: 72.993, label: "Inorbit & sector 17 F&B", category: "cafe" },
      { lat: 19.082, lng: 72.991, label: "Commercial offices — sector 17 spine", category: "employment" },
    ],
  },
};

export function getLocationMapData(slug: string): LocationMapData | undefined {
  return LOCATION_MAP_BY_SLUG[slug];
}
