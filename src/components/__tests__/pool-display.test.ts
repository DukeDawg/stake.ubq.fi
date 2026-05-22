import { describe, expect, it } from "bun:test";

import { getPoolDisplayMetrics } from "../pool-display";

describe("PoolDisplay metrics", () => {
  it("maps pool totals and user stake into displayable reward values", () => {
    const metrics = getPoolDisplayMetrics({
      rewardPerBlock: 10n * 10n ** 18n,
      poolAllocationPoints: 25n,
      totalAllocationPoints: 100n,
      rewardTokenDecimals: 18,
      poolAmount: 1_000n * 10n ** 18n,
      userAmount: 100n * 10n ** 18n,
      lpTokenDecimals: 18,
    });

    expect(metrics.poolRewardPerDay).toBe(17_917.5);
    expect(metrics.userPoolShare).toBe(0.1);
    expect(metrics.userRewardPerDay).toBe(1_791.75);
  });

  it("does not derive a user reward when the pool has no stake", () => {
    const metrics = getPoolDisplayMetrics({
      rewardPerBlock: 10n * 10n ** 18n,
      poolAllocationPoints: 25n,
      totalAllocationPoints: 100n,
      rewardTokenDecimals: 18,
      poolAmount: 0n,
      userAmount: 100n * 10n ** 18n,
      lpTokenDecimals: 18,
    });

    expect(metrics.userPoolShare).toBeNull();
    expect(metrics.userRewardPerDay).toBeNull();
  });
});
