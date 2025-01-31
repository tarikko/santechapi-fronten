import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useUserAuth } from "../context/UserAuthContext";
import { toast } from "react-hot-toast";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, googleSignIn, GithubSignIn } = useUserAuth();
  const [err, setErr] = useState("");
  const [errpass, setErrPass] = useState("");
  const navigate = useNavigate();
  const [isloading, setisloading] = useState(false);

  const isStrongPassword = (pw) => {
    return (
      pw.length >= 8 &&
      /[A-Z]/.test(pw) &&
      /[a-z]/.test(pw) &&
      /\d/.test(pw) &&
      /[^A-Za-z0-9]/.test(pw)
    );
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setisloading(true);
    if (!isStrongPassword(password)) {
      setErrPass(
        "Password must be at least 8 chars long, includes uppercase, lowercase, numbers, and special chars."
      );
      setisloading(false);
      return;
    }
    try {
      await signUp(email, password);
      toast.success("Your Account has been Created Succesfully !");
      navigate("/login");
    } catch (err) {
      setErr(err.message.replace("Firebase:", "").replace(".", ""));
      setisloading(false);
    }
    setisloading(false);
  };

  const GoogleSignIn = async () => {
    setErr("");
    setisloading(true);
    try {
      await googleSignIn();
      navigate("/dashboard");
    } catch (err) {
      setErr(err.message.replace("Firebase:", "").replace(".", ""));
      setisloading(false);
    }
    setisloading(false);
  };
  const GitHubSignIn = async () => {
    setErr("");
    setisloading(true);
    try {
      await GithubSignIn();
      navigate("/dashboard");
    } catch (err) {
      setErr(err.message.replace("Firebase:", "").replace(".", ""));
      setisloading(false);
    }
    setisloading(false);
  };

  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  return (
    <div className="flex h-[100vh] w-full flex-row-reverse">
      <Link
        to="/home"
        className="fixed active:scale-105 transition-transform  px-3.5 py-2 top-5 right-5 rounded-full shadow-lg
     bg-violet-500 w-fit h-fit"
      >
        <i className="text-xl  text-white fas fa-arrow-right font-bold"></i>
      </Link>
      <div className="flex min-h-[100vh] w-full lg:w-1/2 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src={require("../assert/santechapi-logo.png")}
            alt="Your Company"
          />
          <h2 className="text-gray-600 text-center text-xl font-semibold leading-9 tracking-tight  ">
            Santech API Hub
          </h2>
        </div>
        {err && <p className="mt-5 text-center text-red-500">{err}</p>}
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md">
          <form
            encType="multipart/form-data"
            onSubmit={HandleSubmit}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium leading-4 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-xs font-medium leading-4 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={isPasswordVisible ? "text" : "password"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                />
                <FontAwesomeIcon
                  icon={isPasswordVisible ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                />
              </div>
            </div>
            {errpass && !err && <p className="mt-5 text-center text-red-500">{errpass}</p>}
            <div className="flex w-full items-center justify-center">
              <button
                type="submit"
                disabled={isloading}
                className={`flex w-52 justify-center rounded-md bg-violet-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 `}
              >
                <span className={`${isloading ? "hidden" : "flex"}`}>
                  Create New Account
                </span>
                <svg
                  class={`  ${isloading ? "flex" : "hidden"
                    } animate-spin h-5 w-5 text-white`}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </button>
            </div>
          </form>
          <div class="flex flex-col mt-5 max-w-md space-y-4">
            <div class="flex justify-center items-center">
              <span class="w-full border border-black"></span>
              <span class="px-4">Or</span>
              <span class="w-full border border-black"></span>
            </div>
            <button
              onClick={GoogleSignIn}
              class="flex items-center justify-center flex-none  py-2  rounded-lg border-2 border-[#5195ee] font-medium bg-[#5195ee] text-white relative"
            >
              <span class="absolute left-0 h-full px-3 inline-flex items-center justify-center rounded-s-lg bg-white">
                <img
                  class="w-5 "
                  alt="G"
                  src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                />
              </span>
              <span className="ps-5 md:ps-0">Sign Up with Google</span>
            </button>
            <button
              onClick={GitHubSignIn}
              class="flex items-center justify-center flex-none  py-2  rounded-lg border-2 border-[#010409] font-medium bg-[#010409] text-gray-200 relative"
            >
              <span class="absolute left-0 h-full px-3 inline-flex items-center justify-center rounded-s-lg bg-white">
                <img
                  class="w-5 "
                  alt="G"
                  src="https://ik.imagekit.io/vituepzjm/github-mark.svg"
                />
              </span>
              <span className="ps-5 md:ps-0">Sign Up with GitHub</span>
            </button>
          </div>
          <p className="mt-6 text-center text-sm text-gray-500">
            By registering for the SanTech API Hub, you agree to our
            <Link
              to="/privacy-policy"
              className="font-semibold leading-6 text-violet-600 hover:text-violet-500"
            >
              {" "}
              privacy-policy
            </Link>
          </p>
          <p className="mt-2 text-center text-sm text-gray-500">
            Already have an account?
            <a
              href="/login"
              className="font-semibold leading-6 text-violet-600 hover:text-violet-500"
            >
              {" "}
              Login
            </a>
          </p>
        </div>
      </div>
      <div className="hidden overflow-y-hidden lg:block w-1/2 h-full">
        <img
          src={"https://ik.imagekit.io/santech/APIHUB/premium_photo-1685082608490-6653d07fbca6.avif?updatedAt=1727121013230"}
          alt="banner"
          className="brightness-75 w-full  h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Register;
