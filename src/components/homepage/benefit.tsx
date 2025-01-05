import Image from "next/image";
import * as React from "react";
import { BenefitCard } from "./benefit-card";

export function Benefit() {
  return (
    <div className="benefit">
      <div className="benefit-title">
        <h2>
          Kenapa harus berbelaja<br/>di{" "}
          <span className="text-primary">Bilik Pernik ?</span>
        </h2>
      </div>
      <div className="benefit-list">
        <BenefitCard
          title="Aman dan Terpercaya"
          image="benefit-1.jpg"
        />
         <BenefitCard
          title="Fitur yang Mudah Digunakan"
          image="benefit-2.jpg"
        />
         <BenefitCard
          title="Pengiriman Cepat"
          image="benefit-3.jpg"
        />
      </div>
    </div>
    // <div className="benefit-list">
    //   <div className="benefit-card">
    //     <div className="benefit-card-icon">
    //       <div className="card-icon-media">
    //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    //           <path
    //             fill="#f2b705"
    //             d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z"
    //           />
    //         </svg>
    //       </div>
    //     </div>
    //     <div className="benefit-card-text">
    //       <p>Aman dan Terpercaya</p>
    //     </div>
    //   </div>
    //   <div className="benefit-card">
    //     <div className="benefit-card-icon">
    //       <div className="card-icon-media">
    //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    //           <path
    //             fill="#f2b705"
    //             d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
    //           />
    //         </svg>
    //       </div>
    //     </div>
    //     <div className="benefit-card-text">
    //       <p>Fitur-fitur Mudah Digunakan</p>
    //     </div>
    //   </div>
    //   <div className="benefit-card">
    //     <div className="benefit-card-icon">
    //       <div className="card-icon-media">
    //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
    //           <path
    //             fill="#f2b705"
    //             d="M640 0l0 400c0 61.9-50.1 112-112 112c-61 0-110.5-48.7-112-109.3L48.4 502.9c-17.1 4.6-34.6-5.4-39.3-22.5s5.4-34.6 22.5-39.3L352 353.8 352 64c0-35.3 28.7-64 64-64L640 0zM576 400a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM23.1 207.7c-4.6-17.1 5.6-34.6 22.6-39.2l46.4-12.4 20.7 77.3c2.3 8.5 11.1 13.6 19.6 11.3l30.9-8.3c8.5-2.3 13.6-11.1 11.3-19.6l-20.7-77.3 46.4-12.4c17.1-4.6 34.6 5.6 39.2 22.6l41.4 154.5c4.6 17.1-5.6 34.6-22.6 39.2L103.7 384.9c-17.1 4.6-34.6-5.6-39.2-22.6L23.1 207.7z"
    //           />
    //         </svg>
    //       </div>
    //     </div>
    //     <div className="benefit-card-text">
    //       <p>Pengiriman Cepat</p>
    //     </div>
    //   </div>
    // </div>
  );
}