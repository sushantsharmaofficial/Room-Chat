import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../Firebase/FIrebaseConfig";

export const Chat = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      image: auth.currentUser.photoURL,
      room,
    });

    setNewMessage("");
  };
  return (
    <div className="whole-page flex ">
      <div className="left flex w-1/4 p-6 h-[100vh]">
        <div className="flex flex-col flex-auto rounded-2xl bg-gray-100 max-w-[50vh] overflow-hidden">
          <div>
            <img src="https://media0.giphy.com/media/26FPJGjhefSJuaRhu/giphy.gif?cid=6c09b952wn6d9tptpy47qd9h3ycvvyxtlzr53lny79s05pcd&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g" />
          </div>
          <div>
            <img src="https://media0.giphy.com/media/26FPJGjhefSJuaRhu/giphy.gif?cid=6c09b952wn6d9tptpy47qd9h3ycvvyxtlzr53lny79s05pcd&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g" />
          </div>
          <div>
            <img src="https://media0.giphy.com/media/26FPJGjhefSJuaRhu/giphy.gif?cid=6c09b952wn6d9tptpy47qd9h3ycvvyxtlzr53lny79s05pcd&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g" />
          </div>
        </div>
      </div>
      <div className="right w-3/4 flex flex-col flex-auto  h-[100vh] p-6">
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
          <div className=" bg-gray-900 rounded-t-lg">
            <h1 className="text-3xl font-bold p-4 text-center">
              Welcome TO: {room.toUpperCase()}
            </h1>
          </div>
          <div className=" flex flex-col   min-h-[75vh] overflow-scroll overflow-x-auto mb-4">
            {messages.map((message) => (
              <div className="message flex gap-5 " key={message.id}>
                <div className="avatar online  items-center mb-2">
                  <div className=" w-16 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={message.image}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <h1>{message.user}</h1>
                  <div className="chat-bubble  mb-2 w-full">{message.text}</div>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="new-message-form flex bottom-2 px-7 py-1 mb-5"
          >
            <input
              className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
              placeholder="Type your message here"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
            <button
              type="submit"
              className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
