document.addEventListener("DOMContentLoaded", function () {
    const colorSelector = document.getElementById("color-picker");
    const noteText = document.getElementById("note-text");
    const addNoteButton = document.getElementById("add-button");
    const notesList = document.getElementById("notes-list");

    // Modal elements
    const editModal = document.getElementById("editModal");
    const editColorSelector = document.getElementById("edit-color-picker");
    const editNoteText = document.getElementById("edit-note-text");
    const saveButton = document.getElementById("save-button");
    const modalTitle = document.getElementById("modalTitle");
    let editingNote = null;
    let parentNote = null;

    class Note {
        constructor(color, text, parent = null) {
            this.color = color;
            this.text = text;
            this.parent = parent;
            this.children = [];

            this.note = document.createElement("div");
            this.note.className = "note";
            this.note.style.backgroundColor = color;

            // Delete button
            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-button";
            deleteButton.innerText = "Delete";
            // RxJS Observable for delete button click
            rxjs.fromEvent(deleteButton, "click").subscribe(() => {
                this.deleteNote();
            });

            // Edit button
            const editButton = document.createElement("button");
            editButton.className = "edit-button";
            editButton.innerText = "Edit";
            // RxJS Observable for edit button click
            rxjs.fromEvent(editButton, "click").subscribe(() => {
                this.editNote();
            });

            // Add Child button
            const addChildButton = document.createElement("button");
            addChildButton.className = "add-child-button";
            addChildButton.innerText = "AddChild";
            // RxJS Observable for addChild button click
            rxjs.fromEvent(addChildButton, "click").subscribe(() => {
                this.addChildNote();
            });

            const noteTextElement = document.createElement("p");
            noteTextElement.innerText = text;
            this.note.appendChild(noteTextElement);
            this.note.appendChild(deleteButton);
            this.note.appendChild(editButton);
            this.note.appendChild(addChildButton);

            // Append the note to the notes list
            if (!parent) {
                notesList.appendChild(this.note);
            } else {
                parent.children.push(this);
                notesList.appendChild(this.note);
            }
        }

        addChildNote() {
            parentNote = this;

            editNoteText.value = "";
            editColorSelector.value = rgbToHex(parentNote.note.style.backgroundColor);
            modalTitle.innerHTML = "Add Child Note";

            editModal.style.display = "block";
        }

        editNote() {
            editingNote = this.note;
            const noteText = this.note.querySelector("p").innerText;
            const noteColor = this.note.style.backgroundColor;

            editNoteText.value = noteText;
            // editColorSelector.value = noteColor; // Set the edit color selector to the note's color
            editColorSelector.value = rgbToHex(noteColor);
            modalTitle.innerHTML = "Edit Note";

            editModal.style.display = "block";
        }

        deleteNote() {
            // Remove the note from the parent's children
            if (this.parent) {
                this.parent.children = this.parent.children.filter(
                    (child) => child !== this
                );
            }

            // Remove the note from the DOM
            notesList.removeChild(this.note);

            // Recursively delete child notes
            this.children.forEach((child) => child.deleteNote());
        }
    }

    // Helper function to convert rgb value to hex
    function rgbToHex(rgb) {
        // Extracting the individual RGB values
        const rgbArray = rgb.match(/\d+/g).map(Number);

        // Converting each RGB component to hexadecimal
        const hexArray = rgbArray.map((component) => {
            const hex = component.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        });

        // Joining the hexadecimal components and returning the result
        return "#" + hexArray.join("");
    }

    // RxJS Observable for adding a note
    rxjs.fromEvent(addNoteButton, "click").subscribe(() => {
        const color = colorSelector.value; // Get the selected color
        const text = noteText.value;

        if (text.trim() === "") {
            alert("Please enter a note.");
            return;
        }

        new Note(color, text);
        noteText.value = "";
    });

    // RxJS Observable for saving a note
    rxjs.fromEvent(saveButton, "click").subscribe(() => {
        // To save edited note
        if (editingNote) {
            const updatedColor = editColorSelector.value; // Get the selected edit color
            const updatedText = editNoteText.value;

            if (updatedText.trim() === "") {
                alert("Please enter a note.");
                return;
            }

            editingNote.style.backgroundColor = updatedColor;
            editingNote.querySelector("p").innerText = updatedText;
            editingNote = null;

            editModal.style.display = "none";
        }
        // To save child note
        if (parentNote) {
            const color = editColorSelector.value;
            const text = editNoteText.value;

            if (text.trim() === "") {
                alert("Please enter a note.");
                return;
            }

            new Note(color, text, parentNote);
            parentNote = null;

            editModal.style.display = "none";
        }
    });

    // RxJS Observable for closing the modal
    rxjs.fromEvent(editModal.querySelector(".close"), "click").subscribe(() => {
        editModal.style.display = "none";
        editingNote = null;
        parentNote = null;
    });

    // RxJS Observable for clicking outside the modal
    rxjs.fromEvent(window, "click").subscribe((e) => {
        if (e.target === editModal) {
            editModal.style.display = "none";
            editingNote = null;
            parentNote = null;
        }
    });
});
