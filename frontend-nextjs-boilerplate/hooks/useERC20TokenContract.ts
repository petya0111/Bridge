import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import BOOK_LIBRARY_ABI from "../contracts/BridgeBase.json";
import type {  ERC20Token, ETHWrapperContract, TokenLedger } from "../contracts/types";
import useContract from "./useContract";

export default function useERC20TokenContract() {
  const { chainId, account, library } = useWeb3React<Web3Provider>();
  let contractAddress;
  if(chainId === 5){
    contractAddress = "0xE5E8CbE8080d7414a0Db72F28942B3feBc8a745e";
  } else if(chainId === 80001) {
    contractAddress = "0xf4DBb2292D6893CD84aE3Dfe94539A0e74A54BF2";
  }
  return useContract<ERC20Token>(contractAddress, BOOK_LIBRARY_ABI);
}
