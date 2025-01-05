"use client";

import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup untuk validasi
import Image from "next/image";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Login() {
  const router = useRouter();
  const [loginError, setLoginError] = useState(""); // State untuk menyimpan pesan error

  // Skema validasi menggunakan Yup
  const validationSchema = Yup.object({
    email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
    password: Yup.string().min(6, "Password minimal 6 karakter").required("Password wajib diisi"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema, // Tambahkan validasi di sini
    onSubmit: async (values) => {
      try {
        const result = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false, // Tidak langsung redirect, cek hasil login
        });

        if (result?.error) {
          setLoginError("Email atau password salah."); // Pesan error jika login gagal
        } else {
          setLoginError(""); // Reset pesan error jika login berhasil
          router.push("/"); // Redirect ke halaman utama
        }
      } catch (error) {
        console.error("Error saat login:", error);
        setLoginError("Terjadi kesalahan saat proses login.");
      }
    },
  });

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", {
        redirectTo: "/",
      });
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <>
      <div className="login-bg">
        <div className="login-bg-cover"></div>
        <div className="login-bg-media">
          <Image
            src="/assets/images/content/Hero Pic 2.jpg"
            width={1280}
            height={720}
            alt="hero-login"
          />
        </div>
      </div>
      <div className="login-content">
        <div className="login-text">
          <h1>Temukan pernak-pernik dan<br/>suvenir unik di <span className="text-primary">Bilik Pernik</span></h1>
          <p>Masuk sekarang dengan email dan kata sandi Anda untuk menjelajahi beragam produk menarik yang siap membuat momen Anda lebih spesial. Belum punya akun? <Link href="/register" className="text-primary">Daftar sekarang</Link> dan nikmati penawaran eksklusif</p>
        </div>
        <div className="login bg-base-100">
          <div className="login-iden">
            <div className="login-logo">
              <Image
                src="/assets/images/icon/BP-logo.png"
                width={60}
                height={60}
                alt="logo"
              />
            </div>
            <div className="login-title">
              <h1>Masuk</h1>
            </div>
          </div>
          <form onSubmit={formik.handleSubmit} className="login-form">
            {loginError && (
              <div className="text-red-500 text-sm mb-2">{loginError}</div> // Pesan error login
            )}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="email"
                name="email"
                className="grow w-[350px]"
                placeholder="example@mail.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                name="password"
                className="grow w-[350px]"
                placeholder="*******"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={formik.isSubmitting}
            >
              Masuk
            </button>
          </form>
          <div className="choose-register">
            <p>Belum Punya Akun? <Link href="/register" className="text-primary">Daftar Sekarang</Link></p>
          </div>
          <div className="divider">ATAU</div>
          <div className="btn btn-base-100 w-full" onClick={handleGoogleSignIn}>
            <div className="btn-icon"></div>
            <div className="btn-content">Masuk dengan Google</div>
          </div>
        </div>
      </div>
    </>
  );
}
