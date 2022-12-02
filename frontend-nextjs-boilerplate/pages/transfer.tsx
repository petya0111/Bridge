import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Web3Context } from "./_app";
import { useContext, useState, useEffect, useCallback } from "react";
import useBookLibraryContract from "../hooks/useBookLibraryContract";
import { BOOK_LIBRARY_ADDRESS } from "../constants";
import { useRouter } from "next/router";
import Header from "./header";
import {
    Autocomplete,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";

type BookContract = {
    contractAddress: string;
};

const transfer = () => {
    const { state, dispatch } = useContext(Web3Context);
    const router = useRouter();
    const [open, setOpen] = useState<boolean | undefined>(false);
    const options = ["WETH", "ERC20"];
    useEffect(() => {    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                                    // value={age}
                                    label="Age"
                                    // onChange={handleChange}
                                >
                                    <MenuItem value={10}>Goerli</MenuItem>
                                    <MenuItem value={20}>Mumbai</MenuItem>
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
                            options={options}
                            sx={{ width: 300 }}
                            renderInput={(params) => (
                                <TextField {...params} label="Token" />
                            )}
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
                        />
                    </div>
                </div>
            </div>
            <div className="buttons-approve-transfer">
                <Button>Approve</Button>
                <Button onClick={handleOpen}>Transfer</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
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
                        <p>Source Chain: Goerli</p>
                        <p>Target Chain: Mumbai</p>
                        <p>Token: 123 DAI</p>
                        <div className="btns-confirm-cancel">
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button>Confirm</Button>
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
                    margin: 100px 0;
                }
                .buttons-approve-transfer {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                }
                .network-box {
                    width: 700px;
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
                    align-items:center;
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
