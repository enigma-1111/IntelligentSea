export default async function handler(req, res) {
  const OPENSEA_API_KEY = "ac474cf1cb3b69b36af422b925c8364f";
  const COLLECTION_SLUG = 'intelligentsea-genesis';

  try {
    const response = await fetch(`https://api.opensea.io/api/v2/collections/${COLLECTION_SLUG}/stats`, {
      headers: {
        'x-api-key': OPENSEA_API_KEY,
        'accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`OpenSea API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    const stats = {
      floor_price: data.total?.floor_price || 0,
      floor_price_symbol: data.total?.floor_price_symbol || 'ETH',
      volume: data.total?.volume || 0,
      sales: data.total?.sales || 0,
      average_price: data.total?.average_price || 0
    };

    return res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching OpenSea stats:', error);
    return res.status(500).json({ error: 'Failed to fetch collection stats' });
  }
}