import { Dashboard } from "../pages/Investor/Dashboard";
import { Community } from "../pages/Investor/Community";
import { Collaborate } from "../pages/Investor/Collaborate";
import { Startup } from "../pages/Investor/Startup";
import { Wallet } from "../pages/Investor/Wallet";
import { StartupDetails } from "../pages/Details/StartupDetails";
import DataRoom from "../pages/Details/DataRoom";
import { IdeaPad } from "../pages/Details/IdeaPad";



export const InvestorRoutes = [
    {
        path: "/dashboard/investor",
        element: <Dashboard/>
    },
    {
        path: "/investor/collaborate",
        element: <Collaborate/>
    },
    {
        path: "/investor/community",
        element: <Community/>
    },
    {
        path: "/investor/startup",
        element: <Startup/>
    },
    {
        path: "/investor/wallet",
        element: <Wallet/>
    },
    {
        path: "/startup-details",
        element: <StartupDetails/>
    },
    {
        path: "/startup/dataroom",
        element: <DataRoom/>
    },
    {
        path: "/startup/dataroom/:id",
        element: <IdeaPad/>
    }
]
