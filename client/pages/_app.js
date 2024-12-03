import { Navbar } from "@/components";
import Footer from "@/components/Footer";
import WalletProvider from "@/context/WalletProvider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <WalletProvider>
      <Navbar />
      <div>
        <Component {...pageProps} />
      </div>
      <Footer />
    </WalletProvider>
  );
}
