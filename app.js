import express from "express";
const app = express();
export default app;

import usersRouter from "#api/users"
import getUserFromToken from "#middleware/getUserFromToken"
import taskRouter from "#api/tasks"

app.use(express.json())
app.use(getUserFromToken)
app.use("/users", usersRouter);
app.use("/tasks", taskRouter);


app.use((err, req, res, next) => {
  switch (err.code) {
    // Invalid type
    case "22P02":
      return res.status(400).send(err.message);
    // Unique constraint violation
    case "23505":
    // Foreign key violation
    case "23503":
      return res.status(400).send(err.detail);
    default:
      next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
