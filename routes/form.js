const router = require("express").Router();
const { ensureAuthenticated } = require("../config/auth");
const formController = require("../controller/form");

router.get("/newForm", formController.getNewForm);

router.post("/newForm", formController.postNewForm);

router.get(
  "/waitingForApproval",

  formController.getWaitingForApproval
);
router.get(
  "/waitingForApproval/:id",

  formController.getSingleForm
);

router.get("/sentBack", formController.getSentBack);

router.get(
  "/sentBack/:id",

  formController.getSingleSentForm
);
//router.post("/sentBack", formController.postSentBack);
router.get("/queries", formController.getQueries);
router.post("/queries", formController.postQueries);
module.exports = router;
