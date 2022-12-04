
import IERC20_ABI from "../contracts/IERC20.json";
import {  IERC20 } from "../contracts/types";
import useContract from "./useContract";

export default function useIERC20TokenContract(tokenAddress) {
  return useContract<IERC20>(tokenAddress, IERC20_ABI);
}
