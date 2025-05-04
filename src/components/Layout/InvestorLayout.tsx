import {Outlet} from "react-router-dom"
import { TabBarInvestor } from "../Header/TabBarInvestor"
export function InvestorLayout(){
    return (
        <div>
            <main>
                <Outlet/>
            </main>
            <TabBarInvestor/>
        </div>
    )
}