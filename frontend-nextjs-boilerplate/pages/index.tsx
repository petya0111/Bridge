import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import NativeCurrencyBalance from "../components/NativeCurrencyBalance";
import TokenBalance from "../components/TokenBalance";
import { useRouter } from "next/router";
import { ALBT_TOKEN_ADDRESS } from "../constants";
import useEagerConnect from "../hooks/useEagerConnect";
import Header from "./header";
import Link from "next/link";

function Home() {
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
            <Header></Header>
            <main>
                <section>
                    <NativeCurrencyBalance />

                    <TokenBalance
                        tokenAddress={ALBT_TOKEN_ADDRESS}
                        symbol="ALBT"
                    />
                    <div>
                        <h1>
                            This is{" "}
                            <a href="https://github.com/petya0111/Bridge">
                                ERC20 Token Bridge
                            </a>{" "}
                        </h1>
                        <h4>
                            You can use this bridge to transfer tokens between
                            EVM based networks
                        </h4>
                        <h2>Start Bridging</h2>
                        <Link href="/transfer" prefetch={isConnected}>
                            <button>Transfer</button>
                        </Link>
                    </div>
                </section>
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

export default Home;
