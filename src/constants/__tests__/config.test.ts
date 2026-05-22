import { describe, expect, it } from "bun:test";

import { isDenoDeployHost, resolveRpcUrl } from "../config";

describe("RPC config resolution", () => {
  it("prefers an explicit RPC URL from the environment", () => {
    expect(
      resolveRpcUrl({
        envRpcUrl: "https://rpc.example.com",
        hostname: "stake.ubq.fi",
        origin: "https://stake.ubq.fi",
      })
    ).toBe("https://rpc.example.com");
  });

  it("uses the shared RPC for Deno Deploy preview hosts", () => {
    expect(isDenoDeployHost("stake-ubq-fi.deno.dev")).toBe(true);
    expect(
      resolveRpcUrl({
        hostname: "preview-stake-ubq-fi.ubiquity-dao.deno.net",
        origin: "https://preview-stake-ubq-fi.ubiquity-dao.deno.net",
      })
    ).toBe("https://rpc.ubq.fi");
  });

  it("falls back to the app origin RPC path for production hosts", () => {
    expect(isDenoDeployHost("stake.ubq.fi")).toBe(false);
    expect(
      resolveRpcUrl({
        hostname: "stake.ubq.fi",
        origin: "https://stake.ubq.fi",
      })
    ).toBe("https://stake.ubq.fi/rpc");
  });
});
