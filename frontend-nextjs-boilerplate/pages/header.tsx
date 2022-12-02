import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Account from "../components/Account";
import { useRouter } from "next/router";
import useEagerConnect from "../hooks/useEagerConnect";
import Link from "next/link";
import { Typography } from "@mui/material";

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
                    {/* <Link href="/">
            <a>LimeAcademy-boilerplate</a>
          </Link> */}
                    <Link href={`/transfer`} prefetch={isConnected}>
                        Transfer
                    </Link>
                    <Link href={`/claim`} prefetch={isConnected}>
                        Claim
                    </Link>

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
                    justify-content: space-between;
                }

                main {
                    text-align: center;
                }
            `}</style>
        </div>
    );
}

export default Header;
