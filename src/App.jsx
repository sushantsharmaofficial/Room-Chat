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
          <div className="   bg-no-repeat backdrop-blur-sm rounded-3xl bg-slate-950/30 ">
            <div className="hero-content w-[90vh] h-[50vh] gap-10 flex-col border border-gray-60 rounded-3xl shadow-2xl   ">
              <label className=" text-2xl p-3 font-semibold mb-2">
                Enter Chat Room
              </label>
              <input
                ref={roomInputRef}
                className=" border border-black px-3 py-1 rounded-lg mb-2"
                type="text"
                placeholder="write room name..."
              />
              <button
                onClick={(e) => setRoom(roomInputRef.current.value)}
                className="btn btn-outline btn-success"
              >
                Enter Chat
              </button>
            </div>
          </div>
          <div>
            <button
              className="btn btn-outline  btn-error ml-[116vh]"
              onClick={signUserOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
