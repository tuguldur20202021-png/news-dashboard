export default async function handler(req, res) {
  const { endpoint, ...params } = req.query;
  const API_KEY = process.env.VITE_NEWS_API_KEY || process.env.NEWS_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ message: "API key is missing on the server." });
  }

  // Ensure pageSize is set
  if (!params.pageSize) {
    params.pageSize = '30';
  }

  const queryParams = new URLSearchParams({
    ...params,
    apiKey: API_KEY
  });

  const url = `https://newsapi.org/v2/${endpoint}?${queryParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Add CORS headers so it works smoothly
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: "Failed to fetch news" });
  }
}
