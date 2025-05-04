import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "../../components/Header/Header";
import { CustomButton } from "../../components/Button/CustomButton";
import { FormField } from "../../components/Form/Form";

interface Category {
  id: number;
  name: string;
}

const categories: Category[] = [
  { id: 1, name: "Products" },
  { id: 2, name: "Services" },
];

export function AddProducts() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
    type: "", // Initialize empty type
  });
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const getLabel = (base: string) =>
    form.type === "Services" ? base.replace("Product", "Service") : base;

  const validateForm = () => {
    let isValid = true;
    let errors = {
      name: "",
      price: "",
      description: "",
      quantity: "",
    };

    if (!form.name) {
      errors.name = "Name is required.";
      isValid = false;
    }

    if (!form.price) {
      errors.price = "Price is required.";
      isValid = false;
    }

    if (!form.description) {
      errors.description = "Description is required.";
      isValid = false;
    }

    if (form.type === "Products" && !form.quantity) {
      errors.quantity = "Stock quantity is required for products.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleContinue = () => {
    if (validateForm()) {
      console.log("Form Data:", form);
      navigate("/dashboard/shopper");
    }
  };

  return (
    <div>
      <Header
        name="Choose Category"
        containerStyle="bg-white h-[7vh]"
        handlePress={handleGoBack}
      />

      {/* Category Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {categories.map((category) => {
          const isSelected = category.id === selectedId;
          return (
            <motion.div
              key={category.id}
              onClick={() => {
                setSelectedId(category.id);
                handleChange("type", category.name); // Update form.type on category select
              }}
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

      {/* Form Fields */}
      <div className="px-4 pt-6">
        <FormField
          name="name"
          placeholder={`Enter ${getLabel("Product")}*`}
          type="text"
          value={form.name}
          handleChange={(value) => handleChange("name", value)}
          containerStyles="pb-4"
          inputStyles="border-gray-100 focus-within:border-dpurple"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <FormField
          name="price"
          placeholder="Enter Price*"
          type="number"
          value={form.price}
          handleChange={(value) => handleChange("price", value)}
          containerStyles="pb-4"
          inputStyles="border-gray-100 focus-within:border-dpurple"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}

        <FormField
          name="description"
          placeholder={`Enter ${getLabel("Product")} description*`}
          type="textarea"
          value={form.description}
          rows={4}
          handleChange={(value) => handleChange("description", value.slice(0, 300))}
          containerStyles="pb-4"
          inputStyles="border-gray-100 focus-within:border-dpurple"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

        {/* Show only if category is Products */}
        {form.type === "Products" && (
          <FormField
            name="quantity"
            placeholder="Stock Quantity*"
            type="number"
            value={form.quantity}
            handleChange={(value) => handleChange("quantity", value)}
            containerStyles="pb-4"
            inputStyles="border-gray-100 focus-within:border-dpurple"
          />
        )}
        {form.type === "Products" && errors.quantity && (
          <p className="text-red-500 text-sm">{errors.quantity}</p>
        )}
      </div>

      {/* Continue Button */}
      <div className="px-4 pt-6 pb-10">
        <CustomButton
          name="Continue"
          containerStyle="w-full text-white"
          handlePress={handleContinue}
        />
      </div>
    </div>
  );
}
