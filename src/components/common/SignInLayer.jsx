"use client";
import { useTranslation } from "@/utils/useTranslation";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { loginUser } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const SignInLayer = () => {
  const { $t } = useTranslation();
  const [loginType, setLoginType] = useState("admin"); // Default login type is 'admin'
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  // Validation schema using Yup
  const schema = yup.object().shape({
    userName: yup.string().required($t(" اسم المستخدم مطلوب ")),
    password: yup.string().required($t("كلمة المرور مطلوبة ")),
  });

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter()
  const handleTabClick = (type) => {
    setLoginType(type);
  };

  const onSubmit = async (data) => {
    // Perform login action
    setIsLoading(true)
    console.log("Login Type:", loginType);
    console.log("Form Data:", data);
    const result = await dispatch(loginUser({
      userName: data.userName,
      password: data.password,

    }))
    if (result.payload.status == "200") {
      console.log(result)
      toast.success(result.payload.data.message)
      Cookies.set("auth_token", result.payload.data.token, { expires: 7 });
      localStorage.setItem("user", result.payload.data.user)
      router.push('/dashboard')
      setIsLoading(false)
    } else {

      console.log(result.payload.data)
      toast.error(result.payload.data.message)
      setIsLoading(false)


    }
  };

  return (
    <section className="auth bg-base d-flex flex-wrap overflow-hidden justify-content-center" >
      {/* <div className="auth-left d-lg-block d-none">
        <div className="d-flex align-items-center flex-column h-100 justify-content-center">
          <img
            src="/assets/images/logo2.jpeg"
            alt="site logo"
            className="light-logo w-50 "
          />

        </div>
      </div> */}
      <div className="auth-right py-32 mt-40 px-24 h-100 d-flex flex-column justify-content-center">
        <div className="max-w-464-px h-100 mt-40 mx-auto w-100 d-flex flex-column justify-content-center ">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Link href="/" className="mb-40 max-w-290-px d-flex justify-content-center">
              <img src="/assets/images/logo2.jpeg" className=" w-160-px" alt="" />
            </Link>
            <h4 className="mb-12">{$t("LoginMessage")}</h4>
            <p className="mb-32 text-secondary-light text-lg">
              {$t("WelcomeBackMessage")}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="icon-field mb-16">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="mage:user" />
              </span>
              <input
                type="text"
                className={`form-control h-56-px bg-neutral-50 radius-12 ${errors.userName ? "is-invalid" : ""
                  }`}
                placeholder={$t("اسم المستخدم")}
                {...register("userName")}
              />
              {errors.userName && (
                <p className="text-danger mt-1">{errors.userName.message}</p>
              )}
            </div>
            <div className="position-relative mb-20">
              <div className="icon-field">
                <span className="icon top-50 translate-middle-y">
                  <Icon icon="solar:lock-password-outline" />
                </span>
                <input
                  type="password"
                  className={`form-control h-56-px bg-neutral-50 radius-12 ${errors.password ? "is-invalid" : ""
                    }`}
                  id="your-password"
                  placeholder={$t("كلمة المرور")}
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-danger mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="">
              <div className="d-flex justify-content-between gap-2">
                {/* <div className="form-check style-check d-flex align-items-center">
                  <input
                    className="form-check-input border border-neutral-300"
                    type="checkbox"
                    id="remember"
                  />
                  <label className="form-check-label" htmlFor="remember">
                    {$t("RememberMe")}
                  </label>
                </div> */}
                {/* <Link
                  href="/forgot-password"
                  className="text-primary-600 fw-medium"
                >
                  {$t("ForgotPassword")}
                </Link> */}
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn  btn-primary-600 text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
            >
              {isLoading ? `جار الحفظ..` : $t("Submit")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignInLayer;
