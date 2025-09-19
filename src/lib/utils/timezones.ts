export interface Timezone {
  value: string;
  label: string;
  offset: string;
  region: string;
}

export const timezones: Timezone[] = [
  // UTC
  { value: "UTC", label: "UTC (GMT+00:00)", offset: "+00:00", region: "UTC" },

  // North America
  {
    value: "America/New_York",
    label: "Eastern Time (GMT-05:00)",
    offset: "-05:00",
    region: "New York",
  },
  {
    value: "America/Chicago",
    label: "Central Time (GMT-06:00)",
    offset: "-06:00",
    region: "Chicago",
  },
  {
    value: "America/Denver",
    label: "Mountain Time (GMT-07:00)",
    offset: "-07:00",
    region: "Denver",
  },
  {
    value: "America/Los_Angeles",
    label: "Pacific Time (GMT-08:00)",
    offset: "-08:00",
    region: "Los Angeles",
  },
  {
    value: "America/Anchorage",
    label: "Alaska Time (GMT-09:00)",
    offset: "-09:00",
    region: "Anchorage",
  },
  {
    value: "Pacific/Honolulu",
    label: "Hawaii Time (GMT-10:00)",
    offset: "-10:00",
    region: "Honolulu",
  },
  {
    value: "America/Toronto",
    label: "Eastern Time (GMT-05:00)",
    offset: "-05:00",
    region: "Toronto",
  },
  {
    value: "America/Vancouver",
    label: "Pacific Time (GMT-08:00)",
    offset: "-08:00",
    region: "Vancouver",
  },
  {
    value: "America/Mexico_City",
    label: "Central Time (GMT-06:00)",
    offset: "-06:00",
    region: "Mexico City",
  },

  // Europe
  {
    value: "Europe/London",
    label: "GMT (GMT+00:00)",
    offset: "+00:00",
    region: "London",
  },
  {
    value: "Europe/Paris",
    label: "CET (GMT+01:00)",
    offset: "+01:00",
    region: "Paris",
  },
  {
    value: "Europe/Berlin",
    label: "CET (GMT+01:00)",
    offset: "+01:00",
    region: "Berlin",
  },
  {
    value: "Europe/Rome",
    label: "CET (GMT+01:00)",
    offset: "+01:00",
    region: "Rome",
  },
  {
    value: "Europe/Madrid",
    label: "CET (GMT+01:00)",
    offset: "+01:00",
    region: "Madrid",
  },
  {
    value: "Europe/Amsterdam",
    label: "CET (GMT+01:00)",
    offset: "+01:00",
    region: "Amsterdam",
  },
  {
    value: "Europe/Stockholm",
    label: "CET (GMT+01:00)",
    offset: "+01:00",
    region: "Stockholm",
  },
  {
    value: "Europe/Vienna",
    label: "CET (GMT+01:00)",
    offset: "+01:00",
    region: "Vienna",
  },
  {
    value: "Europe/Zurich",
    label: "CET (GMT+01:00)",
    offset: "+01:00",
    region: "Zurich",
  },
  {
    value: "Europe/Athens",
    label: "EET (GMT+02:00)",
    offset: "+02:00",
    region: "Athens",
  },
  {
    value: "Europe/Helsinki",
    label: "EET (GMT+02:00)",
    offset: "+02:00",
    region: "Helsinki",
  },
  {
    value: "Europe/Moscow",
    label: "MSK (GMT+03:00)",
    offset: "+03:00",
    region: "Moscow",
  },

  // Asia
  {
    value: "Asia/Dubai",
    label: "GST (GMT+04:00)",
    offset: "+04:00",
    region: "Dubai",
  },
  {
    value: "Asia/Karachi",
    label: "PKT (GMT+05:00)",
    offset: "+05:00",
    region: "Karachi",
  },
  {
    value: "Asia/Kolkata",
    label: "IST (GMT+05:30)",
    offset: "+05:30",
    region: "Kolkata",
  },
  {
    value: "Asia/Dhaka",
    label: "BST (GMT+06:00)",
    offset: "+06:00",
    region: "Dhaka",
  },
  {
    value: "Asia/Bangkok",
    label: "ICT (GMT+07:00)",
    offset: "+07:00",
    region: "Bangkok",
  },
  {
    value: "Asia/Jakarta",
    label: "WIB (GMT+07:00)",
    offset: "+07:00",
    region: "Jakarta",
  },
  {
    value: "Asia/Shanghai",
    label: "CST (GMT+08:00)",
    offset: "+08:00",
    region: "Shanghai",
  },
  {
    value: "Asia/Hong_Kong",
    label: "HKT (GMT+08:00)",
    offset: "+08:00",
    region: "Hong Kong",
  },
  {
    value: "Asia/Singapore",
    label: "SGT (GMT+08:00)",
    offset: "+08:00",
    region: "Singapore",
  },
  {
    value: "Asia/Tokyo",
    label: "JST (GMT+09:00)",
    offset: "+09:00",
    region: "Tokyo",
  },
  {
    value: "Asia/Seoul",
    label: "KST (GMT+09:00)",
    offset: "+09:00",
    region: "Seoul",
  },
  {
    value: "Asia/Sydney",
    label: "AEST (GMT+10:00)",
    offset: "+10:00",
    region: "Sydney",
  },
  {
    value: "Asia/Melbourne",
    label: "AEST (GMT+10:00)",
    offset: "+10:00",
    region: "Melbourne",
  },

  // Australia & Oceania
  {
    value: "Australia/Perth",
    label: "AWST (GMT+08:00)",
    offset: "+08:00",
    region: "Perth",
  },
  {
    value: "Australia/Adelaide",
    label: "ACST (GMT+09:30)",
    offset: "+09:30",
    region: "Adelaide",
  },
  {
    value: "Australia/Brisbane",
    label: "AEST (GMT+10:00)",
    offset: "+10:00",
    region: "Brisbane",
  },
  {
    value: "Australia/Darwin",
    label: "ACST (GMT+09:30)",
    offset: "+09:30",
    region: "Darwin",
  },
  {
    value: "Pacific/Auckland",
    label: "NZST (GMT+12:00)",
    offset: "+12:00",
    region: "Auckland",
  },
  {
    value: "Pacific/Fiji",
    label: "FJT (GMT+12:00)",
    offset: "+12:00",
    region: "Fiji",
  },

  // Africa
  {
    value: "Africa/Cairo",
    label: "EET (GMT+02:00)",
    offset: "+02:00",
    region: "Cairo",
  },
  {
    value: "Africa/Johannesburg",
    label: "SAST (GMT+02:00)",
    offset: "+02:00",
    region: "Johannesburg",
  },
  {
    value: "Africa/Lagos",
    label: "WAT (GMT+01:00)",
    offset: "+01:00",
    region: "Lagos",
  },
  {
    value: "Africa/Nairobi",
    label: "EAT (GMT+03:00)",
    offset: "+03:00",
    region: "Nairobi",
  },
  {
    value: "Africa/Casablanca",
    label: "WET (GMT+00:00)",
    offset: "+00:00",
    region: "Casablanca",
  },

  // South America
  {
    value: "America/Sao_Paulo",
    label: "BRT (GMT-03:00)",
    offset: "-03:00",
    region: "São Paulo",
  },
  {
    value: "America/Argentina/Buenos_Aires",
    label: "ART (GMT-03:00)",
    offset: "-03:00",
    region: "Buenos Aires",
  },
  {
    value: "America/Santiago",
    label: "CLT (GMT-04:00)",
    offset: "-04:00",
    region: "Santiago",
  },
  {
    value: "America/Lima",
    label: "PET (GMT-05:00)",
    offset: "-05:00",
    region: "Lima",
  },
  {
    value: "America/Bogota",
    label: "COT (GMT-05:00)",
    offset: "-05:00",
    region: "Bogotá",
  },
  {
    value: "America/Caracas",
    label: "VET (GMT-04:00)",
    offset: "-04:00",
    region: "Caracas",
  },

  // Additional Major Cities
  {
    value: "Asia/Kuala_Lumpur",
    label: "MYT (GMT+08:00)",
    offset: "+08:00",
    region: "Kuala Lumpur",
  },
  {
    value: "Asia/Manila",
    label: "PHT (GMT+08:00)",
    offset: "+08:00",
    region: "Manila",
  },
  {
    value: "Asia/Taipei",
    label: "CST (GMT+08:00)",
    offset: "+08:00",
    region: "Taipei",
  },
  {
    value: "Asia/Mumbai",
    label: "IST (GMT+05:30)",
    offset: "+05:30",
    region: "Mumbai",
  },
  {
    value: "Asia/Tehran",
    label: "IRST (GMT+03:30)",
    offset: "+03:30",
    region: "Tehran",
  },
  {
    value: "Asia/Riyadh",
    label: "AST (GMT+03:00)",
    offset: "+03:00",
    region: "Riyadh",
  },
  {
    value: "Asia/Jerusalem",
    label: "IST (GMT+02:00)",
    offset: "+02:00",
    region: "Jerusalem",
  },
  {
    value: "Asia/Istanbul",
    label: "TRT (GMT+03:00)",
    offset: "+03:00",
    region: "Istanbul",
  },
  {
    value: "Europe/Dublin",
    label: "GMT (GMT+00:00)",
    offset: "+00:00",
    region: "Dublin",
  },
  {
    value: "Europe/Prague",
    label: "CET (GMT+01:00)",
    offset: "+01:00",
    region: "Prague",
  },
  {
    value: "Europe/Warsaw",
    label: "CET (GMT+01:00)",
    offset: "+01:00",
    region: "Warsaw",
  },
  {
    value: "Europe/Budapest",
    label: "CET (GMT+01:00)",
    offset: "+01:00",
    region: "Budapest",
  },
  {
    value: "Europe/Bucharest",
    label: "EET (GMT+02:00)",
    offset: "+02:00",
    region: "Bucharest",
  },
  {
    value: "Europe/Kiev",
    label: "EET (GMT+02:00)",
    offset: "+02:00",
    region: "Kiev",
  },
  {
    value: "America/Detroit",
    label: "Eastern Time (GMT-05:00)",
    offset: "-05:00",
    region: "Detroit",
  },
  {
    value: "America/Phoenix",
    label: "MST (GMT-07:00)",
    offset: "-07:00",
    region: "Phoenix",
  },
  {
    value: "America/Edmonton",
    label: "Mountain Time (GMT-07:00)",
    offset: "-07:00",
    region: "Edmonton",
  },
  {
    value: "America/Winnipeg",
    label: "Central Time (GMT-06:00)",
    offset: "-06:00",
    region: "Winnipeg",
  },
  {
    value: "America/Montreal",
    label: "Eastern Time (GMT-05:00)",
    offset: "-05:00",
    region: "Montreal",
  },
  {
    value: "America/Newfoundland",
    label: "NST (GMT-03:30)",
    offset: "-03:30",
    region: "Newfoundland",
  },
  {
    value: "Pacific/Guam",
    label: "ChST (GMT+10:00)",
    offset: "+10:00",
    region: "Guam",
  },
  {
    value: "Pacific/Samoa",
    label: "SST (GMT-11:00)",
    offset: "-11:00",
    region: "Samoa",
  },
  {
    value: "Pacific/Tahiti",
    label: "TAHT (GMT-10:00)",
    offset: "-10:00",
    region: "Tahiti",
  },
  {
    value: "Atlantic/Azores",
    label: "AZOT (GMT-01:00)",
    offset: "-01:00",
    region: "Azores",
  },
  {
    value: "Atlantic/Canary",
    label: "WET (GMT+00:00)",
    offset: "+00:00",
    region: "Canary Islands",
  },
  {
    value: "Indian/Maldives",
    label: "MVT (GMT+05:00)",
    offset: "+05:00",
    region: "Maldives",
  },
  {
    value: "Indian/Mauritius",
    label: "MUT (GMT+04:00)",
    offset: "+04:00",
    region: "Mauritius",
  },
  {
    value: "Indian/Reunion",
    label: "RET (GMT+04:00)",
    offset: "+04:00",
    region: "Réunion",
  },
  {
    value: "Antarctica/McMurdo",
    label: "NZST (GMT+12:00)",
    offset: "+12:00",
    region: "McMurdo Station",
  },
  {
    value: "Arctic/Longyearbyen",
    label: "CET (GMT+01:00)",
    offset: "+01:00",
    region: "Longyearbyen",
  },
];

// Helper function to get timezone by value
export const getTimezoneByValue = (value: string): Timezone | undefined => {
  return timezones.find((tz) => tz.value === value);
};

// Helper function to get timezones by region
export const getTimezonesByRegion = (region: string): Timezone[] => {
  return timezones.filter((tz) =>
    tz.region.toLowerCase().includes(region.toLowerCase())
  );
};

// Helper function to get timezones by offset
export const getTimezonesByOffset = (offset: string): Timezone[] => {
  return timezones.filter((tz) => tz.offset === offset);
};
