// app/[slug]/page.tsx
import { getPage } from '@/lib/cosmic'
import { Page } from '@/types'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug) as Page | null;
  
  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }

  return {
    title: `${page.metadata?.title || page.title} - StickerShop`,
    description: page.metadata?.seo_description || `${page.title} page at StickerShop`,
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPage(slug) as Page | null;
  
  if (!page) {
    notFound();
  }

  return (
    <div className="py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            {page.metadata?.title || page.title}
          </h1>
          
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: page.metadata?.content || page.content || '' 
            }}
          />
        </div>
      </div>
    </div>
  )
}