import express from "express"
import requireBody from "#middleware/requireBody"
import { createToken } from "#utils/jwt"
import { createUser, getUserByUsernameAndPassword } from "#db/queries/users";


const router = express.Router();

export default router;

router
  .route("/register")
  .post(requireBody(["username", "password"]), async(req, res) => {
  const {username, password} = req.body
  const user = await createUser(username, password)
  const token = createToken({id:user.id})
  res.status(201).send(token)
})

router
.route("/login")
.post(requireBody(["username", "password"]), async(req, res) => {
  const {username, password} = req.body;
  const user = await getUserByUsernameAndPassword(username, password);
  if(!user) return res.status(401).send("invalid username or password")
  const token = createToken({ id:user.id }) 
res.send(token) 
})

export async function getUserById(id){
  const SQL =`
  SELECT * FROM users WHERE id = $1`;
  const {
    rows: [user],
  } = await db.query(SQL, [id]);
  return user;
}



