import Head from "next/head";
import { Lato, Montserrat } from "next/font/google";
import Results from "@/components/results";
import Header from "@/components/header";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Girraphic Media Information System</title>
        <meta name="description" content="Girraphic Media Information System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`dark ${montserrat.variable} ${lato.variable}`}>
        <Header />
        <Results />
      </main>
    </>
  );
}
