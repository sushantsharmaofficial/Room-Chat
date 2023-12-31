import { auth, provider } from "../Firebase/FIrebaseConfig";
import { signInWithPopup } from "firebase/auth";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Auth = (props) => {
  const { setIsAuth } = props;
  const signInWIthGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      throw console.error(err);
    }
  };

  return (
    <div
      className="hero min-h-screen backdrop-blur-sm "
      style={{
        backgroundImage:
          "url(https://blog.1a23.com/wp-content/uploads/sites/2/2020/02/Desktop.png)",
      }}
    >
      <div className="   bg-no-repeat backdrop-blur-sm bg-slate-950/30 rounded-xl">
        <div className="hero-content w-[90vh] h-[50vh] gap-1 flex-col rounded-2xl border border-gray-60 shadow-2xl lg:flex-row  ">
          <div className=" max-w-sm">
            <h1 className="text-6xl font-bold text-white  -mt-6 mb-5">
              Room Chat
            </h1>
            <p className="py-6 mb-5">
              Invite Your Friends and make Private Room to Chat....With Room
              Chat
            </p>
            <button
              onClick={signInWIthGoogle}
              className="btn bg-white text-blue-800"
            >
              Sign in With Google{" "}
              <span>
                <img
                  className=" max-w-5"
                  src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                />
              </span>
            </button>
          </div>
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/edc3ab78364175.5ca3009cb66a0.gif"
            className=" w-80 h-96 rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};
