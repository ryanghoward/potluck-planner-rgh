const router = require("express").Router();
const User = require("./modal");
const bcrypt = require("bcryptjs");
const { tokenBuilder } = require("../tokenBuilder");
const { checkUsernameExists, checkUsernameUnique } = require("./middleware");

// router.get("/", (req, res, next) => {
//     const { search } = req.params
//     User.getAll().then(users => {
//         const usernames = users.map(({ username }) => username)
//         const searched = usernames.filter(u =>
//             u.toLowerCase().includes(search.toLowerCase())
//         )
//         if (searched.length > 10) {
//             res.status(200).json(searched.splice(0, 9))
//         } else {
//             res.status(200).json(searched)
//         }
//     }).catch(next)
// })

router.get("/", async (req, res) => {
  res.json(await User.getAll());
});

router.post("/register", checkUsernameUnique, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(username);
    const hash = bcrypt.hashSync(password, 8);
    const newUser = { username, password: hash };
    const user = await User.addUser(newUser);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

router.post("/login", checkUsernameExists, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const [existingUser] = await User.getBy({ username });

    if (existingUser && bcrypt.compareSync(password, existingUser.password)) {
      const token = tokenBuilder(existingUser);
      res.status(200).json({
        message: `welcome ${existingUser.username} `,
        token,
      });
    } else {
      next({
        message: "Invalid Credentials",
        status: 401,
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
