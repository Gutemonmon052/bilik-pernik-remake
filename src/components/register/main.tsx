"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  username: Yup.string().required("Required"),
  password: Yup.string().min(6, "Password too short").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

export function Registers() {
  return (
    <>
      <div className="register-bg">
        <div className="register-bg-cover"></div>
        <div className="register-bg-media">
          <Image
            src="/assets/images/content/Hero Pic 3.jpg"
            width={1280}
            height={720}
            alt="hero-register"
          />
        </div>
      </div>
      <div className="register-content">
        <div className="register-text">
          <h1>
            Daftar sekarang di{" "}
            <span className="text-primary">Bilik Pernik</span>
          </h1>
          <p>
            Nikmati kemudahan berbelanja pernak-pernik dan suvenir unik dengan
            penawaran menarik! Jika sudah memiliki akun, langsung saja
            <Link href="/login" className="text-primary">
              Masuk
            </Link>{" "}
            untuk mulai berbelanja.{" "}
          </p>
        </div>
        <div className="register bg-base-100">
          <div className="register-iden">
            <div className="register-logo">
              <Image
                src="/assets/images/icon/BP-logo.png"
                width={60}
                height={60}
                alt="logo"
              />
            </div>
            <div className="register-title">
              <h1>Register</h1>
            </div>
          </div>
          <Formik
            initialValues={{
              email: "",
              username: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={async (values, { setSubmitting, setStatus }) => {
              const { email, username, password } = values;

              try {
                const response = await fetch(
                  "https://x8ki-letl-twmt.n7.xano.io/api:5v6_rKI6/auth/signup",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, username, password }),
                  }
                );

                const data = await response.json();
                if (!response.ok) {
                  throw new Error(data.error || "Registration failed.");
                }

                setStatus({
                  success: "Registration successful! Please log in.",
                });
              } catch (error: unknown) {
                if (error instanceof Error) {
                  setStatus({ error: error.message });
                } else {
                  setStatus({ error: "An unknown error occurred" });
                }
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, status }) => (
              <Form className="register-form">
                <div>
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70"
                    >
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <Field
                      type="email"
                      name="email"
                      className="grow w-[350px]"
                      placeholder="Email"
                    />
                  </label>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div>
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <Field
                      type="text"
                      name="username"
                      className="grow w-[350px]"
                      placeholder="Username"
                    />
                  </label>
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div>
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
                    <Field
                      type="password"
                      name="password"
                      className="grow w-[350px]"
                      placeholder="Password"
                    />
                  </label>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div>
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
                    <Field
                      type="password"
                      name="confirmPassword"
                      className="grow w-[350px]"
                      placeholder="Confirm Password"
                    />
                  </label>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error-message"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={isSubmitting}
                >
                  Daftar
                </button>
                {status && status.success && (
                  <div className="success-message">{status.success}</div>
                )}
                {status && status.error && (
                  <div className="error-message">{status.error}</div>
                )}
              </Form>
            )}
          </Formik>
          <div className="divider">ATAU</div>
          <p>
            Sudah punya akun ? silahkan{" "}
            <Link
              href="/login"
              className="text-primary text-center w-full h-fit"
            >
              Masuk
            </Link>
          </p>
          {/* <div className="btn btn-base-100 w-full">
            <div className="btn-icon"></div>
            <div className="btn-content">Register With Google</div>
          </div> */}
        </div>
      </div>
    </>
  );
}
