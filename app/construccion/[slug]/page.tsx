import { notFound } from "next/navigation";
import { pillars } from "@/app/data";
import { InfoBanner } from "@/app/components/about-us/InfoBanner";
import { RelatedSolutions } from "@/app/components/construction/RelatedSolutions";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return pillars.map((el) => ({
    slug: el.slug,
  }));
}

export default async function ConstructionDetailPage({ params }: Props) {
  const { slug } = await params;
  console.log(slug);
  const item = pillars.find((el) => el.slug === slug);

  if (!item) {
    notFound();
  }

  // Obtener 3 soluciones relacionadas aleatorias (excluyendo la actual)
  const otherPillars = pillars.filter((el) => el.slug !== slug);

  // Usar el slug como semilla para un "random" determinístico
  const getRandomIndex = (seed: string, max: number) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash) % max;
  };

  const randomRelated = otherPillars
    .sort((a, b) => {
      const seedA = `${slug}-${a.slug}`;
      const seedB = `${slug}-${b.slug}`;
      return getRandomIndex(seedA, 100) - getRandomIndex(seedB, 100);
    })
    .slice(0, 3)
    .map((pillar) => ({
      title: pillar.title,
      image: pillar.image,
      href: `/fotogaleria/${pillar.slug}`,
    }));

  return (
    <section className="w-full px-6 md:px-20 py-16 bg-white">
      {item.content}
      <InfoBanner />
      <RelatedSolutions items={randomRelated} />
    </section>
  );
}
