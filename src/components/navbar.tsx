"use client";

import * as React from "react";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { getSearchProducts } from "@/hooks/get-search";
import { IProduct } from "@/interfaces/iproduct";

export function Navbar() {
  const { data: session } = useSession();
  const searchBarRef = React.useRef<HTMLDivElement | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [cartTotal, setCartTotal] = React.useState(0); // State untuk menyimpan total cart
  const [loadingCart, setLoadingCart] = React.useState(false);
  const [cartError, setCartError] = React.useState("");

  const userId = (session?.user as any)?.details.id;

  interface CustomUser extends User {
    details: {
      username: string;
    };
  }

  const {
    products: allItems = [],
    loading,
    error,
  } = getSearchProducts(
    "https://x8ki-letl-twmt.n7.xano.io/api:5v6_rKI6/products"
  );

  const router = useRouter();
  const pathname = usePathname();

  const filteredResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    return allItems.filter((item: IProduct) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allItems]);

  const toggleSearch = () => {
    if (searchBarRef.current) {
      searchBarRef.current.classList.toggle("hide");
      searchBarRef.current.classList.toggle("show");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pathname !== "/") {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  React.useEffect(() => {
    if (!userId) return;

    const fetchCartTotal = async () => {
      setLoadingCart(true);
      setCartError("");
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

        if (!response.ok) {
          throw new Error("Failed to fetch cart data.");
        }

        const totalItems = data.length;

        setCartTotal(totalItems);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message || "An error occurred.");
          setCartError(err.message || "An error occurred.");
        } else {
          console.error("An unknown error occurred.");
          setCartError("An unknown error occurred.");
        }
      } finally {
        setLoadingCart(false);
      }
    };

    fetchCartTotal();
  }, [userId]);

  return (
    <div className="bp-navbar">
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-40 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a href="/">Homepage</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link href="/">
            <Image
              src="/assets/images/icon/BP-logo.png"
              width={30}
              height={30}
              alt="Brand Logo"
            />
          </Link>
        </div>
        {/* <div className="navbar-end">
        </div> */}
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle" onClick={toggleSearch}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          {session?.user ? (
            <>
              <div className="dropdown dropdown-end">
                <Link href="/cartpage">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle"
                  >
                    <div className="indicator">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      {loadingCart ? (
                        <span className="badge badge-sm indicator-item">
                          ...
                        </span>
                      ) : (
                        <span className="badge badge-sm indicator-item">
                          {cartTotal}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="User Avatar"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a className="justify-between">
                      <p>
                        Hi{" "}
                        {session?.user?.name
                          ? session.user.name
                          : (session.user as CustomUser).details.username
                          ? (session.user as CustomUser).details.username
                          : "User"}
                      </p>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li onClick={() => signOut()}>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Link href="/login">
              <button className="btn btn-ghost">Login</button>
            </Link>
          )}
        </div>
      </div>
      <div className="w-full h-fit gap-6 px-4 flex flex-col"></div>
      <div className="search-bar hide" ref={searchBarRef}>
        <form
          className="input input-bordered flex items-center gap-2"
          onSubmit={handleSearchSubmit}
        >
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
          />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </form>
        {/* {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>} */}
        {!loading && !error && filteredResults.length > 0 && (
          <div className="search-result menu bg-base-200 rounded-box w-full">
            <ul>
              {filteredResults.map((result, index) => (
                <li className="p-1">
                  <Link href={`/product/${result.slug}`} key={index}>
                    {result.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
