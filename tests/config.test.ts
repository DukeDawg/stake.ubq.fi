import { describe, expect, it } from "bun:test";

import { isDenoDeployHost } from "../src/constants/config";

describe("isDenoDeployHost", () => {
  it("matches Deno Deploy preview hostnames", () => {
    expect(isDenoDeployHost("stake-ubq-fi.deno.dev")).toBe(true);
    expect(isDenoDeployHost("p-stake-ubq-fi.ubiquity-dao.deno.net")).toBe(true);
  });

  it("does not match unrelated hostnames", () => {
    expect(isDenoDeployHost("stake.ubq.fi")).toBe(false);
    expect(isDenoDeployHost("localhost")).toBe(false);
  });
});
