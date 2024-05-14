const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getMovies);
router.get("/:id", controller.getMovieById);
router.post("/", controller.addMovie);
router.delete("/:id", controller.removeMovie);

module.exports = router;
