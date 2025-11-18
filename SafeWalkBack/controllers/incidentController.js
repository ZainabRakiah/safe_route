const Incident = require("../models/Incident");

exports.addIncident = async (req, res) => {
    try {
        const { latitude, longitude, description } = req.body;

        const incident = new Incident({ latitude, longitude, description });
        await incident.save();

        res.json({ message: "Incident saved", incident });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getIncidents = async (req, res) => {
    try {
        const incidents = await Incident.find();
        res.json(incidents);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
