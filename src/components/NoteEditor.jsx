import React, { useState } from "react";
import ReactModal from "react-modal";

const NoteEditor = ({note, updateNote, editMode, setEditMode}) => {
  const [content, setContent] = useState(note.content);
  const [title, setTitle] = useState(note.title);

  return <ReactModal
    isOpen={editMode}
    ariaHideApp={false}
  >
    <input
      value={title}
      onChange={e => setTitle(e.currentTarget.value)}
    />
    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
    <button onClick={() => {
      setEditMode(false);
      updateNote({...note, title, content});
      }}
    >
      Save
    </button>
  </ReactModal>;
}

export default NoteEditor;