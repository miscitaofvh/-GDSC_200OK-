const { getDB } = require('../utils/db');
const { ObjectId } = require('mongodb');
const axios = require('axios');

exports.search = async (req, res) => {
  try {
    const userId = req.session.user_id;

    if (!userId || !ObjectId.isValid(userId)) {
      return res.status(401).json({ error: "Unauthorized or invalid session" });
    }

    const db = await getDB();
    const searchTerm = req.body.search;
    const n8nWebhookUrl = process.env.n8nWebhookUrl || "https://leehugw.app.n8n.cloud/webhook/42743332-d9c4-4072-80b8-6f3550adf172";

    const existingDoc = await db.collection("YoutubeData").findOne({
      "data.output.search": { $regex: searchTerm, $options: "i" }
    });

    if (existingDoc) {
      return res.status(200).json({
        source: "database",
        data: existingDoc.data 
      });
    }

    const n8nResponse = await axios.post(n8nWebhookUrl, { search: searchTerm });

    const newData = [
      { currentDate: new Date() },
      { output: { search: searchTerm } },
      ...(Array.isArray(n8nResponse.data) ? n8nResponse.data : [{ output: n8nResponse.data }])
    ];

    await db.collection("YoutubeData").insertOne({ data: newData });

    return res.status(200).json({
      source: "n8n",
      data: newData
    });

  } catch (error) {
    console.error("Error in search endpoint:", error);
    return res.status(500).json({ error: "Something went wrong." });
  }
};
