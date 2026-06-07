export interface ProjectMilestone {
  year: number | string;
  client: string;
  location: string;
  description: string;
  scope: "Residential" | "Commercial" | "Industrial" | "Specialty";
  duration: string;
  details?: string;
  techTags: string[];
}

export interface ClientProfile {
  id: string;
  name: string;
  logoText: string;
  industry: string;
  localPath?: string;
}

export interface HVACService {
  name: string;
  iconName: string;
  items: string[];
}

export interface ServiceProcess {
  step: string;
  title: string;
  description: string;
}

export interface GeographicZone {
  id: string;
  name: string;
  clientCount: number;
  highlightClients: string[];
  coordinates: { x: number; y: number }; // Relative percentage coordinates for map view
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const TIMELINE_DATA: ProjectMilestone[] = [
  {
    year: 1992,
    client: "Prabhu Enterprises Founding",
    location: "Mahim, Mumbai",
    description: "Founded the company with high hopes, working on small contracts and establishing core values of trust and HVAC technical craftsmanship.",
    scope: "Residential",
    duration: "Ongoing",
    techTags: ["Company Launch", "Contract Repair", "Diagnostic Testing"]
  },
  {
    year: 1993,
    client: "Gomantak Restaurant",
    location: "Dadar West Plaza, Mumbai",
    description: "Successfully assembled and completed full window AC installations. Custom manufactured responsive deep freezers & advanced water coolers.",
    scope: "Specialty",
    duration: "40 days",
    details: "First landmark contract: 2 custom units of 1.5-ton assembled window ACs alongside heavy commercial refrigeration units.",
    techTags: ["Custom Freezers", "Water Coolers", "1.5-Ton Window AC"]
  },
  {
    year: 1995,
    client: "Tips Cassette Plant",
    location: "Silvassa, India",
    description: "High-output complete AC installation for standard production temperatures across complex manufacturing and media tape replication facilities.",
    scope: "Industrial",
    duration: "20 days",
    techTags: ["Cassette Installation", "Plant Temp Control", "Thermal Balancing"]
  },
  {
    year: 1996,
    client: "Nanutel Hotel",
    location: "Margao, Goa",
    description: "Complete installation of advanced chillwater central HVAC system alongside a massive custom-built heavy walking cooler.",
    scope: "Industrial",
    duration: "1 month",
    details: "Commissioned a 90-ton chillwater central AC system and engineered a heavy walk-in cooler with 5.5 tons of custom-crafted compressors.",
    techTags: ["90 TR Chillwater System", "5.5 TR Custom Walk-In", "Central Air Handling"]
  },
  {
    year: 1997,
    client: "Neena Gupta (Celebrity Home)",
    location: "Lokhandwala, Andheri",
    description: "Personal residential split AC design and installation, creating optimal acoustics and seamless aesthetic blending.",
    scope: "Residential",
    duration: "3 days",
    techTags: ["Residential Splitting", "Acoustic Insulation", "Celebrity Residence"]
  },
  {
    year: "1997-B",
    client: "Andheri Commercial Plaza (Opp. T-Series)",
    location: "Andheri, Mumbai",
    description: "Complete custom assembly and casing of heavy-duty aluminum body cassette air conditioning systems.",
    scope: "Commercial",
    duration: "60 days",
    details: "Built and installed ten 2-ton high-efficiency custom cassette units featuring military-grade aluminum frames for maritime salt-spray resistance.",
    techTags: ["Custom Aluminum Body", "Ten 2-Ton Cassettes", "Bespoke Casing"]
  },
  {
    year: 1998,
    client: "Arch Pharma Plant",
    location: "Mumbai",
    description: "Engineered and fully installed specialized pharmaceutical grade HVAC climate controls across a massive production floor.",
    scope: "Industrial",
    duration: "90 days",
    details: "Over 5,000 square feet of cleanroom HVAC controls. Configured 23 fully assembled 1.5-ton split machines.",
    techTags: ["Cleanroom Ventilation", "23 Split HVAC units", "Arch Pharma"]
  },
  {
    year: 2000,
    client: "Parichay Garments",
    location: "Borivali, Mumbai",
    description: "Designed multi-zone ventilation and overhead high-efficiency split and cassette systems.",
    scope: "Commercial",
    duration: "15 days",
    details: "Nine 2-ton commercial split systems and 1 main heavy-duty 3-ton Cassette AC unit to optimize temperature for active retail and work floors.",
    techTags: ["Borivali Retail", "Multi-zone AC", "3-Ton Cassette"]
  },
  {
    year: 2003,
    client: "Sawantraj TejRaj & Sons",
    location: "Mumbai",
    description: "Premium commercial store cassette installation combined with ongoing preventive multi-unit residential home support.",
    scope: "Commercial",
    duration: "2 days",
    techTags: ["Dual Cassette Setup", "Premium Retail HVAC", "Full Residential AMC"]
  },
  {
    year: 2004,
    client: "Uncle's Kitchen Resort",
    location: "Khopoli & Ratnagiri",
    description: "Designed dual-branch hospitality cooling systems spanning inland mountain coordinates to coastal warm-humidity properties.",
    scope: "Commercial",
    duration: "20 days",
    details: "Total of 16 split air conditioners: 8 units of 2-ton split systems in Khopoli and 8 high-performance 2-ton splits for tropical Ratnagiri rooms.",
    techTags: ["Hospitality Cooling", "16 Split AC Units", "Tropical Humidity Guard"]
  },
  {
    year: 2005,
    client: "Reliance Rig Operation",
    location: "Jamnagar coastal coordinates",
    description: "Emergency rig offshore HVAC maintenance. Rectified complicated chillwater pipelines and sealed hazardous refrigerant leaks.",
    scope: "Industrial",
    duration: "9 days",
    techTags: ["Offshore Rig Repair", "Chillwater Line Weld", "Leak Diagnostics"]
  },
  {
    year: 2006,
    client: "Arch Pharmacy HQ",
    location: "Hyderabad",
    description: "Executed critical high-security lab climate controllers. Deepening a multi-decade repeating commercial-grade trust relationship.",
    scope: "Industrial",
    duration: "15 days",
    details: "Installed 8 advanced units including customized splits (1 and 2 Tons) and 2 high-capacity ceiling cassette HVAC setups.",
    techTags: ["Lab Environmental Control", "Industrial Cassettes", "Remote HQ Sync"]
  },
  {
    year: 2007,
    client: "Kala Hanuman Mandir",
    location: "Kandivali West, Mumbai",
    description: "Custom aesthetic blending of overhead cassette and heavy split units into historic structural temple columns.",
    scope: "Specialty",
    duration: "1 month",
    details: "Preserved acoustics and architecture with 2 high-tech 2-ton split units and 2 high-power overhead cassettes, along with 8 auxiliary split units.",
    techTags: ["Historic Landmark", "Invisible Ducting", "Acoustic Silence"]
  },
  {
    year: 2008,
    client: "Masjid Khana - Padegaon Block",
    location: "Aurangabad, India",
    description: "High-urgency complex installation executed ahead of critical state visits by His Holiness Mohammad Burhanuddin.",
    scope: "Commercial",
    duration: "12 days",
    details: "Fast reaction installation of 9 premium heavy-duty OLG split climate systems to handle large-density crowd gatherings under tight deadlines.",
    techTags: ["Emergency Timeline", "9 OLG ACs", "High Density Air Processing"]
  },
  {
    year: 2011,
    client: "Arch Pharma Headquarters",
    location: "Andheri, Mumbai",
    description: "Engineering design and full commissioning of centralized chilled-duct cooling zones for premium corporate skyscrapers.",
    scope: "Industrial",
    duration: "90 days",
    techTags: ["Centralized HVAC", "Skyscraper Ducting", "Variable Air Flow"]
  },
  {
    year: "2012-2015",
    client: "Waghad Vishal Hall",
    location: "Mumbai Suburbs",
    description: "Comprehensive 4-year Annual Maintenance Contract (AMC) managing massive ductable air systems handling high crowd volumes.",
    scope: "Commercial",
    duration: "4 Years",
    techTags: ["Ductable AMC", "Event Center Stability", "Compressor Overhauls"]
  },
  {
    year: 2016,
    client: "Piramal Tower Executive Wing",
    location: "Lower Parel, Mumbai",
    description: "High-spec modern 18 HP commercial variable-refrigerant VRV system deployment inside active executive skyscrapers.",
    scope: "Commercial",
    duration: "45 days",
    techTags: ["18 HP VRV Modernization", "Skyscraper Zoning", "High-efficiency Scroll"]
  },
  {
    year: "2016-B",
    client: "Naman Towers (Custom TFA)",
    location: "Prabhadevi, Mumbai",
    description: "Specially engineered custom-made 32-ton Treated Fresh Air (TFA) environmental control unit to cycle coastal fresh air.",
    scope: "Industrial",
    duration: "30 days",
    techTags: ["32 TR Custom TFA", "Fresh Air Cycling", "Marine-Grade Heat Exchangers"]
  },
  {
    year: 2018,
    client: "Jay Chemicals, Wagle Estate",
    location: "Thane, India",
    description: "Massive scale corporate design spanning 5,000 square feet of complex industrial labs, product mixing floors, and chemical vaults.",
    scope: "Industrial",
    duration: "60 days",
    details: "Designed a multi-tiered HVAC array: two 11-ton ducted units, 4 cassette ACs (3 TR), four 1.5-ton splits, three 1-ton splits, and an inline 5.5-ton Treated Fresh Air (TFA) system.",
    techTags: ["5,000 sq ft Factory", "Ducted 11-Ton Units", "Chemical Room Isolation"]
  },
  {
    year: "2018-B",
    client: "Sunteck Executive Penthouse",
    location: "Opp. American Consulate, BKC",
    description: "Ultramodern dual luxury penthouse climate infrastructure featuring next-generation twin 18 HP VRV Variable Refrigerant loops.",
    scope: "Residential",
    duration: "45 days",
    techTags: ["Twin 18 HP VRV Loops", "BKC Luxury Heights", "Low-Decibel Cooling"]
  },
  {
    year: 2019,
    client: "Abroad Needle Testing Facility",
    location: "Mumbai",
    description: "Cleanroom static pressure AC systems for absolute purity pharmaceutical needle test chambers.",
    scope: "Industrial",
    duration: "45 days",
    details: "Integrated 12 Daikin commercial split HVAC units with customized dust-separation carbon filters supporting particulate controls.",
    techTags: ["Daikin Master Calibration", "Particulate Scrubbing", "Static Pressure Calibration"]
  },
  {
    year: 2020,
    client: "Gammon India Complex",
    location: "Mumbai HQ",
    description: "Full preventive mechanical support and AMC keeping structural civil engineers cool across corporate headquarters.",
    scope: "Commercial",
    duration: "Continuous",
    techTags: ["Gammon India AMC", "Central Condenser Cleaning", "Preventive Gas Guard"]
  },
  {
    year: 2021,
    client: "BVG Airport Office Hub",
    location: "Mumbai International Airport (CSIA)",
    description: "Rapid high-security AC installation and ongoing preventive air monitoring support for airport operational towers.",
    scope: "Commercial",
    duration: "3 days",
    techTags: ["Airport Infrastructure", "Rapid Deploy System", "Continuous AMC"]
  },
  {
    year: "2023-2025",
    client: "Raptakos Brett Pharma Plant",
    location: "Mumbai & National Locations",
    description: "Industrial grade heavy-duty machinery HVAC AMC across manufacturing lines formulating global supplements.",
    scope: "Industrial",
    duration: "2 Years",
    techTags: ["Raptakos Brett AMC", "Heavy Scroll Compressors", "Vibration Isolation Dampers"]
  },
  {
    year: 2025,
    client: "Kohinoor Square Skyvilla",
    location: "Dadar, Mumbai",
    description: "Engineered premium chiller installations syncing with central Mitra Basu Chillar loops at extreme altitude heights.",
    scope: "Commercial",
    duration: "25 days",
    techTags: ["Mitra Basu Integration", "Skyvilla Chiller Pumps", "High Altitude Fluid Flows"]
  },
  {
    year: 2026,
    client: "GSB Kashi Matth Temple Complex",
    location: "Kashi Vishwanath, Varanasi",
    description: "Advanced environmental control layout for holy spiritual halls, seamlessly matching heritage interiors without visible piping.",
    scope: "Specialty",
    duration: "Ongoing",
    techTags: ["Varanasi Heritage Setup", "Invisible Ducting", "Spiritual Congregation HVAC"]
  }
];

export const CLIENT_LIST: ClientProfile[] = [
  { id: "bliss", name: "Bliss GVS", logoText: "B", industry: "Pharma", localPath: "/home/darshan/Documents/prabhuenterprises/media/clients/Bliss-GVS-Pharma-Limited-4-300x167-1.jpg" },
  { id: "gammon", name: "Gammon", logoText: "G", industry: "Infrastructure", localPath: "/home/darshan/Documents/prabhuenterprises/media/clients/gammonog-1.png" },
  { id: "uha", name: "UHA", logoText: "U", industry: "Engineering", localPath: "/home/darshan/Documents/prabhuenterprises/media/clients/addnkfvgddodu3q7ixyx.png.webp" },
  { id: "svg", name: "SVG Labs", logoText: "S", industry: "Healthcare", localPath: "/home/darshan/Documents/prabhuenterprises/media/clients/images.png" },
  { id: "zimlog", name: "Zim Log", logoText: "Z", industry: "Logistics", localPath: "/home/darshan/Documents/prabhuenterprises/media/clients/download.png" },
  { id: "hastakala", name: "Hastakala Textiles", logoText: "H", industry: "Apparel", localPath: "/home/darshan/Documents/prabhuenterprises/media/clients/images-1-1.png" },
  { id: "shinde", name: "Shinde Developers", logoText: "S", industry: "Construction", localPath: "/home/darshan/Documents/prabhuenterprises/media/clients/logo-1.png" },
  { id: "kalakruti", name: "Kalakruti Retail", logoText: "K", industry: "Garments", localPath: "/home/darshan/Documents/prabhuenterprises/media/clients/kalakruti-borivali-west-mumbai-readymade-garment-retailers-090oxv25ke.jpg" },
  { id: "taq", name: "TAQ Group", logoText: "TAQ", industry: "Technology", localPath: "/home/darshan/Documents/prabhuenterprises/media/clients/TAQ-Logo-Full.png" },
  { id: "talkee", name: "Talkee System", logoText: "T", industry: "Communication", localPath: "/home/darshan/Documents/prabhuenterprises/media/clients/Screenshot_20240521-001801.png" },
  { id: "nikhil", name: "Nikhil Pharma", logoText: "N", industry: "Research", localPath: "/home/darshan/Documents/prabhuenterprises/media/clients/images.jpeg" },
  { id: "swantraj", name: "Swantraj & Sons", logoText: "SS", industry: "Metals", localPath: "/home/darshan/Documents/prabhuenterprises/media/clients/WhatsApp-Image-2023-09-04-at-12.35.18-PM.jpeg" },
  { id: "omfurn", name: "Om Furn", logoText: "OF", industry: "Furnitures", localPath: "/home/darshan/Documents/prabhuenterprises/media/clients/LOGO_WITH_ALPHA_TRANSPARENT.png" },
  { id: "arch", name: "Arch Pharma", logoText: "A", industry: "Pharma Research", localPath: "/home/darshan/Documents/prabhuenterprises/media/clients/Arch1.png" },
  { id: "lionsclub", name: "Lions Club Mumbai", logoText: "L", industry: "Social Services", localPath: "/home/darshan/Documents/prabhuenterprises/media/clients/lions-club-santacruz-east-mumbai-clubs-v33b0pf9jl-1.jpg" },
  { id: "lodha", name: "Lodha Group", logoText: "LODHA", industry: "Real Estate", localPath: "" }
];

export const HVAC_SERVICES: HVACService[] = [
  {
    name: "Residential AC Services",
    iconName: "HomeIcon",
    items: [
      "Split AC repair and service",
      "Window AC repair and service",
      "Portable AC repair & tuning",
      "AC gas filling - R22, R32, R410A with high-purity pressure check",
      "Leak diagnostics, leak repair, and nitrogen pressure testing",
      "AC mounting, installation and precise uninstallation",
      "Outdoor unit compressor overhaul and terminal replacement",
      "Indoor unit blower descaling & deep copper coil cleaning",
      "PCB / controller troubleshooting and thermostat replacement"
    ]
  },
  {
    name: "Commercial HVAC Services",
    iconName: "BuildingIcon",
    items: [
      "Central air conditioning and heavy-duty ducted AC repairs",
      "Cassette AC installation, mechanical alignment, and maintenance",
      "Large-scale package unit troubleshooting & compressor swaps",
      "Varying Refrigerant Volume (VRV) and VRF system balancing",
      "Heavy commercial chilled water systems and coolant pump routing",
      "Air Handling Units (AHU) and Fan Coil Units (FCU) filter flushes",
      "Pharma cold rooms, walks-in coolers, and commercial refrigeration"
    ]
  },
  {
    name: "Maintenance & Support",
    iconName: "ShieldCheckIcon",
    items: [
      "Scheduled Annual Maintenance Contracts (Ordinary Service AMC)",
      "Full Comprehensive AMC covering major spares for stress-free operation",
      "Heavy-duty chemical coil wash and deep jet cleaning service",
      "24/7 Priority Emergency Breakdowns & Compressor restoration",
      "Pre-season diagnostics, fan speed calibration & AMP checks",
      "Fan motor repairs, solid state relay, and capacitor swapout",
      "Industrial ozone air sanitization & HVAC duct inspections"
    ]
  }
];

export const SERVICES_PROCESS_STEPS: ServiceProcess[] = [
  {
    step: "01",
    title: "Call or WhatsApp",
    description: "Launch direct communication by phone or digital message templates. Our emergency response team in Mahim stands ready 24/7."
  },
  {
    step: "02",
    title: "System Diagnosis",
    description: "A certified diagnostic HVAC engineer evaluates your unit on-site across Mumbai. Moderate diagnostic charges apply depending on system complexity."
  },
  {
    step: "03",
    title: "Transparent Quote",
    description: "We issue a detailed mechanical cost sheet, clear action items, and upfront flat rates before any copper line is cut."
  },
  {
    step: "04",
    title: "Expert Service",
    description: "Our certified mechanics execute immediate repair, copper braising, gas top-offs, or installations using specialist toolsets."
  },
  {
    step: "05",
    title: "Follow-up Care",
    description: "We deliver full operational signatures, system energy efficiency tips, and schedule preventive milestones for active performance."
  }
];

export const GEOGRAPHIC_ZONES: GeographicZone[] = [
  {
    id: "south-mumbai",
    name: "South Mumbai",
    clientCount: 412,
    highlightClients: ["Mitra Basu Chillar Dadar", "Piramal Towers Lower Parel", "Naman Towers Prabhadevi"],
    coordinates: { x: 114, y: 238 }
  },
  {
    id: "central-mumbai",
    name: "Central Mumbai & Mahim HQ",
    clientCount: 580,
    highlightClients: ["Bhagwansing Colony Mahim HQ", "Dadar West Plaza Gomantak", "Lions Club Santacruz"],
    coordinates: { x: 115, y: 230 }
  },
  {
    id: "western-suburbs",
    name: "Western Suburbs & BKC",
    clientCount: 390,
    highlightClients: ["Sunteck Penthouse Bandra/BKC", "Arch Pharma Andheri HQ", "Parichay Garments Borivali"],
    coordinates: { x: 113, y: 221 }
  },
  {
    id: "eastern-suburbs",
    name: "Eastern Suburbs",
    clientCount: 215,
    highlightClients: ["Wagle Estate Corporate Office", "Jay Chemicals Thane", "Kala Hanuman Kandivali"],
    coordinates: { x: 121, y: 218 }
  },
  {
    id: "thane-navi",
    name: "Thane & Navi Mumbai",
    clientCount: 164,
    highlightClients: ["Panvel Logistics Hub", "Airoli Tech Parks", "Vashi Cold Storages"],
    coordinates: { x: 128, y: 224 }
  },
  {
    id: "pan-india",
    name: "Pan-India Industrial Sites",
    clientCount: 125,
    highlightClients: ["Nanutel Goa Hotel", "Reliance Rig Jamnagar", "Arch Pharmacy Hyderabad", "Kashi Vishwanath Varanasi"],
    coordinates: { x: 175, y: 150 }
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: "How much does AC repair cost in Mumbai?",
    answer: "Basic AC dry or wet servicing starts at Rs. 1,050. Refrigerant gas refilling starts at Rs. 1,050. We conduct comprehensive diagnostic assessments for a standard diagnostic fee depending on the system type and scale, followed by a transparent fixed-price quote. If repairs proceed, diagnostic fees can be integrated into the repair budget to ensure absolute cost efficiency."
  },
  {
    question: "Is there a warranty on your repair work?",
    answer: "Absolutely. All brand-new machines supplied and installed carry a 1-year product warranty. Repair components supplied by us are backed by specific warranties up to 12 months depending on the exact metallic/compressor build, and our custom mechanical and diagnostic labor is covered for 7 days post-service."
  },
  {
    question: "How soon can a technician arrive?",
    answer: "For locations across Mumbai (Mahim, Bandra, Dadar, Andheri, South Mumbai etc.), we guarantee an expert diagnostic dispatch within 24 hours. For industrial clients spanning Pan-India sites, dispatch timelines typically range between 2 to 3 days depending on chemical coordinates and transport accessibility."
  },
  {
    question: "Which AC brands do you repair and install?",
    answer: "We support mechanical overhauls for all major brands, utilizing OEM spare parts. This includes Daikin, Voltas, Blue Star, LG, Samsung, Hitachi, Mitsubishi Electric, O-General, Panasonic, Carrier, Whirlpool, Godrej, and custom industrial specifications."
  },
  {
    question: "Do you handle central or commercial HVAC systems?",
    answer: "Yes, commercial HVAC is a major specialty at Prabhu Enterprises. We are fully equipped and have 30+ years of active field tenure handling ducted centrafugal ACs, multizoned VRV & VRF systems, ceiling cassettes, package setups, Chilled water loops, AHU units, FCUs, cleanroom filters, and custom factory climate controls."
  },
  {
    question: "Do you service industrial areas outside Mumbai?",
    answer: "Absolutely. While our primary diagnostic depot and main office sits in Mahim, Mumbai, we actively service prominent corporate/hospitality clients spanning Goa, Jamnagar, Silvassa, Hyderabad, Pune, Aurangabad, and Varanasi GSB Matth. Our mobile taskforce travels directly to your facility coordinates."
  },
  {
    question: "Do you offer Annual Maintenance Contracts (AMC) and how do they differ?",
    answer: "Yes, we structure two high-value AMC frameworks: (1) Ordinary Service Contract AMC: Standard preventive maintenance, 4 scheduled deep power washes, priority breakdown dispatches, and diagnostics with discount matrices for spares. (2) Comprehensive AMC Plan: Covers complete scheduling, seasonal wet servicing, plus all major spare components, circuit cards (PCBs), capacitors, and fan motors with zero additional repair billing. Both are designed to slash electricity power draw, extend HVAC compressor lifespans, and block unexpected breakdowns."
  }
];
