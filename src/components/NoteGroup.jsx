import React from "react";
import Note from './Note';
import {useDroppable} from '@dnd-kit/core';
import {SortableContext} from '@dnd-kit/sortable';

function NoteGroup({status, id, notes, updateNote}) {
  const {setNodeRef} = useDroppable({ id });

  return (
      <div ref={setNodeRef} className="bg-light note-group">
        <div className="note-group_head">
          {status}
        </div>
        <SortableContext items={notes}>
          {notes.map(note => <Note note={note} key={`note${note.id}`} updateNote={updateNote} />)}
        </SortableContext>
      </div>
  );
}

export default NoteGroup;