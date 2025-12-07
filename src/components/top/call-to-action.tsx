import arrowRight from "@public/icon-arrow-right-white.svg";
import leftImage from "@public/top/top-panels-left.webp";
import rightImage from "@public/top/top-panels-right.webp";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const CallToAction = () => {
  return (
    <section className="mb-[-2.5rem] pt-0 text-center sm:pt-20 lg:mb-[-5rem]">
      <div className="md:flex md:items-stretch">
        <div
          className="bg-cover px-8 py-8 sm:py-10 md:flex md:min-h-[15.375rem] md:w-1/2 md:pr-0"
          style={{ backgroundImage: `url(${leftImage.src})` }}
        >
          <div className="md:ml-auto md:max-w-[40.375rem] md:flex-1 md:self-center">
            <div className="w-full self-center px-4">
              <h4 className="pb-5 text-base font-bold leading-6 text-white">
                ミヤスポ記者・編集部員募集中
              </h4>
              <div className="text-center">
                <Button
                  className="rounded-full px-5 py-2 font-open text-base font-medium sm:px-3 sm:py-[.375rem] sm:font-bold"
                  asChild
                >
                  <Link
                    href={{
                      pathname: "/inquiry",
                      query: { type: "1" },
                    }}
                  >
                    お問い合わせ
                    <Image
                      className="ml-1 cursor-pointer"
                      src={arrowRight}
                      alt="icon password toggle"
                      height={16}
                      width={16}
                    />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="bg-[#CED4DA] bg-cover px-8 py-8 sm:py-10 md:flex md:min-h-[15.375rem] md:w-1/2 md:pl-0"
          style={{ backgroundImage: `url(${rightImage.src})` }}
        >
          <div className="md:mr-auto md:max-w-[40.375rem] md:flex-1 md:self-center">
            <div className="w-full px-4">
              <h4 className="pb-5 text-base font-bold leading-6 text-white">
                広告に関するお問い合わせ
              </h4>
              <Button
                className="rounded-full px-5 py-2 font-open text-base font-medium sm:px-3 sm:py-[.375rem] sm:font-bold"
                asChild
              >
                <Link
                  href={{
                    pathname: "/inquiry",
                    query: { type: "2" },
                  }}
                >
                  お問い合わせ
                  <Image
                    className="ml-1 cursor-pointer"
                    src={arrowRight}
                    alt="icon password toggle"
                    height={16}
                    width={16}
                  />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
