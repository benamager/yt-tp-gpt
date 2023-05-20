"use client";

import MessageContainer from "./MessageContainer";
import Message from "./Message";
import useChat from "@hooks/useChat";
import { createRef, useEffect, useRef } from "react";
import TagList from "./TagList";

export default function ChatInterface({ videoUrl, transscript, videoDetails }) {
  const videoId = videoUrl.split("v=")[1];
  const messageRef = createRef();

  // add tag content to message input
  function handleTagClick(e) {
    e.preventDefault();
    messageRef.current.value = e.target.textContent;
    messageRef.current.focus();
  }

  // useChat hook to handle chat logic
  const { handleSubmit, messages, isLoading } = useChat(transscript);

  // scroll to bottom of messages when messages state change
  const endOfMessagesRef = useRef(null);
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="mt-3 flex flex-col">
      <MessageContainer>
        <iframe
          className="w-full max-w-[400px] rounded-leftMessage"
          width="400"
          height="250"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        {messages.map((message, index) => {
          return <Message key={index} text={message.content} right={message.role === "user"} />;
        })}
        {isLoading && <li className={`max-w-[70%] self-start rounded-leftMessage bg-lightBg px-5 py-3 shadow-sm`}>Loading...</li>}
        <div ref={endOfMessagesRef} />
      </MessageContainer>
      <div className="fixed bottom-0 left-0 right-0 mx-auto flex max-w-4xl flex-col bg-bg px-2 pb-3 pt-1">
        <TagList handleTagClick={handleTagClick} />
        <form className="flex w-full gap-2" onSubmit={handleSubmit}>
          <textarea ref={messageRef} id="message" name="message" type="text" placeholder="Write your message here..." className="input w-full" />
          <button className="btn ml-auto bg-primary">Send</button>
        </form>
      </div>
    </div>
  );
}
