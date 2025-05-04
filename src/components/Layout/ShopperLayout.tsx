import {Outlet} from "react-router-dom"
import { TabBarShopper } from "../Header/TabBarShopper"
export function ShopperLayout(){
    return (
        <div>
            <main>
                <Outlet/>
            </main>
            <TabBarShopper/>
        </div>
    )
}