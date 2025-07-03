import express from "express";
import requireBody from "#middleware/requireBody"
import requireUser from "#middleware/requireUser"
import {createTask, getTasksByUserId, getTaskById} from "#db/queries/tasks"

const router = express.Router();



export default router;

router.use(requireUser);

router
.route("/")
.get(async (req, res) => {
  const tasks = await getTasksByUserId(req.user.id)
  res.send(tasks)
})
.post(requireBody(["title", "done"]), async(req, res) => {
const { title, done} = req.body
const task = await createTask(title, done, req.user.id);
res.status(201).send(task)
})

  router.param("id", async(req, res, next, id) => {
    const task = await getTaskById(id);
    if (!task) return res.status(404).send("task not found")
    if (task.user_id !== req.user.id)
      return res.status(403).send("this is not your task")
    req.task = task
    next();
  })

router
.route("/:id").put(requireBody(["title", "done"]), async(req, res) =>{
  const { title, done } = req.body;
});
