'use client'
import * as React from "react";
import { ProductCard } from "../product-card";
import { getData } from "@/hooks/get-data";
import { IProduct } from "@/interfaces/iproduct";

export interface IAppProps {}

export function ProductOffer({}) {
  const {data, loading, error} = getData("https://x8ki-letl-twmt.n7.xano.io/api:5v6_rKI6/products")

  const newData = (data || []).sort((a: IProduct, b: IProduct) => a.id - b.id);

  return (
    <div className="product-offer">
      <div className="product-offer-title">
        <h2>Produk Kami</h2>
      </div>
      {error && (
          <>
            <div className="sty-error">
              <h2>Error</h2>
              <p>{error.message}</p>
            </div>
          </>
        )}
      <div className="product-offer-list">
        {loading ? (
          <>
            <p>loading...</p>
          </>
        ) : newData.length > 0 ? (
          newData.map((item: IProduct) => <ProductCard {...item} key={item.id} />)
        ):(
          <>
            <p>No Data</p>
          </>
        
        )}

      </div>
    </div>
  );
}
