import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import img1 from "../../assets/banner-4.jpeg";
import img2 from "../../assets/blog-img-1.jpeg";
import img3 from "../../assets/grocery-banner-2.jpeg";
import img4 from "../../assets/slider-image-3.jpeg";
import img5 from "../../assets/slider-2.jpeg";
import img6 from "../../assets/blog-img-2.jpeg";
import img7 from "../../assets/grocery-banner.png";

export default function Sliding() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // dotsClass: "hgfg",
  };
  return (
    <>
      <div className="overflow-hidden flex h-[430px] dark:bg-gray-800">
        <div className="w-[70%]">
          <Slider {...settings} autoplay>
            <div className="  ">
              <img
                className="w-full block h-[400px] object-cover"
                src={img1}
                alt="images"
              />
            </div>
            <div className="  ">
              <img
                className="w-full block h-[400px] object-cover"
                src={img3}
                alt="images"
              />
            </div>
            <div className="  ">
              <img
                className="w-full block h-[400px] object-cover"
                src={img5}
                alt="images"
              />
            </div>
            <div className="  ">
              <img
                className="w-full block h-[400px] object-cover"
                src={img6}
                alt="images"
              />
            </div>
          </Slider>
        </div>
        <div className="w-[30%] flex flex-col ">
          <div className="">
            <img
              className="w-full block h-[200px] object-cover object-center"
              src={img2}
              alt="images"
            />
          </div>
          <div className="">
            <img
              className="w-full block h-[200px] object-cover object-center"
              src={img4}
              alt="images"
            />
          </div>
        </div>
      </div>
    </>
  );
}
