import { Web3Context } from "../pages/_app";
import { useContext, useEffect } from "react";
import Header from "./header";
import TableClaim from "../components/TableClaim";

type BookContract = {
    contractAddress: string;
};

const claim = ({ contractAddress }: BookContract) => {
    const { state, dispatch } = useContext(Web3Context);
    const mockData = [
        {
            sourceNetwork: "Rinkeby",
            targetNetwork: "Ropsten",
            tokenName: "DAI",
            amount: 123,
            claimed: false,
            idx: 0,
        },
        {
            sourceNetwork: "Goerli",
            targetNetwork: "Mumbai",
            tokenName: "DAI",
            amount: 123,
            claimed: true,
            idx: 1,
        },
    ];

    useEffect(() => {}, []);

    return (
        <div className="results-form">
            <Header></Header>
            <div className="table-claim">
                <TableClaim mockData={mockData} />
            </div>

            <style jsx>{`
                .table-claim {
                    margin-top: 50px;
                }
            `}</style>
        </div>
    );
};

export default claim;
