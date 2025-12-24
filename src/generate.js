import { generateKeyPair } from "@libp2p/crypto/keys";
import { toString as uint8ArrayToString } from "uint8arrays/to-string";

(async function () {
  const privateKey = await generateKeyPair("Ed25519");
  const privKey = uint8ArrayToString(privateKey.raw, "base64pad");
  console.log(privKey);
})();
