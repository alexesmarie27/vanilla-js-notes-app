export default class NotesView {
  constructor(
    root,
    { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}
  ) {
    this.root = root;
    this.onNoteSelect = onNoteSelect;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteDelete = onNoteDelete;

    this.root.innerHTML = `
        <div class="notes_sidebar">
          <button class="notes_add_button" type="button">Add Note</button>
          <div class="notes_list">
          </div>
        </div>
        <div class="notes_preview">
          <input class="notes_title" type="text" placeholder="New Note..." />
          <textarea class="notes_body">Take Note...</textarea>
        </div>
    `;

    const buttonAddNote = this.root.querySelector(".notes_add_button");
    const inputTitle = this.root.querySelector(".notes_title");
    const inputBody = this.root.querySelector(".notes_body");

    buttonAddNote.addEventListener("click", () => {
      this.onNoteAdd();
    });

    [inputTitle, inputBody].forEach((inputField) => {
      inputField.addEventListener("blur", () => {
        const updatedTitle = inputTitle.value.trim();
        const updatedBody = inputBody.value.trim();
        this.onNoteEdit(updatedTitle, updatedBody);
      });
    });

    this.updateNotePreviewVisibility(false);
  }

  _createListItemHTML(id, title, body, updated) {
    const MAX_BODY_LENGTH = 60;

    return `
      <div class="notes_list_item" data-note-id="${id}">
        <div class="notes_item_title">
          ${title}
        </div>
        <div class="notes_item_body">
          ${body.substring(0, MAX_BODY_LENGTH)}
          ${body.length > MAX_BODY_LENGTH ? "..." : ""}
        </div>
        <div class="notes_item_updated">
          ${updated.toLocaleString(undefined, {
            dateStyle: "full",
            timeStyle: "short",
          })}
        </div>
      </div>
    `;
  }

  updateNotesList(notes) {
    const notesListContainer = this.root.querySelector(".notes_list");

    notesListContainer.innerHTML = "";

    for (const note of notes) {
      const html = this._createListItemHTML(
        note.id,
        note.title,
        note.body,
        new Date(note.updated)
      );

      notesListContainer.insertAdjacentHTML("beforeend", html);
    }

    notesListContainer
      .querySelectorAll(".notes_list_item")
      .forEach((noteListItem) => {
        noteListItem.addEventListener("click", () => {
          this.onNoteSelect(noteListItem.dataset.noteId);
        });

        noteListItem.addEventListener("dblclick", () => {
          const doDelete = confirm(
            "Are you sure you want to delete this note?"
          );

          if (doDelete) {
            this.onNoteDelete(noteListItem.dataset.noteId);
          }
        });
      });
  }

  updateActiveNote(note) {
    this.root.querySelector(".notes_title").value = note.title;
    this.root.querySelector(".notes_body").value = note.body;

    this.root.querySelectorAll(".notes_list_item").forEach((noteListItem) => {
      noteListItem.classList.remove(".note_list_item_selected");
    });

    this.root
      .querySelector(`.notes_list_item[data-note-id="${note.id}"]`)
      .classList.add(".note_list_item_selected");
  }

  updateNotePreviewVisibility(visible) {
    this.root.querySelector(".notes_preview").style.visibility = visible
      ? "visible"
      : "hidden";
  }
}
