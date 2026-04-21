const indoreHostels = [
  {
    title: "Shree Boys Hostel",
    description: "Affordable hostel near DAVV University with good food and WiFi.",
    location: "Takshashila Campus, Indore",
    price: 4500,
    gender: "Boys",
    roomType: "Double",
    amenities: ["WiFi", "Mess", "Laundry"],
    geometry: { geoJsonType: "Point", coordinates: [75.8780, 22.6910] },
    images: [{ url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267" }]
  },
  {
    title: "Elite Girls PG",
    description: "Safe and secure girls PG near Holkar Science College.",
    location: "Vijay Nagar, Indore",
    price: 7000,
    gender: "Girls",
    roomType: "Single",
    amenities: ["WiFi", "AC", "Security"],
    geometry: { geoJsonType: "Point", coordinates: [75.8900, 22.7500] },
    images: [{ url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2" }]
  },
  {
    title: "City Boys Hostel",
    description: "Budget hostel near IPS Academy with basic facilities.",
    location: "Bhawarkua, Indore",
    price: 4000,
    gender: "Boys",
    roomType: "Triple",
    amenities: ["Mess", "WiFi"],
    geometry: { geoJsonType: "Point", coordinates: [75.9300, 22.7200] },
    images: [{ url: "https://images.unsplash.com/photo-1505691723518-36a5ac3b2e0c" }]
  }
,
  {
    title: "Royal Girls Hostel",
    description: "Premium girls hostel near Prestige College.",
    location: "Scheme 54, Indore",
    price: 8500,
    gender: "Girls",
    roomType: "Single",
    amenities: ["AC", "WiFi", "Laundry", "Security"],
    geometry: { geoJsonType: "Point", coordinates: [75.8200, 22.7300] },
    images: [{ url: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6" }]
  }
,
  {
    title: "Student Hub Hostel",
    description: "Popular boys hostel near SGSITS college.",
    location: "Race Course Road, Indore",
    price: 5000,
    gender: "Boys",
    roomType: "Double",
    amenities: ["WiFi", "Mess"],
    geometry: { geoJsonType: "Point", coordinates: [75.8600, 22.7100] },
    images: [{ url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5" }]
  }
,
  {
    title: "Green View PG",
    description: "Peaceful PG near IET DAVV campus.",
    location: "Khandwa Road, Indore",
    price: 5200,
    gender: "Both",
    roomType: "Double",
    amenities: ["WiFi", "Garden", "Mess"],
    geometry: { geoJsonType: "Point", coordinates: [75.9000, 22.6900] },
    images: [{ url: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba" }]
}
,
  {
    title: "Sunrise Boys Hostel",
    description: "Near IPS Academy with study-friendly environment.",
    location: "Bhawarkua, Indore",
    price: 4200,
    gender: "Boys",
    roomType: "Single",
    amenities: ["WiFi", "Study Room"],
    geometry: { geoJsonType: "Point", coordinates: [75.9350, 22.7150] },
    images: [{ url: "https://images.unsplash.com/photo-1524230572899-a752b3835840" }]
}
,
  {
    title: "Lakshmi Girls PG",
    description: "Safe PG near Choithram College.",
    location: "Manik Bagh, Indore",
    price: 6800,
    gender: "Girls",
    roomType: "Double",
    amenities: ["WiFi", "Mess", "Security"],
    geometry: { geoJsonType: "Point", coordinates: [75.8700, 22.7000] },
    images: [{ url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511" }]
}
,
  {
    title: "Metro Boys Hostel",
    description: "Near Holkar College with transport facility.",
    location: "AB Road, Indore",
    price: 4800,
    gender: "Boys",
    roomType: "Triple",
    amenities: ["WiFi", "Mess", "Parking"],
    geometry: { geoJsonType: "Point", coordinates: [75.8500, 22.7200] },
    images: [{ url: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0" }]
}
,
  {
    title: "Dream Girls Hostel",
    description: "Modern hostel near Prestige Engineering College.",
    location: "Scheme 74, Indore",
    price: 9000,
    gender: "Girls",
    roomType: "Single",
    amenities: ["AC", "WiFi", "Gym"],
    geometry: { geoJsonType: "Point", coordinates: [75.8100, 22.7400] },
    images: [{ url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85" }]
}
,
  {
    title: "Campus Boys Hostel",
    description: "Budget-friendly hostel near DAVV Takshashila.",
    location: "Takshashila Road, Indore",
    price: 3800,
    gender: "Boys",
    roomType: "Triple",
    amenities: ["Mess", "WiFi"],
    geometry: { geoJsonType: "Point", coordinates: [75.8750, 22.6850] },
    images: [{ url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af" }]
}
,
  {
    title: "Shiv Shakti PG",
    description: "Near IPS College, good for engineering students.",
    location: "Bhawarkua, Indore",
    price: 4600,
    gender: "Boys",
    roomType: "Double",
    amenities: ["WiFi", "Mess"],
    geometry: { geoJsonType: "Point", coordinates: [75.9320, 22.7180] },
    images: [{ url: "https://images.unsplash.com/photo-1502005097973-6a7082348e28" }]
}
,
  {
    title: "Harmony Girls Hostel",
    description: "Peaceful environment near Choithram Hospital area.",
    location: "Manik Bagh, Indore",
    price: 7500,
    gender: "Girls",
    roomType: "Single",
    amenities: ["WiFi", "AC", "Security"],
    geometry: { geoJsonType: "Point", coordinates: [75.8650, 22.7050] },
    images: [{ url: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4" }]
}
,
  {
    title: "Prime Boys Hostel",
    description: "Near SGSITS with modern facilities.",
    location: "Race Course Road, Indore",
    price: 5500,
    gender: "Boys",
    roomType: "Double",
    amenities: ["WiFi", "Mess", "Study Hall"],
    geometry: { geoJsonType: "Point", coordinates: [75.8550, 22.7080] },
    images: [{ url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7" }]
}
,
  {
    title: "Comfort Girls PG",
    description: "Safe PG near Holkar Science College.",
    location: "Vijay Nagar, Indore",
    price: 7200,
    gender: "Girls",
    roomType: "Double",
    amenities: ["WiFi", "Mess", "Laundry"],
    geometry: { geoJsonType: "Point", coordinates: [75.8850, 22.7480] },
    images: [{ url: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83" }]
}
,
  {
    title: "Smart Boys Hostel",
    description: "Near IET DAVV with study environment.",
    location: "Khandwa Road, Indore",
    price: 4100,
    gender: "Boys",
    roomType: "Triple",
    amenities: ["WiFi", "Mess"],
    geometry: { geoJsonType: "Point", coordinates: [75.9050, 22.6880] },
    images: [{ url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa" }]
}
,
  {
    title: "Elite PG House",
    description: "Premium PG near Prestige College.",
    location: "Scheme 54, Indore",
    price: 9500,
    gender: "Both",
    roomType: "Single",
    amenities: ["AC", "WiFi", "Gym", "Security"],
    geometry: { geoJsonType: "Point", coordinates: [75.8150, 22.7350] },
    images: [{ url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6" }]
}
,
  {
    title: "Study Point Hostel",
    description: "Best for students near DAVV University.",
    location: "Takshashila Campus, Indore",
    price: 4700,
    gender: "Boys",
    roomType: "Double",
    amenities: ["WiFi", "Study Room"],
    geometry: { geoJsonType: "Point", coordinates: [75.8800, 22.6900] },
    images: [{ url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d" }]
}
,
  {
    title: "Safe Stay Girls PG",
    description: "Secure PG near Vijay Nagar main road.",
    location: "Vijay Nagar, Indore",
    price: 8000,
    gender: "Girls",
    roomType: "Single",
    amenities: ["WiFi", "AC", "Security"],
    geometry: { geoJsonType: "Point", coordinates: [75.8920, 22.7520] },
    images: [{ url: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f" }]
}
,
  {
    title: "Budget Boys Hostel",
    description: "Cheap hostel near Bhawarkua market.",
    location: "Bhawarkua, Indore",
    price: 3500,
    gender: "Boys",
    roomType: "Triple",
    amenities: ["Mess"],
    geometry: { geoJsonType: "Point", coordinates: [75.9400, 22.7220] },
    images: [{ url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91" }]
  }
];

module.exports = indoreHostels;

