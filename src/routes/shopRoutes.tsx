import {Dashboard} from '../pages/Shopper/Dashboard'
import Shop from '../pages/Shopper/Shop';
import { ProductCategory } from '../pages/Shopper/ProductCategory';
import { ProductsShop } from '../pages/Shopper/ProductsShop'
import { ServicesCategory } from '../pages/Shopper/ServicesCategory';
import { ServicesShop } from '../pages/Shopper/ServicesShop';

export const ShopRoutes = [
    {
        path: "/dashboard/shopper",
        element: <Dashboard/>
    },
    {
        path: "/marketplace/shopper",
        element: <Shop/>
    },
    {
        path: "/marketplace/services",
        element: <ServicesCategory/>
    },
    {
        path: "/marketplace/products",
        element: <ProductCategory/>
    },
    {
        path: "/shops/products",
        element: <ProductsShop/>
    },
    {
        path: "/shops/services",
        element: <ServicesShop/>
    }
]
