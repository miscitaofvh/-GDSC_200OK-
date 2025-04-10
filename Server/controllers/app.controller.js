const { getDB } = require('../utils/db');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const axios = require('axios'); 

exports.search = async (req, res) => {
  try {
    const userId = req.session.user_id;
    
    if (!userId || !ObjectId.isValid(userId)) {
      return res.status(401).json({ error: "Unauthorized or invalid session" });
    }
    
    const search = req.body;
    const n8nWebhookUrl = process.env.n8nWebhookUrl;
    
    // Gửi dữ liệu tới n8n và nhận kết quả xử lý
    const n8nResponse = await axios.post("https://hunn.app.n8n.cloud/webhook/c28ef86c-f26b-4625-9fe7-4e5987c4dac6", search);
    
    // Trả về dữ liệu đã được xử lý từ n8n cho client
    return res.status(200).json(n8nResponse.data);
  } catch (error) {
    console.error("Error in search endpoint:", error);
    return res.status(500).json({ error: "An error occurred while processing your request." });
  }
};