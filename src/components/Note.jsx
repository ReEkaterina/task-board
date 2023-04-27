import React, { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import NoteEditor from "./NoteEditor";
import Dialog from "./Dialog/Dialog";

function Note({ note, updateNote }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: note.id });

  const [editMode, setEditMode] = useState(false);
  const [dragListeners, setDragListeners] = useState(listeners);
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect( () => {
    setDragListeners(editMode ? null : listeners);
  }, [editMode, listeners]);

  const deleteActions = [
    { title: "Delete note", onClick: () => {} },
    { title: "Cancel", onClick: () => {} }
  ]

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    visibility: isDragging ? "hidden" : "visible",
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...dragListeners}
        {...attributes}
        className="note bg-light border"
      >
        <div className="note-title">{note.title} </div>
        <div>{note.content}</div>
        <div>
          <button
            className="note-action_button"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
          <button
            className="note-action_button"
            onClick={() => setDeleteMode(true)}
          >
            Remove
          </button>
        </div>
        <NoteEditor note={note} updateNote={updateNote} editMode={editMode} setEditMode={setEditMode} />
        <Dialog question="Are you sure?" editMode={deleteMode} setEditMode={setDeleteMode} actions={deleteActions} />
      </div>
    </>
  );
}

export default Note;
