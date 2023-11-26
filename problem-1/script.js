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
    let editingNote = null;

    // Function to create a note
    function createNote(color, text) {
        const note = document.createElement("div");
        note.className = "note";
        note.style.backgroundColor = color;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerText = "Delete";

        // RxJS Observable for delete button click
        rxjs.fromEvent(deleteButton, "click").subscribe(() => {
            notesList.removeChild(note);
        });

        const editButton = document.createElement("button");
        editButton.className = "edit-button";
        editButton.innerText = "Edit";

        // RxJS Observable for edit button click
        rxjs.fromEvent(editButton, "click").subscribe(() => {
            editingNote = note;
            const noteText = note.querySelector("p").innerText;
            const noteColor = note.style.backgroundColor;

            editNoteText.value = noteText;
            editColorSelector.value = rgbToHex(noteColor); // Set the edit color selector to the note's color

            editModal.style.display = "block";
        });

        const noteTextElement = document.createElement("p");
        noteTextElement.innerText = text;
        note.appendChild(noteTextElement);
        note.appendChild(deleteButton);
        note.appendChild(editButton);

        notesList.appendChild(note);
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

        createNote(color, text);
        noteText.value = "";
    });

    // RxJS Observable for saving an edited note
    rxjs.fromEvent(saveButton, "click").subscribe(() => {
        if (editingNote) {
            const updatedColor = editColorSelector.value; // Get the selected edit color
            const updatedText = editNoteText.value;

            if (updatedText.trim() === "") {
                alert("Please enter a note.");
                return;
            }

            editingNote.style.backgroundColor = updatedColor;
            editingNote.querySelector("p").innerText = updatedText;

            editModal.style.display = "none";
        }
    });

    // RxJS Observable for closing the edit modal
    rxjs.fromEvent(editModal.querySelector(".close"), "click").subscribe(() => {
        editModal.style.display = "none";
    });

    // RxJS Observable for clicking outside the edit modal
    rxjs.fromEvent(window, "click").subscribe((e) => {
        if (e.target === editModal) {
            editModal.style.display = "none";
        }
    });
});
