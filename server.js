const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// GET endpoint
app.get('/api/v1/data', (req, res) => {
    const sampleData = [
        { id: 1, name: "Whey Protein", type: "Protein" },
        { id: 2, name: "Kreatin", type: "Güc" },
        { id: 3, name: "Vitaminlər", type: "Sağlamlıq" }
    ];
    res.status(200).json({ status: "success", data: sampleData });
});

// POST endpoint
app.post('/api/v1/data', (req, res) => {
    const payload = req.body;
    console.log("Qəbul edilən məlumat:", payload);
    res.status(201).json({
        status: "created",
        message: "Məlumat uğurla qəbul edildi.",
        receivedData: payload
    });
});

app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} portunda aktivdir.`);
});