import BOOK_LIBRARY_ABI from "../contracts/BookLibraryContract.json";
import type { BookLibraryContract } from "../contracts/types";
import useContract from "./useContract";

export default function useBookLibraryContract(contractAddress?: string) {
  return useContract<BookLibraryContract>(contractAddress, BOOK_LIBRARY_ABI);
}
