import React from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogin = async () => {
    // const clientId = "your_client_id_here"; // replace with your actual client ID
    // const redirectUri = "http://example.com/callback"; // replace with your actual redirect URI
    // const authorizationEndpoint = "https://backend.com/oauth2/authorize"; // replace with your actual authorization endpoint URL
    // const scope = "email"; // replace with any required scope(s)

    // // set up the authorization URL including query parameters
    // const authorizationUrl = `${authorizationEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    //   redirectUri
    // )}&response_type=code&scope=${scope}`;

    // // redirect the user to the authorization URL
    window.location.href = `${process.env.BACK_END_URL}auth/google`;
    axios
      .get("http://localhost:8000/test")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoggedIn(true);
    alert("Logged in");
  };
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-center bg-no-repeat bg-cover bg-hero-pattern">
      <div
        className="flex flex-row w-fit h-auto green-pink-gradient p-[5px]
                      rounded-[10px] shadow-card select-none"
      >
        {isLoggedIn && <Navigate to="/" />}
        <div
          className="bg-tertiary rounded-[10px] py-5 px-12  
                        flex justify-evenly items-center flex-col gap-3"
        >
          Choose your preferred log in method:
          <FacebookButton handleLogin={handleLogin} />
          <GoogleButton handleLogin={handleLogin} />
        </div>
      </div>
    </div>
  );
};
const GoogleButton = ({ handleLogin }) => {
  return (
    <button
      type="button"
      className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg 
      text-sm px-7 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
      onClick={handleLogin}
    >
      <svg
        className="w-4 h-4 mr-2 -ml-1"
        aria-hidden="true"
        focusable="false"
        data-prefix="fab"
        data-icon="google"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 488 512"
      >
        <path
          fill="currentColor"
          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
        ></path>
      </svg>
      Continue with Google
    </button>
  );
};
const FacebookButton = ({ handleLogin }) => {
  return (
    <button
      type="button"
      className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg 
      text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
      onClick={handleLogin}
    >
      <svg
        className="w-4 h-4 mr-2 -ml-1"
        aria-hidden="true"
        focusable="false"
        data-prefix="fab"
        data-icon="facebook-f"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
      >
        <path
          fill="currentColor"
          d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"
        ></path>
      </svg>
      Continue with Facebook
    </button>
  );
};
export default Login;
