export const copy = {
  brand: {
    name: 'EVO Studio',
    tagline: 'Beauty, care and confidence in one refined space.',
  },
  nav: {
    services: 'Services',
    prices: 'Prices',
    specialists: 'Specialists',
    about: 'About',
    gallery: 'Gallery',
    contact: 'Contact',
  },
  hero: {
    headline: 'Trust your beauty to professionals',
    subheadline: 'Hair, nails, skincare and beauty treatments in a calm and elegant setting.',
    cta: 'Book Now',
    ctaSecondary: 'View Services',
  },
  services: {
    overline: 'EVO Studio',
    title: 'Signature Services',
    subtitle: 'Five directions of beauty and care, each guided by experienced professionals.',
    categories: {
      hair: { title: 'Hair', description: 'Cuts, coloring, styling and treatments' },
      nails: { title: 'Nails', description: 'Manicure, pedicure, gel and nail art' },
      face: { title: 'Face', description: 'Facials, peels, skincare rituals' },
      browsLashes: {
        title: 'Brows & Lashes',
        description: 'Shaping, tinting, lamination and extensions',
      },
      body: { title: 'Body', description: 'Massage, wraps and body treatments' },
    },
  },
  pricing: {
    overline: 'Transparent Pricing',
    title: 'Selected Prices',
    subtitle: 'Starting prices for our most popular treatments.',
    cta: 'View full price list',
    items: [
      { service: 'Manicure', price: 'from 300 MDL' },
      { service: 'Haircut', price: 'from 250 MDL' },
      { service: 'Coloring', price: 'from 600 MDL' },
      { service: 'Facial care', price: 'from 450 MDL' },
    ],
  },
  specialists: {
    overline: 'Our Team',
    title: 'Our Specialists',
    subtitle: 'Passionate professionals who make every visit exceptional.',
    cta: 'Book',
    items: [
      { name: 'Ana M.', specialization: 'Hair Stylist' },
      { name: 'Elena R.', specialization: 'Nail Artist' },
      { name: 'Victoria P.', specialization: 'Aesthetician' },
      { name: 'Cristina D.', specialization: 'Brow & Lash Specialist' },
    ],
  },
  about: {
    overline: 'Our Story',
    title: 'About Us',
    description:
      'EVO Studio is a space of beauty, care and relaxation, where every detail is designed to make you feel comfortable, confident and well looked after.',
    quote:
      'We believe every woman deserves a place where she can slow down, feel cared for, and leave more confident than when she arrived.',
    quoteAttribution: '— The EVO Studio Team',
  },
  whyEvo: {
    title: 'Why EVO Studio',
    points: [
      { icon: 'people', title: 'Experienced specialists' },
      { icon: 'favorite', title: 'Personalized care' },
      { icon: 'star', title: 'Premium products' },
      { icon: 'spa', title: 'Elegant atmosphere' },
      { icon: 'verified', title: 'Hygiene and comfort' },
      { icon: 'autoAwesome', title: 'Attention to detail' },
    ],
  },
  gallery: {
    overline: 'Our Work',
    title: 'Gallery',
    subtitle: 'A glimpse into the results and the atmosphere at EVO Studio.',
  },
  contact: {
    overline: 'Get in Touch',
    title: 'Contact & Booking',
    address: 'str. Nicolae Starostenco 25',
    phone: '+373 783 67 347',
    hours: 'Mon — Sat: 9:00 — 20:00',
    ctaBook: 'Book an appointment',
    ctaCall: 'Call now',
    ctaDirections: 'Get directions',
    mapPlaceholder: 'View on Google Maps',
  },
  social: {
    instagram: '#',
    facebook: '#',
  },
  footer: {
    copyright: '2026 EVO Studio. All rights reserved.',
  },
} as const
