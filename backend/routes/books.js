const { PrismaClient } = require("@prisma/client");

var express = require("express");
var router = express.Router();
const jwtToken = require("jsonwebtoken");
var { expressjwt: jwt } = require("express-jwt");

SECRET_KEY = "mysecretkey";

/** login using JWT */
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "user" && password === "password") {
    const token = jwtToken.sign({ userId: 1, username }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(401).send("Invalid credentials2");
  }
});

const verifyJwt = jwt({ secret: SECRET_KEY, algorithms: ["HS256"] });

/* GET books listing. */
router.get("/", async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const books = await prisma.books.findMany();
    res.json(books);
  } catch (error) {
    console.log(error);
  }
});

/** POST book */
router.post("/", async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const book = await prisma.books.create({
      data: req.body,
    });
    res.json(book);
  } catch (error) {
    console.log(error);
  }
});

/** DELETE book */
router.delete("/:id", async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const book = await prisma.books.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json(book);
  } catch (error) {
    console.log(error);
  }
});

/** PUT Book */
router.put("/:id", async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const book = await prisma.books.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: req.body,
    });
    res.json(book);
  } catch (error) {
    console.log(error);
  }
});

/** GET BY ID book */
router.get("/:id", verifyJwt, async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const book = await prisma.books.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json(book);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
