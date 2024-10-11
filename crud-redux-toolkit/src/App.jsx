import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditForm from "./EditForm";
import Form from "./Form";
import Notes from "./Notes";
import {
  EditNote as editTodoActionCreator,
  selectTodoActionCreator
} from "./Redux/CounterSlice";

export default function App() {
  const dispatch = useDispatch();
  const [note, setNote] = useState({
    title: "",
    text: ""
  });
  const [isEditMode, setIsEditMode] = useState(false);

  const notes = useSelector((state) => state.notes.notes);
  const selectedTodoId = useSelector((state) => state.selectedTodo);

  const selectedTodo =
    (selectedTodoId && notes.find((todo) => todo.id === selectedTodoId)) ||
    null;

  const handleSelectTodo = (todoId) => {
    dispatch(selectTodoActionCreator({ id: todoId }));
  };

  const setValues = () => {
    setNote({
      title: selectedTodo.title,
      text: selectedTodo.text
    });
  };

  const handleEdit = () => {
    if (!selectedTodo) return;
    setValues();
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!note.title || !note.text || !selectedTodoId) {
      handleCancelUpdate();
      return;
    }

    dispatch(
      editTodoActionCreator({
        id: selectedTodoId,
        title: note.title,
        text: note.text
      })
    );
    setIsEditMode(false);
    setNote({
      title: "",
      text: ""
    });
  };

  const handleCancelUpdate = (e) => {
    setIsEditMode(false);
    setNote({
      title: "",
      text: ""
    });
  };

  const handleChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };
  return (
    <div className="App">
      {isEditMode ? (
        <EditForm
          note={note}
          setNote={setNote}
          selectedTodo={selectedTodo}
          isEditMode={isEditMode}
          handleUpdate={handleUpdate}
          handleCancelUpdate={handleCancelUpdate}
          handleChange={handleChange}
        />
      ) : (
        <Form />
      )}
      <Notes
        notes={notes}
        handleSelectTodo={handleSelectTodo}
        handleEdit={handleEdit}
        setIsEditMode={setIsEditMode}
      />
    </div>
  );
}
