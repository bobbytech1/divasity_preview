import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { ChevronLeft } from "lucide-react";
import { FormField } from "../../components/Form/Form";
import { CustomButton } from "../../components/Button/CustomButton";

interface FormState {
  businessName: string;
  businessDescription: string;
  businessSector: string;
  roleOnTeam: string;
  incorporated: "yes" | "no";
  helpWith: string[];
}

export function CategoryContd() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();

  // reconstruct display name from slug
  const [displayName, setDisplayName] = useState("");
  useEffect(() => {
    if (!categoryName) return;
    const mapping: Record<string, string> = {
      newbusiness: "New Business",
      existingbusiness: "Existing Business",
      shopper: "Shopper",
      investor: "Investor",
    };
    const slug = categoryName.toLowerCase();
    setDisplayName(mapping[slug] || slug.charAt(0).toUpperCase() + slug.slice(1));
  }, [categoryName]);

  const handleGoBack = () => navigate(-1);

  // form state
  const [form, setForm] = useState<FormState>({
    businessName: "",
    businessDescription: "",
    businessSector: "",
    roleOnTeam: "",
    incorporated: "no",
    helpWith: [],
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // main business sectors
  const sectors = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Retail",
    "Manufacturing",
    "Agriculture",
    "Real Estate",
    "Transportation",
    "Hospitality",
  ];

  const handleTextChange = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setFormErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleCheckbox = (field: keyof FormState, value: string) => {
    const list = form[field] as string[];
    const updated = list.includes(value)
      ? list.filter(v => v !== value)
      : [...list, value];
    setForm(prev => ({ ...prev, [field]: updated }));
  };

  const validate = () => {
    const newFormErrors: Record<string, string> = {};
    if (!form.businessName.trim()) newFormErrors.businessName = "Required.";
    if (!form.businessDescription.trim()) newFormErrors.businessDescription = "Required.";
    if (!form.businessSector) newFormErrors.businessSector = "Required.";
    if (!form.roleOnTeam) newFormErrors.roleOnTeam = "Required.";

    setFormErrors(newFormErrors);
    return Object.keys(newFormErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    console.log("Submitting:", form);
    navigate('/confirmation/business/addteam');
  };

  return (
    <div>
      <Header
        name={displayName}
        containerStyle="bg-white h-[7vh]"
        handlePress={handleGoBack}
        textStyle="capitalize"
        icon={<ChevronLeft />}
      />
      <div className="px-6 pt-4">
        {/* Business Name */}
        <FormField
          name="businessName"
          type="text"
          value={form.businessName}
          placeholder="Business Name*"
          errorMessage={formErrors.businessName}
          handleChange={value => handleTextChange('businessName', value)}
          containerStyles="pb-4"
          inputStyles="border-gray-100 focus-within:border-dpurple"
        />
        {/* Business Description */}
        <FormField
          name="businessDescription"
          type="text"
          value={form.businessDescription}
          placeholder="Business Description*"
          errorMessage={formErrors.businessDescription}
          handleChange={value => handleTextChange('businessDescription', value)}
          containerStyles="pb-4"
          inputStyles="border-gray-100 focus-within:border-dpurple"
        />
        {/* Business Sector Dropdown */}
        <div className="pb-4">
          <select
            value={form.businessSector}
            onChange={e => handleTextChange('businessSector', e.target.value)}
            className="w-full border-2 border-gray-300 outline-none rounded-lg p-3 text-gray-500 focus-within:border-dpurple"
          >
            <option value="" disabled className="text-gray-500">Business Sector*</option>
            {sectors.map(sec => (
              <option key={sec} value={sec}>{sec}</option>
            ))}
          </select>
          {formErrors.businessSector && <p className="text-red-500 text-xs mt-1">{formErrors.businessSector}</p>}
        </div>
        {/* Role on the Team Dropdown */}
        <div className="pb-4">
          <select
            value={form.roleOnTeam}
            onChange={e => handleTextChange('roleOnTeam', e.target.value)}
            className="w-full border-2 border-gray-300 outline-none rounded-lg p-3 text-gray-500 focus-within:border-dpurple"
          >
            <option value="" disabled className="text-gray-500">Role on the team*</option>
            <option value="CEO">CEO</option>
            <option value="CTO">CTO</option>
            <option value="COO">COO</option>
            <option value="CFO">CFO</option>
          </select>
          {formErrors.roleOnTeam && <p className="text-red-500 text-xs mt-1">{formErrors.roleOnTeam}</p>}
        </div>
        {/* Incorporated Radio */}
        <div className="pb-4">
          <p className="font-medium pb-2 font-poppins text-[18px]">Is your business incorporated?</p>
          <label className="inline-flex items-center pr-4">
            <input
              type="radio"
              name="incorporated"
              value="yes"
              checked={form.incorporated === 'yes'}
              onChange={() => handleTextChange('incorporated', 'yes')}
              className="accent-[#8A0C86]"
            />
            <span className="pl-1 font-opensans text-[17px]">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="incorporated"
              value="no"
              checked={form.incorporated === 'no'}
              onChange={() => handleTextChange('incorporated', 'no')}
              className=" accent-[#8A0C86]"
            />
            <span className="pl-1 font-opensans text-[17px]">No</span>
          </label>
        </div>
        {/* What do you need help with? */}
        <div className="py-3">
          <p className="font-medium pb-2 font-poppins text-[18px]">What do you need help with?</p>
          {['Business Plan', 'Pitch Deck', 'Company Logo', 'Business Model', 'Website/Domain Name'].map(item => (
            <label key={item} className="flex items-center pb-1">
              <input
                type="checkbox"
                value={item}
                checked={form.helpWith.includes(item)}
                onChange={() => handleCheckbox('helpWith', item)}
                className=" accent-[#8A0C86]"
              />
              <span className="pl-2 text-[17px] font-opensans">{item}</span>
            </label>
          ))}
        </div>
        {/* Submit Button */}
        <div className="pt-6 pb-10">
          <CustomButton name="Submit" containerStyle="w-full text-white" handlePress={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
