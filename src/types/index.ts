export interface NavItem {
  id?: string;
  label: string;
  href: string;
  order?: number;
  visible?: boolean;
}

export interface SocialLink {
  id?: string;
  name: string;
  href: string;
  icon: string;
  order?: number;
  visible?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image?: string;
  readTime: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  date?: string;
  description?: string;
}

export interface PressItem {
  id: string;
  title: string;
  source: string;
  date: string;
  excerpt: string;
  link: string;
  image?: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText?: string;
  buttonLink?: string;
  order: number;
  visible: boolean;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  keywords: string[];
  author: string;
  siteUrl: string;
}
