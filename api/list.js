export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const OPENSEA_API_KEY = "ac474cf1cb3b69b36af422b925c8364f";
  const { asset_contract_address, token_id, price, expiration_time } = req.body;

  try {
    // OpenSea API v2 Listing endpoint
    const response = await fetch(`https://api.opensea.io/api/v2/orders/base/seaport/listings`, {
      method: 'POST',
      headers: {
        'X-API-KEY': OPENSEA_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        parameters: {
          offer: [{
            itemType: 2, // ERC721
            token: asset_contract_address,
            identifierOrCriteria: token_id,
            startAmount: price,
            endAmount: price
          }],
          consideration: [{
            itemType: 0, // Native (ETH)
            amount: price,
            recipient: "0x5780e697aaed5639edd231c98908b0f18fac0f20" // User wallet
          }],
          startTime: Math.floor(Date.now() / 1000),
          endTime: expiration_time || Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 1 week
          orderType: 0,
          zone: "0x0000000000000000000000000000000000000000",
          salt: Math.floor(Math.random() * 1000000).toString(),
          conduitKey: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000"
        },
        signature: req.body.signature // Signature must be provided by the agent/wallet
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}