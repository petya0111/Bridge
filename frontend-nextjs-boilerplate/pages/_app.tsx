import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import React, { createContext, useReducer, useState } from "react";
import getLibrary from "../getLibrary";
import "../styles/globals.css";
import { Contract } from "ethers";
import { ALBT_TOKEN_ADDRESS, BOOK_LIBRARY_ADDRESS } from "../constants";
import {
    Alert,
    AlertColor,
    Box,
    LinearProgress,
    Link,
    Snackbar,
    Stack,
    Typography,
    Grid,
    Tab,
} from "@mui/material";
import { formatEtherscanLink } from "../util";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ConnectButton from "../components/ConnectButton";
import TransferPage from "../components/TransferPage";
import ClaimPage from "../components/ClaimPage";

export interface Web3State {
    connected: boolean;
    address: string;
    fetching: boolean;
    contract?: Contract;
    transactionHash?: string;
    message?: string;
    messageType?: AlertColor;
    provider?: any;
    web3Provider?: any;
}

export type Web3Action =
    | {
          type: "connected";
          address: string;
          contract: Contract;
          provider: any;
          web3Provider: any;
      }
    | {
          type: "addressChange";
          address: string;
      }
    | { type: "changeNetwork" }
    | { type: "fetching"; transactionHash?: string }
    | { type: "fetched"; messageType?: AlertColor; message?: string }
    | { type: "removeMessage" };

const initialState: Web3State = {
    fetching: false,
    connected: false,
    address: "",
};

function web3Reducer(state: Web3State, action: Web3Action): Web3State {
    switch (action.type) {
        case "connected": {
            return {
                ...state,
                connected: true,
                address: action.address,
                contract: action.contract,
                provider: action.provider,
                web3Provider: action.web3Provider,
            };
        }
        case "fetching": {
            return {
                ...state,
                fetching: true,
                transactionHash: action.transactionHash,
            };
        }
        case "fetched": {
            return {
                ...state,
                fetching: false,
                message: action.message,
                messageType: action.messageType,
            };
        }
        case "changeNetwork": {
            return {
                ...state,
                messageType: "error",
                message: "Please change to goerli or mumbai network",
            };
        }
        case "removeMessage": {
            return { ...state, messageType: undefined, message: undefined };
        }
        case "addressChange": {
            return { ...state, address: action.address };
        }
    }
}

export const Web3Context = createContext<{
    state: Web3State;
    dispatch: React.Dispatch<Web3Action>;
}>({ state: initialState, dispatch: () => {} });

function NextWeb3App({ Component, pageProps }: AppProps) {
    const [state, dispatch] = useReducer(web3Reducer, initialState);
    const [openState, setOpenState] = useState(false);
    const [activeTab, setActiveTab] = useState("1");

    return (
        <Web3Context.Provider value={{ state, dispatch }}>
            <Web3ReactProvider getLibrary={getLibrary}>
                <TabContext value={activeTab}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <TabList
                                variant="fullWidth"
                                onChange={(_, n) => setActiveTab(n)}
                            >
                                <Tab
                                    disabled={state.fetching}
                                    label="Transfer"
                                    value="1"
                                />
                                <Tab
                                    disabled={state.fetching}
                                    label="Claim"
                                    value="2"
                                />
                            </TabList>
                        </Grid>
                        <Grid
                            container
                            justifyContent="center"
                            alignContent="center"
                            item
                            xs={4}
                        >
                            {!state.connected ? (
                                <ConnectButton />
                            ) : (
                                <Link
                                    href={`https://goerli.etherscan.io/address/${state.address}`}
                                    target="_blank"
                                    color="inherit"
                                    noWrap
                                >
                                    {state.address}
                                </Link>
                            )}
                        </Grid>
                    </Grid>

                    {state.fetching && (
                        <Box
                            style={{
                                position: "absolute",
                                bottom: 10,
                                width: "100%",
                            }}
                        >
                            <Stack
                                spacing={5}
                                justifyContent="center"
                                alignContent="center"
                                alignItems="center"
                            >
                                {state.transactionHash && (
                                    <Box>
                                        <Typography>
                                            Waiting transation to be mined...
                                        </Typography>
                                        <Link
                                            variant="h5"
                                            href={formatEtherscanLink(
                                                "Transaction",
                                                [5, state.transactionHash]
                                            )}
                                            target="_blank"
                                        >
                                            {state.transactionHash}
                                        </Link>
                                    </Box>
                                )}
                                <LinearProgress
                                    sx={{
                                        width: "200px",
                                    }}
                                />
                            </Stack>
                        </Box>
                    )}
                    {state.connected ? (
                        <>
                            <TabPanel value="1">
                                <TransferPage
                                    disabled={state.fetching}
                                    {...pageProps}
                                    contractAddress={BOOK_LIBRARY_ADDRESS}
                                />
                            </TabPanel>
                            <TabPanel value="2">
                                <ClaimPage
                                    disabled={state.fetching}
                                    {...pageProps}
                                    contractAddress={BOOK_LIBRARY_ADDRESS}
                                />
                            </TabPanel>
                        </>
                    ) : (
                        <Box
                            sx={{
                                height: "calc(100vh - 64px)",
                                display: "flex",
                                justifyContent: "center",
                                alignContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <div>
                                <Typography variant="h2">
                                    Not connected
                                </Typography>
                                <h1>
                                    This is{" "}
                                    <a href="https://github.com/petya0111/Bridge">
                                        ERC20 Token Bridge
                                    </a>{" "}
                                </h1>
                                <h4>
                                    You can use this bridge to transfer tokens
                                    between EVM based networks
                                </h4>
                                <h2>Start Bridging</h2>
                                <Link href="/transfer">
                                    <button>Transfer</button>
                                </Link>
                            </div>
                        </Box>
                    )}
                </TabContext>
            </Web3ReactProvider>
        </Web3Context.Provider>
    );
}

export default NextWeb3App;
