import Link from 'next/link'
import { Hero as HeroType } from '@/types'

interface HeroProps {
  heroData: HeroType | null;
}

export default function Hero({ heroData }: HeroProps) {
  // Use heroData if available, otherwise fall back to default content
  const title = heroData?.metadata?.hero_title || "Express Yourself with Premium Stickers";
  const subtitle = heroData?.metadata?.hero_subtitle || "Discover unique, high-quality stickers perfect for laptops, water bottles, notebooks, and more. Durable materials, creative designs, and fast shipping.";
  const ctaText = heroData?.metadata?.cta_text || "Shop All Stickers";
  const ctaLink = heroData?.metadata?.cta_link || "/stickers";
  const secondaryButtonText = heroData?.metadata?.secondary_button_text || "Browse Categories";
  const secondaryButtonLink = heroData?.metadata?.secondary_button_link || "/categories";
  const backgroundImage = heroData?.metadata?.hero_background_image?.imgix_url;

  const sectionStyle = backgroundImage 
    ? {
        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.8), rgba(37, 99, 235, 0.8)), url(${backgroundImage}?w=1920&h=1080&fit=crop&auto=format,compress)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    : {};

  return (
    <section 
      className="bg-gradient-to-br from-primary to-blue-600 text-white min-h-[600px] flex items-center"
      style={sectionStyle}
    >
      <div className="container py-24">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl mb-8 text-blue-100 leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href={ctaLink}
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              {ctaText}
            </Link>
            <Link 
              href={secondaryButtonLink}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors text-center backdrop-blur-sm hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              {secondaryButtonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}