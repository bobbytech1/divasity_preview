import React from 'react'
import { TabHeader } from '../../components/Header/TabHeader'
import { Bell, Bitcoin, ChevronRight, HandPlatter } from 'lucide-react'
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { images } from '../../constants';



const products = [
  { id: 1, title: "Product One", image: `${images.Product}`, price: "Ξ 120" },
  { id: 2, title: "Product Two", image: `${images.Product}`, price: "Ξ 95" },
  { id: 3, title: "Product Three", image: `${images.Product}`, price: "Ξ 150" },
];

const services = [
  { id: 1, title: "Service One", image: `${images.Mechanic}`, price: "Ξ 120"},
  { id: 2, title: "Service Two", image: `${images.Mechanic}`, price: "Ξ 120"},
];

const recommendations = [
  { id: 1, title: "Product One", image: `${images.Product}`, price: "Ξ 130" },
  { id: 2, title: "Service Two", image: `${images.Mechanic}`, price: "Ξ 80" },
];

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2500,
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: 1480, // desktop and up
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768, // tablet
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480, // mobile
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

function Card({ title, image, price }: { title: string; image: string; price: string }) {
  return (
    <div className="bg-purple-100 rounded-xl shadow-md w-full">
      <img src={image} alt={title} className="w-full h-50 object-cover rounded-t-xl" />
      <div className='p-4'>
      <h3 className="font-poppins text-[18px] font-semibold">{title}</h3>
      <p className="text-purple-700 font-medium">{price}</p>
      </div>
    </div>
  );
}
export function Dashboard() {

  const stats = [
    {
      icon: <Bitcoin size={30} />,
      amount: "Ξ 4,500",
      label: "Products Sold",
    },
    {
      icon: <HandPlatter size={30} />,
      amount: '7',
      label: 'Servs',
    }
  ];
  return (
    <div>
      <TabHeader
        name="Dashboard"
        containerStyle="flex-row-reverse bg-white"
        icon={<Bell />}
      />
      <div className="bg-white pt-18 px-5">
        <div>
          <h2 className="font-poppins text-[22px] font-medium">
            Welcome back, Engr 👋
          </h2>
          <div className="grid grid-cols-2 gap-1 py-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-purple-100 px-4 py-4 rounded-[5px]"
              >
                <div className="bg-neutral-100 rounded-full w-fit p-2 mb-2">
                  {stat.icon}
                </div>
                <p className="font-poppins text-[20px] font-medium py-2">
                  {stat.amount}
                </p>
                <p className="text-[20px] font-medium font-opensans">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          {/* Section: Your Products */}
          <div className="py-4">
            <Link to="#" className="flex justify-between items-center">
              <span className="font-poppins text-[22px] font-medium pb-2">Your Products</span>
              <ChevronRight />
            </Link>
            <Slider {...settings} >
              {products.map((product) => (
                <Card key={product.id} {...product} />
              ))}
            </Slider>
          </div>

          {/* Section: Your Services */}
          <div className="py-4">
          <Link to="#" className="flex justify-between items-center">
              <span className="font-poppins text-[22px] font-medium pb-2">Your Services</span>
              <ChevronRight />
            </Link>
            <Slider {...settings}>
              {services.map((service) => (
                <Card key={service.id} {...service}/>
              ))}
            </Slider>
          </div>

          {/* Section: Recommended for You */}
          <div className="pb-30 pt-4">
            <h3 className="font-poppins text-[22px] font-medium pb-2">Recommended for You</h3>
            <Slider {...settings}>
              {recommendations.map((item) => (
                <Card key={item.id} {...item} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  )
}
