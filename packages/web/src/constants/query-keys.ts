export const queryKeys = {
  services: {
    all: ['services'] as const,
    byCategory: (category: string) => ['services', category] as const,
  },
  specialists: {
    all: ['specialists'] as const,
    byId: (id: string) => ['specialists', id] as const,
  },
  gallery: {
    all: ['gallery'] as const,
  },
} as const
