// learn
import { createSlice, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  notes: []
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    create: {
      reducer: (state, action) => {
        state.notes.push(action.payload);
      },
      prepare: ({ title, text }) => ({
        payload: {
          id: uuidv4(),
          title,
          text
        }
      })
    },
    DeleteNote: (state, { payload: index }) => {
      state.notes.splice(index, 1);
    },
    EditNote: (state, { payload }) => {
      const existingNote = state.notes.find((note) => note.id === payload.id);
      if (existingNote) {
        existingNote.title = payload.title;
        existingNote.text = payload.text;
      }
    }
  }
});

export const selectedTodoSlice = createSlice({
  name: "selectedTodo",
  initialState: null,
  reducers: {
    select: (state, { payload }) => payload.id
  }
});

export const { create: AddNote, DeleteNote, EditNote } = notesSlice.actions;
export const { select: selectTodoActionCreator } = selectedTodoSlice.actions;

const reducer = {
  notes: notesSlice.reducer,
  selectedTodo: selectedTodoSlice.reducer
};

// Use getDefaultMiddleware directly in configureStore
export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
