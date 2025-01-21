import React, { useEffect, useRef, useState } from "react";
import BookCard from "../books/BookCard";



import { Swiper, SwiperSlide } from "swiper/react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import required modules
import { Pagination, Navigation } from "swiper/modules";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

const Recomended = () => {
  
  const {data: books = []} = useFetchAllBooksQuery();
      console.log(books);
    const swiperRef = useRef(null); // Reference for Swiper instance
  
    
  return (
    <div className="py-16">
      <h2 className="text-3xl font-semibold mb-6">Recomended Books for you</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={false} // Disable default navigation
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        ref={swiperRef} // Attach the ref to the Swiper instance
      >
        {books.length > 0 && books.slice(8,18).map((book, index) => (
            <SwiperSlide key={index}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="flex justify-between mt-4">
              <button
                onClick={() => swiperRef.current.swiper.slidePrev()} // Go to previous slide
                className="swpiebtn"
              >
                <MdOutlineNavigateBefore />
              </button>
              <button
                onClick={() => swiperRef.current.swiper.slideNext()} // Go to next slide
                className="swpiebtn"
              >
               <MdOutlineNavigateNext />
              </button>
            </div>
    </div>
  );
};

export default Recomended;
