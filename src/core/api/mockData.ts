export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  availableSlots: string[];
}

export interface HealthRecord {
  id: string;
  type: 'Lab Report' | 'Prescription' | 'Consultation' | 'Vaccination' | 'Allergy';
  date: string;
  description: string;
  attachments: string[];
}

const healthImages = [
  'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=400&h=400&fit=crop',
];

const generateProducts = (count: number): Product[] => {
  const categories = ['Medicine', 'Equipment', 'Vitamins', 'Ayurvedic', 'Personal Care'];
  return Array.from({ length: count }, (_, i) => ({
    id: `p_${i}`,
    name: `Health Product ${i + 1}`,
    price: Math.floor(Math.random() * 2000) + 100,
    category: categories[Math.floor(Math.random() * categories.length)],
    imageUrl: healthImages[i % healthImages.length],
  }));
};

const generateDoctors = (count: number): Doctor[] => {
  const specialties = ['Ayurveda General', 'Panchakarma', 'Skin & Hair', 'Digestion', 'Mental Health'];
  return Array.from({ length: count }, (_, i) => ({
    id: `d_${i}`,
    name: `Dr. Vaidya ${i + 1}`,
    specialty: specialties[Math.floor(Math.random() * specialties.length)],
    rating: Number((Math.random() * 2 + 3).toFixed(1)), // 3.0 to 5.0
    availableSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
  }));
};

const generateRecords = (count: number): HealthRecord[] => {
  const types: HealthRecord['type'][] = ['Lab Report', 'Prescription', 'Consultation', 'Vaccination', 'Allergy'];
  return Array.from({ length: count }, (_, i) => ({
    id: `r_${i}`,
    type: types[Math.floor(Math.random() * types.length)],
    date: new Date(Date.now() - Math.random() * 10000000000).toISOString(), // Random date in past ~4 months
    description: `Health record details for record ${i + 1}`,
    attachments: Math.random() > 0.5 ? [`https://picsum.photos/seed/record${i}/200/200`] : [],
  }));
};

// Generate in-memory dataset exactly matching assignment scale
export const mockDatabase = {
  products: generateProducts(20000),
  doctors: generateDoctors(5000),
  records: generateRecords(10000),
};
