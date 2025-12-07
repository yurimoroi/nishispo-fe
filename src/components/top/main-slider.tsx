"use client";

import { TopArticleTypes } from "@/components/top/lib/types";
import { cn, formatDate } from "@/lib/utils";
import arrowLeft from "@public/arrow-left.svg";
import arrowRight from "@public/arrow-right.svg";
import noImage from "@public/placeholder/no-image.webp";
import heroBG from "@public/top/hero-bg.webp";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

interface Props {
  articles: TopArticleTypes[];
}

const MainSlider = ({ articles }: Props) => {
  const slider = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  if (articles && articles.length === 0) return null;

  const settings = {
    dots: false,
    arrows: false,
    infinite: articles.length > 1,
    slidesToShow: 1,
    speed: 500,
    draggable: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    beforeChange: (oldIndex: number, newIndex: number) =>
      setCurrentSlide(newIndex),
  };

  const goToSlide = (index: number) => {
    slider?.current?.slickGoTo(index);
  };

  const renderCustomDots = () => {
    return (
      <div className="absolute left-0 right-0 top-full flex translate-y-4 justify-center space-x-4 lg:left-auto lg:right-0">
        {articles?.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full ${
              currentSlide === index
                ? "bg-orange-200"
                : "bg-orange-200 opacity-50"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    );
  };

  return (
    <section
      className="bg-[#dee2e6] bg-cover"
      style={{ backgroundImage: `url(${heroBG.src})` }}
    >
      <Slider ref={slider} {...settings}>
        {articles?.length > 0 &&
          articles?.map((slide: TopArticleTypes, index) => (
            <div key={slide?.article?.id}>
              <div className="m-auto max-w-[81.9375rem] lg:px-8">
                <div className="relative">
                  <div className="relative lg:py-2">
                    <Link href={`/articles/${slide?.article?.id}`}>
                      <div className="relative h-[12.5625rem] w-full md:h-[26.5rem] lg:w-[53.75rem]">
                        <Image
                          className="object-cover"
                          src={
                            slide?.article?.all_media_url?.length === 0
                              ? noImage
                              : slide?.article?.all_media_url[0]?.original
                          }
                          fill
                          sizes="100%"
                          alt={`${slide?.article?.title} image`}
                        />
                      </div>
                    </Link>

                    <div className="mx-8 translate-y-[-3rem] bg-white p-5 lg:absolute lg:right-0 lg:top-[4.125rem] lg:mx-0 lg:w-[31.25rem] lg:translate-y-0">
                      {slide?.article?.categories &&
                        slide?.article?.categories?.length > 0 && (
                          <Link
                            href={`/articles/categories/${slide?.article?.categories[0]?.id}`}
                            className={cn(
                              "inline-block rounded-full border border-transparent bg-[#dee2e6] px-[.625rem] py-1 text-xs font-bold sm:px-3 lg:text-base",
                              slide?.article?.categories[0]?.color !== "#FFFFFF"
                                ? "text-white"
                                : "border border-gray-300",
                            )}
                            style={{
                              backgroundColor:
                                slide?.article?.categories[0]?.color,
                            }}
                          >
                            {slide?.article?.categories[0]?.name}
                          </Link>
                        )}
                      <h2 className="my-2 line-clamp-2 text-lg font-bold leading-6 lg:text-[1.625rem] lg:leading-9">
                        <Link href={`/articles/${slide?.article?.id}`}>
                          {slide?.article?.title}
                        </Link>
                      </h2>
                      <p className="pb-[.625rem] text-sm leading-[1.125rem] text-[#ADB5BD]">
                        {formatDate(slide?.article?.updated_at)} 投稿
                      </p>
                      <div className="border-t border-black pt-[.625rem]">
                        <p className="mb-[.625rem] line-clamp-3 text-base text-[#6C757D] sm:text-sm lg:leading-[1.3125rem]">
                          {slide?.article?.body}
                        </p>
                        <div className="text-right text-[.75rem] leading-[1.125rem] text-[#6C757D]">
                          <span>{slide?.article?.user?.contributor_name}</span>
                        </div>
                      </div>
                      {renderCustomDots()}
                    </div>
                  </div>
                  {articles?.length > 1 && (
                    <div>
                      <button
                        className="absolute left-0 top-[20%] -translate-y-1/2 transform md:top-[30%] lg:left-[-3vw] lg:top-1/2"
                        onClick={() => slider?.current?.slickPrev()}
                      >
                        <div className="relative h-8 w-8">
                          <Image
                            className="object-cover brightness-200 contrast-200 invert"
                            src={arrowLeft}
                            fill
                            alt="slider left arrow control"
                          />
                        </div>
                      </button>
                      <button
                        className="absolute right-0 top-[20%] -translate-y-1/2 transform md:top-[30%] lg:right-[-3vw] lg:top-1/2"
                        onClick={() => slider?.current?.slickNext()}
                      >
                        <div className="relative h-8 w-8">
                          <Image
                            className="object-cover brightness-200 contrast-200 invert"
                            src={arrowRight}
                            fill
                            alt="slider right arrow control"
                          />
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </section>
  );
};

export default MainSlider;
