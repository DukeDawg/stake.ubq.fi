/**
 * RPC endpoint for blockchain calls.
 * - In development (including Deno Deploy preview links), it uses https://rpc.ubq.fi
 * - In production, it uses /rpc for performance.
 */
export const isLocalNode = import.meta.env.MODE === "local-node";
export const isDenoDeployHost = (hostname: string) => hostname.endsWith(".deno.dev") || hostname.endsWith(".deno.net");
const currentLocation = globalThis.location;
export const RPC_URL =
  import.meta.env.VITE_RPC_URL || (isDenoDeployHost(currentLocation?.hostname ?? "") ? "https://rpc.ubq.fi" : `${currentLocation?.origin ?? ""}/rpc`);
