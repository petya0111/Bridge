
import ERC20_Token_ABI from "../contracts/ERC20Token.json";
import type {  ERC20Token } from "../contracts/types";
import useContract from "./useContract";

export default function useERC20TokenContract(contractAddress) {
  return useContract<ERC20Token>(contractAddress, ERC20_Token_ABI);
}
