import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import ETHWrapper_ABI from "../contracts/ETHWrapperContract.json";
import type {  ETHWrapperContract } from "../contracts/types";
import useContract from "./useContract";

export default function useETHWrapperContract(contractAddress) {
  
  return useContract<ETHWrapperContract>(contractAddress, ETHWrapper_ABI);
}
