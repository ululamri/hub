# Karyra Readiness Anchor — Minimal Starknet Example

This is a small Cairo/Scarb example kept intentionally minimal for the Karyra Spark alpha track.

It is not deployed, does not store user data, and does not issue credentials. Its role is to show the direction of the builder-later path: after users understand safety and readiness, Spark/Hub can introduce Cairo, Scarb, Starknet Foundry, and account abstraction gradually.

## Local check

```bash
scarb build
```

## Why this exists

Karyra Spark starts as a safety-first readiness gateway for local, non-technical users. This example gives the grant reviewer a concrete signal that the project is beginning to touch Starknet-native tooling without forcing wallet actions on beginners.
