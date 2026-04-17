export interface Specialist {
  id: string
  name: string
  specialization: string
  photoUrl: string
  description?: string
}

export interface ServiceCategory {
  id: string
  title: string
  description: string
  iconUrl?: string
  imageUrl?: string
}

export interface PriceItem {
  service: string
  price: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: string
}
