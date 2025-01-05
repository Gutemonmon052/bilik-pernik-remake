import { IProduct } from "@/interfaces/iproduct";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export function ProductCard(props: IProduct) {
  const convert = props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <div className="bp-card-product">
      <div className="bp-card-product-media">
        <Image
          width={200}
          height={200}
          src={props.image.url}
          alt="product"
        />
      </div>
      <div className="bp-card-product-info">
        <div className="bp-card-product-info-desc">
          <h2>{props.name}</h2>
          <p>${convert}</p>
        </div>
        <div className="card-actions">
          <Link href={`/product/${props.slug}`}>
            <button className="btn btn-primary">Buy Now</button>
          </Link>
        </div>
      </div>
    </div>
    // <div className="card bg-base-100 w-96 shadow-xl">
    //   <figure className="px-3 pt-3 bg-primary">
    //     <Image
    //       width={200}
    //       height={200}
    //       src={props.image.url}
    //       alt="Shoes"
    //       className="rounded-xl"
    //     />
    //   </figure>
    //   <div className="card-body items-center text-center">
    //     <h2 className="card-title">{props.name}</h2>
    //     <p>${convert}</p>
    //     <div className="card-actions">
    //       <Link href={`/product/${props.slug}`}>
    //         <button className="btn btn-primary">Buy Now</button>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  );
}
