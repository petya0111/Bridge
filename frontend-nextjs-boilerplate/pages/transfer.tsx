import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Web3Context } from "./_app";
import { useContext, useState, useEffect, useCallback } from "react";

import {
    BRIDGE_GOERLI_ADDRESS,
    BRIDGE_MUMBAI_ADDRESS,
    ERC20_TOKEN_GOERLI_ADDRESS,
    ERC20_TOKEN_MUMBAI_ADDRESS,
    ETH_WRAPPER_GOERLI_ADDRESS,
    ETH_WRAPPER_MUMBAI_ADDRESS,
    supportedChains,
} from "../constants";
import { useRouter } from "next/router";
import Header from "./header";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Autocomplete,
    TextField,
    Typography,
    Stack,
    Link,
    LinearProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import useBridgeContract from "../hooks/useBridgeContract";
import useETHWrapperContract from "../hooks/useETHWrapperContract";
import useERC20TokenContract from "../hooks/useERC20TokenContract";
import { ethers } from "ethers";
import { formatEtherscanLink, parseBalance } from "../util";

const transfer = () => {
    const { state, dispatch } = useContext(Web3Context);
    const { chainId, account, library } = useWeb3React<Web3Provider>();
    const bridgeAddress =
        chainId == 5 ?? 5 ? BRIDGE_GOERLI_ADDRESS : BRIDGE_MUMBAI_ADDRESS;
    const ethWAddress =
        chainId == 5 ?? 5
            ? ETH_WRAPPER_GOERLI_ADDRESS
            : ETH_WRAPPER_MUMBAI_ADDRESS;
    const erc20Address =
        chainId == 5 ?? 5
            ? ERC20_TOKEN_GOERLI_ADDRESS
            : ERC20_TOKEN_MUMBAI_ADDRESS;
    const brdigeContract = useBridgeContract(bridgeAddress);
    const ethWrapperContract = useETHWrapperContract(ethWAddress);
    const ercTokenContract = useERC20TokenContract(erc20Address);
    const [open, setOpen] = useState<boolean | undefined>(false);
    const [modalData, setModalData] = useState(null);
    const [presentedTokens, setPresentedTokens] = useState([]);
    const [tokenAddressSymMap, setTokenAddressSymMap] = useState(null);

    useEffect(() => {
        checkPresentedTokens();
    }, [chainId]);

    const checkPresentedTokens = async () => {
        const tokens = await ethWrapperContract?.getAllTokenIds();
        if (tokens?.length > 0) {
            let tokenMap = new Map();
            let arr = [];
            for (let t of tokens) {
                const sym = await ercTokenContract?.getTokenSymbol(t);
                tokenMap.set(sym, t);
                arr.push(sym);
            }
            setTokenAddressSymMap(tokenMap);
            setPresentedTokens(arr);
        }
    };

    const lockToken = async () => {
        console.log(modalData);
        dispatch({ type: "transfermodalfetching" });
        try {
            dispatch({ type: "transfermodalfetching" });
            const approve = await ercTokenContract.approve(
                bridgeAddress,
                inputData.amount
            );
            dispatch({
                type: "transfermodalfetching",
                transactionHash: approve.hash,
            });
            const approveReceipt = await approve.wait();
            if (approveReceipt.status === 1) {
                const tx = await brdigeContract.lockToken(
                    targetChain.chainId,
                    modalData.tokenAddress,
                    modalData.amount,
                    { value: ethers.utils.parseEther("0.005") }
                );
                dispatch({
                    type: "transfermodalfetching",
                    transactionHash: tx.hash,
                });
                const transactionReceipt = await tx.wait();
                if (transactionReceipt.status === 1) {
                    dispatch({
                        type: "fetched",
                        messageType: "success",
                        message: `Locked token from bridge ${modalData.tokenNameOrAddress}`,
                    });
                } else {
                    dispatch({
                        type: "transfermodalfetched",
                        messageType: "error",
                        message: JSON.stringify(transactionReceipt),
                    });
                }
            }
        } catch (e) {
            dispatch({
                type: "transfermodalfetched",
                messageType: "error",
                message: JSON.stringify(e.error?.message),
            });
        }
    };

    const approveToken = async () => {
        dispatch({ type: "fetching" });
        try {
            dispatch({ type: "fetching" });
            const approve = await ercTokenContract.approve(
                account,
                inputData.amount
            );
            dispatch({ type: "fetching", transactionHash: approve.hash });
            const approveReceipt = await approve.wait();
            if (approveReceipt.status === 1) {
                const mint = await ercTokenContract.mint(
                    bridgeAddress,
                    modalData.amount
                );
                dispatch({ type: "fetching", transactionHash: mint.hash });
                const mintReceipt = await mint.wait();
                if (mintReceipt.status === 1) {
                    dispatch({
                        type: "fetched",
                        messageType: "success",
                        message: `Minted token ${modalData.tokenNameOrAddress}`,
                    });
                } else {
                    dispatch({
                        type: "fetched",
                        messageType: "error",
                        message: JSON.stringify(mintReceipt),
                    });
                }
            }
        } catch (e) {
            dispatch({
                type: "fetched",
                messageType: "error",
                message: JSON.stringify(e.error?.message),
            });
        }
    };

    const sourceChain = supportedChains.find(
        (chain) => chain.chainId == chainId
    );
    const targetChain = supportedChains.find(
        (chain) => chain.chainId != chainId
    );
    let inputObject = {
        sourceNetwork: "Source Network",
        targetNetwork: "Target Network",
        tokenNameOrAddress: "0x000",
        tokenAddress: "0x",
        amount: 0,
    };
    const [inputData, setInputData] = useState(inputObject);

    const style = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 1200,
        bgcolor: "white",
        bowShadow: "0 0 8px black",
        p: 4,
    };

    return (
        <div className="results-form">
            <Header></Header>
            <div className="dropdowns">
                <div className="network-box">
                    <div>Choose network to bridge to:</div>
                    <div>
                        <Box sx={{ minWidth: 150 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Network
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={targetChain?.idx}
                                    label="Network"
                                >
                                    {supportedChains.map((chain) => {
                                        return (
                                            <MenuItem
                                                key={chain?.name}
                                                disabled={
                                                    chain.chainId == chainId
                                                }
                                                value={chain.idx}
                                            >
                                                {chain.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </div>
                <div className="network-box">
                    <div>Choose Token/Address:</div>
                    <div>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={presentedTokens}
                            onChange={(event, value) => {
                                if (value !== undefined) {
                                    inputData.tokenNameOrAddress = value;
                                    inputData.tokenAddress =
                                        tokenAddressSymMap.get(value);
                                }
                            }}
                            sx={{ width: 250 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Choose existing token"
                                    variant="outlined"
                                />
                            )}
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-basic"
                            label="Manually add Token Address"
                            variant="outlined"
                            sx={{ width: 250 }}
                            onChange={(e) => {
                                if (e.target.value !== undefined) {
                                    inputData.tokenNameOrAddress =
                                        e.target.value;
                                    inputData.tokenAddress = e.target.value;
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="network-box">
                    <div>Choose Amount:</div>
                    <div>
                        <TextField
                            id="outlined-basic"
                            label="Amount"
                            variant="outlined"
                            onChange={(e) => {
                                if (e.target.value !== undefined) {
                                    inputData.amount = Number(e.target.value);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="buttons-approve-transfer">
                <Button onClick={approveToken}>Approve</Button>
                <Button
                    onClick={() => {
                        setOpen(true);
                        inputData.sourceNetwork = sourceChain.name;
                        inputData.targetNetwork = targetChain.name;
                        setModalData(inputData);
                    }}
                >
                    Transfer
                </Button>
                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div className="please-confirm">
                            <Typography
                                id="modal-modal-title"
                                variant="h3"
                                component="h2"
                            >
                                Please confirm
                            </Typography>
                            <p>Are you sure you want to bridge: </p>
                            <p>Source Chain: {modalData?.sourceNetwork}</p>
                            <p>Target Chain: {modalData?.targetNetwork}</p>
                            <p>
                                Token: {modalData?.amount}{" "}
                                {modalData?.tokenNameOrAddress}
                            </p>
                            <div className="btns-confirm-cancel">
                                <Button
                                    disabled={state.transfermodalfetching}
                                    onClick={() => {
                                        if (!state.fetching) setOpen(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    disabled={state.transfermodalfetching}
                                    onClick={lockToken}
                                >
                                    Confirm
                                </Button>
                            </div>
                            <div>
                                {state.transfermodalfetching && (
                                    <Box>
                                        <Stack
                                            spacing={5}
                                            justifyContent="center"
                                            alignContent="center"
                                            alignItems="center"
                                        >
                                            {state.transactionHash && (
                                                <Box>
                                                    <Typography>
                                                        Waiting transation to be
                                                        mined...
                                                    </Typography>
                                                    <Link
                                                        variant="h5"
                                                        href={formatEtherscanLink(
                                                            "Transaction",
                                                            [
                                                                chainId,
                                                                state.transactionHash,
                                                            ]
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
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>

            <style jsx>{`
                .results-form {
                    display: flex;
                    flex-direction: column;
                }
                .dropdowns {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin: 50px 0;
                }
                .buttons-approve-transfer {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                }
                .network-box {
                    width: 1200px;
                    height: 100px;
                    margin: 20px 0;
                    text-align: center;
                    box-shadow: 0 0 8px black;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 20px;
                }
                .please-confirm {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                .btns-confirm-cancel {
                    display: flex;
                    justify-content: space-between;
                }
            `}</style>
        </div>
    );
};

export default transfer;
