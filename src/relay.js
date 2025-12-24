import { noise } from "@chainsafe/libp2p-noise";
import { yamux } from "@chainsafe/libp2p-yamux";
import { circuitRelayServer } from "@libp2p/circuit-relay-v2";
import { privateKeyFromRaw } from "@libp2p/crypto/keys";
import { identify } from "@libp2p/identify";
import { ping } from "@libp2p/ping";
import { tcp } from "@libp2p/tcp";
import { webRTCDirect } from "@libp2p/webrtc";
import { webSockets } from "@libp2p/websockets";
import { createLibp2p } from "libp2p";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";
import { config } from "./config.js";

(async function () {
  const node = await createLibp2p({
    start: false,
    privateKey: privateKeyFromRaw(
      uint8ArrayFromString(config.privateKey, "base64")
    ),
    addresses: {
      listen: config.listen,
      announce: config.announce
    },
    transports: [tcp(), webSockets(), webRTCDirect()],
    streamMuxers: [yamux()],
    connectionEncrypters: [noise()],
    services: {
      identify: identify(),
      ping: ping(),
      relay: circuitRelayServer({
        reservations: {
          defaultDataLimit: BigInt(131072 * 10),
          applyDefaultLimit: false,
          maxReservations: 500,
          defaultDurationLimit: 25 * 60 * 1000
        }
      })
    }
  });

  node.addEventListener("peer:connect", () => {
    console.log("peer:connect");
    console.log("PEERS ON NODE:", node.getPeers());
  });

  node.addEventListener("peer:disconnect", () => {
    console.log("peer:disconnect");
    console.log("PEERS ON NODE:", node.getPeers());
  });

  await node.start();

  console.log("Node started with ID:", node.peerId.toString());
  console.log(
    "Node listening on:",
    node.getMultiaddrs().map(addr => addr.toString())
  );
})();
