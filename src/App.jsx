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
        </div>
      ) : (
        <div className="room bg-black mb-5 rounded-xl flex flex-col max-w-sm items-center justify-center left-10 ml-[40%] mt-[10%] h-[40vh]">
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
      )}
      <div>
        <button
          className="btn btn-outline btn-error ml-[116vh]"
          onClick={signUserOut}
        >
          Sign Out
        </button>
      </div>
    </>
  );
}

export default App;
