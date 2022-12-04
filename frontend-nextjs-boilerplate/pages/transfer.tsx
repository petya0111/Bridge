import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Web3Context } from "./_app";
import { useContext, useState, useEffect, useCallback } from "react";

import {
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
} from "@mui/material";
import { Box } from "@mui/system";
import useBridgeContract from "../hooks/useBridgeContract";
import useETHWrapperContract from "../hooks/useETHWrapperContract";
import useTokenBalance from "../hooks/useTokenBalance";
import useERC20TokenContract from "../hooks/useERC20TokenContract";
type BookContract = {
    contractAddress: string;
};

const transfer = () => {
    const { state, dispatch } = useContext(Web3Context);
    const { chainId, account, library } = useWeb3React<Web3Provider>();
    const brdigeContract = useBridgeContract();
    const token = useTokenBalance(account, "");
    const ethWrapperContract = useETHWrapperContract(
        chainId == (5 ?? 5)
            ? ETH_WRAPPER_GOERLI_ADDRESS
            : ETH_WRAPPER_MUMBAI_ADDRESS
    );
    const [currentToken, setCurrentToken] = useState("");
    const ercTokenContract = useERC20TokenContract(chainId == (5 ?? 5)
    ? ERC20_TOKEN_GOERLI_ADDRESS
    : ERC20_TOKEN_MUMBAI_ADDRESS);
    const [open, setOpen] = useState<boolean | undefined>(false);
    const options = ["WETH", "ERC20"];
    const [modalData, setModalData] = useState(null);
    const [presentedTokens, setPresentedTokens] = useState([]);

    useEffect(() => {
        checkPresentedTokens();
    }, [chainId, currentToken]);

    const checkPresentedTokens = async () => {
        const tokens = await ethWrapperContract?.getAllTokenIds();
        if (tokens?.length > 0) {
            let arr = [];
            for (let t of tokens) {
                const sym = await ercTokenContract?.getTokenSymbol(t);
                console.log(sym, "sym");
                arr.push(sym);
            }
            setPresentedTokens(arr);
        }
        console.log(tokens);
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
        amount: 0,
    };
    const [inputData, setInputData] = useState(inputObject);

    const style = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
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
                                    setCurrentToken(value);
                                    inputData.tokenNameOrAddress = value;
                                }
                            }}
                            sx={{ width: 450 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Choose token"
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
                            onChange={(e) => {
                                if (e.target.value !== undefined) {
                                    inputData.tokenNameOrAddress =
                                        e.target.value;
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
                <Button>Approve</Button>
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
                                variant="h6"
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
                                    onClick={() => {
                                        if (!state.fetching) setOpen(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => {
                                        // console.log("modaldata", modalData);
                                    }}
                                >
                                    Confirm
                                </Button>
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
