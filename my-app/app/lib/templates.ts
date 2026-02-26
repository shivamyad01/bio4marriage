export interface Template {
  id: number;
  name: string;
  description: string;
  category: 'Traditional' | 'Modern' | 'Premium';
  religion: 'Hindu' | 'Muslim' | 'Christian' | 'Sikh' | 'Buddhist' | 'Jain';
  popular: boolean;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface BiodataFormData {
  name: string;
  dob: string;
  gender: string;
  religion: string;
  caste: string;
  height: string;
  complexion: string;
  email: string;
  phone: string;
  education: string;
  profession: string;
  income: string;
  fatherName: string;
  motherName: string;
  siblings: string;
  address: string;
  about: string;
  partnerExpectations: string;
}

export const defaultFormData: BiodataFormData = {
  name: '',
  dob: '',
  gender: '',
  religion: '',
  caste: '',
  height: '',
  complexion: '',
  email: '',
  phone: '',
  education: '',
  profession: '',
  income: '',
  fatherName: '',
  motherName: '',
  siblings: '',
  address: '',
  about: '',
  partnerExpectations: '',
};

/* ─── Religion-specific Preview Data ─── */

export const hinduPreviewData: BiodataFormData = {
  name: 'Sanjay Singh',
  dob: '22/10/2000',
  gender: 'Male',
  religion: 'Hindu',
  caste: 'Singh',
  height: '4 Feet 8 Inches',
  complexion: 'Fair',
  email: 'sanjay.singh@email.com',
  phone: '75678XXXXX',
  education: 'MBA in Finance',
  profession: 'Project Manager',
  income: '18 LPA',
  fatherName: 'Mr. Pramod Singh',
  motherName: 'Mrs. Meena Singh',
  siblings: 'No. Of Brother : 2, No. Of Sister : 2',
  address: 'Bangalore',
  about: 'A cheerful and family-oriented person with a passion for reading and classical dance. Believes in maintaining a balance between tradition and modernity.',
  partnerExpectations: 'Looking for a well-educated, caring, and family-oriented life partner with good values and a positive outlook towards life.',
};

export const muslimPreviewData: BiodataFormData = {
  name: 'Aayan Khan',
  dob: '22/10/2000',
  gender: 'Male',
  religion: 'Islam',
  caste: 'Syed',
  height: '4 Feet 8 Inches',
  complexion: 'Fair',
  email: 'aayan.khan@email.com',
  phone: '75678XXXXX',
  education: 'Master of Computer Science',
  profession: 'Software Engineer',
  income: '12 LPA',
  fatherName: 'Abdul Rehman',
  motherName: 'Nasreen Khan',
  siblings: 'No. Of Brother : 2, No. Of Sister : 2',
  address: 'New Delhi',
  about: 'A kind-hearted and well-educated person who values family traditions and Islamic values. Enjoys reading, cooking, and community service.',
  partnerExpectations: 'Looking for a well-educated, Allah-fearing, and caring life partner who respects family values and has a good character.',
};

export const christianPreviewData: BiodataFormData = {
  name: 'Sarah Thomas',
  dob: '25/12/1996',
  gender: 'Female',
  religion: 'Christian',
  caste: 'Catholic',
  height: '5 Feet 5 Inches',
  complexion: 'Fair',
  email: 'sarah.thomas@email.com',
  phone: '97654XXXXX',
  education: 'M.A. English Literature',
  profession: 'Content Manager, Infosys',
  income: '14 LPA',
  fatherName: 'Mr. George Thomas (Bank Manager)',
  motherName: 'Mrs. Mary Thomas (Nurse)',
  siblings: '1 Elder Sister (Married, Doctor)',
  address: 'Kochi, Kerala',
  about: 'A God-fearing, cheerful person who loves music, reading the Bible, and spending time with family. Active member of the church community.',
  partnerExpectations: 'Looking for a God-fearing, loving, and understanding life partner with strong Christian values and a kind heart.',
};

export const sikhPreviewData: BiodataFormData = {
  name: 'Harpreet Kaur',
  dob: '10/11/1997',
  gender: 'Female',
  religion: 'Sikh',
  caste: 'Jat Sikh',
  height: '5 Feet 6 Inches',
  complexion: 'Fair',
  email: 'harpreet.kaur@email.com',
  phone: '99876XXXXX',
  education: 'MBA, Punjab University',
  profession: 'HR Manager, Wipro',
  income: '16 LPA',
  fatherName: 'S. Gurdev Singh (Retd. Army Officer)',
  motherName: 'Smt. Jaswinder Kaur (Homemaker)',
  siblings: '1 Younger Brother (Engineer)',
  address: 'Chandigarh, Punjab',
  about: 'A vibrant, family-oriented person who follows Sikh values and Guru\'s teachings. Enjoys Kirtan, sports, and cooking traditional Punjabi cuisine.',
  partnerExpectations: 'Looking for a well-settled, Amritdhari or Sikh family-oriented life partner who values Gurbani and has a positive outlook.',
};

export const buddhistPreviewData: BiodataFormData = {
  name: 'Ankit Ambedkar',
  dob: '14/04/1998',
  gender: 'Male',
  religion: 'Buddhist',
  caste: 'Navayan Buddhist',
  height: '5 Feet 9 Inches',
  complexion: 'Wheatish',
  email: 'ankit.ambedkar@email.com',
  phone: '98765XXXXX',
  education: 'B.Tech, Computer Science',
  profession: 'Data Analyst, Amazon',
  income: '14 LPA',
  fatherName: 'Mr. Ramesh Ambedkar (Teacher)',
  motherName: 'Mrs. Sunanda Ambedkar (ANM)',
  siblings: '1 Elder Sister (Married, Teacher)',
  address: 'Nagpur, Maharashtra',
  about: 'A compassionate and mindful individual who follows the path of Lord Buddha. Interested in meditation, reading, and social welfare.',
  partnerExpectations: 'Looking for an educated, compassionate partner who respects Buddhist values, equality, and progressive thinking.',
};

export const jainPreviewData: BiodataFormData = {
  name: 'Prachi Jain',
  dob: '19/09/1997',
  gender: 'Female',
  religion: 'Jain',
  caste: 'Digambar Jain',
  height: '5 Feet 4 Inches',
  complexion: 'Fair',
  email: 'prachi.jain@email.com',
  phone: '99887XXXXX',
  education: 'CA (Chartered Accountant)',
  profession: 'Finance Manager, Deloitte',
  income: '20 LPA',
  fatherName: 'Mr. Suresh Jain (Businessman)',
  motherName: 'Mrs. Kavita Jain (Homemaker)',
  siblings: '1 Younger Brother (Student, IIT)',
  address: 'Indore, Madhya Pradesh',
  about: 'A disciplined and spiritual person who practices Jain values of non-violence and truth. Enjoys yoga, vegetarian cooking, and community service.',
  partnerExpectations: 'Looking for a well-educated, vegetarian, and Jain family-oriented life partner who respects Jain traditions and values.',
};

export const defaultPreviewData: BiodataFormData = hinduPreviewData;

export function getPreviewDataForReligion(religion: Template['religion']): BiodataFormData {
  switch (religion) {
    case 'Hindu': return hinduPreviewData;
    case 'Muslim': return muslimPreviewData;
    case 'Christian': return christianPreviewData;
    case 'Sikh': return sikhPreviewData;
    case 'Buddhist': return buddhistPreviewData;
    case 'Jain': return jainPreviewData;
    default: return hinduPreviewData;
  }
}

export const religions: Template['religion'][] = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain'];

export const templates: Template[] = [
  /* ─── Hindu Templates ─── */
  {
    id: 1, name: 'Royal Maroon',
    description: 'Traditional Hindu biodata with deep maroon & gold tones, ornamental borders, and classic "ॐ" header — perfect for showcasing family heritage.',
    category: 'Traditional', religion: 'Hindu', popular: true,
    colors: { primary: '#7B1F3A', secondary: '#D4AF37', accent: '#FFF8F0' },
  },
  {
    id: 2, name: 'Blush Rose',
    description: 'Clean and contemporary Hindu biodata with soft pink gradients, card-based layout, and modern typography for a fresh, elegant look.',
    category: 'Modern', religion: 'Hindu', popular: false,
    colors: { primary: '#DB2777', secondary: '#9333EA', accent: '#FDF2F8' },
  },
  {
    id: 3, name: 'Royal Navy',
    description: 'Premium Hindu biodata with deep navy blue, gold accents, mandala decoration, and structured sections for an impressive presentation.',
    category: 'Premium', religion: 'Hindu', popular: false,
    colors: { primary: '#1E3A5F', secondary: '#C89B3C', accent: '#F8F9FC' },
  },

  /* ─── Muslim Templates ─── */
  {
    id: 4, name: 'Emerald Crescent',
    description: 'Elegant Islamic biodata with emerald green & gold, crescent moon motifs, and Bismillah header for a traditional Nikkah biodata.',
    category: 'Traditional', religion: 'Muslim', popular: true,
    colors: { primary: '#065F46', secondary: '#D4AF37', accent: '#ECFDF5' },
  },
  {
    id: 5, name: 'Royal Mughal',
    description: 'Premium Mughal-inspired biodata with deep royal blue, gold geometric patterns, and elegant Islamic calligraphy-style header.',
    category: 'Premium', religion: 'Muslim', popular: false,
    colors: { primary: '#1E3A6F', secondary: '#C5A03F', accent: '#F0F4FF' },
  },
  {
    id: 6, name: 'Ivory Nikkah',
    description: 'Modern and clean Nikkah biodata with ivory & emerald accents, minimal card-based layout, and elegant contemporary design.',
    category: 'Modern', religion: 'Muslim', popular: false,
    colors: { primary: '#047857', secondary: '#92400E', accent: '#FFFBF0' },
  },

  /* ─── Christian Templates ─── */
  {
    id: 7, name: 'Holy Grace',
    description: 'Traditional Christian biodata with royal blue & gold, cross motif, and "By God\'s Grace" header for a blessed matrimonial profile.',
    category: 'Traditional', religion: 'Christian', popular: true,
    colors: { primary: '#1E40AF', secondary: '#D4AF37', accent: '#EFF6FF' },
  },
  {
    id: 8, name: 'Chapel Rose',
    description: 'Modern Christian biodata with soft rose & white tones, clean card design, and subtle cross accents for a contemporary feel.',
    category: 'Modern', religion: 'Christian', popular: false,
    colors: { primary: '#9F1239', secondary: '#D946EF', accent: '#FFF1F2' },
  },
  {
    id: 9, name: 'Blessed Cross',
    description: 'Premium Christian biodata with deep purple & gold, ornate cross design, and elegant presentation for a memorable profile.',
    category: 'Premium', religion: 'Christian', popular: false,
    colors: { primary: '#5B21B6', secondary: '#D4AF37', accent: '#F5F3FF' },
  },

  /* ─── Sikh Templates ─── */
  {
    id: 10, name: 'Khalsa Gold',
    description: 'Traditional Sikh biodata with navy & gold, Ik Onkar symbol, and Sat Sri Akal header — honoring Khalsa heritage.',
    category: 'Traditional', religion: 'Sikh', popular: true,
    colors: { primary: '#1E3A5F', secondary: '#D4A017', accent: '#FFF8E1' },
  },
  {
    id: 11, name: 'Royal Punjab',
    description: 'Premium Sikh biodata with royal blue & saffron, ornate borders, and Waheguru header for a majestic Anand Karaj profile.',
    category: 'Premium', religion: 'Sikh', popular: false,
    colors: { primary: '#1E3A8A', secondary: '#F59E0B', accent: '#EFF6FF' },
  },
  {
    id: 12, name: 'Anand Sahib',
    description: 'Modern Sikh biodata with clean layout, saffron & white tones, and Gurbani-inspired design for a fresh, contemporary look.',
    category: 'Modern', religion: 'Sikh', popular: false,
    colors: { primary: '#B45309', secondary: '#1E40AF', accent: '#FFFBEB' },
  },

  /* ─── Buddhist Templates ─── */
  {
    id: 13, name: 'Bodhi Serenity',
    description: 'Traditional Buddhist biodata with saffron & deep brown tones, Dharma wheel motif, and peaceful Bodhi tree decoration.',
    category: 'Traditional', religion: 'Buddhist', popular: true,
    colors: { primary: '#92400E', secondary: '#D97706', accent: '#FFFBEB' },
  },
  {
    id: 14, name: 'Lotus Path',
    description: 'Modern Buddhist biodata with serene blue & white, lotus accents, and minimalist card-based layout for a contemporary feel.',
    category: 'Modern', religion: 'Buddhist', popular: false,
    colors: { primary: '#0369A1', secondary: '#F59E0B', accent: '#F0F9FF' },
  },
  {
    id: 15, name: 'Golden Stupa',
    description: 'Premium Buddhist biodata with deep indigo & gold, stupa-inspired design, and elegant presentation honoring Buddhist heritage.',
    category: 'Premium', religion: 'Buddhist', popular: false,
    colors: { primary: '#312E81', secondary: '#D4AF37', accent: '#EEF2FF' },
  },

  /* ─── Jain Templates ─── */
  {
    id: 16, name: 'Ahimsa Gold',
    description: 'Traditional Jain biodata with maroon & gold, Jain Prateek Chinha symbol, and "Jai Jinendra" header honoring Jain values.',
    category: 'Traditional', religion: 'Jain', popular: true,
    colors: { primary: '#7C2D12', secondary: '#D4AF37', accent: '#FFF7ED' },
  },
  {
    id: 17, name: 'Navkar Modern',
    description: 'Modern Jain biodata with elegant teal & cream tones, clean card layout, and Navkar Mantra-inspired contemporary design.',
    category: 'Modern', religion: 'Jain', popular: false,
    colors: { primary: '#0D9488', secondary: '#B45309', accent: '#F0FDFA' },
  },
  {
    id: 18, name: 'Tirthankara Royal',
    description: 'Premium Jain biodata with deep royal blue & gold, ornate borders, and majestic design inspired by Tirthankara traditions.',
    category: 'Premium', religion: 'Jain', popular: false,
    colors: { primary: '#1E3A8A', secondary: '#D4AF37', accent: '#EFF6FF' },
  },
];

export function getTemplateById(id: number): Template | undefined {
  return templates.find((t) => t.id === id);
}
