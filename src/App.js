import React, { useState } from "react";
import { DndContext, DragOverlay, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NoteGroup from "./components/NoteGroup";
import Stack from 'react-bootstrap/Stack';
import Note from "./components/Note";

function App() {
  const notesDefault = [
    { statusId: 0, id: 11, content: "some note-content", order: 0, title: "1" },
    { statusId: 0, id: 12, content: "some note-content", order: 1, title: "2" },
    { statusId: 0, id: 13, content: "some note-content", order: 2, title: "3" },
    { statusId: 1, id: 14, content: "some note-content", order: 0, title: "4" },
    { statusId: 2, id: 15, content: "some note-content", order: 0, title: "5" },
    { statusId: 2, id: 16, content: "some note-content", order: 1, title: "6" },
  ];
  const statuses = [
    {id: 0, value: "todo"},
    {id: 1, value: "in progress"},
    {id: 2, value: "done"},
  ];

  const [notes, setNotes] = useState(notesDefault);

  const sortFn = (asc = false) => {
    return (a, b) => {
      if (a.order > b.order) return asc ? 1 : -1;
      if (a.order < b.order) return asc ? -1 : 1;
      return 0;
    };
  };

  const updateNote = (note) => {
    setNotes(notes.map(item => {
      if (item.id === note.id) {
        return note;
      }
      return item;
    }));
  }

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });

  const sensors = useSensors(mouseSensor);

  const [groupItems, setGroupItems] = useState(notes.sort(sortFn(true)));
  const [draggingNote, setDraggingNote] = useState(null);

  const handleDragStart = ({ active }) => {
    setDraggingNote(active.id);
  }

  const handleDragOver = ({ active, over }) => {
    const overId = over?.id;
    const activeContainer = active.data.current.sortable?.containerId;
    const overContainer = over?.data.current?.sortable?.containerId || overId;

    if (activeContainer !== overContainer) {
      const overItem = groupItems.find((i) => i.id === overId);
      const statusId = overItem ? overItem.statusId : overId;
      setGroupItems(groupItems.map(el => el.id === active.id ? { ...el, statusId } : el));
    }
  };

  const handleDragEnd = ({ active, over}) => {
    const overId = over?.id;
    const overItem = groupItems.find((i) => i.id === overId);
    const statusId = groupItems.find((i) => i.id === active.id).statusId;

    // reordering

    let index = 0;
    setGroupItems(
      [...groupItems]
        .map((item) => (item.id === active.id ? { ...item, order: overItem.order } : item))
        .sort(sortFn(true))
        .map((item) => {
          let sortedItem = item;
          if (item.statusId === statusId) {
            index = overItem.order === index ? index += 1 : index;
            if (item.id !== active.id) {
              sortedItem = { ...item, order: index };
              index += 1;
            }
          }
          return sortedItem;
        })
        .sort(sortFn(true))
        );
    setDraggingNote(null);
  }

  return (
    <div className="App">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Stack direction="horizontal" gap={3}>
          {statuses.map(status => {
            return (
              <NoteGroup
                status={status.value}
                id={status.id}
                key={`group${status.id}`}
                notes={groupItems.filter((item) => item.statusId === status.id).sort(sortFn(true))}
                updateNote={updateNote}
              />
            );
          })}
        </Stack>
        <DragOverlay>
          {draggingNote ? (
            <Note
              note={groupItems.find(element => element.id === draggingNote)}
              style={{
                cursor: 'grabbing',
                opacity: 0.5,
              }}
            />
            ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default App;
