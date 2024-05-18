
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Define MongoDB Schema
const dataSchema = new mongoose.Schema({
    // Define schema fields based on JSON data structure
    end_year: { type: String, default: '' },
    intensity: { type: Number, required: true },
    sector: { type: String, required: true },
    topic: { type: String, required: true },
    insight: { type: String, required: true },
    url: { type: String, required: true },
    region: { type: String, required: true },
    start_year: { type: String, default: '' },
    impact: { type: String, default: '' },
    added: { type: Date, required: true },
    published: { type: Date, required: true },
    country: { type: String, required: true },
    relevance: { type: Number, required: true },
    pestle: { type: String, required: true },
    source: { type: String, required: true },
    title: { type: String, required: true },
    likelihood: { type: Number, required: true }

});

const Data = mongoose.model('Data', dataSchema);

// API endpoint to fetch data
app.get('/api/data', async (req, res) => {
    try {
        const data = await Data.find(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
