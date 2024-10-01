"use client";

import type { Billboard } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";

interface BillboardProps {
  data: Billboard | Billboard[]; // يمكن أن يكون إما صورة واحدة أو قائمة
}

const Billboard: React.FC<BillboardProps> = ({ data }: BillboardProps) => {
  const billboards = Array.isArray(data) ? data : [data]; // التأكد من تحويل الصورة الواحدة إلى مصفوفة

  return (
    <div className="p-4 pt-10 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {billboards.map((billboard) => (
          <SwiperSlide key={billboard.id}>
            <div
              style={{ backgroundImage: `url(${billboard.imageUrl})` }}
              className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
            >
              <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
                <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
                  {billboard.label || "No label"}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Billboard;
