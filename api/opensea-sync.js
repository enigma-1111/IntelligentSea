export default async function handler(req, res) {
  const OPENSEA_API_KEY = "69f9e7ec890d80d8740ab41a424b9ac5";
  const COLLECTION_SLUG = 'intelligentsea-genesis';

  if (req.method === 'POST') {
    const { tokenId } = req.body;

    try {
      const refreshResponse = await fetch(`https://api.opensea.io/api/v2/chain/base/contract/0x658fc85FC2d73989eaFb0D5ad30e727902645BA3/nfts/${tokenId}/refresh`, {
        method: 'POST',
        headers: {
          'x-api-key': OPENSEA_API_KEY,
          'accept': 'application/json'
        }
      });

      console.log(`Mint sync triggered for token ${tokenId}`);

      return res.status(200).json({
        success: true,
        message: `Token ${tokenId} synced with OpenSea.`,
        refreshStatus: refreshResponse.status
      });
    } catch (error) {
      console.error('Error syncing mint to OpenSea:', error);
      return res.status(500).json({ error: 'Failed to sync mint' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}