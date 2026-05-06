const axios = require('axios');

module.exports = async (req, res) => {
  const { text } = req.query;

  if (!text) {
    return res.status(400).json({
      status: false,
      message: "Parameter 'text' tidak boleh kosong."
    });
  }

  try {
    const response = await axios.get(`https://api.nexray.eu.cc/ai/gemini?text=${encodeURIComponent(text)}`);
    const data = response.data;

    const modifiedData = {
      status: data.status,
      author: "KevCodex",
      result: data.result,
      timestamp: data.timestamp,
      response_time: data.response_time
    };

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(modifiedData, null, 2));

  } catch (error) {
    res.status(500).json({
      status: false,
      error: "Gagal mengambil data dari server pusat."
    });
  }
};
