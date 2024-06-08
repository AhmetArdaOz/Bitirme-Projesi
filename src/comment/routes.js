const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/:movie_id", controller.getCommentsByMovieId);
router.post("/", controller.addComment);

module.exports = router;
