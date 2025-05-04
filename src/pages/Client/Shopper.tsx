import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { ChevronLeft } from "lucide-react";
import { CustomButton } from "../../components/Button/CustomButton";
import { CountrySelect, StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

interface FormState {
  file: File | null;
  countryId: number | null;
  stateId: number | null;
  city: string;
  address: string;
  hasPhysical: "yes" | "no";
  shopCount: string;
}

export function Shopper() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();

  // Build display name from slug
  const [displayName, setDisplayName] = useState("");
  useEffect(() => {
    if (!categoryName) return;
    const words = categoryName.match(/[A-Z]?[a-z]+/g) || [];
    setDisplayName(
      words.length > 1
        ? words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
        : categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    );
  }, [categoryName]);

  // File upload refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Form state and errors
  const [form, setForm] = useState<FormState>({
    file: null,
    countryId: null,
    stateId: null,
    city: "",
    address: "",
    hasPhysical: "no",
    shopCount: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleGoBack = () => navigate(-1);

  // File upload handlers
  const handleFileClick = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm(prev => ({ ...prev, file }));
    if (file && file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Generic form updater
  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setFormErrors(prev => ({ ...prev, [field]: "" }));
  };

  // Validation
  const validate = () => {
    const errors: Record<string, string> = {};
    if (!form.file) errors.file = "Required.";
    if (!form.countryId) errors.countryId = "Required.";
    if (!form.stateId) errors.stateId = "Required.";
    if (!form.city.trim()) errors.city = "Required.";
    if (!form.address.trim()) errors.address = "Required.";
    if (form.hasPhysical === "yes" && !form.shopCount) errors.shopCount = "Required.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinueToAddProducts = () => {
    if (!validate()) return;
    console.log("Form submitted. Navigating to Add Products");
    navigate("/shopper/addproducts");
  };
  
  const handleContinueToAddTeam = () => {
    if (!validate()) return;
    console.log("Form submitted. Navigating to Add Team");
    navigate("/confirmation/shop/addteam");
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
        {/* File Upload */}
        <div
          onClick={handleFileClick}
          className="border-2 border-dashed border-gray-300 rounded-lg h-20 flex flex-col items-center justify-center cursor-pointer hover:border-dpurple"
        >
          {previewUrl ? (
            <img src={previewUrl} alt="preview" className="h-full object-contain" />
          ) : (
            <p className="text-gray-500 font-opensans">Click to upload Logo</p>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        {formErrors.file && <p className="text-red-500 text-xs mt-1">{formErrors.file}</p>}

        {/* Country, State, City Selects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div>
            <label className="block text-sm font-medium pb-1 font-poppins text-[16px]">Select Country*</label>
            <CountrySelect
              placeHolder="Select Country*"
              value={form.countryId || undefined}
              onChange={(opt: any) => {
                if (opt && typeof opt === 'object' && 'id' in opt) {
                  updateField('countryId', opt.id);
                  updateField('stateId', null);
                }
              }}
              inputClassName="outline-[#8A0C86] text-gray-500"
            />
            {formErrors.countryId && <p className="text-red-500 text-xs mt-1">{formErrors.countryId}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium pb-1 font-poppins text-[16px]">Select State*</label>
            <StateSelect
              countryid={form.countryId || 0}
              placeHolder="Select State*"
              value={form.stateId || undefined}
              onChange={(opt: any) => {
                if (opt && typeof opt === 'object' && 'id' in opt) {
                  updateField('stateId', opt.id);
                  updateField('city', '');
                }
              }}
              inputClassName="outline-[#8A0C86] text-gray-500"
            />
            {formErrors.stateId && <p className="text-red-500 text-xs mt-1">{formErrors.stateId}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium pb-1 font-poppins text-[16px]">Select City*</label>
            <CitySelect
              countryid={form.countryId || 0}
              stateid={form.stateId || 0}
              placeHolder="Select City*"
              value={form.city || undefined}
              onChange={(opt: any) => {
                if (opt && typeof opt === 'object' && 'name' in opt) {
                  updateField('city', opt.name);
                }
              }}
              inputClassName="outline-[#8A0C86] text-gray-500"
            />
            {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
          </div>
        </div>

        {/* Address */}
        <div className="pt-4">
          <label className="block text-sm font-medium pb-1 font-poppins text-[16px]">Primary Business Address*</label>
          <input
            type="text"
            value={form.address}
            onChange={e => updateField('address', e.target.value)}
            placeholder="Enter Primary Business Address*"
            className="w-full outline-none text-gray-500 border-2 border-gray-300 rounded p-2 focus-within:border-dpurple"
          />
          {formErrors.address && <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>}
        </div>

        {/* Physical Shop */}
        <div className="pb-4 mt-4">
          <p className="block text-sm font-medium pt-2 pb-1 font-poppins text-[16px]">Do you have a physical shop or office?</p>
          <label className="inline-flex items-center pr-4">
            <input
              type="radio"
              name="hasPhysical"
              value="yes"
              checked={form.hasPhysical === 'yes'}
              onChange={() => updateField('hasPhysical', 'yes')}
              className="accent-[#8A0C86]"
            />
            <span className="pl-1 font-opensans">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="hasPhysical"
              value="no"
              checked={form.hasPhysical === 'no'}
              onChange={() => updateField('hasPhysical', 'no')}
              className="accent-[#8A0C86]"
            />
            <span className="pl-1 font-opensans">No</span>
          </label>
        </div>

        {/* How Many Shops (conditional) */}
        {form.hasPhysical === 'yes' && (
          <div className="pb-4">
            <label className="block text-[17px] font-medium pb-1 font-poppins">How many?*</label>
            <select
              value={form.shopCount}
              onChange={e => updateField('shopCount', e.target.value)}
              className="w-full border-2 text-gray-500 border-gray-300 outline-none rounded-lg p-2 focus-within:border-dpurple"
            >
              <option value="" disabled>How many</option>
              {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                <option key={num} value={num.toString()}>{num}</option>
              ))}
            </select>
            {formErrors.shopCount && <p className="text-red-500 text-xs mt-1">{formErrors.shopCount}</p>}
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4 pb-15">
  <CustomButton
    name="Continue to Add Products"
    containerStyle="w-full bg-transparent text-black border-1 border-dpurple"
    handlePress={handleContinueToAddProducts}
  />
  <div className="pt-4">
  <CustomButton
    name="Continue to Add Team"
    containerStyle="w-full text-white bg-dpurple"
    handlePress={handleContinueToAddTeam}
  />
  </div>
</div>
      </div>
    </div>
  );
}
