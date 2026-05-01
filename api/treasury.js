export default async function handler(req, res) {
  const TREASURY_ADDRESS = '0x658fc85FC2d73989eaFb0D5ad30e727902645BA3';
  
  try {
    // Mocking live data for the dashboard
    const stats = {
      eth_balance: "14.82",
      isea_balance: "1,420,000",
      total_usd: "52,410.00",
      recent_fees: "1.24 ETH",
      liquidity_allocation: "60%",
      liquidity_value: "31,446.00",
      last_updated: new Date().toISOString()
    };

    return res.status(200).json(stats);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch treasury stats' });
  }
}