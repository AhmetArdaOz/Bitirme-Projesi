const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getVotes);
router.get("/:id", controller.getVoteById);
router.get("/:user_id", controller.getVotesByUserId);
router.post("/", controller.addVote);
router.put("/:id", controller.updateVote);
router.delete("/id", controller.removeVote);

module.exports = router;