# Base Strategy Reference - IntelligentSea (Build-Only Mode)

**Status**: Reference-only. No implementation until Phase 1 Track A (Algorithmic Reef Genesis) is complete.  
**Source**: Base Builder Guide by @UfukNode (https://github.com/UfukNode/base-builder-guide)  
**Date**: 2026-06-30

---

## 1. Base Builder Patterns (Future Options for ISEA)

### 1.1 Base Account (ERC-4337 Smart Wallets)
- **What**: Native smart wallet infrastructure with session keys, paymasters, and sub-accounts
- **ISEA Relevance**: AgentNFT v2 should wrap Base Account instead of raw EOAs. Each agent gets scoped session keys with expiry.
- **Security**: Built-in social recovery via guardians. No long-lived private keys.
- **Gasless**: Paymaster support for gasless transactions (critical for agent-native UX).
- **Deferred Action**: Design AgentNFT v2 contract with Base Account integration. Do not deploy until Phase 2.

### 1.2 Base Pay (One-Tap USDC Checkout)
- **What**: One-tap USDC payment flow for consumers
- **ISEA Relevance**: Marketplace purchases, Reef collection mints
- **Deferred Action**: Integrate into marketplace frontend when Phase 3 begins.

### 1.3 Base Subscriptions (Recurring Billing)
- **What**: Recurring USDC billing onchain
- **ISEA Relevance**: Agent service subscriptions, premium marketplace tiers
- **Deferred Action**: Treasury agent can use for recurring revenue streams post-Phase 2.

### 1.4 Builder Codes (ERC-8021 Attribution)
- **What**: Attribution via data suffix on transactions
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
- **ISEA Relevance**: Potential future ISEA payment token if policy gating/memos needed. Could replace standard ERC-20 for treasury operations.
- **Deferred Action**: Monitor Activation Registry. Evaluate for ISEA v2 tokenomics only after Phase 3.

### 1.7 Base MCP (AI Agent Wallet Actions)
- **What**: Model Context Protocol for AI agents to interact with wallets
- **ISEA Relevance**: Agent-native wallet actions with explicit user approval
- **Security**: No auto-approve. Poll `get_request_status` before reporting success.
- **Deferred Action**: Add Base MCP server alongside existing Flaunch MCP. Use for agent state reads.

### 1.8 x402 (HTTP 402 Payment Protocol)
- **What**: Pay-per-request API protocol using USDC or ERC-20 tokens
- **ISEA Relevance**: Marketplace fees, agent service payments, Reef collection royalties
- **Best Practice**: Use `exact` scheme for USDC, `upto` for other tokens. Validate payment receipt onchain before delivering value.
- **Deferred Action**: Implement x402 for marketplace transactions in Phase 3.

### 1.9 OnchainKit (UI Primitives)
- **What**: Coinbase's React components for Base apps
- **ISEA Relevance**: Frontend UI for marketplace, agent dashboards
- **Deferred Action**: Use for marketplace frontend in Phase 3.

### 1.10 Flashblocks (Fast Preconfirmation)
- **What**: 200ms preconfirmation blocks for instant UX
- **ISEA Relevance**: Fast minting/checkout experience
- **Deferred Action**: Enable for marketplace frontend when available.

### 1.11 Development Stack
- **Base Foundry**: `base-forge`, `base-cast`, `base-anvil` (default over standard Foundry)
- **base-std**: Solidity library for precompiles (B20, etc.)
- **Wagmi + Viem**: Default frontend stack (replace custom wallet logic)
- **RainbowKit**: Wallet connection UI
- **Deferred Action**: Migrate from custom wallet logic to RainbowKit + Wagmi in Phase 3.

---

## 2. B20 Research Summary

### Current Status
- **Delayed**: Mainnet activation was targeting June 26-27, 2026, but stalled due to chain issues.
- **Must Check**: Activation Registry (`0x8453...0001`) before any B20 deployment.

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

---

*Document maintained by Hermes Orchestrator. Build-Only Mode active.*
