import React from "react";
import Note from "./Note";

export default ({ notes, setIsEditMode, handleSelectTodo, handleEdit }) => {
  return (
    <div>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          title={note.title}
          text={note.text}
          handleSelectTodo={handleSelectTodo}
          handleEdit={handleEdit}
          setIsEditMode={setIsEditMode}
        />
      ))}
    </div>
  );
};
