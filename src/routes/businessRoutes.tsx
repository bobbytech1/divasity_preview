import {Dashboard} from '../pages/Customer/Dashboard'
import { Marketplace } from '../pages/Customer/Marketplace'
import { DataRoom } from '../pages/Customer/DataRoom'
import { Wallets } from '../pages/Customer/Wallet'
import { Posts } from '../pages/Customer/Posts'
import { IdeaPad } from '../pages/Customer/IdeaPad'

export const BusinessRoutes = [
    {
        path: "/dashboard",
        element: <Dashboard/>
    },
    {
        path: "/store",
        element: <Marketplace/>
    },
    {
        path: "/dataroom",
        element: <DataRoom/>
    },
    {
        path: "/wallet",
        element: <Wallets/>
    },
    {
        path: "/more",
        element: <Posts/>
    },
    {
        path: "/ideapad",
        element: <IdeaPad/>
    }
]
