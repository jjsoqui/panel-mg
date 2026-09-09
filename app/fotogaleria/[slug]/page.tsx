import { notFound } from "next/navigation";
import { pillars } from "@/app/data";
import GalleryGridLightbox from "./GalleryGridLightbox";

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

export default async function PhotogalleryDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = pillars.find((el) => el.slug === slug);
  const galleryImages = item?.galleryImages;

  if (!item || !galleryImages) {
    notFound();
  }

  return (
    <section className="w-full px-6 md:px-20 py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold font-inter text-[#0d1b2a] mb-2">
          {item.title}
        </h1>
        <div className="w-24 h-[3px] bg-red-600 mb-12" />
        <GalleryGridLightbox title={item.title} images={galleryImages} />
      </div>
    </section>
  );
}
