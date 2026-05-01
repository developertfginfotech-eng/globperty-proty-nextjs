"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { getAllProperties } from "@/utils/propertyApi";

const ALL_COUNTRIES = [
  { name: "Australia",     image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&h=400&fit=crop" },
  { name: "Austria",       image: "https://images.unsplash.com/photo-1516550135131-fe3dcb0bedc1?w=600&h=400&fit=crop" },
  { name: "Belgium",       image: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?w=600&h=400&fit=crop" },
  { name: "Brazil",        image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&h=400&fit=crop" },
  { name: "Canada",        image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600&h=400&fit=crop" },
  { name: "China",         image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&h=400&fit=crop" },
  { name: "Cyprus",        image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=600&h=400&fit=crop" },
  { name: "Czech Republic",image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=600&h=400&fit=crop" },
  { name: "Denmark",       image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=600&h=400&fit=crop" },
  { name: "Egypt",         image: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=600&h=400&fit=crop" },
  { name: "Finland",       image: "https://images.unsplash.com/photo-1559067096-49ebca3406aa?w=600&h=400&fit=crop" },
  { name: "France",        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&h=400&fit=crop" },
  { name: "Germany",       image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=400&fit=crop" },
  { name: "Greece",        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&h=400&fit=crop" },
  { name: "Hong Kong",     image: "https://images.unsplash.com/photo-1507941097613-9f2157b69235?w=600&h=400&fit=crop" },
  { name: "Hungary",       image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=600&h=400&fit=crop" },
  { name: "India",         image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop" },
  { name: "Indonesia",     image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop" },
  { name: "Ireland",       image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=600&h=400&fit=crop" },
  { name: "Israel",        image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600&h=400&fit=crop" },
  { name: "Italy",         image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=600&h=400&fit=crop" },
  { name: "Japan",         image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop" },
  { name: "Jordan",        image: "https://images.unsplash.com/photo-1579606032821-4d5d496e0c96?w=600&h=400&fit=crop" },
  { name: "Latvia",        image: "https://images.unsplash.com/photo-1461838081902-d63f0a7f7baf?w=600&h=400&fit=crop" },
  { name: "Luxembourg",    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&h=400&fit=crop" },
  { name: "Malaysia",      image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&h=400&fit=crop" },
  { name: "Malta",         image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop" },
  { name: "Mexico",        image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=600&h=400&fit=crop" },
  { name: "Netherlands",   image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=600&h=400&fit=crop" },
  { name: "New Zealand",   image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600&h=400&fit=crop" },
  { name: "Norway",        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&h=400&fit=crop" },
  { name: "Philippines",   image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600&h=400&fit=crop" },
  { name: "Poland",        image: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=600&h=400&fit=crop" },
  { name: "Portugal",      image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&h=400&fit=crop" },
  { name: "Qatar",         image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=600&h=400&fit=crop" },
  { name: "Romania",       image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop" },
  { name: "Saudi Arabia",  image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=600&h=400&fit=crop" },
  { name: "Singapore",     image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=400&fit=crop" },
  { name: "South Africa",  image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=600&h=400&fit=crop" },
  { name: "South Korea",   image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=600&h=400&fit=crop" },
  { name: "Spain",         image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=400&fit=crop" },
  { name: "Sweden",        image: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=600&h=400&fit=crop" },
  { name: "Switzerland",   image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&h=400&fit=crop" },
  { name: "Thailand",      image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&h=400&fit=crop" },
  { name: "Turkey",        image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=600&h=400&fit=crop" },
  { name: "UAE",           image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop" },
  { name: "UK",            image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop" },
  { name: "USA",           image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=600&h=400&fit=crop" },
  { name: "Vietnam",       image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=600&h=400&fit=crop" },
];

export default function Countries() {
  const [countries, setCountries] = useState(ALL_COUNTRIES.map(c => ({ ...c, count: 0 })));

  useEffect(() => {
    getAllProperties()
      .then((props) => {
        const map = {};
        props.forEach((p) => {
          const c = p.country || "";
          if (c) map[c] = (map[c] || 0) + 1;
        });
        setCountries(ALL_COUNTRIES.map(c => ({ ...c, count: map[c.name] || 0 })));
      })
      .catch(console.error);
  }, []);

  return (
    <section className="section-neighborhoods style-2 tf-spacing-1">
      <div className="tf-container full">
        <div className="row">
          <div className="col-12">
            <div className="heading-section mb-46 text-center">
              <h2 className="title">Properties by Countries</h2>
              <p className="text-1">Browse our featured properties across different countries</p>
            </div>

            <Swiper
              dir="ltr"
              className="swiper sw-layout style-pagination"
              spaceBetween={12}
              breakpoints={{
                0:   { slidesPerView: 1 },
                575: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                992: { slidesPerView: 4 },
              }}
              modules={[Pagination, Navigation]}
              pagination={{ el: ".spd-countries" }}
              navigation={{ prevEl: ".snbp-countries", nextEl: ".snbn-countries" }}
            >
              {countries.map((country, index) => (
                <SwiperSlide key={index}>
                  <div className="box-location hover-img">
                    <div className="image-wrap">
                      <a href="#" style={{ position: "relative", display: "block" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={country.image}
                          alt={country.name}
                          style={{ width: "100%", height: "245px", objectFit: "cover", display: "block" }}
                        />
                      </a>
                    </div>
                    <div className="content">
                      <h6 className="text_white">{country.name}</h6>
                      <a href="#" className="text-1 tf-btn style-border pd-23 text_white">
                        {country.count} Properties <i className="icon-arrow-right" />
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              <div className="sw-wrap-btn mt-48">
                <div className="swiper-button-prev sw-button nav-prev-layout snbp-countries">
                  <i className="icon-arrow-left-3" />
                </div>
                <div className="sw-pagination sw-pagination-layout text-center spd-countries" />
                <div className="swiper-button-next sw-button nav-next-layout snbn-countries">
                  <i className="icon-arrow-right-3" />
                </div>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
