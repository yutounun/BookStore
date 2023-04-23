const { PrismaClient } = require("@prisma/client");

var express = require("express");
var router = express.Router();

/* GET books listing. */
router.get("/", async (req, res, next) => {
  const prisma = new PrismaClient();
  const allBooks = await prisma.books.findMany();
  res.json(allBooks);
});

module.exports = router;
