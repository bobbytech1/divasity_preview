// Startup Details
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { ChevronLeft, Star, DollarSign, Tag, ShoppingBag, MessageCircle } from 'lucide-react';
import { CustomButton } from '../../components/Button/CustomButton';

export function StartupDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');
  const logo = queryParams.get('logo');
  const points = queryParams.get('points');
  const industry = queryParams.get('industry');
  const valuation = queryParams.get('valuation');
  const bio = queryParams.get('bio') || "This is a brief description of the startup. More details can be added later.";

  const handleGoBack = () => navigate(-1);

  const handleDataRoom = () => {
    console.log(`Data Room for ${name}`);
    // add real navigation or logic here
    navigate("/startup/dataroom")
  };

  const handleStartupStore = () => {
    console.log(`Startup Store for ${name}`);
    // add real navigation or logic here
  };

  const handleContactStartup = () => {
    console.log(`Contacting ${name}`);
    // add real navigation or logic here
  };

  return (
    <div>
      <Header
        name="Startup Details"
        containerStyle="bg-white h-[7vh]"
        handlePress={handleGoBack}
        textStyle="capitalize"
        icon={<ChevronLeft />}
      />

      <div className="px-5 py-4">
        {/* Logo + Name */}
        <div className="flex flex-col items-center gap-3 text-2xl font-semibold">
          <span className='text-[70px]'>{logo}</span>
          <span className='text-[25px] font-opensans'>{name}</span>
        </div>

        
        <div className="flex justify-between items-center gap-2 text-gray-700 py-2 px-10">
            {/* Points */}
            <div className='flex justify-center items-center gap-2 text-gray-700 pb-2'>
          <Star size={30} color='gold'/>
          <span className='text-[18px] font-opensans'>{points} pts</span>
          </div>
                    {/* Valuation */}
  <div className="flex justify-center items-center gap-2 text-gray-700 pb-2">
    <DollarSign size={30} color='gold'/>
    <span className='text-[18px] font-opensans'>{valuation}</span>
  </div>
        </div>



        {/* Industry */}
        <div className="flex justify-center items-center gap-2 text-gray-700 pb-4">
          <Tag size={30} color='gold'/>
          <span className='text-[18px] font-opensans'>{industry}</span>
        </div>

        {/* Bio */}
        <div className="text-gray-600 text-[20px] pb-4 font-opensans">
          {bio}
        </div>

        {/* Buttons */}
        <div className="pt-4">
          <CustomButton name="Data Room" handlePress={handleDataRoom} containerStyle='w-full text-dpurple border border-dpurple bg-white'/>
          <div className='py-4'>
          <CustomButton name="Startup Store" icon={<ShoppingBag size={30} />} handlePress={handleStartupStore} containerStyle='w-full text-dpurple border border-dpurple bg-white flex-row-reverse gap-4'/>
          </div>
          <CustomButton name="Contact Startup" icon={<MessageCircle size={30} />} handlePress={handleContactStartup} containerStyle='w-full text-dpurple border border-dpurple bg-white flex-row-reverse gap-4'/>
        </div>
      </div>
    </div>
  );
}
