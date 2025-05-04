import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { FormField } from "../../components/Form/Form";
import { CustomButton } from "../../components/Button/CustomButton";
import { ChevronLeft } from "lucide-react";

export function Investor() {
  const navigate = useNavigate();
  const { type } = useParams();
  const title = type === "investor" ? "Investor Profile" : "Profile";

  const [form, setForm] = useState({
    investorType: "",
    name: "",
    email: "",
    phone: "",
    sector: "",
    region: "",
    experience: "",
    profile: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.investorType) newErrors.investorType = "Please select investor type.";
    if (!form.name) newErrors.name = "Name is required.";
    if (!form.email) newErrors.email = "Email is required.";
    if (!form.phone) newErrors.phone = "Phone number is required.";
    if (!form.sector) newErrors.sector = "Select a sector of interest.";
    if (!form.region) newErrors.region = "Select a region of interest.";
    if (!form.experience) newErrors.experience = "Select your experience level.";
    if (!form.profile) newErrors.profile = "Short profile is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validateForm()) return;
    // Future integration logic here
    navigate("/confirmation/investor/addteam");
  };

  return (
    <div>
      <Header 
      name={title} 
      handlePress={() => navigate(-1)}  
      containerStyle="bg-white h-[7vh]"
      textStyle="capitalize"
      icon={<ChevronLeft />}
      />

      <div className="p-4 flex flex-col space-y-4">
        {/* Investor Type */}
        <div className="flex justify-between gap-4 pb-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="investorType"
              value="Individual"
              checked={form.investorType === "Individual"}
              onChange={() => handleChange("investorType", "Individual")}
              className="accent-[#8A0C86]"
            />
            <span className="font-opensans font-medium text-[17px]">Individual Investor</span>
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="investorType"
              value="Corporate"
              checked={form.investorType === "Corporate"}
              onChange={() => handleChange("investorType", "Corporate")}
              className="accent-[#8A0C86]"
            />
            <span className="font-opensans font-medium text-[17px]">Corporate Investor</span>
          </label>
        </div>
        {errors.investorType && <p className="text-red-500 text-sm">{errors.investorType}</p>}

        {/* Basic Info Fields */}
        <FormField
          name="name"
          placeholder="Name"
          value={form.name}
          handleChange={(val) => handleChange("name", val)}
          errorMessage={errors.name}
          containerStyles="pb-4"
          inputStyles="border-gray-100 focus-within:border-dpurple"
        />

        <FormField
          name="email"
          placeholder="Email Address"
          value={form.email}
          handleChange={(val) => handleChange("email", val)}
          errorMessage={errors.email}
          containerStyles="pb-4"
          inputStyles="border-gray-100 focus-within:border-dpurple"
        />

        <FormField
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          handleChange={(val) => handleChange("phone", val)}
          errorMessage={errors.phone}
          containerStyles="pb-4"
          inputStyles="border-gray-100 focus-within:border-dpurple"
        />

        {/* Dropdowns */}
        <div className="space-y-2">
          <label className="font-medium font-poppins text-[17px]">Sectors of Interest</label>
          <select
            className="w-full border-2 text-gray-500 border-gray-300 outline-none rounded-lg p-3 focus-within:border-dpurple"
            value={form.sector}
            onChange={(e) => handleChange("sector", e.target.value)}
          >
            <option value="">Select</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Energy">Energy</option>
            <option value="Education">Education</option>
          </select>
          {errors.sector && <p className="text-red-500 text-sm">{errors.sector}</p>}
        </div>

        <div className="py-4">
          <label className="font-medium font-poppins text-[17px]">Regions of Interest</label>
          <select
            className="w-full border-2 text-gray-500 border-gray-300 outline-none rounded-lg p-3 focus-within:border-dpurple"
            value={form.region}
            onChange={(e) => handleChange("region", e.target.value)}
          >
            <option value="">Select</option>
            <option value="North America">North America</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="Africa">Africa</option>
            <option value="Middle East">Middle East</option>
            <option value="South America">South America</option>
          </select>
          {errors.region && <p className="text-red-500 text-sm">{errors.region}</p>}
        </div>

        <div className="pb-4">
          <label className="font-medium font-poppins text-[17px]">Experience Level</label>
          <select
            className="w-full border-2 text-gray-500 border-gray-300 outline-none rounded-lg p-3 focus-within:border-dpurple"
            value={form.experience}
            onChange={(e) => handleChange("experience", e.target.value)}
          >
            <option value="">Select</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
            <option value="Institutional">Institutional</option>
          </select>
          {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
        </div>

        {/* Short Profile */}
        <FormField
          name="profile"
          type="textarea"
          placeholder="Short Profile"
          value={form.profile}
          handleChange={(val) => handleChange("profile", val)}
          errorMessage={errors.profile}
          inputStyles="border-gray-100 focus-within:border-dpurple"
        />

        {/* Continue Button */}
        <div className="pt-4 pb-15">
        <CustomButton
          name="Continue"
          containerStyle="w-full text-white"
          handlePress={handleContinue}
        />
        </div>
      </div>
    </div>
  );
}
