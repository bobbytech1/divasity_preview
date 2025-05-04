import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { Header } from "../../components/Header/Header";
import { CustomButton } from "../../components/Button/CustomButton";
import { images } from "../../constants";

interface Category {
  id: number;
  name: string;
  route: string;
}

const categories: Category[] = [
  { id: 1, name: "New Business", route: "/nextstep" },
  { id: 2, name: "Existing Business", route: "/nextstep" },
  { id: 3, name: "Shopper", route: "/shopper" },
  { id: 4, name: "Investor", route: "/investor" },
];

const sliderItems = [
  `${images.Logo}`,
  `${images.Logo}`,
  `${images.Logo}`,
  `${images.Logo}`,
  `${images.Logo}`,
  `${images.Logo}`,
];

export function Category() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  // Navigate based on selected category, appending slug of name as URL param
  const handleContinue = () => {
    if (selectedId === null) return;
    const selectedCategory = categories.find((cat) => cat.id === selectedId);
    if (!selectedCategory) return;
    const slug = selectedCategory.name.toLowerCase().replace(/\s+/g, "");
    navigate(`${selectedCategory.route}/${slug}`);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div>
      <Header
        name="Choose Category"
        containerStyle="bg-white h-[7vh]"
        handlePress={handleGoBack}
      />

      {/* Category selection grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {categories.map((category) => {
          const isSelected = category.id === selectedId;
          return (
            <motion.div
              key={category.id}
              onClick={() => setSelectedId(category.id)}
              whileHover={{ scale: 1.05 }}
              animate={{ scale: isSelected ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`cursor-pointer border rounded-xl p-4 h-[15vh] flex items-center justify-center transition-colors duration-300
                ${isSelected
                  ? "border-dpurple bg-purple-50 text-dpurple font-medium font-opensans text-center text-[18px]"
                  : "border-gray-300 hover:border-gray-400 text-center font-medium text-[18px] font-opensans"
                }
              `}
            >
              {category.name}
            </motion.div>
          );
        })}
      </div>

      {/* Slider below categories */}
      <div className="px-4 pt-4 overflow-hidden">
        <Slider {...settings}>
          {sliderItems.map((item, index) => (
            <div
              key={index}
              className="flex  h-[30vh] bg-purple-100 rounded-lg  items-center justify-center shadow-md"
            >
              <img src={item} alt="product" className="h-[30vh] "/>
            </div>
          ))}
        </Slider>
      </div>

      {/* Continue button */}
      <div className="px-4 pt-4">
        <CustomButton
          name="Continue"
          containerStyle="w-full text-white"
          handlePress={handleContinue}
        />
      </div>
    </div>
  );
}
