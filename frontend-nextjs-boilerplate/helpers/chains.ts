import { IChainData } from "./types";

const supportedChains: IChainData[] = [
  
  {
    name: "Ethereum Görli",
    short_name: "gor",
    chain: "ETH",
    network: "goerli",
    chain_id: 5,
    network_id: 5,
    rpc_url: "https://eth-goerli.g.alchemy.com/v2/cSdN5NKZvLG6YDW9cXYHf_oKbeUywY7_",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Mumbai",
    short_name: "mumbai",
    chain: "ETH",
    network: "mumbai",
    chain_id: 80001,
    network_id: 80001,
    rpc_url: "https://matic-mumbai.chainstacklabs.com",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
];

export default supportedChains;
