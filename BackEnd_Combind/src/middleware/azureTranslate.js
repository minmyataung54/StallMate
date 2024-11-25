const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config({ path: __dirname + '/../../.env' });

const key = process.env.AZURE_KEY;
const endpoint = process.env.AZURE_ENDPOINT;
const location = process.env.AZURE_LOCATION;

const detectLanguage = async (text) => {
	try {
		const response = await axios.post(
			`${endpoint}/detect`,
			[{ text }],
			{
				headers: {
					'Ocp-Apim-Subscription-Key': key,
					'Ocp-Apim-Subscription-Region': location,
					'Content-type': 'application/json',
					'X-ClientTraceId': uuidv4().toString(),
				},
				params: {
					'api-version': '3.0',
				},
			}
		);

		return response.data[0].language;
	} catch (error) {
		console.error('Language detection error:', error.response ? error.response.data : error.message);
		throw new Error('Failed to detect language');
	}
};

const translate = async (text) => {
	try {
		const detectedLanguage = await detectLanguage(text);
		const targetLanguage = detectedLanguage === 'th' ? 'en' : 'th';

		const response = await axios.post(
			`${endpoint}/translate`,
			[{ text }],
			{
				headers: {
					'Ocp-Apim-Subscription-Key': key,
					'Ocp-Apim-Subscription-Region': location,
					'Content-type': 'application/json',
					'X-ClientTraceId': uuidv4().toString(),
				},
				params: {
					'api-version': '3.0',
					'from': detectedLanguage,
					'to': targetLanguage,
				},
			}
		);

		return {
			originalText: text,
			translatedText: response.data[0].translations[0].text,
			from: detectedLanguage,
			to: targetLanguage,
		};
	} catch (error) {
		console.error('Translation error:', error.response ? error.response.data : error.message);
		throw new Error('Failed to translate the text');
	}
};

module.exports = translate;