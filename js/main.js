import NotesView from "./NotesView.js";
import NotesAPI from "./NotesAPI.js";

const app = document.getElementById("app");
const view = new NotesView(app, {
  onNoteAdd() {
    console.log("Let's add a new note");
  },
  onNoteEdit(newTitle, newBody) {
    console.log(newTitle);
    console.log(newBody);
  },
  onNoteSelect(id) {
    console.log("Note selected: " + id);
  },
  onNoteDelete(id) {
    console.log("Note deleted: " + id);
  },
});

const notes = NotesAPI.getAllNotes();

view.updateNotesList(notes);
view.updateActiveNote(notes[0]);
