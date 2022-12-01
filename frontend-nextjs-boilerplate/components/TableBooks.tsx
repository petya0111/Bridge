import { Web3Context } from "../pages/_app";
import { useContext } from "react";
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

const TableBooks = ({ books, bookLibraryContract, getBooksFunction }) => {
    const { state, dispatch } = useContext(Web3Context);
    const rentBook = async (id) => {
        dispatch({ type: "fetching" });
        try {
            const tx = await bookLibraryContract.borrowBook(id);
            dispatch({ type: "fetching", transactionHash: tx.hash });
            const transactionReceipt = await tx.wait();
            if (transactionReceipt.status === 1) {
                dispatch({
                    type: "fetched",
                    messageType: "success",
                    message: `Borrowed book from library.`,
                });
                getBooksFunction();
            } else {
                dispatch({
                    type: "fetched",
                    messageType: "error",
                    message: JSON.stringify(transactionReceipt),
                });
            }
            getBooksFunction();
        } catch (e) {
            dispatch({
                type: "fetched",
                messageType: "error",
                message: JSON.stringify(e.error.message),
            });
        }
    };

    const returnBook = async (id) => {
        dispatch({ type: "fetching" });
        try {
            const tx = await bookLibraryContract.returnBook(id);
            dispatch({ type: "fetching", transactionHash: tx.hash });
            const transactionReceipt = await tx.wait();
            if (transactionReceipt.status === 1) {
                dispatch({
                    type: "fetched",
                    messageType: "success",
                    message: `Returned book to library.`,
                });
                getBooksFunction();
            } else {
                dispatch({
                    type: "fetched",
                    messageType: "error",
                    message: JSON.stringify(transactionReceipt),
                });
            }
            getBooksFunction();
        } catch (e) {
            dispatch({
                type: "fetched",
                messageType: "error",
                message: JSON.stringify(e.error.message),
            });
        }
    };

    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Copies</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.copies}</TableCell>
                            {row.rented ? (
                                <TableCell align="right">
                                    <IconButton
                                        onClick={() => {
                                            returnBook(row.id);
                                        }}
                                    >
                                        return
                                        <KeyboardReturnIcon />
                                    </IconButton>
                                </TableCell>
                            ) : (
                                <TableCell align="right">
                                    <IconButton
                                        onClick={() => {
                                            rentBook(row.id);
                                        }}
                                    >
                                        rent
                                        <LibraryBooksIcon />
                                    </IconButton>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableBooks;
