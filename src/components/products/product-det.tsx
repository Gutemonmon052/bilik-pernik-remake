"use client";
import * as React from "react";
import Image from "next/image";
import { IProduct } from "@/interfaces/iproduct";
import { useSession } from "next-auth/react";

export function ProductDets(props: IProduct) {
  const { data: session } = useSession(); // Mendapatkan session
  const userId = session?.user?.details.id; // Asumsikan user ID disimpan di session

  const [quantity, setQuantity] = React.useState(1); // State untuk jumlah produk

  const handleAddToCart = async () => {
    try {
      const response = await fetch(
        "https://x8ki-letl-twmt.n7.xano.io/api:5v6_rKI6/cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            products_id: props.id,
            qty: quantity,
            user_id: userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      const data = await response.json();
      console.log("Success:", data);
      alert("Product added to cart successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add product to cart.");
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="productdet">
      <div className="productdet-media">
        <Image
          src={props.image.url}
          alt={props.name}
          width={500}
          height={500}
        />
      </div>
      <div className="productdet-info">
        <div className="productdet-info-title">
          <h1>{props.name}</h1>
        </div>
        <div className="productdet-info-price">
          <span>${props.price}</span>
        </div>
        <div className="productdet-info-btn">
          <div className="productdet-info-quantity flex flex-row gap-3 items-center">
            <button className="btn btn-secondary" onClick={decrementQuantity}>
              -
            </button>
            {/* <input
            type="number"
            value={quantity}
            readOnly
            className="w-[30px] h-fit px-3 bg-transparent "
          /> */}
            <div className="w-fit h-full flex items-center justify-center">
              <span>{quantity}</span>
            </div>
            <button className="btn btn-secondary" onClick={incrementQuantity}>
              +
            </button>
          </div>
          <div className="btn btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
}
