/**
 * RPC endpoint for blockchain calls.
 * - In development (including Deno Deploy preview links), it uses https://rpc.ubq.fi
 * - In production, it uses /rpc for performance.
 */
export const isLocalNode = import.meta.env.MODE === "local-node";
export const isDenoDeployHost = (hostname: string) => hostname.endsWith(".deno.dev") || hostname.endsWith(".deno.net");

export function resolveRpcUrl({
  envRpcUrl,
  hostname,
  origin,
}: {
  envRpcUrl?: string;
  hostname?: string;
  origin?: string;
}) {
  if (envRpcUrl) {
    return envRpcUrl;
  }

  return isDenoDeployHost(hostname ?? "") ? "https://rpc.ubq.fi" : `${origin ?? ""}/rpc`;
}

const currentLocation = globalThis.location;
export const RPC_URL = resolveRpcUrl({
  envRpcUrl: import.meta.env.VITE_RPC_URL,
  hostname: currentLocation?.hostname,
  origin: currentLocation?.origin,
});
