"use client";
import { ProductDets } from "@/components/products/product-det";
import { getData } from "@/hooks/get-data";
import { IProduct } from "@/interfaces/iproduct";
import { usePathname } from "next/navigation";

export default function ProductDet() {
  const path = usePathname().split("/");
  const slug_dt = path[path.length - 1];

  const { data, loading, error } = getData(
    "https://x8ki-letl-twmt.n7.xano.io/api:5v6_rKI6/products/" + slug_dt
  );

  const newData: IProduct[] = data ? [data] : [];

  return (
    <>
      {error ? (
        <div className="sty-error">
          <h2>Error</h2>
          <p>{error.message}</p>
        </div>
      ) : loading ? (
        <p>Loading...</p>
      ) : newData.length > 0 ? (
        newData.map((item: IProduct) => <ProductDets {...item} key={item.id} />)
      ) : (
        <p>No Data</p>
      )}
      {/* <ProductDets /> */}
    </>
  );
}
