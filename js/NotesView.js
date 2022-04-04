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

    console.log(
      this._createListItemHTML(300, "hey there", "is this working", new Date())
    );
  }

  _createListItemHTML(id, title, body, updated) {
    const MAX_BODY_LENGTH = 60;

    return `
      <div class="notes_list_item" data-node-id="${id}">
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
}
