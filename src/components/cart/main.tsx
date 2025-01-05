"use client";
import Image from "next/image";
import * as React from "react";
import { useSession } from "next-auth/react"; 
import { ICart } from "@/interfaces/icart";


export function Cart({}) {
  const [cartItems, setCartItems] = React.useState<ICart[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const { data: session } = useSession(); 
  const userId = session?.user?.details.id; 

  React.useEffect(() => {
    if (!userId) {
      console.log("Waiting for userId...");
      return;
    }

    const fetchCartItems = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://x8ki-letl-twmt.n7.xano.io/api:5v6_rKI6/cart_0?user_id=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log("Fetched data:", data);

        if (!response.ok) {
          throw new Error("Failed to fetch cart items. Please try again.");
        }

        setCartItems(data);
      } catch (err) {
        console.error(err.message || "An error occurred.");
        setError(err.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  const handleQuantityChange = (id: number, change: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + change) } // Pastikan kuantitas minimal 1
          : item
      )
    );
  };

  const handleCheckboxChange = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://x8ki-letl-twmt.n7.xano.io/api:5v6_rKI6/cart/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete cart item. Please try again.");
      }

      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err.message || "An error occurred.");
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart">
      <div className="cart-title">
        <h2>Keranjang</h2>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="cart-content">
        <div className="cart-content-2">
          <div className="cart-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="w-fit h-full flex items-start">
                  <input
                    type="checkbox"
                    checked={item.checked || false}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="checkbox checkbox-sm"
                  />
                </div>
                <div className="item-image">
                  <Image
                    src={item._products.image.url}
                    alt={item._products.name}
                    width={250}
                    height={250}
                  />
                </div>
                <div className="item-identity">
                  <h3 className="item-name">{item._products.name}</h3>
                  <span className="item-price">${item._products.price}</span>
                </div>
                <div className="quantity-controls">
                  <button
                    className="btn btn-decrement"
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="item-quantity">{item.qty}</span>
                  <button
                    className="btn btn-increment"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn btn-error text-base-100"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <div className="card-body">
              <span className="text-lg font-bold">
                {cartItems.filter((item) => item.checked).length} Items
              </span>
              <span className="text-info">
                Total: $
                {cartItems
                  .filter((item) => item.checked)
                  .reduce(
                    (acc, item) => acc + item._products.price * item.qty,
                    0
                  )}
              </span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
