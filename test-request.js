require('dotenv').config();
const fetch = require('axios');

async function testAPI() {
  try {
    const response = await fetch.post('http://localhost:3000/api/shortcut', {
      command: 'anthropic',
      parameters: {
        question: 'What is 42?'
      },
      apiKey: process.env.USER_KEY
    });

    console.log('Success:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testAPI();
