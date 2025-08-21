// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Sticker product interface
export interface Sticker extends CosmicObject {
  type: 'stickers';
  metadata: {
    name?: string;
    description?: string;
    price?: number;
    product_images?: {
      url: string;
      imgix_url: string;
    }[];
    category?: Category;
    size?: string;
    material?: {
      key: string;
      value: string;
    };
    waterproof?: boolean;
    in_stock?: boolean;
  };
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    category_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Page interface
export interface Page extends CosmicObject {
  type: 'pages';
  metadata: {
    title?: string;
    content?: string;
    seo_description?: string;
  };
}

// Material types
export type StickerMaterial = 'vinyl' | 'paper' | 'holographic' | 'clear';

// Cart interfaces
export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
  material?: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  isOpen: boolean;
}

// Stripe interfaces
export interface CheckoutSession {
  id: string;
  url: string;
}

export interface CreateCheckoutSessionRequest {
  items: {
    id: string;
    quantity: number;
  }[];
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isSticker(obj: CosmicObject): obj is Sticker {
  return obj.type === 'stickers';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

export function isPage(obj: CosmicObject): obj is Page {
  return obj.type === 'pages';
}