import getEnv from "@/lib/env"
import { MetaGenerator } from "@/lib/metadata"

import HeadPhone1Image from "@/assets/img/headphone1.png"
import HeadPhone2Image from "@/assets/img/headphone2.png"
import {
  AboutUsSection,
  StartSection,
  SubscriptionNewsLetterSection
} from "@/components/home/sections/common-home-sections"
import WeekProductsSection from "@/components/home/sections/week-products-section"
import CategoriesSection from "@/components/home/sections/categories-section"
import { BrandsCarousel } from "@/components/home/carousel/brands-carousel"

export const meta = () => MetaGenerator({ app_url: getEnv().APP_URL })

export default function HomePage() {
  return (
    <>
      <img
        className="absolute left-0 top-0 -z-10 hidden animate-fade-in transition fill-mode-forwards xs:block xs:w-[110px] sm:w-[125px]"
        src={HeadPhone1Image}
        alt="headphone-divided"
      />
      <img
        className="absolute -top-[50px] right-0 -z-10 w-[210px] animate-fade-in opacity-0 transition fill-mode-forwards sm:w-[275px] lg:w-[319px] xl:right-[13%]"
        src={HeadPhone2Image}
        alt="headphone-divided-2"
      />
      <StartSection />
      <WeekProductsSection />
      <CategoriesSection />
      <BrandsCarousel />
      <AboutUsSection />
      <SubscriptionNewsLetterSection />
    </>
  )
}
