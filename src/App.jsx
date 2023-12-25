import { useState, useRef } from "react";
import { Auth } from "./Components/Auth";
import Cookies from "universal-cookie";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase/FIrebaseConfig";

import { Chat } from "./Components/Chat";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState("");

  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <>
        <div>
          <Auth setIsAuth={setIsAuth} />
        </div>
      </>
    );
  }

  return (
    <>
      {room ? (
        <div>
          <Chat room={room} />
          <div className=" -mt-[94.5vh] ml-[180vh]">
            <button
              className="btn btn-outline px-4 py-2 btn-error  "
              onClick={signUserOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <div
          className="hero min-h-screen backdrop-blur-sm  "
          style={{
            backgroundImage:
              "url(https://blog.1a23.com/wp-content/uploads/sites/2/2020/02/Desktop.png)",
          }}
        >
          <div className="   bg-no-repeat backdrop-blur-sm rounded-3xl bg-slate-950/30  border border-gray-60">
            <div className="hero-content w-[90vh] h-[50vh] gap-10   rounded-3xl shadow-2xl   ">
              <div>
                <img
                  className=" w-80 h-96 rounded-lg shadow-2xl  "
                  src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/18149496640725.5eb2e935756d1.gif"
                />
              </div>
              <div className="flex flex-col max-w-[45vh]">
                <label className=" text-6xl font-bold text-white  mb-10">
                  Make Your Room here....
                </label>
                <input
                  ref={roomInputRef}
                  className=" border border-black py-3 px-5 rounded-lg mb-5"
                  type="text"
                  placeholder="write room name..."
                />
                <button
                  onClick={(e) => setRoom(roomInputRef.current.value)}
                  className="btn btn-outline btn-success"
                >
                  Enter Chat
                </button>
                <button
                  className="btn btn-outline  btn-error mt-2"
                  onClick={signUserOut}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
