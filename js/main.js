import NotesView from "./NotesView.js";

const app = document.getElementById("app");
const view = new NotesView(app, {
  onNoteAdd() {
    console.log("Let's add a new note");
  },
  onNoteEdit(newTitle, newBody) {
    console.log(newTitle);
    console.log(newBody);
  },
});
