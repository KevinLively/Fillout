const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");

router.get("/:formId/questions", formController.getQuestions);

router.get("/:formId/filteredResponses", formController.getFilteredResponses);

module.exports = router;
