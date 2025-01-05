import { IBenefit } from "@/interfaces/ibenefit";
import * as React from "react";
import Image from "next/image";

export function BenefitCard(props: IBenefit) {
  return (
    <div className="benefit-card">
      <div className="benefit-card-media">
        <div className="benefit-card-text">
          <p>{props.title}</p>
        </div>
        <div className="benefit-card-cover"></div>
        <div className="benefit-card-image">
          <Image
            src={`/assets/images/benefit/${props.image}`}
            width={350}
            height={550}
            alt="benefit"
          />
        </div>
      </div>
    </div>
  );
}
