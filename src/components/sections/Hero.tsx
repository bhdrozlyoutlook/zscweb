import { getHeroSlides } from '@/lib/firestore';
import HeroSlider from './HeroSlider';

export default async function Hero() {
  const allSlides = await getHeroSlides();
  const slides = allSlides.filter((s) => s.visible);

  return <HeroSlider slides={slides} />;
}
