const express = require("express");
const router = express.Router();
const { addIncident, getIncidents } = require("../controllers/incidentController");

router.post("/add", addIncident);
router.get("/", getIncidents);

module.exports = router;
