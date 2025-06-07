const fetch = require('node-fetch');

// Replace with your actual Hyperbeam API key
const API_KEY = 'sk_test_Ycmy8XUTdhBfWCtwDqz4sRj5njjw8cYjggFDMcfsQW8';

// Hyperbeam API URL
const BASE_URL = "https://api.hyperbeam.com/v1/sessions";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Making POST request to Hyperbeam API to create a new session
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'My Hyperbeam Session',
          options: {
            video: true,
            audio: true,
          },
        }),
      });

      // Check if the response is ok (status 200-299)
      if (!response.ok) {
        // Log the response body for debugging purposes
        const errorBody = await response.text();
        console.error("Error Response Body:", errorBody);

        return res.status(response.status).json({
          error: `Request failed with status ${response.status}`,
          details: errorBody
        });
      }

      // Attempt to parse the JSON response
      const data = await response.json();

      // If successful, return the session info
      res.status(200).json({
        message: 'Session created successfully',
        sessionId: data.id,
        url: data.url,
      });

    } catch (error) {
      console.error("Request failed:", error);
      res.status(500).json({ error: 'Request failed: ' + error.message });
    }
  } else {
    // If not a GET request, return Method Not Allowed
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
