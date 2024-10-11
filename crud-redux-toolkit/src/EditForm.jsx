import React, { useEffect, useState, useRef } from "react";

export default ({
  handleUpdate,
  handleCancelUpdate,
  handleChange,
  note,
  setNote,
  selectedTodo
}) => {
  //To update redux store or you might see a delay to update
  useEffect(() => {
    setNote({
      title: selectedTodo.title,
      text: selectedTodo.text
    });
  }, [selectedTodo.title, selectedTodo.text, setNote]);
  return (
    <div className="form">
      <form onSubmit={(e) => e.preventDefault()}>
        <input value={note.title} name="title" onChange={handleChange} />
        <textarea value={note.text} name="text" onChange={handleChange} />
        <input type="submit" value="Update Note" onClick={handleUpdate} />
        <button onClick={handleCancelUpdate}>Cancel</button>
      </form>
    </div>
  );
};
