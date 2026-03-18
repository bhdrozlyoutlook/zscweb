import { Hero, LatestBlog, HomeGallery, Contact } from '@/components/sections';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <Hero />
      <LatestBlog />
      <HomeGallery />
      <Contact />
    </>
  );
}
