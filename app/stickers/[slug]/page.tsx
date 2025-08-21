// app/stickers/[slug]/page.tsx
import { getSticker } from '@/lib/cosmic'
import { Sticker } from '@/types'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ProductImageGallery from '@/components/ProductImageGallery'
import ProductDetails from '@/components/ProductDetails'

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sticker = await getSticker(slug) as Sticker | null;
  
  if (!sticker) {
    return {
      title: 'Sticker Not Found',
    }
  }

  return {
    title: `${sticker.metadata?.name || sticker.title} - StickerShop`,
    description: sticker.metadata?.description || `Premium ${sticker.title} sticker available at StickerShop`,
    openGraph: {
      title: sticker.metadata?.name || sticker.title,
      description: sticker.metadata?.description || '',
      images: sticker.metadata?.product_images?.[0]?.imgix_url ? [
        {
          url: `${sticker.metadata.product_images[0].imgix_url}?w=1200&h=630&fit=crop&auto=format`,
          width: 1200,
          height: 630,
        }
      ] : [],
    },
  }
}

export default async function StickerPage({ params }: PageProps) {
  const { slug } = await params;
  const sticker = await getSticker(slug) as Sticker | null;
  
  if (!sticker) {
    notFound();
  }

  return (
    <div className="py-12">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductImageGallery sticker={sticker} />
          <ProductDetails sticker={sticker} />
        </div>
      </div>
    </div>
  )
}