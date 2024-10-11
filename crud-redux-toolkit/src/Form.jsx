import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AddNote } from "./Redux/CounterSlice";

export default () => {
  const [title, SetTitle] = useState("");
  const [text, SetText] = useState("");

  const dispatch = useDispatch();

  const AddNotes = () => {
    if (title && text) {
      dispatch(AddNote({ title, text }));
    }
    SetTitle("");
    SetText("");
  };
  return (
    <div className="form">
      <form onSubmit={(ev) => ev.preventDefault()}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          autoComplete="off"
          value={title}
          name="title"
          onChange={(e) => SetTitle(e.target.value)}
        />
        <label htmlFor="text">Text</label>
        <textarea
          id="text"
          value={text}
          name="text"
          onChange={(e) => SetText(e.target.value)}
        />
        <input type="submit" value="Add Note" onClick={AddNotes} />
      </form>
    </div>
  );
};
