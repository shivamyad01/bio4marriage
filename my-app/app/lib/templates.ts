export interface Template {
  id: number;
  name: string;
  description: string;
  category: 'Traditional' | 'Modern' | 'Premium';
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

export const defaultPreviewData: BiodataFormData = {
  name: 'Priya Sharma',
  dob: '15 Aug 1997',
  gender: 'Female',
  religion: 'Hindu',
  caste: 'Brahmin',
  height: "5'4\"",
  complexion: 'Fair',
  email: 'priya.sharma@email.com',
  phone: '+91 98765 43210',
  education: 'MBA, IIM Ahmedabad',
  profession: 'Senior Analyst, Deloitte',
  income: '18 LPA',
  fatherName: 'Sh. Ramesh Sharma (Retd. Professor)',
  motherName: 'Smt. Sunita Sharma (Homemaker)',
  siblings: '1 Elder Brother (Married, Engineer)',
  address: 'Sector 21, Noida, UP',
  about: 'A cheerful and family-oriented person with a passion for reading and classical dance. Believes in maintaining a balance between tradition and modernity.',
  partnerExpectations: 'Looking for a well-educated, caring, and family-oriented life partner with good values and a positive outlook towards life.',
};

export const templates: Template[] = [
  {
    id: 1,
    name: 'Royal Maroon',
    description: 'Traditional Indian biodata with deep maroon & gold tones, ornamental borders, and classic "ॐ" header — perfect for showcasing family heritage.',
    category: 'Traditional',
    popular: true,
    colors: { primary: '#7B1F3A', secondary: '#D4AF37', accent: '#FFF8F0' },
  },
  {
    id: 2,
    name: 'Blush Rose',
    description: 'Clean and contemporary design with soft pink gradients, card-based layout, and modern typography for a fresh, elegant look.',
    category: 'Modern',
    popular: true,
    colors: { primary: '#DB2777', secondary: '#9333EA', accent: '#FDF2F8' },
  },
  {
    id: 3,
    name: 'Royal Navy',
    description: 'Premium regal design with deep navy blue, gold accents, mandala decoration, and structured sections for an impressive presentation.',
    category: 'Premium',
    popular: true,
    colors: { primary: '#1E3A5F', secondary: '#C89B3C', accent: '#F8F9FC' },
  },
];

export function getTemplateById(id: number): Template | undefined {
  return templates.find((t) => t.id === id);
}
