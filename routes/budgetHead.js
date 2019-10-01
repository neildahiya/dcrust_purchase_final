const router = require("express").Router();
const { ensureAuthenticated } = require("../config/auth");
const budgetHeadController = require("../controller/budgetHead");

router.get(
  "/viewBudgetHead",
  ensureAuthenticated,
  budgetHeadController.getViewBudgetHead
);

router.get(
  "/addBudgetHead",
  ensureAuthenticated,
  budgetHeadController.getAddBudgetHead
);

router.get(
  "/dashboard",
  ensureAuthenticated,
  budgetHeadController.getDashboard
);
router.post(
  "/addBudgetHead",
  ensureAuthenticated,
  budgetHeadController.postAddBudgetHead
);

module.exports = router;
