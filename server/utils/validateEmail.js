const axios = require("axios");

const validateEmail = async (email) => {
  const apiKey = process.env.ABSTRACT_API_KEY;
  const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${encodeURIComponent(email)}`;

  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.error(
      "❌ AbstractAPI backend error:",
      err?.response?.status,
      err?.response?.data || err.message
    );
    return null;
  }
};

module.exports = validateEmail;
