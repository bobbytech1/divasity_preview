import { Routes, Route } from 'react-router-dom';
import { OnboardingWrapper } from '../components/Onboarding/OnboardingWrapper.tsx'; 
import {Category} from '../pages/Client/Category.tsx';
import { CategoryContd } from '../pages/Client/CategoryContd.tsx';
import { Investor } from '../pages/Client/Investor.tsx';
import { Shopper } from '../pages/Client/Shopper.tsx';
import {Signup} from '../pages/Client/Signup.tsx';
import {Login} from '../pages/Client/Login.tsx';
import { Layout } from '../components/Layout/Layout.tsx';
import { BusinessRoutes } from './businessRoutes.tsx';
import { AddProducts } from '../pages/Client/AddProducts.tsx';
import { AddTeam } from '../pages/Client/AddTeam.tsx';
import { AddTeamShop } from '../pages/Client/AddTeamShop.tsx';
import { ShopperLayout } from '../components/Layout/ShopperLayout.tsx';
import { InvestorLayout } from '../components/Layout/InvestorLayout.tsx';
import { AddTeamBusiness } from '../pages/Client/AddTeamBusiness.tsx';
import { InvestorRoutes } from './investorRoutes.tsx';
import { ShopRoutes } from './shopRoutes.tsx';


export function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<OnboardingWrapper/>}/>
        <Route path="/signin" element={<Login/>}/>
        <Route path="/register" element={<Signup />} />
        <Route path="/nextstep" element={<Category />} />
        <Route path="/nextstep/:categoryName" element={<CategoryContd />} />
        <Route path="/confirmation/business/addteam" element={<AddTeamBusiness />} />
        <Route path="/shopper/:categoryName" element={<Shopper />} />
        <Route path="/shopper/addproducts" element={<AddProducts />} />
        <Route path="/confirmation/shop/addteam" element={<AddTeam />} />
        <Route path="/investor/:categoryName" element={<Investor />} />
        <Route path="/confirmation/investor/addteam" element={<AddTeamShop />} />
        {/* Business routes with MainLayout */}
        <Route element={<Layout />}>
          {BusinessRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        {/* Shopper routes with ShopperLayout */}
       <Route element={<ShopperLayout />}>
          {ShopRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        {/* Investor routes with InvestorLayout */}
        <Route element={<InvestorLayout />}>
          {InvestorRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
    </Routes>
  );
}