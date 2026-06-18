export type CertificateCategory =
  | 'Executive Communication & Presence'
  | 'Content Strategy & Brand'
  | 'Crisis & Reputation Management'
  | 'Internal & Employee Communications'
  | 'CSR & ESG Communications'
  | 'Governance, Policy & Public Affairs'
  | 'Digital & Social Media'
  | 'Speechwriting & Rhetorical Arts';

export interface CertificateCourse {
  id: string;
  category: CertificateCategory;
  name: string;
  duration: string;
  format: 'Hybrid' | 'Online';
  classSizeMin: number;
  classSizeMax: number;
  description: string;
  modules: string[];
  instructors: string[];
}

export interface ShortTermCourse {
  id: string;
  segment: 'Senior Leaders' | 'CEOs' | 'HR Professionals' | 'CSR Professionals' | 'Working Executives' | 'Communication Students';
  name: string;
  duration: string;
  format: 'Hybrid' | 'Online';
  classSizeMin: number;
  classSizeMax: number;
  description: string;
  keyTopics: string[];
  instructors: string[];
}
