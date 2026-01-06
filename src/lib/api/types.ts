/**
 * Tipos TypeScript para os dados da API
 * Garante type-safety em toda a aplicação
 */

export interface GaleriaImage {
  url: string;
  alt: string;
  is_primary: boolean;
}

export interface GaleriaProject {
  id: number;
  title: string;
  category: string;
  description: string;
  images: GaleriaImage[];
  tags: string[];
  date: string;
  is_highlighted: boolean;
  instagram_url?: string; // URL do post no Instagram (opcional)
}

export type GaleriaResponse = GaleriaProject[];

export interface SiteMap {
  [key: string]: string | SiteMap;
}

export interface FooterCompany {
  name: string;
  description: string;
  logo: string;
}

export interface FooterAddress {
  enable: boolean;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface FooterContact {
  email: string;
  phone: string;
  whatsapp: string;
}

export interface FooterSocial {
  instagram: string;
  facebook: string;
  youtube: string;
  linkedin: string;
  whatsapp: string;
}

export interface FooterData {
  company: FooterCompany;
  address: FooterAddress;
  contact: FooterContact;
  social: FooterSocial;
}

export interface Servico {
  id: number;
  order: number;
  title: string;
  description: string;
  icon: string;
  image: string;
  is_coming_soon: boolean;
  is_premium?: boolean;
}

export type ServicosResponse = Servico[];

export interface Empresa {
  id: number;
  name: string;
  logo: string;
  website: string;
  short_description: string;
  long_description: string;
  order: number;
}

export type EmpresasResponse = Empresa[];

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export type FAQResponse = FAQ[];
