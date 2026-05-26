import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Share2,
  MapPin,
  Calendar,
  Ruler,
  Shield,
  Home as HomeIcon,
  Bath,
  BedDouble,
  Trees,
  Train,
  GraduationCap,
  UtensilsCrossed,
  ChevronRight,
  Sparkles,
  Mail,
  Phone,
  ArrowRight,
  ArrowLeft,
  Check,
  Download,
  Zap,
} from "lucide-react";

// ---------- Static data ----------
const PROPERTY = {
  name: "Claytonhame",
  address: "76 St Cross Road, Winchester",
  postcode: "SO23",
  available: "Q2 2026",
  beds: 4,
  baths: "3.5",
  sqft: 1984,
  sqm: 184,
  tenure: "Freehold",
  warranty: "10-year Build Zone warranty",
  guidePrice: 1395000,
  lat: 51.052875,
  lng: -1.321614,
  epc: { current: 80, potential: 86, currentBand: "C", potentialBand: "B" },
  epcUrl: "https://find-energy-certificate.service.gov.uk/energy-certificate/2605-1241-2811-1492-6842",
  brochureUrl: "https://drive.google.com/drive/folders/1xGtvh9SSFUEso93lBPdtF0PIwxIOHaEw",
  tagline: "Beautiful Homes for Easy Living",
};

const LOGO_URL = "https://ffour.co.uk/wp-content/uploads/2023/11/FFOUR-Estates-Logo-Label-Tag.png";
const LOGO_URL_SCROLLED = "https://ffour.co.uk/wp-content/uploads/2026/05/FFOUR-ESTATES-Logo-Transparent-GMAIL.png";
const KF_LOGO_URL = "https://ffour.co.uk/wp-content/uploads/2026/05/Knight_Frank_Logo.svg.png";

const IMG = {
  hallway: "https://ffour.co.uk/wp-content/uploads/2026/05/1-Hallway.png",
  drawing: "https://ffour.co.uk/wp-content/uploads/2026/05/2-Living-Room.png",
  wcBoot: "https://ffour.co.uk/wp-content/uploads/2026/05/3-WC-Boot-Room.png",
  utility: "https://ffour.co.uk/wp-content/uploads/2026/05/4-Utility-Room.png",
  kitchen: "https://ffour.co.uk/wp-content/uploads/2026/05/5-Kitchen-Dining.png",
  garden: "https://ffour.co.uk/wp-content/uploads/2026/05/6-Garden.png",
  master: "https://ffour.co.uk/wp-content/uploads/2026/05/7-Master-Bedroom.png",
  masterEn: "https://ffour.co.uk/wp-content/uploads/2026/05/8-Master-Ensuite.png",
  bed2: "https://ffour.co.uk/wp-content/uploads/2026/05/9-2nd-Bedroom.png",
  bed2b: "https://ffour.co.uk/wp-content/uploads/2026/05/10-2nd-Bedroom.png",
  bed3: "https://ffour.co.uk/wp-content/uploads/2026/05/11-3rd-Bedroom.png",
  bed4: "https://ffour.co.uk/wp-content/uploads/2026/05/12-4th-Bedroom.png",
  famBath: "https://ffour.co.uk/wp-content/uploads/2026/05/13-Family-Bathroom.png",
};

const FLOORS = {
  ground: {
    label: "Ground Floor",
    plan: {
      url: "https://ffour.co.uk/wp-content/uploads/2026/05/St-Cross-Ground-Floor-scaled.png",
      width: 1554,
      height: 3111,
    },
    rooms: [
      {
        id: "garden",
        name: "Garden",
        dim: "Two-zone landscaped garden",
        image: IMG.garden,
        note: "A two-zone outdoor space — a gently enclosed lower patio off the kitchen for morning coffee, and a raised upper terrace beyond, framed by planting.",
        poly: "641,1324 645,1033 1055,536 1292,280 1524,48 1452,399 1294,1150 1214,1546 1214,2579 1115,2577 1117,2348 1118,1902 1117,1326",
      },
      {
        id: "kitchen-dining",
        name: "Kitchen & Dining",
        dim: `8.00 × 4.22m  ·  26'3" × 13'10"`,
        image: IMG.kitchen,
        note: "Rebuilt around modern family life as one generous open-plan space with tall ceilings and natural flow throughout. Warm shaker cabinetry, a social central peninsula, chevron flooring and full-width glazed doors create a kitchen designed as much for gathering as cooking. \n\nAbove, a large triple-glazed roof light draws daylight deep into the room by day, while integrated feature LED lighting shifts the atmosphere effortlessly into the evening. \n\nIntegrated AEG appliances have been chosen for effortless everyday use — including a large-capacity oven with even multi-shelf cooking, a combi microwave-oven pairing speed with proper browning and crispness, and a responsive five-zone induction hob that heats rapidly while remaining sleek and minimal when not in use.",
        poly: "666,2159 1083,2161 1081,1361 663,1360",
      },
      {
        id: "utility",
        name: "Utility Room",
        dim: `3.27 × 1.86m  ·  10'9" × 6'1"`,
        image: IMG.utility,
        note: "Fitted shaker cabinetry, deep sink, plenty of storage — quietly tucked away from the main living spaces. Whisper quiet extractor to make sure your washing dries as it should.",
        poly: "537,2196 538,2286 574,2286 574,2376 893,2377 893,2197",
      },
      {
        id: "wc-boot",
        name: "WC & Boot Room",
        dim: "Cloakroom and banquette seating",
        image: IMG.wcBoot,
        note: "Deep green tiling, brass fittings, banquette seating for boots underneath and coats above.  The integrated heating ensures everything dries quickly after a wet walk.  Situated exactly where you need it as you step through the front door.",
        poly: "575,2392 893,2396 894,2558 574,2560",
      },
      {
        id: "hallway",
        name: "Entrance Hallway",
        dim: "Welcoming Entrance Hallway",
        image: IMG.hallway,
        note: "Stepping in the front door, you are greeted by a warm welcoming entrance hallway. Direct access to the boot room with the Living Room to the left. The staircase sweeps up on the right, as well as a clear sightline through to the kitchen and garden beyond.",
        poly: "910,2197 1081,2197 1080,2558 910,2558",
      },
      {
        id: "living",
        name: "Living Room",
        dim: `5.5 × 4.9m  ·  18'1" × 16'1"`,
        image: IMG.drawing,
        note: "Plenty of light and high ceilings, panelled walls and a bay window framing the light. Beautiful detail in the cornicing with feature lighting inset behind.",
        poly: "1084,2970 974,2970 897,3071 704,3074 620,2970 539,2968 537,2861 585,2860 585,2714 539,2713 537,2588 1081,2589",
      },
    ],
  },
  first: {
    label: "First Floor",
    plan: {
      url: "https://ffour.co.uk/wp-content/uploads/2026/05/St-Cross-First-Floor.png",
      width: 1394,
      height: 1503,
    },
    rooms: [
      {
        id: "bed2-ensuite",
        name: "Second Bedroom & Ensuite",
        dim: `3.10 × 4.13m  ·  13'7" × 10'2"`,
        image: IMG.bed2,
        note: "A second principal bedroom — a generous double with its own ensuite. Plenty of natural light making the room feel bright and calm.",
        poly: "1237,25 1002,25 1006,545 1238,549",
      },
      {
        id: "bed2-dressing",
        name: "Second Bedroom & Dressing Room",
        dim: `3.10 × 4.13m  ·  13'7" × 10'2"`,
        image: IMG.bed2b,
        note: "Views over the rear garden, separately lit dressing area.",
        poly: "804,26 804,543 1004,543 998,25",
      },
      {
        id: "master-dress-en",
        name: "Master Dressing & Ensuite",
        dim: "Walk-through joinery + fully tiled ensuite",
        image: IMG.masterEn,
        note: "Walk-through dressing room with feature arch, alcoves and built-in joinery, leading to a beautifully finished large ensuite with deep green herringbone tiling, brushed brass fittings, a walk-in shower and anti-fog mirror with integrated feature lighting. Even practical details have been carefully considered, including an ultra-quiet extractor system that preserves the calm atmosphere of the space.",
        poly: "681,948 676,867 703,866 705,671 677,672 677,570 932,570 934,949",
      },
      {
        id: "master",
        name: "Master Bedroom",
        dim: `5.17 × 3.91m  ·  17'0" × 12'10"`,
        image: IMG.master,
        note: "A generous principal bedroom with impressive 3m tall ceilings framed by bespoke illuminated coving, panelled walls, and striking integrated arched joinery, complemented by a walk-through dressing room and luxurious private ensuite.",
        poly: "719,975 1236,976 1237,1370 719,1371",
      },
    ],
  },
  second: {
    label: "Second Floor",
    plan: {
      url: "https://ffour.co.uk/wp-content/uploads/2026/05/St-Cross-Second-Floor.png",
      width: 1471,
      height: 858,
    },
    rooms: [
      {
        id: "bed4",
        name: "Fourth Bedroom",
        dim: `3.79 × 3.59m  ·  12'5" × 11'9"`,
        image: IMG.bed4,
        note: "A versatile space ideal as a guest bedroom, child's room or home office, with new sash windows flooding the room with natural light, complemented by a feature panelled wall and soft ambient lighting that creates a warm, cosy atmosphere on winter evenings.",
        poly: "530,29 888,29 888,297 778,298 778,411 529,411 531,324 572,324 572,131 530,131",
      },
      {
        id: "bed3",
        name: "Third Bedroom",
        dim: `4.05 × 3.63m  ·  13'3" × 11'11"`,
        image: IMG.bed3,
        note: "A generous double with tall ceilings, sash windows that look out to the treetops, and a feature panelled wall with soft ambient lighting that creates a warm, cosy atmosphere on winter evenings.",
        poly: "529,426 890,426 890,825 530,825 529,707 570,708 573,549 530,550",
      },
      {
        id: "fam-bath",
        name: "Family Bathroom",
        dim: `4.02 × 1.76m  ·  13'2" × 5'9"`,
        image: IMG.famBath,
        note: "Full-length bath with shower over, extra wide vanity with an anti-fog mirror with feature lighting, deep green tiles complemented by brass fittings — coherent with the bathrooms below.",
        poly: "1087,426 1086,826 907,825 905,425",
      },
    ],
  },
};


const LOCAL = {
  schools: [
    { name: "St Faith's CofE Primary", note: "Closest primary — walk in minutes", dist: "0.2 mi" },
    { name: "The Pilgrims' School", note: "Independent prep at the cathedral", dist: "0.5 mi" },
    { name: "Stanmore Primary", note: "Sought-after alternative state primary", dist: "0.4 mi" },
    { name: "Winchester College", note: "Historic independent school", dist: "0.4 mi" },
  ],
  transport: [
    { name: "Winchester Station", note: "London Waterloo from ~1hr", dist: "1.0 mi" },
    { name: "M3 (Junction 11)", note: "Direct to London / South Coast", dist: "1.6 mi" },
    { name: "Southampton Airport", note: "Domestic & European flights", dist: "12 mi" },
  ],
  green: [
    { name: "St Cross Park", note: "Open green at the foot of the road", dist: "0.4 mi" },
    { name: "The Water Meadows", note: "Riverside walks to the cathedral", dist: "0.3 mi" },
    { name: "Hospital of St Cross", note: "12th-century almshouses & gardens", dist: "0.4 mi" },
    { name: "South Downs National Park", note: "Walking & cycling on the doorstep", dist: "2 mi" },
  ],
  food: [
    { name: "The Ivy", note: "Brasserie classics in the cathedral close", dist: "0.6 mi" },
    { name: "The Chesil Rectory", note: "1450s timber-frame · refined British", dist: "0.7 mi" },
    { name: "Rick Stein", note: "The seafood institution, Winchester branch", dist: "0.7 mi" },
    { name: "Bistro du Vin", note: "Hotel du Vin's Winchester restaurant", dist: "0.7 mi" },
    { name: "Yiayias Kitchen", note: "Greek — local favourite, 4.6★", dist: "0.9 mi" },
    { name: "Royal Gurkha", note: "Nepalese, 5.0★", dist: "0.9 mi" },
    { name: "Lebanese House", note: "Levantine, 4.8★", dist: "1.1 mi" },
  ],
};

const SPECIFICATION = [
  "Re-wired and re-plumbed throughout",
  "New gas central heating system & boiler",
  "Bespoke kitchen with integrated appliances",
  "Herringbone flooring",
  "Full-width glazed doors to garden",
  "Three brand new bathrooms with fog-free mirrors",
  "All windows upgraded",
  "Tiered rear garden — lower patio + upper terrace",
  "Traditional cornicing & period features",
  "Brass fixtures & fittings throughout",
  "10-year Build Zone structural warranty",
  "EPC: 80 C (potential 86 B)",
];

const AGENTS = [
  {
    name: "Jonathan Lacey",
    role: "Partner",
    email: "Jonathan.Lacey@knightfrank.com",
    phone1: "01962 677 242",
    phone2: "07483 341 508",
    photo: "https://public.api.prd-knightfrank.com/web-people/main/people/image/person/00016639.jpg?width=440&height=440",
  },
  {
    name: "Lottie Lambert",
    role: "Associate",
    email: "Lottie.Lambert@knightfrank.com",
    phone1: "01962 677 246",
    phone2: "07977 759 140",
    photo: "https://public.api.prd-knightfrank.com/web-people/main/people/image/person/00013579.jpg?width=440&height=440",
  },
];

// ---------- Knowledge base for the concierge ----------
// Each entry: primary keywords (at least one must match for the entry to be considered)
// + secondary keywords (boost the score). Highest-scoring entry wins.
const KB = [
  // ROOMS
  {
    id: "kitchen",
    primary: ["kitchen", "dining", "diner"],
    secondary: ["size", "big", "large", "dimension", "open plan", "island", "patio doors", "bifold", "bi-fold"],
    answer: "The kitchen and dining is the heart of the house — 8.00 × 4.22 metres (26'3\" × 13'10\"), a single open space rebuilt for modern living. A bespoke shaker kitchen in sandstone with brass handles, chevron floor, and full-width bifold doors that open onto the patio.",
  },
  {
    id: "living",
    primary: ["living", "drawing", "lounge", "sitting", "reception"],
    secondary: ["size", "big", "bay window", "ceiling", "panel", "wainscot"],
    answer: "The living room is 5.5 × 4.9m (18'1\" × 16'1\") — It has high ceilings, panelled walls, and a bay window framing the light. Period features, finishes thoroughly modernised. Chevron floor, brass fittings, and integrated lighting in the cornice.",
  },
  {
    id: "master",
    primary: ["master", "main bedroom", "principal", "biggest bedroom"],
    secondary: ["size", "big", "dressing", "ensuite", "en-suite", "walk-in"],
    answer: "The master suite is 5.17 × 3.91m (17'0\" × 12'10\") — generous proportions with panelled walls, integrated arched joinery, and its own walk-through dressing room leading to a fully tiled ensuite in deep green metro tile with brass fittings.",
  },
  {
    id: "bed2",
    primary: ["second bedroom", "2nd bedroom", "bedroom two", "bedroom 2"],
    secondary: ["size", "ensuite", "en-suite", "dressing"],
    answer: "The second bedroom is 3.10 × 4.13m (13'7\" × 10'2\") — a generous double with its own dressing room and ensuite. Effectively a second principal suite.",
  },
  {
    id: "bed3",
    primary: ["third bedroom", "3rd bedroom", "bedroom three", "bedroom 3"],
    secondary: ["size", "top floor", "second floor"],
    answer: "The third bedroom is on the top floor — 4.05 × 3.63m (13'3\" × 11'11\") — a generous double with sash windows, high ceilings, and a feature panelled wall with integrated lighting.",
  },
  {
    id: "bed4",
    primary: ["fourth bedroom", "4th bedroom", "bedroom four", "bedroom 4"],
    secondary: ["size", "top floor", "office"],
    answer: "The fourth bedroom is on the top floor at 3.79 × 3.59m (12'5\" × 11'9\") — flexible as a guest room, child's room or home office, with new sash windows, high ceilings, and a feature panelled wall with integrated lighting.",
  },
  {
    id: "garden",
    primary: ["garden", "outside", "outdoor", "patio", "terrace", "rear"],
    secondary: ["upper", "lower", "size", "south", "facing"],
    answer: "The rear garden is a thoughtfully designed two-zone outdoor space. A sheltered lower patio sits directly off the kitchen — the morning-coffee, kicked-off-shoes spot. A few steps up, a raised upper terrace gives a second outdoor room.",
  },
  {
    id: "utility",
    primary: ["utility", "laundry", "washing machine"],
    secondary: ["size", "where"],
    answer: "The utility room is 3.27 × 1.86m (10'9\" × 6'1\"), fitted with shaker cabinetry, a deep sink, undercounter lights and tucked away off the kitchen so laundry doesn't intrude on the living spaces. Whisper quiet extration to ensure your washing dries properly.",
  },
  {
    id: "boot",
    primary: ["boot room", "boot", "mud", "wc", "cloak", "downstairs loo", "downstairs toilet"],
    secondary: ["entry", "entrance", "where"],
    answer: "The boot room and WC sit just inside the entry hall — exactly where you need them after walking dogs or coming back from the meadows. Deep green tiling, brass fittings, heated banquette seating for boots.",
  },
  {
    id: "hallway",
    primary: ["hallway", "hall", "entrance", "entry", "front door"],
    secondary: ["original", "features", "stairs"],
    answer: "The entrance hallway is bright and welcoming with convenient access straight to the boot room with integrated heating for those wetter days. The staircase sweeps up on the right, and there's a clear sightline straight through to the kitchen and garden beyond.",
  },
  {
    id: "bathrooms",
    primary: ["bathroom", "bathrooms", "shower", "bath", "ensuite", "en-suite", "wet room"],
    secondary: ["how many", "count"],
    answer: "Three and a half bathrooms in total: a master ensuite, a second ensuite serving bedroom two, the family bathroom on the top floor, and a ground-floor WC. All three new bathrooms feature deep green tile, brass fittings, and walk-in showers (the family bath has a shower over).",
  },
  {
    id: "family-bath",
    primary: ["family bathroom"],
    secondary: ["size", "top floor"],
    answer: "The family bathroom on the top floor is 4.02 × 1.76m (13'2\" × 5'9\") — a full-length bath with shower over, large vanity, with heated & illuminated mirror and the same deep green tile that runs through the principal ensuite, giving the bathrooms a coherent material story.",
  },

  // SIZE
  {
    id: "total-size",
    primary: ["square feet", "sqft", "sq ft", "square metre", "square meter", "total size", "size of the house", "how big is the house", "gross area", "how big is the property"],
    secondary: ["total", "overall", "gross"],
    answer: "Claytonhame is 1,984 sq ft / 184.3 sq m across three floors. Generous for the street.",
  },
  {
    id: "beds-count",
    primary: ["how many bedrooms", "number of bedrooms", "bedroom count"],
    secondary: [],
    answer: "Four bedrooms across the two upper floors — two principal suites on the first floor (each with its own dressing room and ensuite), and two further bedrooms with a family bathroom on the second floor.",
  },
  {
    id: "floors",
    primary: ["how many floors", "floors", "storeys", "stories", "levels"],
    secondary: [],
    answer: "Three floors — ground, first, and second. Living downstairs, principal bedrooms on the first, and two further bedrooms plus the family bathroom on the top.",
  },

  // PRICE & MONEY
  {
    id: "price",
    primary: ["price", "guide", "cost", "asking", "how much"],
    secondary: ["million", "m", "guide price"],
    answer: "The guide price is £1,395,000.",
  },
  {
    id: "stamp",
    primary: ["stamp duty", "sdlt"],
    secondary: [],
    answer: "Stamp duty at the £1,395,000 guide is £83,250 under standard residential rates (no surcharge). Scroll down to the affordability calculator to see the full breakdown — including how it changes if you adjust the price or your deposit.",
  },
  {
    id: "mortgage",
    primary: ["mortgage", "monthly", "repayment", "payment", "afford"],
    secondary: ["interest", "rate", "term"],
    answer: "Roughly £5,300 a month on a 25% deposit over 30 years at 4.5%. The calculator below this section lets you change any of those numbers to fit your circumstances.",
  },

  // EPC / SYSTEMS
  {
    id: "epc",
    primary: ["epc", "energy", "rating", "efficient", "efficiency", "running cost"],
    secondary: ["b", "c", "potential"],
    answer: "An EPC of 80, band C — sitting right at the top of the C band, just one point below a B. With minor improvements the potential rating is 86 (band B). For a refurbished period property that's exceptional; most homes of this age sit in D or E.",
  },
  {
    id: "heating",
    primary: ["heating", "boiler", "radiator", "underfloor", "gas", "warm"],
    secondary: [],
    answer: "Brand new gas central heating system — the house was re-plumbed throughout during the refurbishment, with new radiators and a new boiler. Underfloor heating is fitted in selected areas of the home for comfort and efficiency.",
  },
  {
    id: "warranty",
    primary: ["warranty", "guarantee", "build zone", "structural", "insurance", "covered"],
    secondary: [],
    answer: "Claytonhame is protected by a 10-year Build Zone structural warranty — the same insurance-backed cover a new build would carry. FFour Estates also operate under the Consumer Code for New Homes.",
  },

  // PROPERTY FACTS
  {
    id: "tenure",
    primary: ["freehold", "leasehold", "tenure", "lease", "ground rent"],
    secondary: [],
    answer: "Freehold. No leasehold complications, no ground rent.",
  },
  {
    id: "council-tax",
    primary: ["council tax", "how much is council", "council tax band"],
    secondary: ["band", "how much"],
    answer: "The property is Council Tax band F. Please refer to the local council for current prices.",
  },
  {
    id: "parking",
    primary: ["parking", "park the car", "driveway", "garage", "permit"],
    secondary: [],
    answer: "Properties on St Cross Road are also accessible from the roads behind (Lansdown Avenue and Edgar Road). Plenty of parking is available along these roads. Residential permits are available via the local council.",
  },
  {
    id: "completion",
    primary: ["completion", "available", "ready", "move in", "when can", "finished", "completion date"],
    secondary: ["q2", "2026"],
    answer: "Claytonhame is scheduled to be available from Q2 2026. The property is chain free so you could move in as soon as conveyancing is complete.",
  },
  {
    id: "period",
    primary: ["when was", "how old", "period", "victorian", "edwardian", "georgian", "age of", "built", "year built"],
    secondary: [],
    answer: "Claytonhame is a period property — a classic late-Victorian Winchester semi, taken back to brick and rebuilt internally.",
  },
  {
    id: "name",
    primary: ["claytonhame", "name", "called", "why is it called"],
    secondary: [],
    answer: "Claytonhame is the house name carried with the property — its original name.",
  },

  // REFURBISHMENT
  {
    id: "refurb",
    primary: ["refurbish", "renovat", "redone", "work done", "what was done", "what's new", "spec"],
    secondary: ["full", "back to brick"],
    answer: "A full back-to-brick refurbishment. Re-wired and re-plumbed throughout, new gas heating system, bespoke kitchen, three new bathrooms, chevron flooring to principal rooms, replacement sash windows where required, acoustic insulation between floors, two-zone landscaped garden, wainscoting and period features incorporated, updated with feature lighting.",
  },
  {
    id: "materials",
    primary: ["materials", "finishes", "spec", "specification", "oak", "brass", "tile", "stone"],
    secondary: ["floor", "wall"],
    answer: "Chevron-laid flooring to the main rooms on the ground floor; deep green tiles and brass fittings in the bathrooms; bespoke shaker cabinetry in the kitchen and utility; panelled wainscoting throughout the principal rooms; bifold doors to the garden.",
  },

  // LOCATION
  {
    id: "station",
    primary: ["station", "train", "rail", "london", "waterloo", "commute"],
    secondary: ["how far", "distance", "minutes"],
    answer: "Winchester railway station is about 1 mile away — a 10-minute walk or 3-minute drive. Direct trains to London Waterloo take just under an hour.",
  },
  {
    id: "schools",
    primary: ["school", "schools", "primary", "secondary", "college", "education", "ofsted", "catchment"],
    secondary: ["winchester", "good schools"],
    answer: "St Faith's CofE Primary is the closest — minutes on foot. Stanmore Primary is also nearby. For private: The Pilgrims' School at the cathedral and Winchester College are both within walking distance. For exact catchment details, check Hampshire County Council's school admissions tool.",
  },
  {
    id: "shops",
    primary: ["shops", "shopping", "supermarket", "high street", "amenities", "tesco", "waitrose", "sainsbury"],
    secondary: [],
    answer: "Winchester city centre is a 15-minute walk — the full high street, plus a Waitrose, M&S Food, independent delis and the cathedral. A small Tesco Express and other essentials are even closer.",
  },
  {
    id: "restaurants",
    primary: ["restaurant", "restaurants", "eat", "eating", "dinner", "pub", "bar", "cafe"],
    secondary: ["winchester", "good", "best"],
    answer: "Winchester has a strong food scene. The Ivy, Rick Stein and The Chesil Rectory all sit within the cathedral close, plus Bistro du Vin at the Hotel du Vin. Local favourites a little further out include Yiayias Kitchen (Greek, 4.6★), Royal Gurkha (Nepalese, 5★) and Lebanese House (4.8★).",
  },
  {
    id: "walks",
    primary: ["walk", "park", "green", "outside", "meadow", "downs", "running", "cycling", "dog"],
    secondary: ["nature", "country"],
    answer: "The water meadows are at the bottom of the road — a riverside walk takes you directly to the cathedral. St Cross Park, the Hospital of St Cross gardens (12th-century almshouses), and the South Downs National Park are all within easy reach.",
  },
  {
    id: "area",
    primary: ["area", "neighbourhood", "neighborhood", "st cross", "location", "safe", "what's it like"],
    secondary: [],
    answer: "St Cross is one of Winchester's most desirable residential streets — period houses, mature planting, the meadows on one side, the city on the other. Quiet, settled, family-leaning, and a 15-minute walk from the cathedral.",
  },
  {
    id: "airport",
    primary: ["airport", "fly", "flight", "southampton"],
    secondary: [],
    answer: "Southampton Airport is around 11 miles away — about 20 minutes by car. Heathrow is roughly an hour by car or train.",
  },

  // VIEWING / AGENT
  {
    id: "viewing",
    primary: ["viewing", "view", "see it", "visit", "tour", "appointment", "open day", "open house"],
    secondary: ["when", "book"],
    answer: "Viewings are by appointment with Knight Frank Winchester. Jonathan Lacey on 01962 677 242 (mobile 07483 341 508) or Lottie Lambert on 01962 677 246 (mobile 07977 759 140). Give them a call or email and they'll set up a time.",
  },
  {
    id: "agent",
    primary: ["agent", "estate agent", "knight frank", "contact", "jon", "lacey", "lottie", "lambert", "phone", "email"],
    secondary: [],
    answer: "Knight Frank Winchester are the sole agents. Jonathan Lacey: 01962 677 242 / 07483 341 508 / Jonathan.Lacey@knightfrank.com. Lottie Lambert: 01962 677 246 / 07977 759 140 / Lottie.Lambert@knightfrank.com. Office: 14 Jewry Street, Winchester SO23 8RZ.",
  },
  {
    id: "brochure",
    primary: ["brochure", "pdf", "download", "details", "particulars"],
    secondary: [],
    answer: "The full brochure is downloadable from the link in the header and at the foot of the page — it includes the official floorplans, additional CGIs, and the full property particulars.",
  },
  {
    id: "developer",
    primary: ["ffour", "developer", "who built", "who refurbished", "builder", "renovation team"],
    secondary: [],
    answer: "ffour Estates — a Winchester-based developer focused on careful refurbishments of period homes, working with an experienced construction team specialising in high-quality residential work. Their tagline: \"Beautiful homes for easy living.\"",
  },

  // --- Detail & specification ---
  {
    id: "ceiling-height",
    primary: ["ceiling", "ceilings", "high ceiling", "tall ceiling"],
    secondary: ["height", "high", "tall", "spacious"],
    answer: "Several rooms benefit from impressive ceiling heights — the master bedroom reaches around 3 metres, framed by bespoke illuminated coving. They make the principal spaces feel especially bright and generous.",
  },
  {
    id: "worktops",
    primary: ["worktop", "worktops", "countertop", "countertops", "quartz", "marble"],
    secondary: ["kitchen", "surface"],
    answer: "Quartz worktops throughout the kitchen — durable, clean and contemporary, picked to last.",
  },
  {
    id: "appliances",
    primary: ["appliances", "appliance", "integrated appliance", "fridge", "oven", "dishwasher", "hob", "extractor"],
    secondary: ["integrated", "built-in", "brand", "miele", "neff", "bosch"],
    answer: "All appliances are integrated for a seamless, uncluttered look. Knight Frank can share the specific brands and specs on request.",
  },
  {
    id: "design-features",
    primary: ["design", "details", "panel", "panels", "panelled", "wainscot", "joinery", "moulding", "coving"],
    secondary: ["luxury", "boutique", "finish", "feature lighting", "interior"],
    answer: "Deliberately rich in detail: panelled walls and cornicing throughout the principal rooms, bespoke arched joinery in the master suite, illuminated coving in the master bedroom, herringbone tiling in the bathrooms, brass fittings, and considered ambient lighting. It reads as a luxury home, not just a refurbished one.",
  },
  {
    id: "different",
    primary: ["different", "special", "stand out", "standout", "what makes", "why this house", "compare"],
    secondary: ["nearby", "neighbour", "other refurb"],
    answer: "What sets Claytonhame apart from typical St Cross refurbs is the attention to architectural detail and atmosphere — illuminated coving, panelled walls, bespoke joinery, deep green herringbone tiles, brass fittings, considered feature lighting. Most refurbs deliver the basics; this one delivers the feeling.",
  },

  // --- Practical living ---
  {
    id: "low-maintenance-garden",
    primary: ["low maintenance", "low-maintenance", "easy garden", "upkeep", "maintain garden"],
    secondary: ["garden", "outdoor", "weekend"],
    answer: "The landscaping has been designed to balance visual appeal with practical maintenance — well-defined planting beds and considered hard landscaping, so the garden looks looked-after without needing every weekend.",
  },
  {
    id: "entertaining",
    primary: ["entertain", "entertaining", "party", "host", "hosting", "dinner party", "gathering"],
    secondary: ["indoor outdoor", "summer", "guests"],
    answer: "Built around entertaining — the open-plan kitchen and dining flow out through full-width glazed doors onto the lower patio, with the upper terrace beyond. Indoor and outdoor work together for summer dinners or larger gatherings.",
  },
  {
    id: "storage",
    primary: ["storage", "store", "cupboard", "cupboards", "wardrobe", "wardrobes", "closet", "closets"],
    secondary: ["fitted", "built-in", "space"],
    answer: "Storage has been carefully considered throughout — walk-through fitted dressing rooms in both principal bedrooms, fitted utility cabinetry, banquette boot storage, and bespoke joinery in the master suite. Nowhere feels short on space to put things away.",
  },
  {
    id: "family",
    primary: ["family", "families", "children", "kids", "child"],
    secondary: ["suitable", "ideal", "playroom", "school"],
    answer: "Tailored to family life — four bedrooms across two upper floors give everyone their own space, the open-plan kitchen-dining is the natural hub, and the school choices in Winchester are exceptional (St Faith's, Stanmore, The Pilgrims', Winchester College all within walking distance).",
  },

  // --- Buying ---
  {
    id: "chain-free",
    primary: ["chain", "chain free", "onward chain", "no chain"],
    secondary: ["complete", "completion"],
    answer: "Claytonhame is a developer sale — there's no onward chain from the seller's side. Knight Frank can confirm the latest position when you get in touch.",
  },
  {
    id: "planning",
    primary: ["planning", "permission", "permitted", "consent", "lawful", "building control"],
    secondary: ["development", "extension", "rear extension"],
    answer: "All works requiring consent have been properly considered and approved during the redevelopment. Knight Frank holds the full documentation for review.",
  },

  // --- Lifestyle ---
  {
    id: "feels-like",
    primary: ["feel", "feels", "atmosphere", "vibe", "mood", "what's it like to live"],
    secondary: ["calm", "warm", "comfortable", "homely"],
    answer: "The intention was calm, warm and effortlessly functional. Quietly luxurious — not flashy. Equally suited to a busy family weekend, entertaining friends, or a quiet evening at home.",
  },
  {
    id: "ideal-for",
    primary: ["ideal for", "who is this for", "who is it for", "suited to", "right for", "target buyer"],
    secondary: ["buyer", "owner", "audience"],
    answer: "Likely to appeal most to: families wanting a turnkey Winchester home, professional couples looking for a quieter life within easy reach of London, downsizers from larger country houses, and those moving out of London for the schools and the commute. The combination of period character, modern luxury and walking distance to everything is rare.",
  },
  {
    id: "vision",
    primary: ["vision", "philosophy", "why renovate", "approach", "intention", "purpose"],
    secondary: ["developer", "design", "goal"],
    answer: "The brief was to balance form, function, flow and feeling — to honour what was already great about the house (its period bones, position and light) and add what was missing (proper kitchen-dining space, ensuites for the principal bedrooms, considered finishes, modern energy performance). The result is a home that genuinely feels nice to spend time in.",
  },
];

// ---------- Find best matching KB entry ----------
function findAnswer(query) {
  const q = " " + query.toLowerCase().trim() + " ";
  let best = null;
  let bestScore = 0;

  for (const entry of KB) {
    let primaryHits = 0;
    let secondaryHits = 0;

    for (const kw of entry.primary) {
      if (q.includes(" " + kw + " ") || q.includes(" " + kw + "s ") || q.includes(" " + kw + "?") || q.includes(kw)) {
        primaryHits++;
      }
    }
    if (primaryHits === 0) continue;

    for (const kw of entry.secondary) {
      if (q.includes(kw)) secondaryHits++;
    }

    const score = primaryHits * 5 + secondaryHits * 2;
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (!best || bestScore < 3) {
    return {
      matched: false,
      answer: "That's a question I don't have a direct answer for. The best people for specifics like that are at Knight Frank — Jonathan Lacey on 01962 677 242 / Jonathan.Lacey@knightfrank.com or Lottie Lambert on 01962 677 246 / Lottie.Lambert@knightfrank.com.",
    };
  }

  return { matched: true, id: best.id, answer: best.answer };
}

// ---------- Log unanswered questions ----------
// Once a Formspree (or similar) endpoint is configured, this POSTs the
// unanswered question so the developer can see what buyers are asking and
// improve the knowledge base.
const UNANSWERED_ENDPOINT = ""; // <-- paste Formspree URL here, e.g. "https://formspree.io/f/xyzabc"
async function logUnanswered(question) {
  if (!UNANSWERED_ENDPOINT) {
    console.log("[Unanswered question]", question);
    return;
  }
  try {
    await fetch(UNANSWERED_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        type: "unanswered_question",
        question,
        timestamp: new Date().toISOString(),
        url: typeof window !== "undefined" ? window.location.href : "",
      }),
    });
  } catch (e) {
    console.error("Failed to log unanswered question", e);
  }
}

// ---------- Main component ----------
export default function Claytonhame() {
  const [activeFloor, setActiveFloor] = useState("ground");
  const [selectedRoom, setSelectedRoom] = useState("kitchen-dining");
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const roomDetailRef = useRef(null);
  const sheetRef = useRef(null);
  const touchStartY = useRef(0);
  const touchOffset = useRef(0);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello — I'm the concierge for Claytonhame. Ask me anything about the house, the refurbishment, or the area.",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);
  const chatBoxRef = useRef(null);
  const chatInputRef = useRef(null);
  const [chatFocused, setChatFocused] = useState(false);

  const [price, setPrice] = useState(PROPERTY.guidePrice);
  const [depositPct, setDepositPct] = useState(25);
  const [rate, setRate] = useState(4.5);
  const [term, setTerm] = useState(30);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollTop = chatEndRef.current.scrollHeight;
    }
  }, [messages, chatLoading]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 80);
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile floorplan drawer is open
  useEffect(() => {
    if (mobileDetailOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [mobileDetailOpen]);

  // On mobile: pin the chat box to the bottom of the visual viewport when the input is focused,
  // so the input stays just above the keyboard. Un-pins when the keyboard is dismissed.
  useEffect(() => {
    const vv = window.visualViewport;
    const el = chatBoxRef.current;
    if (!chatFocused || !vv || !el || window.innerWidth >= 1024) return;

    let keyboardSeen = false;

    const resetStyles = () => {
      ["position", "left", "right", "bottom", "zIndex", "borderRadius", "maxHeight"].forEach((p) => {
        el.style[p] = "";
      });
    };

    const apply = () => {
      const bottomOffset = window.innerHeight - vv.height - vv.offsetTop;
      if (bottomOffset >= 30) {
        // Keyboard is up — pin to its top
        keyboardSeen = true;
        el.style.position = "fixed";
        el.style.left = "0";
        el.style.right = "0";
        el.style.bottom = `${bottomOffset}px`;
        el.style.zIndex = "60";
        el.style.borderRadius = "0";
        el.style.maxHeight = `${vv.height}px`;
        return;
      }
      // Keyboard not visible. Only un-pin if we previously saw one during this focus session —
      // otherwise we'd blur the input before iOS has had a chance to bring the keyboard up.
      if (keyboardSeen) {
        resetStyles();
        if (chatInputRef.current && document.activeElement === chatInputRef.current) {
          chatInputRef.current.blur();
        }
      }
    };

    apply();
    vv.addEventListener("resize", apply);
    vv.addEventListener("scroll", apply);

    return () => {
      vv.removeEventListener("resize", apply);
      vv.removeEventListener("scroll", apply);
      resetStyles();
    };
  }, [chatFocused]);

  // Swipe-to-dismiss handlers for the bottom-sheet drawer
  const onSheetTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    touchOffset.current = 0;
    if (sheetRef.current) {
      sheetRef.current.style.transition = "none";
    }
  };
  const onSheetTouchMove = (e) => {
    if (!sheetRef.current) return;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (dy > 0) {
      touchOffset.current = dy;
      sheetRef.current.style.transform = `translateY(${dy}px)`;
    }
  };
  const onSheetTouchEnd = () => {
    if (!sheetRef.current) return;
    sheetRef.current.style.transition = "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)";
    if (touchOffset.current > 100) {
      setMobileDetailOpen(false);
    } else {
      sheetRef.current.style.transform = "translateY(0)";
    }
    touchOffset.current = 0;
  };

  const currentFloor = FLOORS[activeFloor];
  const selectedRoomObj = selectedRoom
    ? currentFloor.rooms.find((r) => r.id === selectedRoom)
    : currentFloor.rooms[0];

  const handleRoomSelect = (roomId) => {
    setSelectedRoom(roomId);
    if (window.innerWidth < 1024) {
      // Brief delay so the user sees the room highlight on the plan before the drawer rises
      setTimeout(() => setMobileDetailOpen(true), 250);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "Claytonhame · 76 St Cross Road, Winchester",
      text: "A four-bedroom refurbished period home in St Cross, Winchester. Guide £1.395m.",
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
    } catch (e) {
      // user cancelled — silently ignore
      if (e?.name === "AbortError") return;
    }
    // Fallback: copy URL to clipboard
    try {
      await navigator.clipboard.writeText(shareData.url);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2200);
    } catch (e) {
      console.error("Share failed", e);
    }
  };

  const sendMessage = async (text) => {
    const content = (text ?? chatInput).trim();
    if (!content || chatLoading) return;
    const userMsg = { role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setChatLoading(true);
    const delay = 600 + Math.random() * 700;
    setTimeout(() => {
      const result = findAnswer(content);
      if (!result.matched) {
        logUnanswered(content);
      }
      setMessages((prev) => [...prev, { role: "assistant", content: result.answer }]);
      setChatLoading(false);
    }, delay);
  };

  // Affordability
  const deposit = Math.round((price * depositPct) / 100);
  const loan = price - deposit;
  const months = term * 12;
  const r = rate / 100 / 12;
  const monthly = r === 0 ? loan / months : (loan * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);

  const calcStamp = (p) => {
    const bands = [
      [125000, 0],
      [250000, 0.02],
      [925000, 0.05],
      [1500000, 0.1],
      [Infinity, 0.12],
    ];
    let remaining = p;
    let prev = 0;
    let tax = 0;
    for (const [cap, pct] of bands) {
      if (remaining <= 0) break;
      const slice = Math.min(remaining, cap - prev);
      tax += slice * pct;
      remaining -= slice;
      prev = cap;
    }
    return Math.round(tax);
  };
  const stampDuty = calcStamp(price);
  const fmt = (n) => "£" + Math.round(n).toLocaleString("en-GB", { maximumFractionDigits: 0 });

  const samplePrompts = [
    "Tell me about the EPC rating",
    "What was refurbished?",
    "How big is the kitchen?",
    "What schools are nearby?",
    "How do I book a viewing?",
  ];

  return (
    <div className="min-h-screen" style={{ background: "#F5EFE6", color: "#1C1A17" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Manrope:wght@300;400;500;600;700&display=swap');
        :root {
          --cream: #F5EFE6;
          --cream-deep: #EBE2D2;
          --ink: #1F1F1F;
          --ink-soft: #4A4439;
          --accent: #1F1F1F;
          --gold: #B5A87C;
          --gold-soft: #C8B785;
          --line: #D6CBB6;
        }
        .display { font-family: 'Fraunces', serif; font-optical-sizing: auto; letter-spacing: -0.02em; }
        .grain {
          background-image: radial-gradient(rgba(28,26,23,0.04) 1px, transparent 1px);
          background-size: 3px 3px;
        }
        .chat-scroll::-webkit-scrollbar { width: 6px; }
        .chat-scroll::-webkit-scrollbar-thumb { background: var(--line); border-radius: 3px; }
        .room-card:hover { background: var(--cream-deep); }
        .fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .room-img-fade { animation: imgFade 0.5s ease-out; }
        @keyframes imgFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .typing-dot {
          display: inline-block; width: 6px; height: 6px; border-radius: 50%;
          background: var(--ink-soft); margin: 0 2px; animation: blink 1.4s infinite both;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes blink { 0%, 80%, 100% { opacity: 0.2 } 40% { opacity: 1 } }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        section[id] { scroll-margin-top: 90px; }
        .back-to-top {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 30;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--ink);
          color: var(--cream);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(0,0,0,0.18);
          transition: opacity 0.3s, transform 0.3s;
          cursor: pointer;
          border: none;
        }
        .back-to-top:hover { transform: translateY(-2px); }
      `}</style>

      <div style={{ fontFamily: "Manrope, sans-serif" }}>
        {/* NAV */}
        <nav
          className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
          style={{
            background: isScrolled ? "rgba(245, 239, 230, 0.94)" : "transparent",
            backdropFilter: isScrolled ? "blur(10px)" : "none",
            borderBottom: isScrolled ? "1px solid var(--line)" : "1px solid transparent",
          }}
        >
          <div
            className="max-w-6xl mx-auto pl-4 md:pl-6 pr-4 md:pr-6 flex items-start justify-between transition-all duration-300"
            style={{ minHeight: isScrolled ? 64 : 86 }}
          >
            {/* Logo — swaps between tag (top) and horizontal (scrolled) */}
            <a href="#top" className="block flex-shrink-0 relative" style={{ marginTop: 0 }}>
              <img
                src={LOGO_URL}
                alt="ffour Estates"
                className="block transition-all duration-300"
                style={{
                  height: isScrolled ? 0 : "min(133px, 22vw)",
                  width: "auto",
                  marginTop: 0,
                  display: "block",
                  opacity: isScrolled ? 0 : 1,
                  transform: isScrolled ? "translateY(-10px)" : "translateY(0)",
                }}
              />
              <img
                src={LOGO_URL_SCROLLED}
                alt="ffour Estates"
                className="block absolute top-0 left-0 transition-all duration-300"
                style={{
                  height: isScrolled ? 38 : 0,
                  width: "auto",
                  marginTop: isScrolled ? 13 : 0,
                  opacity: isScrolled ? 1 : 0,
                  pointerEvents: isScrolled ? "auto" : "none",
                }}
              />
            </a>

            {/* Right side */}
            <div className="flex items-center gap-3 md:gap-6 self-center pb-1">
              {/* Desktop nav */}
              <div
                className="hidden md:flex gap-6 text-sm transition-colors"
                style={{ color: isScrolled ? "var(--ink-soft)" : "rgba(245, 239, 230, 0.9)" }}
              >
                <a href="#story" className="hover:opacity-70 transition-opacity">The House</a>
                <a href="#floorplan" className="hover:opacity-70 transition-opacity">Floorplan</a>
                <a href="#concierge" className="hover:opacity-70 transition-opacity">Ask</a>
                <a href="#area" className="hover:opacity-70 transition-opacity">Area</a>
                <a href="#cost" className="hover:opacity-70 transition-opacity">Cost</a>
              </div>
              <a
                href="#contact"
                className="hidden md:inline-block px-5 py-2.5 text-sm tracking-wide rounded-full transition-all"
                style={{
                  background: isScrolled ? "var(--ink)" : "rgba(245, 239, 230, 0.95)",
                  color: isScrolled ? "white" : "var(--ink)",
                }}
              >
                Book a viewing
              </a>

              {/* Desktop Share button */}
              <button
                onClick={handleShare}
                className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 text-sm tracking-wide rounded-full transition-all border"
                style={{
                  borderColor: isScrolled ? "var(--line)" : "rgba(245, 239, 230, 0.4)",
                  color: isScrolled ? "var(--ink-soft)" : "rgba(245, 239, 230, 0.9)",
                  background: "transparent",
                }}
              >
                <Share2 className="w-3.5 h-3.5" strokeWidth={1.7} />
                Share
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2"
                aria-label="Open menu"
                style={{ color: isScrolled ? "var(--ink)" : "var(--cream)" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="3" y1="8" x2="21" y2="8" />
                  <line x1="3" y1="16" x2="21" y2="16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* MOBILE MENU OVERLAY */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-50 md:hidden fade-in"
            style={{ background: "var(--ink)" }}
          >
            <div className="flex justify-between items-start px-5 pt-0" style={{ minHeight: 86 }}>
              <img src={LOGO_URL} alt="ffour Estates" style={{ height: 96, display: "block" }} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="self-center p-2 -mr-2"
                aria-label="Close menu"
                style={{ color: "var(--cream)" }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </svg>
              </button>
            </div>
            <div className="px-8 pt-8 pb-12 flex flex-col gap-6 display text-3xl" style={{ color: "var(--cream)" }}>
              {[
                { href: "#story", label: "The House" },
                { href: "#floorplan", label: "Floorplan" },
                { href: "#concierge", label: "Ask the House" },
                { href: "#area", label: "The Area" },
                { href: "#cost", label: "Cost" },
                { href: "#contact", label: "Book a Viewing" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-light border-b pb-3"
                  style={{ borderColor: "rgba(245,239,230,0.15)" }}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="px-8 mt-8 text-xs uppercase tracking-[0.25em]" style={{ color: "rgba(245,239,230,0.5)" }}>
              <a href="https://ffour.co.uk" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                ffour.co.uk <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* HERO */}
        <section className="relative overflow-hidden" style={{ minHeight: "92vh" }}>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${IMG.drawing})`,
              filter: "brightness(0.55)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(28,26,23,0.45) 0%, rgba(28,26,23,0.25) 40%, rgba(28,26,23,0.85) 100%)",
            }}
          />
          <div className="absolute inset-0 grain opacity-30 pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-24" style={{ minHeight: "92vh" }}>
            <div
              className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] mb-8"
              style={{ visibility: "hidden" }}
              aria-hidden="true"
            >
              <span className="block w-8 h-px" />
              <span>spacer</span>
            </div>
            <h1
              className="display text-6xl md:text-8xl leading-[0.95] font-light mb-6"
              style={{ color: "#F5EFE6" }}
            >
              Claytonhame.
              <br />
              <span style={{ fontStyle: "italic", color: "var(--gold-soft)" }}>Re-imagined</span> for the way you live now.
            </h1>
            <p
              className="max-w-xl text-lg leading-relaxed mb-12"
              style={{ color: "rgba(245, 239, 230, 0.85)" }}
            >
              A four-bedroom period home on one of Winchester's most cherished streets, taken back to the brick and rebuilt with quiet, lasting craft.
            </p>

            <div
              className="grid grid-cols-2 md:grid-cols-5 gap-px rounded-lg overflow-hidden mb-10"
              style={{ background: "rgba(168, 137, 93, 0.3)" }}
            >
              {[
                { label: "Bedrooms", value: PROPERTY.beds, icon: BedDouble },
                { label: "Bathrooms", value: PROPERTY.baths, icon: Bath },
                { label: "Sq ft", value: PROPERTY.sqft.toLocaleString(), icon: Ruler },
                { label: "Guide price", value: "£1.395m", icon: HomeIcon },
                { label: "Available", value: "Q2 2026", icon: Calendar },
              ].map((s) => (
                <div
                  key={s.label}
                  className="p-5 flex items-start gap-3 backdrop-blur-sm"
                  style={{ background: "rgba(28,26,23,0.55)" }}
                >
                  <s.icon className="w-4 h-4 mt-1" strokeWidth={1.5} style={{ color: "var(--gold-soft)" }} />
                  <div>
                    <div className="display text-2xl" style={{ color: "#F5EFE6" }}>
                      {s.value}
                    </div>
                    <div
                      className="text-xs uppercase tracking-widest mt-1"
                      style={{ color: "rgba(245, 239, 230, 0.65)" }}
                    >
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm flex-wrap" style={{ color: "rgba(245, 239, 230, 0.75)" }}>
              <MapPin className="w-4 h-4" strokeWidth={1.5} />
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=76+St+Cross+Road,+Winchester,+SO23+9QA"
                target="_blank"
                rel="noreferrer"
                className="hover:underline decoration-1 underline-offset-4 transition-all"
                style={{ color: "inherit", textDecorationColor: "rgba(245, 239, 230, 0.5)" }}
              >
                {PROPERTY.address}
              </a>
              <span className="mx-2">·</span>
              <Shield className="w-4 h-4" strokeWidth={1.5} />
              <span>{PROPERTY.warranty}</span>
              <span className="mx-2">·</span>
              <span className="italic">Sole agent: Knight Frank</span>
            </div>

            <a
              href="https://ffour.co.uk"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-10 text-xs uppercase tracking-[0.25em] hover:opacity-80 transition-opacity group"
              style={{ color: "var(--gold-soft)" }}
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to ffour Estates</span>
            </a>
          </div>
        </section>

        {/* STORY */}
        <section id="story" className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-5 gap-12 items-start">
              <div className="md:col-span-2">
                <div className="text-xs uppercase tracking-[0.25em] mb-6" style={{ color: "var(--gold)" }}>
                  The House
                </div>
                <h2 className="display text-4xl md:text-5xl font-light leading-tight mb-6">
                  Some houses are built. <span style={{ fontStyle: "italic", color: "var(--accent)" }}>Others are shaped by generations.</span>
                </h2>
                <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                  <img src={IMG.kitchen} alt="Kitchen and dining" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="md:col-span-3 space-y-5 text-lg leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                <p>
                  This one has been both — cherished for decades, then re-crafted with a clarity of purpose: to make every day feel effortless.
                </p>
                <p>
                  Step into the hallway and you're met by the original features that anchor the house in its history. To the left, the drawing room opens up under high ceilings, its bay window framing the light. Move through to the rear and the design reveals itself — a kitchen and dining space rebuilt for modern living, with full-width glazed doors that fold back onto a two-tier garden: a lower patio for morning coffee, an elevated upper terrace for late summer evenings.
                </p>
                <p>
                  Upstairs, two principal bedrooms each take their own dressing room and ensuite — a quiet statement of comfort. The top floor holds two further bedrooms and the family bathroom, so everyone has their own place in the house.
                </p>
                <p className="display italic text-xl pt-2" style={{ color: "var(--ink)" }}>
                  Honouring its history. Opening its doors to new memories.
                </p>
                <div className="pt-6 flex gap-4">
                  <a
                    href={PROPERTY.brochureUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm rounded-full border transition-colors hover:bg-black hover:text-white"
                    style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
                  >
                    <Download className="w-4 h-4" /> Download brochure
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm rounded-full text-white transition-opacity hover:opacity-90"
                    style={{ background: "var(--accent)" }}
                  >
                    Book a viewing <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI CONCIERGE */}
        <section
          id="concierge"
          className="py-12 md:py-24 border-t"
          style={{ borderColor: "var(--line)", background: "var(--cream-deep)" }}
        >
          <div className="max-w-5xl mx-auto px-5 md:px-6">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-6 md:mb-12">
              <div>
                <div
                  className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] mb-4"
                  style={{ color: "var(--gold)" }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Concierge</span>
                </div>
                <h2 className="display text-3xl md:text-5xl font-light leading-tight max-w-2xl">
                  Ask the house anything.
                </h2>
              </div>
              <p className="text-sm max-w-sm" style={{ color: "var(--ink-soft)" }}>
                Available around the clock. Trained on the full specification, the floorplan, and the neighbourhood — so you don't have to wait for an agent to call back.
              </p>
            </div>

            <div
              ref={chatBoxRef}
              className="rounded-2xl border overflow-hidden"
              style={{ borderColor: "var(--line)", background: "var(--cream)" }}
            >
              <div
                ref={chatEndRef}
                className="chat-scroll p-4 md:p-8 space-y-4 md:space-y-5 overflow-y-auto"
                style={{ height: "min(30dvh, 320px)" }}
              >
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} fade-in`}
                  >
                    <div
                      className="max-w-[85%] px-4 md:px-5 py-3 md:py-3.5 rounded-2xl text-sm md:text-[15px] leading-relaxed whitespace-pre-wrap"
                      style={
                        m.role === "user"
                          ? { background: "var(--accent)", color: "white", borderBottomRightRadius: 4 }
                          : { background: "var(--cream-deep)", color: "var(--ink)", borderBottomLeftRadius: 4 }
                      }
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex justify-start fade-in">
                    <div
                      className="px-5 py-3.5 rounded-2xl"
                      style={{ background: "var(--cream-deep)", borderBottomLeftRadius: 4 }}
                    >
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                    </div>
                  </div>
                )}
              </div>

              {messages.length <= 1 && (
                <div className="px-4 md:px-8 pb-3 md:pb-4 flex flex-wrap gap-2">
                  {samplePrompts.map((p) => (
                    <button
                      key={p}
                      onClick={() => sendMessage(p)}
                      className="text-xs px-3 md:px-3.5 py-1.5 md:py-2 rounded-full border transition-colors hover:bg-white"
                      style={{ borderColor: "var(--line)", color: "var(--ink-soft)" }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}

              <div className="border-t flex items-center" style={{ borderColor: "var(--line)" }}>
                <input
                  ref={chatInputRef}
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  onFocus={() => setChatFocused(true)}
                  onBlur={() => {
                    // small delay so a Send button tap doesn't immediately un-pin
                    setTimeout(() => setChatFocused(false), 150);
                  }}
                  placeholder="Ask about rooms, finishes, the area…"
                  className="flex-1 px-5 md:px-6 py-4 md:py-5 bg-transparent outline-none"
                  style={{ color: "var(--ink)", fontSize: 16 }}
                />
                <button
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => sendMessage()}
                  disabled={!chatInput.trim() || chatLoading}
                  className="p-4 md:p-5 disabled:opacity-30 transition-opacity"
                  style={{ color: "var(--ink)" }}
                  aria-label="Send"
                >
                  <Send className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FLOORPLAN */}
        <section id="floorplan" className="py-24 border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] mb-4" style={{ color: "var(--gold)" }}>
                  The Plan
                </div>
                <h2 className="display text-4xl md:text-5xl font-light leading-tight">
                  Three floors. <span style={{ fontStyle: "italic", color: "var(--gold)" }}>Walk them.</span>
                </h2>
              </div>
              <div className="text-sm" style={{ color: "var(--ink-soft)" }}>
                {PROPERTY.sqft.toLocaleString()} sq ft · {PROPERTY.sqm} sq m
              </div>
            </div>

            {/* Floor tabs as segmented control */}
            <div className="flex justify-center mb-10">
              <div
                className="inline-flex p-1 rounded-full"
                style={{ background: "var(--cream-deep)", border: "1px solid var(--line)" }}
              >
                {Object.entries(FLOORS).map(([key, floor]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveFloor(key);
                      setSelectedRoom(null);
                      setHoveredRoom(null);
                    }}
                    className="px-4 md:px-6 py-2.5 text-xs md:text-sm rounded-full transition-all"
                    style={{
                      background: activeFloor === key ? "var(--ink)" : "transparent",
                      color: activeFloor === key ? "white" : "var(--ink-soft)",
                      fontWeight: activeFloor === key ? 600 : 400,
                    }}
                  >
                    {floor.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* LEFT: Floorplan with hotspots */}
              <div>
                <div
                  key={activeFloor + "-plan"}
                  className="fade-in mx-auto relative"
                  style={{
                    width: `min(100%, calc(70vh * ${currentFloor.plan.width} / ${currentFloor.plan.height}))`,
                    aspectRatio: `${currentFloor.plan.width} / ${currentFloor.plan.height}`,
                  }}
                >
                  <img
                    src={currentFloor.plan.url}
                    alt={`${currentFloor.label} floorplan`}
                    style={{ width: "100%", height: "100%", display: "block" }}
                    draggable={false}
                  />
                  <svg
                    viewBox={`0 0 ${currentFloor.plan.width} ${currentFloor.plan.height}`}
                    preserveAspectRatio="none"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      pointerEvents: "none",
                    }}
                  >
                    {currentFloor.rooms.filter((r) => r.poly).map((room) => {
                      const isSelected = selectedRoomObj?.id === room.id;
                      const isHovered = hoveredRoom === room.id;
                      const fillOpacity = isSelected ? 0.32 : isHovered ? 0.18 : 0;
                      return (
                        <polygon
                          key={room.id}
                          points={room.poly}
                          fill="#B5A87C"
                          fillOpacity={fillOpacity}
                          stroke={isSelected ? "#B5A87C" : "transparent"}
                          strokeWidth="3"
                          vectorEffect="non-scaling-stroke"
                          style={{
                            cursor: "pointer",
                            transition: "fill-opacity 0.25s ease, stroke 0.25s ease",
                            pointerEvents: "auto",
                          }}
                          onClick={() => handleRoomSelect(room.id)}
                          onMouseEnter={() => setHoveredRoom(room.id)}
                          onMouseLeave={() => setHoveredRoom(null)}
                        >
                          <title>{room.name}</title>
                        </polygon>
                      );
                    })}
                  </svg>
                </div>
                <p className="text-xs mt-5 text-center" style={{ color: "var(--ink-soft)" }}>
                  Tap any room on the plan to explore
                </p>
              </div>

              {/* RIGHT: Room detail panel — desktop only */}
              <div ref={roomDetailRef} className="hidden lg:block lg:sticky lg:top-28 scroll-mt-24">
                <div
                  key={selectedRoomObj?.id}
                  className="rounded-2xl overflow-hidden fade-in"
                  style={{ background: "var(--cream-deep)" }}
                >
                  {selectedRoomObj?.image && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        key={selectedRoomObj.id + "-img"}
                        src={selectedRoomObj.image}
                        alt={selectedRoomObj.name}
                        className="w-full h-full object-cover room-img-fade"
                      />
                    </div>
                  )}
                  <div className="p-7 md:p-8">
                    <div className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "var(--gold)" }}>
                      {currentFloor.label}
                    </div>
                    <h3 className="display text-3xl md:text-4xl font-light mb-2">{selectedRoomObj?.name}</h3>
                    <div className="text-sm mb-5" style={{ color: "var(--ink-soft)" }}>
                      {selectedRoomObj?.dim}
                    </div>
                    <p className="text-base leading-relaxed whitespace-pre-line" style={{ color: "var(--ink-soft)" }}>
                      {selectedRoomObj?.note}
                    </p>
                  </div>
                </div>
                <p className="text-xs mt-3 text-center italic" style={{ color: "var(--ink-soft)" }}>
                  Computer-generated image for illustrative purposes only
                </p>

                {/* Room list as chips */}
                <div className="mt-7 pt-7 border-t" style={{ borderColor: "var(--line)" }}>
                  <div className="text-[10px] uppercase tracking-[0.25em] mb-4" style={{ color: "var(--ink-soft)" }}>
                    All rooms on this floor
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentFloor.rooms.map((room) => {
                      const isActive = selectedRoomObj?.id === room.id;
                      return (
                        <button
                          key={room.id}
                          onClick={() => handleRoomSelect(room.id)}
                          className="text-xs px-3 py-1.5 rounded-full border transition-all"
                          style={{
                            background: isActive ? "var(--ink)" : "transparent",
                            color: isActive ? "white" : "var(--ink-soft)",
                            borderColor: isActive ? "var(--ink)" : "var(--line)",
                          }}
                        >
                          {room.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <a
                    href={PROPERTY.brochureUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs inline-flex items-center gap-1.5 hover:underline"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    <Download className="w-3.5 h-3.5" /> Download the official brochure
                  </a>
                </div>
              </div>
            </div>

            {/* MOBILE: chip list + brochure link below the plan */}
            <div className="lg:hidden mt-8">
              <div className="text-[10px] uppercase tracking-[0.25em] mb-4 text-center" style={{ color: "var(--ink-soft)" }}>
                Or pick a room
              </div>
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {currentFloor.rooms.map((room) => {
                  const isActive = selectedRoomObj?.id === room.id;
                  return (
                    <button
                      key={room.id}
                      onClick={() => handleRoomSelect(room.id)}
                      className="text-xs px-3 py-1.5 rounded-full border transition-all"
                      style={{
                        background: isActive ? "var(--ink)" : "transparent",
                        color: isActive ? "white" : "var(--ink-soft)",
                        borderColor: isActive ? "var(--ink)" : "var(--line)",
                      }}
                    >
                      {room.name}
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-center">
                <a
                  href={PROPERTY.brochureUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs inline-flex items-center gap-1.5 hover:underline"
                  style={{ color: "var(--ink-soft)" }}
                >
                  <Download className="w-3.5 h-3.5" /> Download the official brochure
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* MOBILE ROOM DETAIL — bottom-sheet drawer */}
        {mobileDetailOpen && selectedRoomObj && (
          <div
            className="fixed inset-0 z-50 lg:hidden fade-in flex items-end justify-center"
            style={{ background: "rgba(31,31,31,0.55)", backdropFilter: "blur(2px)" }}
            onClick={() => setMobileDetailOpen(false)}
          >
            <div
              ref={sheetRef}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md flex flex-col overflow-hidden"
              style={{
                background: "var(--cream)",
                maxHeight: "85dvh",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                boxShadow: "0 -8px 32px rgba(0,0,0,0.18)",
                animation: "slideUp 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
            >
              {/* Drag handle + header — swipe-to-dismiss area */}
              <div
                onTouchStart={onSheetTouchStart}
                onTouchMove={onSheetTouchMove}
                onTouchEnd={onSheetTouchEnd}
                style={{ touchAction: "none" }}
              >
                <div className="flex justify-center pt-3 pb-1">
                  <div
                    className="w-10 h-1 rounded-full"
                    style={{ background: "var(--line)" }}
                  />
                </div>

                <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: "var(--line)" }}>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--gold)" }}>
                      {currentFloor.label}
                    </div>
                    <div className="display text-lg">{selectedRoomObj.name}</div>
                  </div>
                  <button
                    onClick={() => setMobileDetailOpen(false)}
                    className="p-2 -mr-2"
                    aria-label="Close"
                    style={{ color: "var(--ink)" }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="5" y1="5" x2="19" y2="19" />
                      <line x1="19" y1="5" x2="5" y2="19" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {selectedRoomObj.image && (
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={selectedRoomObj.image}
                      alt={selectedRoomObj.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="text-sm mb-3" style={{ color: "var(--ink-soft)" }}>
                    {selectedRoomObj.dim}
                  </div>
                  <p className="text-[15px] leading-relaxed whitespace-pre-line mb-5" style={{ color: "var(--ink-soft)" }}>
                    {selectedRoomObj.note}
                  </p>
                  <p className="text-[11px] italic mb-5" style={{ color: "var(--ink-soft)" }}>
                    Computer-generated image for illustrative purposes only
                  </p>

                  {/* Quick chip list */}
                  <div className="pt-4 border-t" style={{ borderColor: "var(--line)" }}>
                    <div className="text-[10px] uppercase tracking-[0.25em] mb-3" style={{ color: "var(--ink-soft)" }}>
                      Other rooms on this floor
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentFloor.rooms.filter((r) => r.id !== selectedRoomObj.id).map((room) => (
                        <button
                          key={room.id}
                          onClick={() => setSelectedRoom(room.id)}
                          className="text-xs px-3 py-1.5 rounded-full border"
                          style={{ background: "transparent", color: "var(--ink-soft)", borderColor: "var(--line)" }}
                        >
                          {room.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SPECIFICATION + EPC */}
        <section
          className="py-24 border-t"
          style={{ borderColor: "var(--line)", background: "var(--cream-deep)" }}
        >
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12 mb-16">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] mb-4" style={{ color: "var(--gold)" }}>
                  Specification
                </div>
                <h2 className="display text-4xl font-light leading-tight">
                  Re-built, <span style={{ fontStyle: "italic", color: "var(--accent)" }}>not redecorated.</span>
                </h2>
                <p className="mt-6 text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  A full back-to-brick refurbishment. Every system, surface and finish considered and renewed.
                </p>
              </div>
              <div className="md:col-span-2 grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {SPECIFICATION.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 py-2 border-b"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <Check className="w-4 h-4 mt-1 flex-shrink-0" strokeWidth={1.5} style={{ color: "var(--accent)" }} />
                    <span className="text-sm" style={{ color: "var(--ink)" }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* EPC widget */}
            <EPCWidget />
          </div>
        </section>

        {/* OUTSIDE / GARDEN */}
        <section className="py-24 border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <img src={IMG.garden} alt="Garden" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.25em] mb-4" style={{ color: "var(--gold)" }}>
                  Outside
                </div>
                <h2 className="display text-4xl md:text-5xl font-light leading-tight mb-6">
                  Considered <span style={{ fontStyle: "italic", color: "var(--gold)" }}>down to the planting.</span>
                </h2>
                <p className="text-lg leading-relaxed mb-4" style={{ color: "var(--ink-soft)" }}>
                  The rear garden has been re-landscaped into two thoughtful zones. A sheltered lower patio off the kitchen, with built-in seating and brickwork that picks up the warmth of the house.
                </p>
                <p className="text-lg leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  A few steps up sits a private raised terrace — a second outdoor space.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AREA */}
        <section
          id="area"
          className="py-24 border-t"
          style={{ borderColor: "var(--line)", background: "var(--cream-deep)" }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] mb-4" style={{ color: "var(--gold)" }}>
                  The Neighbourhood
                </div>
                <h2 className="display text-4xl md:text-5xl font-light leading-tight">
                  St Cross. <span style={{ fontStyle: "italic", color: "var(--accent)" }}>The good half-mile.</span>
                </h2>
              </div>
              <p className="text-sm max-w-sm" style={{ color: "var(--ink-soft)" }}>
                Period streets, water meadows, the South Downs on the doorstep, and the city centre at the end of a 15-minute walk.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div
                className="rounded-2xl overflow-hidden border"
                style={{ borderColor: "var(--line)", height: 480 }}
              >
                <iframe
                  title="Map"
                  src={`https://maps.google.com/maps?q=${PROPERTY.lat},${PROPERTY.lng}&z=15&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                />
              </div>
              <div className="space-y-6">
                <LocalCategory icon={GraduationCap} title="Schools" items={LOCAL.schools} />
                <LocalCategory icon={Train} title="Transport" items={LOCAL.transport} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <LocalCategory icon={Trees} title="Green & Heritage" items={LOCAL.green} />
              <LocalCategory icon={UtensilsCrossed} title="Eating Out" items={LOCAL.food} />
            </div>
          </div>
        </section>

        {/* COST */}
        <section id="cost" className="py-24 border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] mb-4" style={{ color: "var(--gold)" }}>
                  Affordability
                </div>
                <h2 className="display text-4xl md:text-5xl font-light leading-tight">
                  What it costs <span style={{ fontStyle: "italic", color: "var(--accent)" }}>to live here.</span>
                </h2>
              </div>
              <p className="text-sm max-w-sm" style={{ color: "var(--ink-soft)" }}>
                Live figures using current UK stamp duty bands. Adjust to match your own deposit and rate.
              </p>
            </div>

            <div
              className="grid md:grid-cols-2 gap-6 md:gap-8 rounded-2xl p-5 md:p-10"
              style={{ background: "var(--cream-deep)" }}
            >
              <div className="space-y-6">
                <Slider
                  label="Guide price"
                  value={price}
                  onChange={setPrice}
                  min={1000000}
                  max={2000000}
                  step={5000}
                  display={fmt(price)}
                />
                <Slider
                  label="Deposit"
                  value={depositPct}
                  onChange={setDepositPct}
                  min={5}
                  max={60}
                  step={1}
                  display={`${depositPct}% · ${fmt(deposit)}`}
                />
                <Slider
                  label="Interest rate"
                  value={rate}
                  onChange={setRate}
                  min={2}
                  max={8}
                  step={0.1}
                  display={`${rate.toFixed(1)}%`}
                />
                <Slider
                  label="Mortgage term"
                  value={term}
                  onChange={setTerm}
                  min={10}
                  max={35}
                  step={1}
                  display={`${term} years`}
                />
              </div>

              <div className="flex flex-col justify-between gap-6">
                <div className="rounded-xl p-6 md:p-8" style={{ background: "var(--accent)", color: "white" }}>
                  <div className="text-xs uppercase tracking-[0.25em] opacity-70 mb-2">
                    Estimated monthly payment
                  </div>
                  <div className="display text-4xl md:text-5xl font-light">{fmt(monthly)}</div>
                  <div className="text-xs mt-3 opacity-70">
                    Capital & interest on {fmt(loan)} over {term} years at {rate.toFixed(1)}%
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <Row label="Loan amount" value={fmt(loan)} />
                  <Row label="Stamp duty (standard residential)" value={fmt(stampDuty)} />
                  <Row label="Deposit + stamp duty (cash needed)" value={fmt(deposit + stampDuty)} bold />
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  Indicative only. Stamp duty assumes standard residential rates and no second-home surcharge. Speak to a mortgage broker for terms relevant to your circumstances.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT — Knight Frank agents */}
        <section
          id="contact"
          className="py-24 border-t"
          style={{ borderColor: "var(--line)", background: "var(--cream-deep)" }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <img
                src={KF_LOGO_URL}
                alt="Knight Frank"
                className="mx-auto mb-6"
                style={{ height: 32, width: "auto" }}
              />
              <div className="text-xs uppercase tracking-[0.25em] mb-4" style={{ color: "var(--gold)" }}>
                Sole Agent · Winchester
              </div>
              <h2 className="display text-4xl md:text-5xl font-light leading-tight mb-4">
                Book a viewing <span style={{ fontStyle: "italic", color: "var(--gold)" }}>directly.</span>
              </h2>
              <p className="text-sm max-w-md mx-auto" style={{ color: "var(--ink-soft)" }}>
                Viewings by appointment. Reach Jon or Lottie at Knight Frank Winchester.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {AGENTS.map((a) => (
                <AgentCard key={a.email} agent={a} />
              ))}
            </div>

            <div className="text-center mt-10 text-xs" style={{ color: "var(--ink-soft)" }}>
              Knight Frank Winchester · 14 Jewry Street, Winchester SO23 8RZ
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          className="border-t py-14"
          style={{ borderColor: "var(--line)", background: "var(--ink)", color: "var(--cream-deep)" }}
        >
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-sm">
            <div>
              <div className="display text-xl mb-2">Claytonhame</div>
              <div className="opacity-60">76 St Cross Road, Winchester SO23</div>
              <div className="opacity-50 italic mt-3 text-xs">{PROPERTY.tagline}</div>
              <a
                href="https://ffour.co.uk"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-5 text-xs uppercase tracking-[0.2em] opacity-70 hover:opacity-100 transition-opacity"
              >
                Visit ffour.co.uk <ArrowRight className="w-3 h-3" />
              </a>
            </div>
            <div>
              <img
                src={KF_LOGO_URL}
                alt="Knight Frank"
                className="mb-3"
                style={{ height: 24, width: "auto", filter: "brightness(0) invert(1)", opacity: 0.85 }}
              />
              <div className="text-xs uppercase tracking-widest mb-2 opacity-50">Sole Agent</div>
              <div className="opacity-80 mb-1">14 Jewry Street</div>
              <div className="opacity-80 mb-1">Winchester SO23 8RZ</div>
              <a
                href={PROPERTY.brochureUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-4 opacity-80 hover:opacity-100"
              >
                <Download className="w-4 h-4" /> Download brochure
              </a>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest mb-3 opacity-50">Assurances</div>
              <div className="opacity-80 mb-1">10-year Build Zone warranty</div>
              <div className="opacity-80 mb-1">EPC: 80 C (potential 86 B)</div>
              <a
                href={PROPERTY.epcUrl}
                target="_blank"
                rel="noreferrer"
                className="opacity-60 hover:opacity-100 text-xs underline"
              >
                View EPC certificate
              </a>
              <div className="opacity-50 mt-4 text-xs leading-relaxed">
                Particulars are illustrative. All measurements approximate. Images are computer generated.
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* BACK TO TOP + SHARE (mobile-friendly floating cluster) */}
      <div
        className="fixed z-30 flex items-center gap-2"
        style={{ bottom: 20, right: 20 }}
      >
        <button
          onClick={handleShare}
          className="fade-in flex items-center gap-1.5 px-4 h-11 rounded-full text-sm transition-transform hover:-translate-y-0.5"
          style={{
            background: "var(--cream)",
            color: "var(--ink)",
            border: "1px solid var(--line)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          }}
          aria-label="Share"
        >
          <Share2 className="w-4 h-4" strokeWidth={1.7} />
          Share
        </button>
        {showBackToTop && (
          <button
            className="back-to-top fade-in"
            style={{ position: "static" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
        )}
      </div>

      {/* Share toast (clipboard fallback) */}
      {shareToast && (
        <div
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 px-5 py-3 rounded-full text-sm fade-in"
          style={{ background: "var(--ink)", color: "var(--cream)", boxShadow: "0 6px 20px rgba(0,0,0,0.2)" }}
        >
          Link copied to clipboard
        </div>
      )}
    </div>
  );
}

// ---------- Sub-components ----------
function LocalCategory({ icon: Icon, title, items }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-4 h-4" strokeWidth={1.5} style={{ color: "var(--gold)" }} />
        <h3 className="display text-xl">{title}</h3>
      </div>
      <div className="space-y-px rounded-lg overflow-hidden" style={{ background: "var(--line)" }}>
        {items.map((it) => (
          <div
            key={it.name}
            className="flex items-center justify-between p-4"
            style={{ background: "var(--cream)" }}
          >
            <div>
              <div className="text-sm" style={{ color: "var(--ink)" }}>{it.name}</div>
              <div className="text-xs mt-0.5" style={{ color: "var(--ink-soft)" }}>{it.note}</div>
            </div>
            <div className="text-xs tracking-wider" style={{ color: "var(--gold)" }}>
              {it.dist}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slider({ label, value, onChange, min, max, step, display }) {
  return (
    <div>
      <div className="flex justify-between mb-2 text-sm">
        <span style={{ color: "var(--ink-soft)" }}>{label}</span>
        <span className="display text-base" style={{ color: "var(--ink)" }}>{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{ accentColor: "#2D3B2D" }}
      />
    </div>
  );
}

function Row({ label, value, bold }) {
  return (
    <div
      className="flex justify-between items-center pb-2 border-b"
      style={{ borderColor: "var(--line)" }}
    >
      <span style={{ color: "var(--ink-soft)" }}>{label}</span>
      <span
        className="display text-lg"
        style={{ fontWeight: bold ? 600 : 400, color: "var(--ink)" }}
      >
        {value}
      </span>
    </div>
  );
}

function AgentCard({ agent }) {
  return (
    <div
      className="rounded-2xl p-6 flex items-center gap-6"
      style={{ background: "var(--cream)" }}
    >
      <div className="flex-shrink-0">
        <img
          src={agent.photo}
          alt={agent.name}
          className="w-24 h-24 rounded-full object-cover grayscale"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="display text-xl">{agent.name}</div>
        <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--gold)" }}>
          {agent.role} · Knight Frank
        </div>
        <a
          href={`mailto:${agent.email}`}
          className="flex items-center gap-2 text-sm mb-1.5 hover:underline truncate"
          style={{ color: "var(--ink)" }}
        >
          <Mail className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
          <span className="truncate">{agent.email}</span>
        </a>
        <a
          href={`tel:${agent.phone1.replace(/\s/g, "")}`}
          className="flex items-center gap-2 text-sm mb-1 hover:underline"
          style={{ color: "var(--ink)" }}
        >
          <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
          {agent.phone1}
        </a>
        <a
          href={`tel:${agent.phone2.replace(/\s/g, "")}`}
          className="flex items-center gap-2 text-sm hover:underline"
          style={{ color: "var(--ink-soft)" }}
        >
          <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
          {agent.phone2}
        </a>
      </div>
    </div>
  );
}

// ---------- EPC widget ----------
function EPCWidget() {
  const bands = [
    { letter: "A", range: "92+", width: 100, color: "#008054" },
    { letter: "B", range: "81-91", width: 88, color: "#19B459" },
    { letter: "C", range: "69-80", width: 76, color: "#8DCE46" },
    { letter: "D", range: "55-68", width: 64, color: "#FFD500" },
    { letter: "E", range: "39-54", width: 52, color: "#FCAA65" },
    { letter: "F", range: "21-38", width: 40, color: "#EF8023" },
    { letter: "G", range: "1-20", width: 28, color: "#E9153B" },
  ];
  const current = PROPERTY.epc.current;
  const potential = PROPERTY.epc.potential;

  return (
    <div className="rounded-2xl p-5 md:p-10" style={{ background: "var(--cream)" }}>
      <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "var(--gold)" }}>
            <Zap className="w-3.5 h-3.5" />
            <span>Energy Performance</span>
          </div>
          <div className="space-y-1.5">
            {bands.map((b) => {
              const isCurrent = b.letter === PROPERTY.epc.currentBand;
              const isPotential = b.letter === PROPERTY.epc.potentialBand;
              const labelText = isCurrent
                ? `${b.range}  ·  Now ${current}`
                : isPotential
                ? `${b.range}  ·  Potential ${potential}`
                : b.range;
              return (
                <div key={b.letter} className="flex items-center gap-2 md:gap-3">
                  <div
                    className="display text-sm font-semibold w-5 flex-shrink-0"
                    style={{ color: "var(--ink)" }}
                  >
                    {b.letter}
                  </div>
                  <div className="flex-1 relative">
                    <div
                      className="h-8 md:h-9 flex items-center px-2.5 md:px-3 text-[10px] md:text-xs font-medium relative"
                      style={{
                        background: b.color,
                        width: `${b.width}%`,
                        color: ["A", "B", "C"].includes(b.letter) ? "white" : "#1C1A17",
                        clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)",
                        fontWeight: isCurrent || isPotential ? 700 : 500,
                        boxShadow: isCurrent ? "inset 0 0 0 2px rgba(31,31,31,0.7)" : isPotential ? "inset 0 0 0 2px rgba(31,31,31,0.4)" : "none",
                      }}
                    >
                      <span className="whitespace-nowrap">{labelText}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-4 text-xs" style={{ color: "var(--ink-soft)" }}>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-sm border-2" style={{ borderColor: "rgba(31,31,31,0.7)" }} />
              Now ({current} {PROPERTY.epc.currentBand})
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-sm border-2" style={{ borderColor: "rgba(31,31,31,0.4)" }} />
              Potential ({potential} {PROPERTY.epc.potentialBand})
            </span>
          </div>
        </div>

        <div>
          <h3 className="display text-3xl md:text-4xl leading-tight mb-4">
            One point <span style={{ fontStyle: "italic", color: "var(--accent)" }}>off a B.</span>
          </h3>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--ink-soft)" }}>
            Claytonhame currently rates <strong style={{ color: "var(--ink)" }}>80 / C</strong> —
            the very top of the C band, a single point from B-grade territory.
            That's exceptional for a period property in Winchester. Most homes of this age sit in D or E.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div
              className="rounded-xl p-5"
              style={{ background: "var(--cream-deep)" }}
            >
              <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--ink-soft)" }}>
                Current
              </div>
              <div className="display text-3xl">80 C</div>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ background: "var(--accent)", color: "white" }}
            >
              <div className="text-xs uppercase tracking-widest mb-1 opacity-70">Potential</div>
              <div className="display text-3xl">86 B</div>
            </div>
          </div>
          <a
            href={PROPERTY.epcUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm inline-flex items-center gap-1 underline"
            style={{ color: "var(--ink-soft)" }}
          >
            View the official EPC certificate <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}


