export default async function handler(req, res) {
  const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY;
  const COLLECTION_SLUG = 'intelligentsea-genesis';

  if (req.method === 'POST') {
    const { tokenId, metadata, listingPrice } = req.body;

    try {
      // 1. Logic to verify mint on-chain (omitted for brevity)
      
      // 2. Create listing on OpenSea via API
      // Note: This usually requires a signed order from the wallet.
      // For an 'Integrator Agent', we trigger the metadata refresh and notify the swarm.
      
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