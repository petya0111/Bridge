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
export const ALBT_TOKEN_ADDRESS = "0xc6869a93ef55e1d8ec8fdcda89c9d93616cf0a72";
export const US_ELECTION_ADDRESS = "0x3ba399eCa9CdAe82675CAEa7bb422d5659ea7fe3";
export const BOOK_LIBRARY_ADDRESS =
    "0x7E5dcB0591Ac49B9daBEc572AaeC0A705115B92D";
