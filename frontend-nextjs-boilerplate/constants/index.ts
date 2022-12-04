export interface Networks {
    [key: number]: string;
}
export const walletConnectSupportedNetworks: Networks = {
    // Add your network rpc URL here
    1: "https://ethereumnode.defiterm.io",
    3: "https://ethereumnode.defiterm-dev.net",
    5: "https://eth-goerli.g.alchemy.com/v2/cSdN5NKZvLG6YDW9cXYHf_oKbeUywY7_",
    80001: "https://matic-mumbai.chainstacklabs.com",
};

// Network chain ids
export const supportedMetamaskNetworks = [1, 3, 4, 5, 42, 80001];
export const supportedChains = [
    { chainId: 5, name: "Goerli", idx: 0 },
    { chainId: 80001, name: "Mumbai", idx: 1 },
];
export const ETH_WRAPPER_GOERLI_ADDRESS =
    "0x0A6779139cba89a49E332C52d2DA8A75068A1a30";
export const ETH_WRAPPER_MUMBAI_ADDRESS =
    "0x177484CF0de138b01B7Ae5abE7651B02dA4B450e";
export const ERC20_TOKEN_GOERLI_ADDRESS =
    "0xF583120B6aF3e70062Eb962F66243378b859A3Bc";
export const ERC20_TOKEN_MUMBAI_ADDRESS =
    "0x65FEEe1E7AfC554D2aCe534ed8D02635a444FE46";
export const ALBT_TOKEN_ADDRESS = "0xc6869a93ef55e1d8ec8fdcda89c9d93616cf0a72";
export const BRIDGE_GOERLI_ADDRESS =
    "0x9B294b82Bb76fa14dA7D780f02eAe4Aa43e2E8C7";
export const BRIDGE_MUMBAI_ADDRESS =
    "0xA0fd683E6c853985CcC4B52cb349fD32Fe05cE90";
