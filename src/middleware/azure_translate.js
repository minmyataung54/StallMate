const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config({ path: __dirname + '/../../.env' });

const key = process.env.AZURE_KEY;
const endpoint = process.env.AZURE_ENDPOINT;
const location = process.env.AZURE_LOCATION; 
const translate = async (text) => {
  try {
    const response = await axios.post(
      `${endpoint}/translate`,
      [{ text }],
      {
        headers: {
          'Ocp-Apim-Subscription-Key': key,
          'Ocp-Apim-Subscription-Region': location,
          'Content-type': 'application/json',
          'X-ClientTraceId': uuidv4().toString()
        },
        params: {
          'api-version': '3.0',
          'from': 'th',
          'to': 'en'
        }
      }
    );

    // Extract the translated text
    return response.data[0].translations[0].text;
  } catch (error) {
    console.error('Translation error:', error.response ? error.response.data : error.message);
    throw new Error('Failed to translate the text');
  }
};


module.exports = translate;

// // Testing the function
// translate("ฉันอยากจะขับรถของคุณไปรอบ ๆ บล็อกสองสามครั้ง!")
//   .then(translatedText => console.log("Translated Text:", translatedText))
//   .catch(err => console.error(err));