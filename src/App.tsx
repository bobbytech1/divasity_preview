import { ConnectButton } from "@iota/dapp-kit";
// import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import { WalletStatus } from "./WalletStatus";

function App() {
  return (
    <>

      <div className="bg-white pt-18 px-5">
        <div className="border border-gray-700 border-dotted flex flex-col justify-center items-center py-10 rounded-[10px]">
        <div className="pb-4">
          <WalletStatus />
        </div>
        <div>
          <ConnectButton style={{ backgroundColor: "#8A0C86", paddingRight: "50px", paddingLeft: "50px", paddingTop: "15px", paddingBottom: "15px", borderRadius: "5px", fontSize: "20px", color: "white"}} />
        </div>
        </div>



      </div>

    </>
  );
}

export default App;
