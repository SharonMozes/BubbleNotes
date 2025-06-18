let notes = JSON.parse(localStorage.getItem("notes")) || [];

function renderNotes(filter = "") {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";

  notes
    .filter(note =>
      note.title.toLowerCase().includes(filter.toLowerCase()) ||
      note.content.toLowerCase().includes(filter.toLowerCase())
    )
    .forEach((note, index) => {
      const noteEl = document.createElement("div");
      noteEl.className = "note";
      noteEl.innerHTML = `
        <h3>${note.title}</h3>
        <button onclick="viewNote(${index})">View</button>
        <button class="edit-btn" onclick="editNote(${index})">Edit</button>
        <button onclick="deleteNote(${index})">Delete</button>
      `;
      notesList.appendChild(noteEl);
    });
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}

document.getElementById("note-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("note-title").value;
  const content = document.getElementById("note-content").value;
  notes.push({ title, content });
  saveNotes();
  this.reset();
});

function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
}

function editNote(index) {
  const note = notes[index];
  document.getElementById("note-title").value = note.title;
  document.getElementById("note-content").value = note.content;
  notes.splice(index, 1);
  saveNotes();
}

function viewNote(index) {
  const modal = document.getElementById("note-modal");
  const title = document.getElementById("modal-title");
  const content = document.getElementById("modal-content");

  title.textContent = notes[index].title;
  content.textContent = notes[index].content;

  modal.classList.remove("hidden");
}

document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("note-modal").classList.add("hidden");
});

window.addEventListener("click", (e) => {
  const modal = document.getElementById("note-modal");
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

document.getElementById("search").addEventListener("input", function () {
  renderNotes(this.value);
});

// Initial Render
renderNotes();
