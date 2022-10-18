const express = require("express");

const router = express.Router();

const { register, login, getUsers } = require("../controllers/main");
const authMiddleware = require("../middleware/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/allusers").get(authMiddleware, getUsers);

module.exports = router;
