'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function BlogCarousel({ photos, detailPage }: { photos: string[]; detailPage: boolean }) {
    if (!photos?.length) return null;

    return (
        <Swiper
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true }}
            navigation
            spaceBetween={10}
            slidesPerView={1}
            className={'max-h-[80vh] w-full rounded-md shadow-lg'}>
            {photos.map((url, idx) => (
                <SwiperSlide key={idx}>
                    <img
                        src={url}
                        alt={`Blog photo ${idx + 1}`}
                        className={
                            detailPage
                                ? 'max-h-[80vh] w-full rounded-md object-cover'
                                : 'h-48 w-full rounded-xl object-cover'
                        }
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
