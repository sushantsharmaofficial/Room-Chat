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
    <div className="auth border bg-black border-white max-w-md ml-[85vh] mt-[40vh]  items-center text-center rounded-lg shadow-lg">
      <div className=" px-10 py-5">
        <h1 className=" text-4xl font-bold  mb-5 text-white">
          Sign with Google
        </h1>
        <button className="btn  btn-info" onClick={signInWIthGoogle}>
          sign in with google
        </button>
      </div>
    </div>
  );
};
