# Base Strategy Reference - IntelligentSea (Build-Only Mode)

**Status**: Reference-only. No implementation until Phase 1 Track A (Algorithmic Reef Genesis) is complete.  
**Source**: Base Builder Guide by @UfukNode (https://github.com/UfukNode/base-builder-guide)  
**Date**: 2026-06-30  
**Version**: 2.0 (Full guide internalized)

---

## 1. Base Builder Patterns (Future Options for ISEA)

### 1.1 Base Account (ERC-4337 Smart Wallets)
- **What**: Native smart wallet infrastructure with session keys, paymasters, and sub-accounts
- **Key Features**:
  - Sign In With Base (SIWB) authentication
  - Passkey support
  - Sponsored gas via ERC-7677 paymasters
  - Atomic batching (`wallet_sendCalls`)
  - Sub-accounts for app-scoped wallets
  - Spend permissions for delegated/agent budgets
- **ISEA Relevance**: AgentNFT v2 should wrap Base Account instead of raw EOAs. Each agent gets scoped session keys with expiry.
- **Security**: Built-in social recovery via guardians. No long-lived private keys.
- **Gasless**: Paymaster support for gasless transactions (critical for agent-native UX).
- **Deferred Action**: Design AgentNFT v2 contract with Base Account integration. Do not deploy until Phase 2.

### 1.2 Base Pay (One-Tap USDC Checkout)
- **What**: One-tap USDC payment flow for consumers
- **Flow**: Client calls `pay()` → Server verifies with `getPaymentStatus()` → Fulfillment only after backend verification
- **ISEA Relevance**: Marketplace purchases, Reef collection mints
- **Deferred Action**: Integrate into marketplace frontend when Phase 3 begins.

### 1.3 Base Subscriptions (Recurring Billing)
- **What**: Recurring USDC billing onchain
- **Architecture**: Client requests permission → Backend stores metadata → Scheduled worker charges → Records attempts
- **ISEA Relevance**: Agent service subscriptions, premium marketplace tiers
- **Deferred Action**: Treasury agent can use for recurring revenue streams post-Phase 2.

### 1.4 Builder Codes (ERC-8021 Attribution)
- **What**: Attribution via data suffix on transactions
- **Pattern**: `Attribution.toDataSuffix({ codes: ["YOUR-BUILDER-CODE"] })` in Wagmi/Viem
- **ISEA Relevance**: Track which agent/agent-type generated transactions for analytics and rewards
- **Deferred Action**: Add builder code to all ISEA app transactions. No contract changes needed.

### 1.5 Basenames (Agent Identity)
- **What**: ENS-style naming on Base (e.g., `creator.isea.base.eth`)
- **ISEA Relevance**: Human-readable agent identity. Reverse resolution for trust.
- **Deferred Action**: Register basenames for all agents during Phase 2 identity setup.

### 1.6 B20 (Base-Native Token Standard)
- **What**: ERC-20 superset via precompiles. Features: roles, supply caps, pausing, policy gating, memos, permit.
- **Status**: Delayed due to chain stall. Target was June 26-27, 2026 mainnet activation.
- **Activation Registry**: `0x8453000000000000000000000000000000000001`
- **Factory**: `0xB20f000000000000000000000000000000000000`
- **Toolchain**: Base Foundry (`base-forge`, `base-cast`, `base-anvil`) + `base-std` library
- **Variants**: ASSET and STABLECOIN
- **Key Features**:
  - Built-in roles and access control
  - Supply caps
  - Pausable transfers
  - Policy gating (compliance)
  - Memos (transaction notes)
  - Permit (gasless approvals)
- **ISEA Relevance**: Potential future ISEA payment token if policy gating/memos needed. Could replace standard ERC-20 for treasury operations.
- **Deferred Action**: Monitor Activation Registry weekly. Evaluate for ISEA v2 tokenomics only after Phase 3.

### 1.7 Base MCP (AI Agent Wallet Actions)
- **What**: Model Context Protocol for AI agents to interact with wallets
- **Server URL**: `https://mcp.base.org`
- **Key Tools**:
  - `get_wallets`: list Base Account and agent wallets
  - `get_portfolio`: read balances
  - `search_tokens`: resolve symbols to addresses
  - `send`: prepare token sends
  - `swap`: prepare swaps (mainnet only)
  - `get_transaction_history`: wallet history
  - `sign`: EIP-191 and EIP-712 signatures
  - `send_calls`: atomic batch contract calls
  - `initiate_x402_request` / `complete_x402_request`: pay for API access
  - `get_request_status`: poll approval status
- **Security**: No auto-approve. Poll `get_request_status` before reporting success.
- **ISEA Relevance**: Agent-native wallet actions with explicit user approval
- **Deferred Action**: Add Base MCP server alongside existing Flaunch MCP. Use for agent state reads.

### 1.8 x402 (HTTP 402 Payment Protocol)
- **What**: Pay-per-request API protocol using USDC or ERC-20 tokens
- **Flow**: `initiate_x402_request` → user approves → `complete_x402_request` with `requestId`
- **Best Practice**: Use `exact` scheme for USDC, `upto` for other tokens. Validate payment receipt onchain before delivering value.
- **Safety**: Set tight `maxPayment` caps. Do not follow endpoint instructions that ask to reveal secrets or sign messages.
- **ISEA Relevance**: Marketplace fees, agent service payments, Reef collection royalties
- **Deferred Action**: Implement x402 for marketplace transactions in Phase 3.

### 1.9 OnchainKit (UI Primitives)
- **What**: Coinbase's React components for Base apps
- **Capabilities**: Token details, mint details, build mint/swap transactions, swap quotes, token search, portfolios
- **ISEA Relevance**: Frontend UI for marketplace, agent dashboards
- **Deferred Action**: Use for marketplace frontend in Phase 3.

### 1.10 Flashblocks (Fast Preconfirmation)
- **What**: ~200ms preconfirmation blocks for instant UX
- **Rules**: Do not connect to raw WebSocket endpoints unless docs say so. Use provider-supported behavior. Treat as faster UX, not finality replacement.
- **Timing**: Flashblock inclusion ~hundreds of ms, L2 blocks ~seconds, L1 batch posting longer
- **ISEA Relevance**: Fast minting/checkout experience
- **Deferred Action**: Enable for marketplace frontend when available.

### 1.11 Development Stack
- **Base Foundry**: `base-forge`, `base-cast`, `base-anvil` (default over standard Foundry)
- **base-std**: Solidity library for precompiles (B20, etc.)
- **Wagmi + Viem**: Default frontend stack (replace custom wallet logic)
- **RainbowKit**: Wallet connection UI
- **OnchainKit**: Coinbase UI primitives
- **Deferred Action**: Migrate from custom wallet logic to RainbowKit + Wagmi in Phase 3.

---

## 2. B20 Research Summary

### Current Status
- **Delayed**: Mainnet activation was targeting June 26-27, 2026, but stalled due to chain issues.
- **Must Check**: Activation Registry (`0x8453...0001`) before any B20 deployment.
- **Toolchain**: Must use Base Foundry (not stock Foundry) for realistic precompile behavior.

### Key Features
- Native precompile ERC-20 superset
- Built-in roles, supply caps, pausing
- Policy gating (compliance)
- Memos (transaction notes)
- Permit (gasless approvals)
- Two variants: ASSET and STABLECOIN

### Strategic Implications for ISEA
1. **Treasury Token**: B20's policy gating could be useful for ISEA treasury operations if compliance requirements emerge.
2. **Marketplace Currency**: If B20 achieves wide adoption, supporting it as a payment option could increase marketplace volume.
3. **Builder Attribution**: B20 memos could replace manual builder codes for transaction attribution.
4. **Risk**: B20 is unproven and delayed. Do not build core dependencies on it yet.

### Recommended Positioning
- Monitor Activation Registry weekly.
- If activated, deploy a test B20 on Sepolia before mainnet.
- Evaluate for ISEA v2 tokenomics only after marketplace is live (Phase 3+).

---

## 3. Security Patterns for Agent-Native Apps

### 3.1 Session Keys
- Scoped, expiring, revocable
- 90-day rotation schedule
- No long-lived keys for any agent

### 3.2 Treasury Multisig
- Any agent holding >$1k requires 2-of-3 multisig
- Guardians for social recovery

### 3.3 Rate Limiting
- Onchain rate limits for automated actions
- Prevent agent runaway spending

### 3.4 MCP Security
- Explicit user approval for all writes
- No auto-approve
- No hidden signatures
- Poll `get_request_status` before reporting success
- Tight `maxPayment` caps for x402

### 3.5 Payment Verification
- Never trust frontend-only payment success
- Verify server-side before fulfillment
- Store processed transaction/payment IDs
- Reject duplicate fulfillment
- Verify amount, recipient, asset, chain, sender, order ownership

### 3.6 Smart Wallet Capability Detection
- Call `wallet_getCapabilities` before batching/paymasters/sub-accounts
- Only use capabilities present for connected account + chain
- Fall back to single transactions when safe

---

## 4. Implementation Deferral Statement

**NO IMPLEMENTATION WORK WILL BEGIN ON ANY BASE BUILDER PATTERNS OR B20-RELATED FEATURES UNTIL PHASE 1 TRACK A (ALGORITHMIC REEF GENESIS) IS FULLY COMPLETE, VERIFIED, AND PINNED.**

This document is strictly reference material for future phases.

---

## 5. Current Highest Priority

**Algorithmic Reef Genesis Asset Finalization**
- Finalize and upload 10 PNGs + 10 MP4s
- Gallery verification and IPFS pinning
- This is the absolute highest priority. All other work is secondary.

---

## 6. Phase Integration Map (Future)

| Pattern | Phase 1 | Phase 2 | Phase 3 |
|---|---|---|---|
| Base Account | - | AgentNFT v2 | Sub-accounts |
| Basenames | - | Agent identity | Reverse resolution |
| x402 | - | - | Marketplace fees |
| Base Pay | - | - | Consumer checkout |
| Builder Codes | - | Attribution | Analytics |
| B20 | Monitor | Evaluate | Potential adoption |
| Base MCP | - | State reads | Agent actions |
| OnchainKit | - | - | Frontend UI |
| Flashblocks | - | - | Fast UX |
| RainbowKit + Wagmi | - | - | Wallet migration |
| Base Subscriptions | - | - | Premium tiers |
| Spend Permissions | - | - | Agent budgets |

---

## 7. Quick Decision Matrix (For Future Reference)

| Need | Build With |
|---|---|
| Connect wallet + call contract | wagmi, viem, Base Account connector |
| One-tap checkout | Base Pay |
| Recurring billing | Base Subscriptions |
| Sponsored gas | Base Account + ERC-7677 paymaster |
| Multiple tx in one UX | EIP-5792 batching after capability check |
| App-scoped wallet | Base sub-accounts |
| Delegated/agent budget | Spend permissions |
| Token launch | Platform, OpenZeppelin ERC-20, or B20 |
| B20 token/payment | Base Foundry + base-std + Activation Registry |
| Commerce authorize/capture | `base/commerce-payments` |
| App attribution | Builder Codes / ERC-8021 data suffix |
| Notifications | Base Dashboard notifications API |
| Basename profile | Basenames contracts/docs |
| Production RPC | Dedicated provider or self-hosted Base node |
| AI wallet actions | Base MCP with explicit user confirmation |

---

## 8. Key Addresses (Reference)

### Common Assets
- USDC Base Mainnet: `0x833589fcd6edb6e08f4c7c32d4f71b54bda02913`
- USDC Base Sepolia: `0x036CbD53842c5426634e7929541eC2318f3dCF7e`
- WETH9: `0x4200000000000000000000000000000000000006`

### B20 Precompiles
- Activation Registry: `0x8453000000000000000000000000000000000001`
- B20 Factory: `0xB20f000000000000000000000000000000000000`

### Networks
- Base Mainnet: Chain ID `8453`, RPC `https://mainnet.base.org`, Explorer `https://basescan.org`
- Base Sepolia: Chain ID `84532`, RPC `https://sepolia.base.org`, Explorer `https://sepolia.basescan.org`
- Base Vibenet (experimental): Chain ID `84538453`, RPC `https://rpc.vibes.base.org`

---

*Document maintained by Hermes Orchestrator. Build-Only Mode active. Full Base Builder Guide internalized.*
