// app/stickers/[slug]/page.tsx
import { getSticker, getStickers } from '@/lib/cosmic'
import { Sticker } from '@/types'
import { notFound } from 'next/navigation'
import ProductDetails from '@/components/ProductDetails'
import ProductImageGallery from '@/components/ProductImageGallery'
import type { Metadata } from 'next'

interface StickerPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const stickers = await getStickers()
  
  return stickers.map((sticker: Sticker) => ({
    slug: sticker.slug,
  }))
}

export async function generateMetadata({ params }: StickerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sticker = await getSticker(slug) as Sticker | null;
  
  if (!sticker) {
    return {
      title: 'Sticker Not Found',
    }
  }

  return {
    title: `${sticker.metadata?.name || sticker.title} - StickerShop`,
    description: sticker.metadata?.description || `${sticker.title} sticker available at StickerShop`,
  }
}

export default async function StickerPage({ params }: StickerPageProps) {
  const { slug } = await params;
  const sticker = await getSticker(slug) as Sticker | null;
  
  if (!sticker) {
    notFound();
  }

  return (
    <div className="py-12">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <ProductImageGallery 
              images={sticker.metadata?.product_images || []}
              alt={sticker.metadata?.name || sticker.title}
            />
          </div>
          
          <div>
            <ProductDetails sticker={sticker} />
          </div>
        </div>
      </div>
    </div>
  )
}