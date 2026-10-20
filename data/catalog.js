/**
 * Babulal Furniture - Product Catalog & Configuration Data Layer
 * Source of Truth: Real catalog products & business details
 */

const BabulalConfig = {
  brand: {
    name: "BABULAL FURNITURE",
    tagline: "Built for Life. Priced for You.",
    subtitle: "Manufacturer & Atelier of Handcrafted Solid Wood Furniture",
    description: "Generational Indian timber craftsmanship combined with quiet contemporary design. We create solid wood furniture made to belong in your home for generations.",
  },
  contact: {
    phone: "7069951956",
    phoneDisplay: "+91 70699 51956",
    altPhone: "9588808967",
    altPhoneDisplay: "+91 95888 08967",
    whatsapp: "917069951956",
    whatsappNumber: "7069951956",
    whatsappLink: "https://wa.me/917069951956",
    website: "https://www.babulalfurniture.com",
    websiteDisplay: "www.babulalfurniture.com",
    email: "contact@babulalfurniture.com",
    address: "Babulal Furniture Showroom & Workshop, Rajasthan, India",
    workingHours: "Monday – Sunday: 9:30 AM – 8:30 PM",
  },
  features: [
    {
      title: "Custom Designs",
      desc: "Every piece can be customized in dimensions, wood species, and fabric to fit your floorplan.",
      icon: "design_services"
    },
    {
      title: "Attention to Detail",
      desc: "Precision mortise-and-tenon joinery, hand-sanded hardwood edges, and solid brass fittings.",
      icon: "carpenter"
    },
    {
      title: "Made Around Your Requirements",
      desc: "Choose from Sagwan (Teak), Sheesham, Italian marble tops, and premium lacquer or wax finishes.",
      icon: "tune"
    },
    {
      title: "Direct Manufacturer Value",
      desc: "Zero middlemen. You deal directly with our workshop team for true factory-direct pricing.",
      icon: "factory"
    },
    {
      title: "Personalized Service",
      desc: "Direct consultations via WhatsApp and phone for measurements, 3D drawings, and material selection.",
      icon: "support_agent"
    }
  ]
};

const BabulalCategories = [
  {
    id: "living-room",
    name: "Living Room",
    count: 3,
    description: "Curated coffee tables, TV consoles, and lounge suites crafted for warmth and hospitality.",
    image: "assets/images/modern-tv-unit.webp",
    imageFallback: "assets/images/modern-tv-unit.jpeg"
  },
  {
    id: "bedroom",
    name: "Bedroom Suites",
    count: 3,
    description: "Heirloom platform beds, hydraulic storage frames, and cylindrical designer bedside boxes.",
    image: "assets/images/modern-luxury-bed.webp",
    imageFallback: "assets/images/modern-luxury-bed.jpeg"
  },
  {
    id: "dining-room",
    name: "Dining Room",
    count: 2,
    description: "Marble-top dining tables, brass-accented velvet chairs, and cylindrical nested slatted suites.",
    image: "assets/images/dining-table.webp",
    imageFallback: "assets/images/dining-table.png"
  },
  {
    id: "swings-jhula",
    name: "Swings / Jhula",
    count: 3,
    description: "Suspended indoor and veranda swings with hand-carved jali backrests and heavy cast brass chains.",
    image: "assets/images/premium-heritage-jhula.webp",
    imageFallback: "assets/images/premium-heritage-jhula.jpeg"
  },
  {
    id: "mandir-temples",
    name: "Mandir / Home Temples",
    count: 2,
    description: "Auspicious home sanctuaries with illuminated brass bells, carved crests, and frosted mantra doors.",
    image: "assets/images/traditional-wooden-temple.webp",
    imageFallback: "assets/images/traditional-wooden-temple.jpeg"
  },
  {
    id: "doors-architectural",
    name: "Doors & Architectural Woodwork",
    count: 2,
    description: "Backlit brass lotus pooja doors and hand-carved Kalpavriksha Tree of Life relief wall panels.",
    image: "assets/images/premium-temple-door.webp",
    imageFallback: "assets/images/premium-temple-door.jpeg"
  },
  {
    id: "decor-accents",
    name: "Décor & Accents",
    count: 1,
    description: "Hand-turned solid wood baluster plant and curio stands with dual polished marble tiers.",
    image: "assets/images/wooden-plant-stand.webp",
    imageFallback: "assets/images/wooden-plant-stand.jpeg"
  }
];

const BabulalProducts = [
  {
    id: "contemporary-comfort-jhula",
    name: "Contemporary Comfort Wooden Jhula",
    category: "Swings / Jhula",
    categoryId: "swings-jhula",
    image: "assets/images/comfortable-jhula.webp",
    imageFallback: "assets/images/comfortable-jhula.jpeg",
    price: "Price on Request",
    featured: true,
    tagline: "Timeless Comfort in Every Swing",
    specs: [
      "Solid hardwood timber frame with warm natural oil finish",
      "Vertical slatted side armrests & supportive backrest",
      "High-density upholstered linen bench cushion & matching bolsters",
      "Suspension ropes / heavy-duty brass links included"
    ],
    materials: "Solid Hardwood, Linen Upholstery, Heavy Brass/Rope Mounts",
    customOptions: "Custom bench length (4ft to 6ft), fabric color, and suspension link type."
  },
  {
    id: "elegant-marble-dining-table",
    name: "Elegant Marble Dining Table & Velvet Chairs",
    category: "Dining Room",
    categoryId: "dining-room",
    image: "assets/images/dining-table.webp",
    imageFallback: "assets/images/dining-table.png",
    price: "Price on Request",
    featured: true,
    tagline: "Elegant Dining for Better Togetherness • Style Meets Comfort",
    specs: [
      "Polished quartz / marble tabletop with rotating Lazy Susan turntable",
      "Solid fluted wood pedestal central column for maximum legroom",
      "Curved emerald green velvet dining chairs with brass-accented legs",
      "Durable, long-lasting construction designed for everyday family dining"
    ],
    materials: "Italian / Composite Marble, Solid Wood Base, Velvet, Brass Legs",
    customOptions: "6-seater, 8-seater or 10-seater configurations; custom velvet upholstery colors."
  },
  {
    id: "functional-bed-side-box",
    name: "Round Functional Bed Side Box",
    category: "Bedroom Suites",
    categoryId: "bedroom",
    image: "assets/images/bed-side-box.webp",
    imageFallback: "assets/images/bed-side-box.jpeg",
    price: "Price on Request",
    featured: false,
    tagline: "Stylish | Functional | Modern",
    specs: [
      "High-gloss polyurethane white lacquer cylindrical body",
      "2 spacious curved drawers with smooth concealed runners",
      "Compact circular profile saving valuable floor space",
      "Sturdy and durable build fitting seamlessly beside modern beds"
    ],
    materials: "Engineered Hardwood, High-Gloss Lacquer, Soft-Close Hardware",
    customOptions: "Available in pure white, matte black, walnut veneer, and custom diameters."
  },
  {
    id: "heritage-carved-jali-jhula",
    name: "Heritage Carved Jali Jhula",
    category: "Swings / Jhula",
    categoryId: "swings-jhula",
    image: "assets/images/heritage-jhula.webp",
    imageFallback: "assets/images/heritage-jhula.jpeg",
    price: "Price on Request",
    featured: true,
    tagline: "Heirloom Craftsmanship for Balconies & Verandas",
    specs: [
      "Seasoned solid Teakwood / Sheesham construction",
      "Traditional hand-carved four-leaf jali lattice pattern backrest",
      "Upholstered comfortable bench cushion in ivory weave",
      "Heavy-cast solid brass link chains tested for heavy load bearing"
    ],
    materials: "Pure Teakwood / Sheesham, Hand-Carved Jali, Solid Cast Brass Chains",
    customOptions: "Custom chain length, ceiling bracket kits, and weather-resistant outdoor polish."
  },
  {
    id: "luxury-round-coffee-table-pouffes",
    name: "Luxury Round Coffee Table with 4 Nested Pouffes",
    category: "Living Room",
    categoryId: "living-room",
    image: "assets/images/luxury-sofa-table.webp",
    imageFallback: "assets/images/luxury-sofa-table.jpeg",
    price: "Price on Request",
    featured: true,
    tagline: "Smart Space-Saving Entertaining Suite",
    specs: [
      "Polished beige marble tabletop with bevelled edges",
      "Solid hardwood interlocking cross base frame",
      "4 quadrant curved leatherette upholstered pouffes nested underneath",
      "Stools pull out smoothly for instant guest seating and stow away flush"
    ],
    materials: "Natural Marble, Solid Hardwood Frame, Premium Leatherette Upholstery",
    customOptions: "Choice of marble stone (Black Marquina, White Carrara, Beige Travertine) & stool fabric."
  },
  {
    id: "modern-comfort-platform-bed",
    name: "Modern Comfort Platform Bed",
    category: "Bedroom Suites",
    categoryId: "bedroom",
    image: "assets/images/modern-comfort-platform-bed.webp",
    imageFallback: "assets/images/modern-comfort-platform-bed.jpeg",
    price: "Price on Request",
    featured: true,
    tagline: "Simple • Stylish • Spacious — Your Space Our Craft",
    specs: [
      "Modern platform bed foundation in smooth premium white lacquer finish",
      "Integrated hydraulic / drawer smart space-saving storage compartment",
      "Ergonomic dual-cushion charcoal headboard for comfortable reading recline",
      "Squeak-free reinforced solid timber internal subframe"
    ],
    materials: "Solid Hardwood Skeleton, Lacquered Panels, High-Resilience Foam, Hydraulic System",
    customOptions: "King Size (72x78 in), Queen Size (60x78 in); hydraulic lift or drawer storage."
  },
  {
    id: "modern-luxury-bed-collection",
    name: "Modern Luxury Bed Collection",
    category: "Bedroom Suites",
    categoryId: "bedroom",
    image: "assets/images/modern-luxury-bed.webp",
    imageFallback: "assets/images/modern-luxury-bed.jpeg",
    price: "Price on Request",
    featured: true,
    tagline: "Comfort • Style • Durability — Your Space Our Craft",
    specs: [
      "Solid hardwood bed frame with sculpted tapered legs and floating aesthetic",
      "Full-width fluted wood wall headboard panel adding architectural depth",
      "Tufted black leather padded headrest cushions",
      "Matching integrated bedside floating nightstands"
    ],
    materials: "Solid Hardwood, Architectural Fluted Wood, Padded Leather Headboard",
    customOptions: "Custom wall panel widths, integrated ambient LED cove lighting channels."
  },
  {
    id: "modern-luxury-tv-wall-unit",
    name: "Modern Luxury TV Wall Unit & Console",
    category: "Living Room",
    categoryId: "living-room",
    image: "assets/images/modern-tv-unit.webp",
    imageFallback: "assets/images/modern-tv-unit.jpeg",
    price: "Price on Request",
    featured: true,
    tagline: "Architectural Entertainment Center with Ambient Illumination",
    specs: [
      "Full-height fluted wood surround with concealed cable management",
      "Backlit Italian marble feature wall slab behind television",
      "Floating base credenza with drawers and soundbar shelf",
      "Integrated fluted glass acoustic divider partition screen"
    ],
    materials: "Solid Hardwood Framing, Italian Marble Slab, Fluted Toughened Glass, Warm LED Channels",
    customOptions: "Bespoke dimensions matched to your living room wall width and screen size."
  },
  {
    id: "cylindrical-dining-set",
    name: "Cylindrical Space-Saving Dining Set",
    category: "Dining Room",
    categoryId: "dining-room",
    image: "assets/images/modern-dining-chairs.webp",
    imageFallback: "assets/images/modern-dining-chairs.jpeg",
    price: "Price on Request",
    featured: false,
    tagline: "Architectural Symmetry with Flush-Nesting Chairs",
    specs: [
      "Circular polished marble tabletop resistant to hot dishes",
      "Curved slatted solid wood chairs crafted to follow the table curvature",
      "Chairs push completely flush into table, forming a seamless wooden cylinder",
      "Upholstered comfortable seat cushions in deep indigo leatherette"
    ],
    materials: "Polished Marble, Solid Teakwood Slats, Heavy-Duty Hardware",
    customOptions: "4-seater (42 in dia) and 6-seater (54 in dia) options; custom wood stains."
  },
  {
    id: "premium-heritage-sheesham-jhula",
    name: "Premium Heritage Sheesham Jhula",
    category: "Swings / Jhula",
    categoryId: "swings-jhula",
    image: "assets/images/premium-heritage-jhula.webp",
    imageFallback: "assets/images/premium-heritage-jhula.jpeg",
    price: "Price on Request",
    featured: true,
    tagline: "Timeless Comfort in Every Swing",
    specs: [
      "Select Seasoned Sheesham Wood with rich natural grain figuring",
      "Vertical wood fluted backrest with rounded safety edges",
      "Cylindrical side bolsters secured with brushed solid brass brackets",
      "Solid cast brass elephant chains symbolizing majesty and heritage"
    ],
    materials: "Premium Sheesham Wood, Cast Brass Elephant Chains, Linen-Cotton Weave",
    customOptions: "Custom bolster fabric colors, peacock or elephant chain motif options."
  },
  {
    id: "premium-temple-partition-door",
    name: "Premium Pooja Room Partition Door",
    category: "Doors & Architectural Woodwork",
    categoryId: "doors-architectural",
    image: "assets/images/premium-temple-door.webp",
    imageFallback: "assets/images/premium-temple-door.jpeg",
    price: "Price on Request",
    featured: false,
    tagline: "Sacred Architectural Gateway with Brass Accents",
    specs: [
      "Floor-to-ceiling bi-fold pooja sanctuary door system",
      "Dark fluted timber panelling framed in brushed gold/brass profiles",
      "Central illuminated brass Lotus motif medallion",
      "Auspicious Swastika pattern fretwork belt with clear fluted glass panes"
    ],
    materials: "Solid Hardwood, Brass Profiles, Toughened Fluted Glass, Backlit Medallion",
    customOptions: "Single leaf, double swing, or sliding bi-fold configurations custom sized to opening."
  },
  {
    id: "premium-gayatri-mantra-temple",
    name: "Premium Gayatri Mantra Home Temple",
    category: "Mandir / Home Temples",
    categoryId: "mandir-temples",
    image: "assets/images/premium-temple.webp",
    imageFallback: "assets/images/premium-temple.jpeg",
    price: "Price on Request",
    featured: true,
    tagline: "Sacred Sanctum with Radiant Bells & Inscribed Mantras",
    specs: [
      "Solid walnut/teakwood framed free-standing or wall-mount mandir",
      "Frosted glass doors laser-etched with sacred Gayatri Mantra in Sanskrit",
      "18 individually suspended brass bells (ghanti) in illuminated lattice cubicles",
      "Lower doors etched with radiant Om (ॐ) and Swastika (卐) medallions",
      "Built-in base drawers for pooja samagri with soft-close slides"
    ],
    materials: "Solid Teak/Walnut, Etched Toughened Glass, 18 Brass Bells, LED Backlighting",
    customOptions: "Custom dimensions, choice of deity mantras, warm or neutral LED temperature."
  },
  {
    id: "traditional-peacock-wooden-temple",
    name: "Traditional Hand-Carved Peacock Temple",
    category: "Mandir / Home Temples",
    categoryId: "mandir-temples",
    image: "assets/images/traditional-wooden-temple.webp",
    imageFallback: "assets/images/traditional-wooden-temple.jpeg",
    price: "Price on Request",
    featured: true,
    tagline: "Tradition Meets Timeless Beauty — A Home for Your Faith",
    specs: [
      "Master artisan hand-carved solid wood construction with walnut finish",
      "Elaborate hand-carved peacock crown crest atop architectural cornice",
      "30 hanging pure brass bells mounted in windowed grid door panels",
      "Two deep pooja drawers and adjacent storage cupboard for sacred essentials"
    ],
    materials: "Solid Teak / Sheesham Wood, 30 Pure Brass Bells, Antiqued Hinges",
    customOptions: "Wall-hung or floor-mounted pedestal base; custom wood stain shades."
  },
  {
    id: "tree-of-life-jali-panel",
    name: "Hand-Carved Kalpavriksha Jali Wall Panel",
    category: "Doors & Architectural Woodwork",
    categoryId: "doors-architectural",
    image: "assets/images/wall-panel-tree-of-life.webp",
    imageFallback: "assets/images/wall-panel-tree-of-life.jpeg",
    price: "Price on Request",
    featured: false,
    tagline: "Heirloom Relief Carving for Feature Walls & Partitions",
    specs: [
      "Intricate architectural relief carving depicting the divine Kalpavriksha Tree of Life",
      "Flanked by symmetrical mandala arch filigree screens and floral border bands",
      "Concealed LED edge-lighting channel creating dramatic shadow depth",
      "Ideal for grand foyer entries, living room feature backdrops, or pooja rooms"
    ],
    materials: "Seasoned Solid Hardwood / High-Density Architectural Board, Matte Cream Finish",
    customOptions: "Bespoke wall sizing up to 12ft wide; warm backlight integration."
  },
  {
    id: "wooden-plant-stand-2-level",
    name: "Hand-Turned 2-Level Round Display Stand",
    category: "Décor & Accents",
    categoryId: "decor-accents",
    image: "assets/images/wooden-plant-stand.webp",
    imageFallback: "assets/images/wooden-plant-stand.jpeg",
    price: "Price on Request",
    featured: false,
    tagline: "Artisanal Tabletop Accent in Solid Wood & Marble",
    specs: [
      "Hand-turned solid hardwood baluster central pedestal column",
      "Decorative carved fluting around the weighted circular stable base",
      "Two polished circular marble tier plates for planters, idols, or candle arrangements",
      "Compact sculptural footprint for desks, consoles, and dining sideboards"
    ],
    materials: "Hand-Turned Solid Hardwood, Natural Polished Marble Discs",
    customOptions: "Choice of warm honey teak, dark walnut, or antique distressed wood finish."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BabulalConfig, BabulalCategories, BabulalProducts };
}
