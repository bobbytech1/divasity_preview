import { useState } from "react";
import { FormField } from "../../components/Form/Form";
import { images } from "../../constants";
import { CustomButton } from "../../components/Button/CustomButton";
import { Link, useNavigate } from "react-router-dom";

export function Signup() {
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Error state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Handle input change
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error on change
  };

  // Basic validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  // Handle form submit
  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Submit logic (placeholder)
    console.log("Form submitted:", form);
    navigate("/nextstep"); // Replace with your next route
  };

  return (
    <div>
      {/* Logo */}
      <div className="flex justify-center pt-2">
        <img src={images.Logo} alt="Logo" className="h-[20vh]" />
      </div>

      {/* Heading */}
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-poppins font-[700] text-[26px] text-center text-gray-800">
          Create new account
        </h2>
        <p className="font-opensans text-[16px] text-center text-gray-600">
          Log in to see what's waiting for you
        </p>
      </div>

      {/* Form Fields */}
      <div className="pt-6 pb-8 px-6">
        <FormField
          name="firstName"
          type="text"
          value={form.firstName}
          placeholder="First Name*"
          errorMessage={errors.firstName}
          handleChange={(value) => handleChange("firstName", value)}
          containerStyles="pb-4"
          inputStyles="border-gray-100 focus-within:border-dpurple"
        />

        <FormField
          name="lastName"
          type="text"
          value={form.lastName}
          placeholder="Last Name*"
          errorMessage={errors.lastName}
          handleChange={(value) => handleChange("lastName", value)}
          containerStyles="pb-4"
          inputStyles="border-gray-100 focus-within:border-dpurple"
        />

        <FormField
          name="phone"
          type="tel"
          value={form.phone}
          placeholder="Phone Number*"
          errorMessage={errors.phone}
          handleChange={(value) => handleChange("phone", value)}
          containerStyles="pb-4"
          inputStyles="border-gray-100 focus-within:border-dpurple"
        />

        <FormField
          name="address"
          type="text"
          value={form.address}
          placeholder="Address*"
          errorMessage={errors.address}
          handleChange={(value) => handleChange("address", value)}
          containerStyles="pb-4"
          inputStyles="border-gray-100 focus-within:border-dpurple"
        />

        <FormField
          name="email"
          type="email"
          value={form.email}
          placeholder="Email*"
          errorMessage={errors.email}
          handleChange={(value) => handleChange("email", value)}
          containerStyles="pb-4"
          inputStyles="border-gray-100 focus-within:border-dpurple"
        />

        <FormField
          name="password"
          type="password"
          value={form.password}
          placeholder="Password*"
          errorMessage={errors.password}
          handleChange={(value) => handleChange("password", value)}
          containerStyles="pb-4"
          inputStyles="border-gray-100 focus-within:border-dpurple"
        />

        <FormField
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          placeholder="Confirm Password*"
          errorMessage={errors.confirmPassword}
          handleChange={(value) => handleChange("confirmPassword", value)}
          containerStyles="pb-4"
          inputStyles="border-gray-100 focus-within:border-dpurple"
        />


        {/* Submit Button */}
        <CustomButton
          name="Create Account"
          containerStyle="w-full text-white"
          handlePress={handleSubmit}
        />

        {/* Already have an account */}
        <p className="text-center font-opensans pt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-dpurple font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
