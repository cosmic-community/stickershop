import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  apiEnvironment: 'staging'
})

// Error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all stickers with category information
export async function getStickers() {
  try {
    const response = await cosmic.objects
      .find({ type: 'stickers' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch stickers');
  }
}

// Fetch single sticker by slug
export async function getSticker(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'stickers', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch sticker');
  }
}

// Fetch all categories
export async function getCategories() {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch categories');
  }
}

// Fetch single category by slug
export async function getCategory(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch category');
  }
}

// Fetch stickers by category
export async function getStickersByCategory(categoryId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'stickers',
        'metadata.category': categoryId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch stickers by category');
  }
}

// Fetch single page by slug
export async function getPage(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'pages', slug })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch page');
  }
}

// Fetch hero content (get the first/main hero)
export async function getHeroContent() {
  try {
    const response = await cosmic.objects
      .find({ type: 'hero' })
      .props(['id', 'title', 'slug', 'metadata'])
      .limit(1);
    
    return response.objects?.[0] || null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch hero content');
  }
}

// Fetch hero by slug
export async function getHero(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'hero', slug })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch hero');
  }
}