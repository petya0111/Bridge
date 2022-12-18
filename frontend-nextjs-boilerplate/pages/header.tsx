import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Account from "../components/Account";
import { useRouter } from "next/router";
import useEagerConnect from "../hooks/useEagerConnect";
import Link from "next/link";
import { Button, Typography } from "@mui/material";

function Header() {
    const router = useRouter();

    const { account, library } = useWeb3React();

    const triedToEagerConnect = useEagerConnect();

    const isConnected = typeof account === "string" && !!library;

    return (
        <div>
            <Head>
                <title>LimeAcademyBridge</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header>
                <nav>
                    <Button>
                        <Link href={`/transfer`}>Transfer</Link>
                    </Button>
                    <Button>
                        <Link href={`/claim`}>Claim</Link>
                    </Button>
                    {/* {Number(connectedChain.id) != 80001 ? (
                        <Button
                            onClick={async () => {
                                await setChain({ chainId: "0x13881" }); // hexadecimal mumbai network
                            }}
                        >
                            Change to Mumbai
                        </Button>
                    ) : (
                        <Button
                            onClick={async () => {
                                await setChain({ chainId: "0x5" }); // hexadecimal goerli network
                            }}
                        >
                            Change to Goerli
                        </Button>
                    )} */}

                    <Account triedToEagerConnect={triedToEagerConnect} />
                </nav>
            </header>
            <main>
                {!isConnected && (
                    <div>
                        <Typography variant="h2">Not connected</Typography>
                    </div>
                )}
            </main>

            <style jsx>{`
                nav {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    box-shadow: 0 0 8px black;
                }

                main {
                    text-align: center;
                }
            `}</style>
        </div>
    );
}

export default Header;
