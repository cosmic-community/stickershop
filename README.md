# StickerShop - Premium Online Sticker Store

![StickerShop Preview](https://imgix.cosmicjs.com/bccfbd40-7ea5-11f0-8dcc-651091f6a7c0-photo-1425082661705-1834bfd09dca-1755791073973.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive e-commerce website for Peel Good Co, showcasing their premium sticker collection with a clean design and intuitive shopping experience.

## Features

- 🎯 **Product Showcase** - Beautiful product catalog with detailed information
- 🏷️ **Category Navigation** - Browse stickers by Animals, Space, Nature themes
- 📱 **Responsive Design** - Optimized for all devices and screen sizes
- 🖼️ **High-Quality Images** - Optimized product photography with imgix
- 📄 **Content Pages** - About Us and shipping information pages
- ⚡ **Fast Performance** - Built with Next.js and optimized loading
- 🔍 **SEO Friendly** - Proper metadata and search engine optimization

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=68a73e4bd25c2c79dfa86c8f&clone_repository=68a73fd3d25c2c79dfa86cb3)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a website for a company that sells stickers online"

### Code Generation Prompt

> Create a website for a company Peel Good Co that sells stickers online

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS
- **Content Management:** Cosmic CMS
- **Language:** TypeScript
- **Image Optimization:** imgix
- **Package Manager:** Bun

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the content structure set up

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sticker-shop
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Run the development server:
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Cosmic SDK Examples

### Fetching Stickers
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all stickers with category information
const stickers = await cosmic.objects
  .find({ type: 'stickers' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get stickers by category
const animalStickers = await cosmic.objects
  .find({ 
    type: 'stickers',
    'metadata.category': categoryId 
  })
  .depth(1)
```

### Fetching Categories
```typescript
// Get all categories
const categories = await cosmic.objects
  .find({ type: 'categories' })
  .props(['id', 'title', 'slug', 'metadata'])

// Get single category
const category = await cosmic.objects
  .findOne({ type: 'categories', slug: 'animals' })
```

## Cosmic CMS Integration

This application integrates with three main content types in your Cosmic bucket:

### Stickers Object Type
- **name** (text): Product name
- **description** (textarea): Product description
- **price** (number): Product price
- **product_images** (files): Product photos
- **category** (object): Connected category
- **size** (text): Product dimensions
- **material** (select): Vinyl, Paper, Holographic, Clear
- **waterproof** (switch): Waterproof status
- **in_stock** (switch): Stock availability

### Categories Object Type
- **name** (text): Category name
- **description** (textarea): Category description
- **category_image** (file): Category featured image

### Pages Object Type
- **title** (text): Page title
- **content** (html-textarea): Page content
- **seo_description** (textarea): SEO meta description

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Netlify
1. Push your code to GitHub
2. Connect your GitHub repository to Netlify
3. Set build command: `bun run build`
4. Set environment variables in Netlify dashboard
5. Deploy

### Environment Variables for Production
Set these in your hosting platform:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

## License

MIT License - feel free to use this project for your own sticker business!
<!-- README_END -->