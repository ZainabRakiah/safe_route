const mongoose = require("mongoose");

const IncidentSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  description: String,
  riskLevel: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Incident", IncidentSchema);
