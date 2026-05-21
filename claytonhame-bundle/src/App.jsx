import React, { useState, useEffect, useRef } from "react";
import {
  Send,
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
  Check,
  Download,
  Zap,
} from "lucide-react";

// ---------- Static data ----------
const PROPERTY = {
  name: "Claytonhame",
  address: "76 St Cross Road, Winchester",
  postcode: "SO23",
  available: "December 2025",
  beds: 4,
  baths: "3.5",
  sqft: 2200,
  sqm: 204,
  tenure: "Freehold",
  warranty: "10-year Build Zone warranty",
  guidePrice: 1450000,
  lat: 51.052875,
  lng: -1.321614,
  epc: { current: 80, potential: 86, currentBand: "C", potentialBand: "B" },
  epcUrl: "https://find-energy-certificate.service.gov.uk/energy-certificate/2605-1241-2811-1492-6842",
  brochureUrl: "https://drive.google.com/drive/folders/1xGtvh9SSFUEso93lBPdtF0PIwxIOHaEw",
  tagline: "Beautiful Homes for Easy Living",
};

const LOGO_URL = "https://ffour.co.uk/wp-content/uploads/2023/11/FFOUR-Estates-Logo-Label-Tag.png";

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
      url: "https://ffour.co.uk/wp-content/uploads/2026/05/Ground-Floor-scaled.png",
      width: 1554,
      height: 3111,
    },
    rooms: [
      {
        id: "upper-patio",
        name: "Upper Patio",
        dim: "Elevated terrace · mature planting",
        image: IMG.garden,
        note: "A private raised garden room for long summer evenings, with mature planting along the walls and a clear view back across the lower patio.",
        hotspot: { x: 36, y: 0, w: 64, h: 26 },
      },
      {
        id: "lower-patio",
        name: "Lower Patio",
        dim: "Sheltered · directly off the kitchen",
        image: IMG.garden,
        note: "The morning-coffee, kicked-off-shoes spot — sheltered, with built-in seating and planting, just outside the bifold doors.",
        hotspot: { x: 36, y: 26, w: 60, h: 11 },
      },
      {
        id: "dining",
        name: "Dining",
        dim: "Part of an 8.00 × 4.22m open plan",
        image: IMG.kitchen,
        note: "The dining end of the open-plan rear extension, framed by full-width aluminium bifold doors that fold back onto the lower patio.",
        hotspot: { x: 36, y: 37, w: 60, h: 13 },
      },
      {
        id: "kitchen",
        name: "Kitchen",
        dim: "Part of an 8.00 × 4.22m open plan",
        image: IMG.kitchen,
        note: "Rebuilt for modern living. Bespoke shaker cabinetry in white with brass handles, central island, chevron oak floor.",
        hotspot: { x: 36, y: 50, w: 60, h: 13 },
      },
      {
        id: "utility",
        name: "Utility Room",
        dim: "3.27 × 1.86m  ·  10'9\" × 6'1\"",
        image: IMG.utility,
        note: "Fitted shaker cabinetry, deep sink, integrated washer and dryer — quietly tucked away from the main living spaces.",
        hotspot: { x: 36, y: 63, w: 32, h: 8 },
      },
      {
        id: "wc-boot",
        name: "WC & Boot Room",
        dim: "By the rear entry · practically placed",
        image: IMG.wcBoot,
        note: "Deep green tiling, brass fittings, banquette seating for boots — exactly where you need it after walking dogs or coming back from the meadows.",
        hotspot: { x: 36, y: 71, w: 32, h: 8 },
      },
      {
        id: "living",
        name: "Living Room",
        dim: "5.5 × 4.9m  ·  18'1\" × 16'1\"",
        image: IMG.drawing,
        note: "South-facing with high ceilings, panelled walls and a bay window framing the light. Original architecture preserved, finishes thoroughly modernised.",
        hotspot: { x: 36, y: 78, w: 60, h: 22 },
      },
      {
        id: "hallway",
        name: "Entrance & Hallway",
        dim: "Original features · chevron oak",
        image: IMG.hallway,
        note: "Original cornicing, wainscoting and chevron oak underfoot. The staircase sweeps up to the right, with a clear sightline through to the kitchen and garden beyond.",
        hotspot: null,
      },
    ],
  },
  first: {
    label: "First Floor",
    plan: {
      url: "https://ffour.co.uk/wp-content/uploads/2026/05/First-Floor.png",
      width: 1394,
      height: 1503,
    },
    rooms: [
      {
        id: "bed2",
        name: "Second Bedroom",
        dim: "3.10 × 4.13m  ·  13'7\" × 10'2\"",
        image: IMG.bed2,
        note: "A second principal suite — a generous double with its own dressing room and ensuite.",
        hotspot: { x: 50, y: 1, w: 47, h: 27 },
      },
      {
        id: "bed2-dressing",
        name: "Dressing Room & Ensuite",
        dim: "Serving the second bedroom",
        image: IMG.bed2b,
        note: "A walk-through dressing room leading to its own ensuite shower — effectively a smaller mirror of the master suite.",
        hotspot: { x: 50, y: 28, w: 47, h: 14 },
      },
      {
        id: "master-en",
        name: "Master Ensuite",
        dim: "2.28 × 2.31m  ·  7'7\" × 7'6\"",
        image: IMG.masterEn,
        note: "Deep-green ceramic tile, brass fittings, walk-in shower.",
        hotspot: { x: 50, y: 42, w: 27, h: 13 },
      },
      {
        id: "master-dress",
        name: "Master Dressing Room",
        dim: "Walk-through joinery",
        image: IMG.masterEn,
        note: "Walk-through dressing with arched alcoves and built-in joinery, linking the master bedroom to the ensuite.",
        hotspot: { x: 50, y: 55, w: 27, h: 11 },
      },
      {
        id: "master",
        name: "Master Bedroom",
        dim: "5.17 × 3.91m  ·  17'0\" × 12'10\"",
        image: IMG.master,
        note: "Generous proportions, panelled walls, integrated arched joinery, and its own walk-through dressing room and ensuite.",
        hotspot: { x: 36, y: 66, w: 60, h: 33 },
      },
    ],
  },
  second: {
    label: "Second Floor",
    plan: {
      url: "https://ffour.co.uk/wp-content/uploads/2026/05/Second-Floor.png",
      width: 1471,
      height: 858,
    },
    rooms: [
      {
        id: "bed4",
        name: "Fourth Bedroom",
        dim: "3.79 × 3.59m  ·  12'5\" × 11'9\"",
        image: IMG.bed4,
        note: "Flexible as a guest room, child's room or home office, with original sash windows reinstated and panelled walls.",
        hotspot: { x: 14, y: 0, w: 47, h: 50 },
      },
      {
        id: "bed3",
        name: "Third Bedroom",
        dim: "4.05 × 3.63m  ·  13'3\" × 11'11\"",
        image: IMG.bed3,
        note: "A generous double with sash windows looking out to the treetops, eaves character and panelled walls.",
        hotspot: { x: 14, y: 50, w: 47, h: 50 },
      },
      {
        id: "fam-bath",
        name: "Family Bathroom",
        dim: "4.02 × 1.76m  ·  13'2\" × 5'9\"",
        image: IMG.famBath,
        note: "Full-length bath with shower over, double-basin vanity, deep green metro tile and brass fittings — coherent with the bathrooms below.",
        hotspot: { x: 61, y: 0, w: 25, h: 100 },
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
    { name: "Yiayias Kitchen", note: "Greek — local favourite, 4.6★", dist: "0.9 mi" },
    { name: "Royal Gurkha", note: "Nepalese, 5.0★", dist: "0.9 mi" },
    { name: "Lebanese House", note: "Levantine, 4.8★", dist: "1.1 mi" },
    { name: "Bistro du Vin", note: "Winchester institution", dist: "0.7 mi" },
  ],
};

const SPECIFICATION = [
  "Re-wired and re-plumbed throughout",
  "New gas central heating system & boiler",
  "Bespoke kitchen with integrated appliances",
  "Herringbone engineered oak flooring",
  "Full-width aluminium glazed doors to garden",
  "Three new bathrooms with porcelain tiling",
  "Replacement sash windows where required",
  "Tiered rear garden — lower patio + upper terrace",
  "Original cornicing & period features retained",
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
    role: "Winchester Office",
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
    answer: "The kitchen and dining is the heart of the house — 8.00 × 4.22 metres (26'3\" × 13'10\"), a single open space rebuilt for modern living. A bespoke shaker kitchen in white with brass handles, chevron oak floor, and full-width aluminium bifold doors that open onto the patio.",
  },
  {
    id: "living",
    primary: ["living", "drawing", "lounge", "sitting", "reception"],
    secondary: ["size", "big", "bay window", "ceiling", "panel", "wainscot"],
    answer: "The living room is 5.5 × 4.9m (18'1\" × 16'1\") — south-facing with high ceilings, panelled walls, and a bay window framing the light. Original architecture preserved, finishes thoroughly modernised. Chevron oak floor, brass fittings, and integrated lighting in the cornice.",
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
    answer: "The third bedroom is on the top floor — 4.05 × 3.63m (13'3\" × 11'11\") — a generous double with sash windows, eaves character, and panelled walls.",
  },
  {
    id: "bed4",
    primary: ["fourth bedroom", "4th bedroom", "bedroom four", "bedroom 4"],
    secondary: ["size", "top floor", "office"],
    answer: "The fourth bedroom is on the top floor at 3.79 × 3.59m (12'5\" × 11'9\") — flexible as a guest room, child's room or home office, with original sash windows reinstated.",
  },
  {
    id: "garden",
    primary: ["garden", "outside", "outdoor", "patio", "terrace", "rear"],
    secondary: ["upper", "lower", "size", "south", "facing"],
    answer: "The rear garden is in two distinct zones. A lower patio sits straight off the kitchen — the morning-coffee, kicked-off-shoes spot. A few steps up you reach the elevated upper terrace, a private raised garden room ideal for evenings, with mature planting along the walls.",
  },
  {
    id: "utility",
    primary: ["utility", "laundry", "washing machine"],
    secondary: ["size", "where"],
    answer: "The utility room is 3.27 × 1.86m (10'9\" × 6'1\"), fitted with shaker cabinetry, a deep sink, integrated washing machine and tumble dryer — tucked away off the kitchen so laundry doesn't intrude on the living spaces.",
  },
  {
    id: "boot",
    primary: ["boot room", "boot", "mud", "wc", "cloak", "downstairs loo", "downstairs toilet"],
    secondary: ["entry", "entrance", "where"],
    answer: "The boot room and WC sit just inside the entry hall — exactly where you need them after walking dogs or coming back from the meadows. Deep green tiling, brass fittings, banquette seating for boots.",
  },
  {
    id: "hallway",
    primary: ["hallway", "hall", "entrance", "entry", "front door"],
    secondary: ["original", "features", "stairs"],
    answer: "The entrance hallway keeps the home's original features — wainscoting, cornicing, and chevron oak underfoot. The staircase sweeps up to the right, and there's a clear sightline straight through to the kitchen and garden beyond.",
  },
  {
    id: "bathrooms",
    primary: ["bathroom", "bathrooms", "shower", "bath", "ensuite", "en-suite", "wet room"],
    secondary: ["how many", "count"],
    answer: "Three and a half bathrooms in total: a master ensuite, a second ensuite serving bedroom two, the family bathroom on the top floor, and a ground-floor WC. All three new bathrooms feature deep green metro tile, brass fittings, and walk-in showers (the family bath has a shower over).",
  },
  {
    id: "family-bath",
    primary: ["family bathroom"],
    secondary: ["size", "top floor"],
    answer: "The family bathroom on the top floor is 4.02 × 1.76m (13'2\" × 5'9\") — a full-length bath with shower over, double-basin vanity, and the same deep green tile that runs through the principal ensuite, giving the bathrooms a coherent material story.",
  },

  // SIZE
  {
    id: "total-size",
    primary: ["square feet", "sqft", "sq ft", "square metre", "square meter", "total size", "size of the house", "how big is the house", "gross area", "how big is the property"],
    secondary: ["total", "overall", "gross"],
    answer: "Claytonhame is 2,200 sq ft / 204 sq m across three floors. Generous for the street.",
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
    answer: "The guide price is £1,450,000.",
  },
  {
    id: "stamp",
    primary: ["stamp duty", "sdlt", "tax"],
    secondary: [],
    answer: "Stamp duty at the £1,450,000 guide is £91,250 under standard residential rates (no surcharge). Scroll down to the affordability calculator to see the full breakdown — including how it changes if you adjust the price or your deposit.",
  },
  {
    id: "mortgage",
    primary: ["mortgage", "monthly", "repayment", "payment", "afford"],
    secondary: ["interest", "rate", "term"],
    answer: "Roughly £5,500 a month on a 25% deposit over 30 years at 4.5%. The calculator below this section lets you change any of those numbers to fit your circumstances.",
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
    answer: "Brand new gas central heating system. The house was re-plumbed throughout during the refurbishment, with new radiators and a new boiler.",
  },
  {
    id: "warranty",
    primary: ["warranty", "guarantee", "build zone", "structural", "insurance", "covered"],
    secondary: [],
    answer: "Claytonhame is protected by a 10-year Build Zone structural warranty — the same insurance-backed cover a new build would carry. ffour Estates also operate under the Consumer Code for New Homes.",
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
    primary: ["council tax"],
    secondary: ["band"],
    answer: "I don't have the council tax band confirmed for you here — Jonathan Lacey or Lottie Lambert at Knight Frank can give you the exact figure when you get in touch.",
  },
  {
    id: "parking",
    primary: ["parking", "park the car", "driveway", "garage", "permit"],
    secondary: [],
    answer: "St Cross Road is a residential street with on-street parking. For specifics on permits and bay availability, the team at Knight Frank can confirm the current arrangements.",
  },
  {
    id: "completion",
    primary: ["completion", "available", "ready", "move in", "when can", "finished", "completion date"],
    secondary: ["december", "2025"],
    answer: "Claytonhame is scheduled to be available from December 2025.",
  },
  {
    id: "period",
    primary: ["when was", "how old", "period", "victorian", "edwardian", "georgian", "age of", "built", "year built"],
    secondary: [],
    answer: "Claytonhame is a period property — a classic late-Victorian/early-Edwardian Winchester semi, taken back to brick and rebuilt internally while keeping its original façade, bay window, cornicing and chevron flooring.",
  },
  {
    id: "name",
    primary: ["claytonhame", "name", "called", "why is it called"],
    secondary: [],
    answer: "Claytonhame is the house name carried with the property — its original name. ffour Estates have kept it: \"Some houses are built. Others are shaped by generations.\"",
  },

  // REFURBISHMENT
  {
    id: "refurb",
    primary: ["refurbish", "renovat", "redone", "work done", "what was done", "what's new", "spec"],
    secondary: ["full", "back to brick"],
    answer: "A full back-to-brick refurbishment. Re-wired and re-plumbed throughout, new gas heating system, bespoke kitchen, three new bathrooms, chevron engineered oak flooring to principal rooms, replacement sash windows where required, acoustic insulation between floors, two-zone landscaped garden — and original cornicing, wainscoting and period features retained.",
  },
  {
    id: "materials",
    primary: ["materials", "finishes", "spec", "specification", "oak", "brass", "tile", "stone"],
    secondary: ["floor", "wall"],
    answer: "Chevron-laid engineered oak to the principal rooms; deep green metro tile and brass fittings in the bathrooms; bespoke shaker cabinetry in the kitchen and utility; panelled wainscoting throughout the principal rooms; aluminium bifold doors to the garden.",
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
    answer: "Winchester has a strong food scene. Local favourites: Yiayias Kitchen (Greek, 4.6★), Royal Gurkha (Nepalese, 5★), Lebanese House (4.8★), Bistro du Vin, and a clutch of riverside pubs. All within a mile.",
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
    answer: "Viewings are by appointment with Knight Frank Winchester. Jonathan Lacey on 01962 677 242 (mobile 07483 341 508) or Lottie Lambert on 01962 677 246 (mobile 07977 759 140). Or scroll down and register your interest — they'll come back to you with viewing dates.",
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
    primary: ["ffour", "developer", "who built", "who refurbished", "builder"],
    secondary: [],
    answer: "ffour Estates — a Winchester-based developer focused on careful refurbishments of period homes. Their tagline: \"Beautiful homes for easy living.\"",
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
    return "That's a question I don't have a direct answer for. The best people for specifics like that are at Knight Frank — Jonathan Lacey on 01962 677 242 or Lottie Lambert on 01962 677 246. Or scroll down and register your interest and they'll come back to you.";
  }

  return best.answer;
}

// ---------- Main component ----------
export default function Claytonhame() {
  const [activeFloor, setActiveFloor] = useState("ground");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [hoveredRoom, setHoveredRoom] = useState(null);
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

  const [price, setPrice] = useState(PROPERTY.guidePrice);
  const [depositPct, setDepositPct] = useState(25);
  const [rate, setRate] = useState(4.5);
  const [term, setTerm] = useState(30);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", note: "" });

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollTop = chatEndRef.current.scrollHeight;
    }
  }, [messages, chatLoading]);

  const currentFloor = FLOORS[activeFloor];
  const selectedRoomObj = selectedRoom
    ? currentFloor.rooms.find((r) => r.id === selectedRoom)
    : currentFloor.rooms[0];

  const sendMessage = async (text) => {
    const content = (text ?? chatInput).trim();
    if (!content || chatLoading) return;
    const userMsg = { role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setChatLoading(true);
    // Simulate a brief "thinking" delay so it feels considered, not instant.
    const delay = 600 + Math.random() * 700;
    setTimeout(() => {
      const reply = findAnswer(content);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
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

  const handleFormSubmit = () => {
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
  };

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
      `}</style>

      <div style={{ fontFamily: "Manrope, sans-serif" }}>
        {/* NAV */}
        <nav
          className="sticky top-0 z-40 backdrop-blur-md"
          style={{ background: "rgba(245, 239, 230, 0.92)", borderBottom: "1px solid var(--line)" }}
        >
          <div className="max-w-6xl mx-auto px-6 flex items-start justify-between" style={{ minHeight: 86 }}>
            {/* Logo — flush top, hanging tag style */}
            <a href="#top" className="block flex-shrink-0" style={{ marginTop: 0 }}>
              <img
                src={LOGO_URL}
                alt="ffour Estates"
                className="block"
                style={{ height: 110, width: "auto", marginTop: 0, display: "block" }}
              />
            </a>

            {/* Right side — links + CTA, vertically centered */}
            <div className="flex items-center gap-8 self-center pb-1">
              <div className="hidden md:flex gap-7 text-sm" style={{ color: "var(--ink-soft)" }}>
                <a href="#story" className="hover:text-black">The House</a>
                <a href="#concierge" className="hover:text-black">Ask</a>
                <a href="#floorplan" className="hover:text-black">Floorplan</a>
                <a href="#area" className="hover:text-black">Area</a>
                <a href="#cost" className="hover:text-black">Cost</a>
                <a href="#contact" className="hover:text-black">Contact</a>
              </div>
              <a
                href="#contact"
                className="hidden md:inline-block px-5 py-2.5 text-sm tracking-wide rounded-full text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--ink)" }}
              >
                Book a viewing
              </a>
            </div>
          </div>
        </nav>

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
              className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] mb-8"
              style={{ color: "var(--gold-soft)" }}
            >
              <span className="block w-8 h-px" style={{ background: "var(--gold-soft)" }} />
              <span>ffour Estates · A new chapter</span>
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
                { label: "Guide price", value: "£1.45m", icon: HomeIcon },
                { label: "Available", value: "Dec 2025", icon: Calendar },
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
              <span>{PROPERTY.address}</span>
              <span className="mx-2">·</span>
              <Shield className="w-4 h-4" strokeWidth={1.5} />
              <span>{PROPERTY.warranty}</span>
              <span className="mx-2">·</span>
              <span className="italic">Sole agent: Knight Frank</span>
            </div>
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
          className="py-24 border-t"
          style={{ borderColor: "var(--line)", background: "var(--cream-deep)" }}
        >
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
              <div>
                <div
                  className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] mb-4"
                  style={{ color: "var(--gold)" }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Concierge</span>
                </div>
                <h2 className="display text-4xl md:text-5xl font-light leading-tight max-w-2xl">
                  Ask the house anything.
                </h2>
              </div>
              <p className="text-sm max-w-sm" style={{ color: "var(--ink-soft)" }}>
                Available around the clock. Trained on the full specification, the floorplan, and the neighbourhood — so you don't have to wait for an agent to call back.
              </p>
            </div>

            <div
              className="rounded-2xl border overflow-hidden"
              style={{ borderColor: "var(--line)", background: "var(--cream)" }}
            >
              <div
                ref={chatEndRef}
                className="chat-scroll p-6 md:p-8 space-y-5 overflow-y-auto"
                style={{ height: 420 }}
              >
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} fade-in`}
                  >
                    <div
                      className="max-w-[85%] px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed whitespace-pre-wrap"
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
                <div className="px-6 md:px-8 pb-4 flex flex-wrap gap-2">
                  {samplePrompts.map((p) => (
                    <button
                      key={p}
                      onClick={() => sendMessage(p)}
                      className="text-xs px-3.5 py-2 rounded-full border transition-colors hover:bg-white"
                      style={{ borderColor: "var(--line)", color: "var(--ink-soft)" }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}

              <div className="border-t flex items-center" style={{ borderColor: "var(--line)" }}>
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask about rooms, finishes, the area…"
                  className="flex-1 px-6 py-5 bg-transparent outline-none text-[15px]"
                  style={{ color: "var(--ink)" }}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={chatLoading || !chatInput.trim()}
                  className="mr-3 p-3 rounded-full transition-all disabled:opacity-30"
                  style={{ background: "var(--accent)", color: "white" }}
                >
                  <Send className="w-4 h-4" />
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

            {/* Floor tabs */}
            <div className="flex border-b mb-10" style={{ borderColor: "var(--line)" }}>
              {Object.entries(FLOORS).map(([key, floor]) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveFloor(key);
                    setSelectedRoom(null);
                    setHoveredRoom(null);
                  }}
                  className="px-6 py-4 text-sm transition-all relative"
                  style={{
                    color: activeFloor === key ? "var(--ink)" : "var(--ink-soft)",
                    fontWeight: activeFloor === key ? 500 : 400,
                  }}
                >
                  {floor.label}
                  {activeFloor === key && (
                    <span className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "var(--ink)" }} />
                  )}
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* LEFT: Floorplan with hotspots */}
              <div>
                <div
                  key={activeFloor + "-plan"}
                  className="fade-in mx-auto relative"
                  style={{
                    width: `min(100%, calc(85vh * ${currentFloor.plan.width} / ${currentFloor.plan.height}))`,
                    aspectRatio: `${currentFloor.plan.width} / ${currentFloor.plan.height}`,
                  }}
                >
                  <img
                    src={currentFloor.plan.url}
                    alt={`${currentFloor.label} floorplan`}
                    style={{ width: "100%", height: "100%", display: "block" }}
                    draggable={false}
                  />
                  {currentFloor.rooms.filter((r) => r.hotspot).map((room) => {
                    const isSelected = selectedRoomObj?.id === room.id;
                    const isHovered = hoveredRoom === room.id;
                    return (
                      <button
                        key={room.id}
                        title={room.name}
                        onClick={() => setSelectedRoom(room.id)}
                        onMouseEnter={() => setHoveredRoom(room.id)}
                        onMouseLeave={() => setHoveredRoom(null)}
                        aria-label={`View ${room.name}`}
                        style={{
                          position: "absolute",
                          left: `${room.hotspot.x}%`,
                          top: `${room.hotspot.y}%`,
                          width: `${room.hotspot.w}%`,
                          height: `${room.hotspot.h}%`,
                          background: isSelected
                            ? "rgba(181, 168, 124, 0.32)"
                            : isHovered
                            ? "rgba(181, 168, 124, 0.18)"
                            : "transparent",
                          border: isSelected
                            ? "1.5px solid var(--gold)"
                            : "1.5px solid transparent",
                          cursor: "pointer",
                          transition: "all 0.25s ease",
                          padding: 0,
                        }}
                      />
                    );
                  })}
                </div>
                <p className="text-xs mt-5 text-center" style={{ color: "var(--ink-soft)" }}>
                  Tap any room on the plan to explore
                </p>
              </div>

              {/* RIGHT: Room detail panel */}
              <div className="lg:sticky lg:top-28">
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
                    <p className="text-base leading-relaxed" style={{ color: "var(--ink-soft)" }}>
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
                          onClick={() => setSelectedRoom(room.id)}
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
          </div>
        </section>

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
                  Two gardens, <span style={{ fontStyle: "italic", color: "var(--accent)" }}>one address.</span>
                </h2>
                <p className="text-lg leading-relaxed mb-4" style={{ color: "var(--ink-soft)" }}>
                  The rear garden has been re-landscaped into two distinct zones. A lower patio runs straight off the kitchen — the morning-coffee, kicked-off-shoes spot.
                </p>
                <p className="text-lg leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  Climb a few steps and you're on the upper terrace: a private, raised garden room for long summer evenings, with mature planting along the walls.
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
              className="grid md:grid-cols-2 gap-8 rounded-2xl p-8 md:p-10"
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
                <div className="rounded-xl p-8" style={{ background: "var(--accent)", color: "white" }}>
                  <div className="text-xs uppercase tracking-[0.25em] opacity-70 mb-2">
                    Estimated monthly payment
                  </div>
                  <div className="display text-5xl font-light">{fmt(monthly)}</div>
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

        {/* CONTACT — Knight Frank agents + Register interest */}
        <section
          id="contact"
          className="py-24 border-t"
          style={{ borderColor: "var(--line)", background: "var(--cream-deep)" }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="text-xs uppercase tracking-[0.25em] mb-4" style={{ color: "var(--gold)" }}>
                Speak to the Agents
              </div>
              <h2 className="display text-4xl md:text-5xl font-light leading-tight mb-4">
                Sole agents. <span style={{ fontStyle: "italic", color: "var(--accent)" }}>Knight Frank Winchester.</span>
              </h2>
              <p className="text-sm max-w-md mx-auto" style={{ color: "var(--ink-soft)" }}>
                Viewings by appointment. Get in touch with Jon or Lottie directly, or register below and we'll be in touch.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {AGENTS.map((a) => (
                <AgentCard key={a.email} agent={a} />
              ))}
            </div>

            <div className="max-w-2xl mx-auto pt-12 border-t" style={{ borderColor: "var(--line)" }}>
              <h3 className="display text-2xl text-center mb-2">Or register your interest</h3>
              <p className="text-center text-sm mb-10" style={{ color: "var(--ink-soft)" }}>
                We'll add you to the early-viewings list and send updates as completion approaches.
              </p>

              {!formSubmitted ? (
                <div className="space-y-4">
                  <Field
                    label="Name"
                    value={formData.name}
                    onChange={(v) => setFormData({ ...formData, name: v })}
                  />
                  <Field
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(v) => setFormData({ ...formData, email: v })}
                  />
                  <Field
                    label="Phone (optional)"
                    value={formData.phone}
                    onChange={(v) => setFormData({ ...formData, phone: v })}
                  />
                  <Field
                    label="Anything we should know? (optional)"
                    value={formData.note}
                    onChange={(v) => setFormData({ ...formData, note: v })}
                    textarea
                  />
                  <button
                    onClick={handleFormSubmit}
                    disabled={!formData.name || !formData.email}
                    className="w-full px-6 py-4 text-sm tracking-wide rounded-full text-white transition-opacity hover:opacity-90 disabled:opacity-40 flex items-center justify-center gap-2 mt-4"
                    style={{ background: "var(--accent)" }}
                  >
                    Submit
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center py-12 fade-in">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: "var(--accent)" }}
                  >
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="display text-2xl mb-2">Thank you, {formData.name.split(" ")[0]}.</h3>
                  <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
                    We've got your details. Knight Frank will be in touch shortly with viewing dates.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          className="border-t py-12"
          style={{ borderColor: "var(--line)", background: "var(--ink)", color: "var(--cream-deep)" }}
        >
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-sm">
            <div>
              <div className="display text-xl mb-2">Claytonhame</div>
              <div className="opacity-60">76 St Cross Road, Winchester</div>
              <div className="opacity-60 mt-1">A development by ffour Estates</div>
              <div className="opacity-60 italic mt-3 text-xs">{PROPERTY.tagline}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest mb-3 opacity-50">Knight Frank Winchester</div>
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
              <div className="opacity-50 mt-4 text-xs">
                Particulars are illustrative. All measurements approximate. Images are computer generated.
              </div>
            </div>
          </div>
        </footer>
      </div>
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

function Field({ label, value, onChange, type = "text", textarea }) {
  return (
    <div>
      <label
        className="block text-xs uppercase tracking-widest mb-2"
        style={{ color: "var(--ink-soft)" }}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border bg-transparent text-sm outline-none focus:border-black"
          style={{ borderColor: "var(--line)", color: "var(--ink)" }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border bg-transparent text-sm outline-none focus:border-black"
          style={{ borderColor: "var(--line)", color: "var(--ink)" }}
        />
      )}
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
    <div className="rounded-2xl p-8 md:p-10" style={{ background: "var(--cream)" }}>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "var(--gold)" }}>
            <Zap className="w-3.5 h-3.5" />
            <span>Energy Performance</span>
          </div>
          <div className="space-y-1.5">
            {bands.map((b) => {
              const isCurrent = b.letter === PROPERTY.epc.currentBand;
              const isPotential = b.letter === PROPERTY.epc.potentialBand;
              return (
                <div key={b.letter} className="flex items-center gap-3">
                  <div
                    className="display text-sm font-semibold w-5"
                    style={{ color: "var(--ink)" }}
                  >
                    {b.letter}
                  </div>
                  <div className="flex-1 relative">
                    <div
                      className="h-8 flex items-center justify-between px-3 text-xs font-medium relative"
                      style={{
                        background: b.color,
                        width: `${b.width}%`,
                        color: ["A", "B", "C"].includes(b.letter) ? "white" : "#1C1A17",
                        clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%)",
                      }}
                    >
                      <span>{b.range}</span>
                    </div>
                    {isCurrent && (
                      <div
                        className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2"
                        style={{ left: `calc(${b.width}% + 8px)` }}
                      >
                        <div
                          className="px-2 py-1 rounded text-[10px] tracking-wider uppercase font-semibold"
                          style={{ background: "var(--ink)", color: "white" }}
                        >
                          Now · {current}
                        </div>
                      </div>
                    )}
                    {isPotential && (
                      <div
                        className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2"
                        style={{ left: `calc(${b.width}% + 8px)` }}
                      >
                        <div
                          className="px-2 py-1 rounded text-[10px] tracking-wider uppercase font-semibold border"
                          style={{ borderColor: "var(--ink)", color: "var(--ink)", background: "white" }}
                        >
                          Potential · {potential}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
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


