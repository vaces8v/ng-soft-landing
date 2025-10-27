"use client";
import React, {
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
export interface CarouselProps {
  items: React.JSX.Element[];
  initialScroll?: number;
}
export type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  description?: string;
  link: string;
};
export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});
export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);
  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };
  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 280 : 320;
      const gap = 16;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };
  const isMobile = () => {
    return window && window.innerWidth < 768;
  };
  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-6 [scrollbar-width:none] md:py-10"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l",
            )}
          ></div>
          <div
            className={cn(
              "flex flex-row justify-start gap-4 pl-4",
              "mx-auto max-w-7xl",
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                  },
                }}
                key={"card" + index}
                className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mr-10 flex justify-end gap-2">
          <button
            aria-label="Прокрутить влево"
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 hover:bg-neutral-300 transition-colors disabled:opacity-50 dark:bg-neutral-800 dark:hover:bg-neutral-700"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <ArrowLeft className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
          </button>
          <button
          aria-label="Прокрутить вправо"
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 hover:bg-neutral-300 transition-colors disabled:opacity-50 dark:bg-neutral-800 dark:hover:bg-neutral-700"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <ArrowRight className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};
export type CardProps = {
  card: Card;
  index: number;
  layout?: boolean;
};
export const Card = ({
  card,
  index,
  layout = false,
}: CardProps) => {
  return (
    <motion.div
      layoutId={layout ? `card-${card.title}` : undefined}
      className="relative z-10 flex h-[420px] w-[280px] flex-col overflow-hidden rounded-3xl shadow-xl transition-all duration-300 hover:shadow-2xl md:h-[480px] md:w-[320px]"
    >
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg-carousel-light.png"
          alt="Background"
          fill
          className="object-cover dark:hidden"
        />
        <Image
          src="/bg-carousel-dark.png"
          alt="Background"
          fill
          className="object-cover hidden dark:block"
        />
      </div>
      
      <div className="relative z-10 flex flex-1 flex-col p-6 md:p-8">
        {/* Icon */}
        {card.icon && (
          <motion.div
            layoutId={layout ? `icon-${card.title}` : undefined}
            className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700"
          >
            {card.icon}
          </motion.div>
        )}
        
        {/* Category */}
        <motion.p
          layoutId={layout ? `category-${card.category}` : undefined}
          className="mb-2 text-sm font-medium text-neutral-600 dark:text-neutral-400"
        >
          {card.category}
        </motion.p>
        
        {/* Title */}
        <motion.h3
          layoutId={layout ? `title-${card.title}` : undefined}
          className="mb-4 text-2xl font-bold text-neutral-900 md:text-3xl dark:text-white"
        >
          {card.title}
        </motion.h3>
        
        {/* Description */}
        {card.description && (
          <p className="mb-6 flex-1 text-sm leading-relaxed text-neutral-600 md:text-base dark:text-neutral-400">
            {card.description}
          </p>
        )}
        
        {/* Link Button */}
        <Link
          href={card.link}
          className="group inline-flex items-center gap-2 self-start rounded-xl bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
        >
          Подробнее
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};