import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import BOOK_LIBRARY_ABI from "../contracts/BridgeBase.json";
import type { BridgeBase } from "../contracts/types";
import useContract from "./useContract";

export default function useBridgeContract() {
  const { chainId, account, library } = useWeb3React<Web3Provider>();
  let contractAddress;
  if(chainId === 5){
    contractAddress = "0x9B294b82Bb76fa14dA7D780f02eAe4Aa43e2E8C7";
  } else if(chainId === 80001) {
    contractAddress = "0xA0fd683E6c853985CcC4B52cb349fD32Fe05cE90";
  }
  return useContract<BridgeBase>(contractAddress, BOOK_LIBRARY_ABI);
}
