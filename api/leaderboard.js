export default async function handler(req, res) {
  try {
    // Mocking leaderboard data based on Genesis collection creators
    // In production, this would fetch from a subgraph or OpenSea API
    const leaderboard = [
      { rank: 1, creator: "0x71C...3f21", name: "DeepSea_Artist", mints: 142, sales: "45.5 ETH", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=1" },
      { rank: 2, creator: "0x12A...9b88", name: "Neon_Architect", mints: 98, sales: "32.1 ETH", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=2" },
      { rank: 3, creator: "0x88F...e122", name: "Voxel_Master", mints: 76, sales: "28.4 ETH", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=3" },
      { rank: 4, creator: "0x44D...a441", name: "Audio_Synth", mints: 54, sales: "19.8 ETH", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=4" },
      { rank: 5, creator: "0x99B...c772", name: "Spatial_Gen", mints: 31, sales: "12.2 ETH", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=5" }
    ];

    return res.status(200).json(leaderboard);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
}