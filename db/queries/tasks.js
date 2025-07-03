import db from "#db/client";
export async function createTask(title, done, userId){
  const SQL = `
  INSERT INTO tasks(title, done, user_id)
  VALUES ($1, $2, $3)
  RETURNING *
  `;
  const { rows: [task] } = await db.query(SQL, [title, done, userId])
  return task;
}

export async function getTasksByUserId(userId){
const SQL =`
SELECT * FROM tasks WHERE user_id =$!`
const { rows: tasks } = await db.query(SQL, [userId]);
return tasks;
}

export async function getTaskById(id){
  const SQL =`
  SELECT * FROM tasks WHERE id=$1`;
  const { rows:[task]} = await db.query(SQL, [id]);
  return task;
}

export async function updateTaskById(id, title, done){
  const SQL = `
  UPDATE tasks SET title=$2, done=$3 WHERE id=$1 RETURNING *`;
  const { rows:[task]} = await db.query(SQL, [id, title, done]);
  return task;
}