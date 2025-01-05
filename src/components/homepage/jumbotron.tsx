import Image from "next/image";
import * as React from "react";
import { Benefit } from "./benefit";

export function Jumbotron({}) {
  return (
    <>
      <div className="jumbotron">
          <div className="jumbotron-content">
            <div className="jumbotron-text-title">
              <h1>
                Temukan
                <span className="text-primary">Pernik-pernik</span>
                <br />
                Anda dalam Satu Bilik
              </h1>
            </div>
            <div className="jumbotron-text-desc">
              <p>
                {" "}
                Bilik Pernik menyediakan berbagai barang berupa souvenir,
                merchandise, kado, parsel, dan dekorasi hari raya.{" "}
              </p>
            </div>
            <div className="jumbotron-text-btn">
              <div className="btn btn-primary">Discovery More</div>
            </div>
          </div>
        <div className="jumbotron-media">
          <div className="jumbotron-media-cover"></div>
          <div className="jumbotron-media-image">
            <Image
              src="/assets/images/content/Hero Pic 4.jpg"
              width={1920}
              height={500}
              alt="hero-pic"
            />
          </div>
        </div>
        {/* <div className="jumbotron-decor"></div> */}
      </div>
    </>
  );
}
