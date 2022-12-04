
import BRIDGE_ABI from "../contracts/BridgeBase.json";
import type { BridgeBase } from "../contracts/types";
import useContract from "./useContract";

export default function useBridgeContract(contractAddress) {
  
  return useContract<BridgeBase>(contractAddress, BRIDGE_ABI);
}
