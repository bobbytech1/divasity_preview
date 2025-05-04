import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { TabHeader } from '../../components/Header/TabHeader'
import { Bell } from 'lucide-react'
import { motion } from "framer-motion";
import { CustomButton } from "../../components/Button/CustomButton";

interface Category {
  id: number;
  name: string;
  route: string;
}

const categories: Category[] = [
  { id: 1, name: "Products", route: "/marketplace/products" },
  { id: 2, name: "Services", route: "/marketplace/services" },
];

export default function Shop() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const navigate = useNavigate();

  // Navigate based on selected category, appending slug of name as URL param
  const handleContinue = () => {
    if (selectedId === null) return;
    const selectedCategory = categories.find((cat) => cat.id === selectedId);
    if (!selectedCategory) return;
    navigate(`${selectedCategory.route}`);
  };

  return (
    <div>
      <TabHeader
        name="Marketplace"
        containerStyle="flex-row-reverse bg-white"
        icon={<Bell />}
      />
      <div className='pt-18'>
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
              className={`cursor-pointer border rounded-xl p-4 h-[30vh] flex items-center justify-center transition-colors duration-300
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
  )
}
