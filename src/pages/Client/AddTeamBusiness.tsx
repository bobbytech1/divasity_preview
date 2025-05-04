import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { FormField } from "../../components/Form/Form";
import { CustomButton } from "../../components/Button/CustomButton";

export function AddTeamBusiness() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      role: "",
    };

    if (!form.name) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!form.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format.";
      isValid = false;
    }

    if (!form.phone) {
      newErrors.phone = "Phone number is required.";
      isValid = false;
    }

    if (!form.role) {
      newErrors.role = "Role is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInvite = () => {
    if (validateForm()) {
      console.log("Inviting member:", form);
      // 🔜 Future API logic goes here
      navigate("/dashboard");
    }
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col px-4">
      <Header name="Invite Team" handlePress={() => navigate(-1)} containerStyle="bg-white"/>

      {/* Confirmation Section */}
      <div className="bg-white p-6 text-center">
        <h2 className="text-xl font-poppins font-semibold text-dpurple mb-2">
          Thank you for setting up your business on Divasity.com
        </h2>
        <p className="text-sm text-gray-600">
          You can now invite your team members to join your business.
        </p>
      </div>

      {/* Invitation Form Section */}
      <div className="bg-white  flex flex-col ">
        <h3 className="text-lg font-semibold font-poppins pb-4">
          Invite members of your team to join your business
        </h3>

        <FormField
          name="name"
          placeholder="Name"
          value={form.name}
          handleChange={(val) => handleChange("name", val)}
                     containerStyles="pb-4"
            inputStyles="border-gray-100 focus-within:border-dpurple"
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}

        <FormField
          name="email"
          placeholder="Email Address"
          value={form.email}
          handleChange={(val) => handleChange("email", val)}
                     containerStyles="pb-4"
            inputStyles="border-gray-100 focus-within:border-dpurple"
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}

        <FormField
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          handleChange={(val) => handleChange("phone", val)}
                     containerStyles="pb-4"
            inputStyles="border-gray-100 focus-within:border-dpurple"
        />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}

        <FormField
          name="role"
          placeholder="Role"
          value={form.role}
          handleChange={(val) => handleChange("role", val)}
                     containerStyles="pb-4"
            inputStyles="border-gray-100 focus-within:border-dpurple"
        />
        {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <CustomButton
          name="Invite and Go to dashboard"
          handlePress={handleInvite}
          containerStyle="w-full text-white bg-dpurple"
        />
        <CustomButton
          name="Skip"
          handlePress={handleSkip}
          containerStyle="w-full text-dpurple border border-dpurple bg-white"
        />
      </div>
    </div>
  );
}
