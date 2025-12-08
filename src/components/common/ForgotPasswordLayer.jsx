"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "@/utils/useTranslation";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const ForgotPasswordLayer = () => {
  const { $t } = useTranslation();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmitEmail = (data) => {
    console.log("Email Submitted:", data);
    setIsOtpSent(true);
  };

  const onSubmitOtp = (data) => {
    console.log("OTP Submitted:", data);
  };

  return (
    <>
      <section className="auth forgot-password-page bg-base d-flex flex-wrap">
        <div className="auth-left d-lg-block d-none">
          <div className="d-flex align-items-center flex-column h-100 justify-content-center">
            <img src="/assets/images/auth/forgot-pass-img.png" alt="" />
          </div>
        </div>
        <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
          <div className="max-w-464-px mx-auto w-100">
            {!isOtpSent ? (
              <form onSubmit={handleSubmit(onSubmitEmail)}>
                <div>
                  <h4 className="mb-12">{$t("ForgotPassword")}</h4>
                  <p className="mb-32 text-secondary-light text-lg">
                    {$t("ForgotPasswordMessage")}
                  </p>
                </div>
                <div className="icon-field mb-16">
                  <span className="icon top-50 translate-middle-y">
                    <Icon icon="mage:email" />
                  </span>
                  <input
                    type="email"
                    className="form-control h-56-px bg-neutral-50 radius-12"
                    placeholder={$t("EnterEmail")}
                    {...register("email", {
                      required: $t("EmailRequired"),
                      pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                        message: $t("InvalidEmail"),
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-danger text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn  btn-primary-600 text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
                >
                  {$t("Continue")}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit(onSubmitOtp)}>
                <div>
                  <h4 className="mb-12">{$t("VerifyEmail")}</h4>
                  <p className="mb-32 text-secondary-light text-lg">
                    {$t("OtpMessage")}
                  </p>
                </div>
                <div className="otp-input-container mb-16 d-flex gap-2">
                  {Array(6)
                    .fill(0)
                    .map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        className="form-control otp-input h-56-px bg-neutral-50 radius-12 text-center"
                        {...register(`otp[${index}]`, {
                          required: $t("OtpRequired"),
                          pattern: {
                            value: /^[0-9]$/,
                            message: $t("OtpInvalid"),
                          },
                        })}
                      />
                    ))}
                </div>
                {errors.otp && (
                  <p className="text-danger text-sm mt-1">
                    {errors.otp.message}
                  </p>
                )}
                <button
                  type="submit"
                  className="btn  btn-primary-600 text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
                >
                  {$t("Verify")}
                </button>
              </form>
            )}
            <div className="text-center mt-24">
              <Link href="/login" className="text-primary-600 fw-bold">
                {$t("BackToSignIn")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPasswordLayer;
