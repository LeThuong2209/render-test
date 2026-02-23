require("dotenv").config();
const express = require("express");
const app = express();
const Note = require("./models/note");

app.use(express.json());
app.use(express.static("dist"));

const password = encodeURIComponent(12345);
const url = process.env.MONGODB_URI;

app.get("/api/notes", (request, response) => {
  Note.find({}).then((result) => {
    response.json(result);
  });
});

app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  Note.findByID(id).then((note) => {
    response.json(note);
  });
});

// app.delete("/api/notes/:id", (request, response) => {
//   const id = request.params.id;
//   notes = notes.filter((note) => note.id !== id);
//   response.status(204).end();
// });

// const generateID = () => {
//   const maxID =
//     notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
//   return String(maxID + 1);
// };

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "Content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
