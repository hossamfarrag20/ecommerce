import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { PropagateLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import Error from './../Error/Error';
import useCategories from "../../customHooks/useCategories";

export default function Categslider() {
  // const [allCategories, setAllCategories] = useState(null);
  // function getCategories() {
  //   axios
  //     .get("https://ecommerce.routemisr.com/api/v1/categories")
  //     .then((response) => {
  //       setAllCategories(response.data.data);
  //     })
  //     .catch(() => {});
  // }
  // useEffect(() => {
  //   getCategories();
  // }, []);


  // function getAllCategories() {
  //   return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  // }
  // const { data, isError, isLoading } = useQuery({
  //   queryKey: "getAllCategories",
  //   queryFn: getAllCategories,
  // });


  const { data, isError, isLoading } = useCategories();

  if (isError) {
    return <Error />;
  }
  const allCategories = data?.data.data;
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 992, 
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="overflow-hidden py-[40px] dark:bg-gray-800">
        <div className="w-full">
          {allCategories ? (
            <div className="h-[430px]">
              <Slider {...settings} autoplay>
                {allCategories?.map((category) => (
                  <div key={category._id}>
                    <img
                      className="w-full block h-[400px] object-cover"
                      src={category.image}
                      alt={category.name}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <div className="flex justify-center items-center h-[50px]">
              <PropagateLoader />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
