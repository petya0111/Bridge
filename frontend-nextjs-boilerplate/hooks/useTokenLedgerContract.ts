import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import BOOK_LIBRARY_ABI from "../contracts/BridgeBase.json";
import type {  ETHWrapperContract, TokenLedger } from "../contracts/types";
import useContract from "./useContract";

export default function useTokenLedgerContract() {
  const { chainId, account, library } = useWeb3React<Web3Provider>();
  let contractAddress;
  if(chainId === 5){
    contractAddress = "0x744063127BD52c49236F134434d7d65339F71B2C";
  } else if(chainId === 80001) {
    contractAddress = "0xb7fcB4407a440e1caE647408a684d35D1BC478AB";
  }
  return useContract<TokenLedger>(contractAddress, BOOK_LIBRARY_ABI);
}
