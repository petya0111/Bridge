import { Web3Context } from "../pages/_app";
import { useContext, useState } from "react";
import {
    Box,
    Button,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
const TableClaim = ({ mockData }) => {
    const { state, dispatch } = useContext(Web3Context);
    const [open, setOpen] = useState<boolean | undefined>(false);
    const [modalData, setModalData] = useState(null);

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
        <div>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>From</TableCell>
                            <TableCell align="right">To</TableCell>
                            <TableCell align="right">Token</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockData.map((row) => (
                            <TableRow key={row.idx}>
                                <TableCell component="th" scope="row">
                                    {row.sourceNetwork}
                                </TableCell>
                                <TableCell align="right">
                                    {row.targetNetwork}
                                </TableCell>
                                <TableCell align="right">
                                    {row.tokenName}
                                </TableCell>
                                <TableCell align="right">
                                    {row.amount}
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        onClick={() => {
                                            setModalData(row);
                                            setOpen(true);
                                        }}
                                        disabled={row.claimed}
                                    >
                                        Claim
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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
                                Please Confirm
                            </Typography>
                            <p>Are you sure you want to Claim Your Token: </p>
                            <p>Source Chain: {modalData?.sourceNetwork}</p>
                            <p>Target Chain: {modalData?.targetNetwork}</p>
                            <p>
                                Token: {modalData?.amount}{" "}
                                {modalData?.tokenName}
                            </p>
                            <div className="btns-confirm-cancel">
                                <Button
                                    onClick={() => {
                                        if (!state.fetching) setOpen(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button>Confirm</Button>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </TableContainer>
            <style jsx>{`
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

export default TableClaim;
