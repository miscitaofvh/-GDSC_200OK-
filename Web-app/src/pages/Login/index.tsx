import React, { useState } from "react";
import { login } from "../../utils/service/auth";
import Image from "../../assets/auth_pic.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../contexts/ModalContext";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { closeModal, openModal } = useModal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await login(formData.identifier, formData.password);
      if (response.success) {
        alert("Login successful. Hehehe!");
        closeModal();
      } else {
        alert(response.message || "Login failed.");
      }
    } catch (error) {
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="inline-block">
      <div className="relative flex items-center gap-[30px] pt-[120px] pb-[150px] px-[20px] bg-white rounded-[15px] shadow-[5px_5px_20px_rgba(0,0,0,0.3),-5px_-5px_20px_rgba(255,255,255,0.6)]">
        <div className="pl-[30px] flex-[0_0_50%] max-w-[50vw] flex justify-center">
          <img src={Image} alt="Login" className="w-[90%] max-w-[600px]" />
        </div>
        <div className="w-[300px] bg-white pl-[10px]">
          <div className="font-['Poppins'] font-bold text-[33px] mb-[25px] text-black">Log In</div>
          <form onSubmit={handleSubmit}>
            <div className="relative flex items-center w-full h-[50px]">
              <span className="absolute left-0 text-[#666] w-[50px] leading-[50px]">
                <FontAwesomeIcon icon={faUser} className="text-[18px]" />
              </span>
              <input
                type="text"
                name="identifier"
                placeholder="Email or Username"
                required
                value={formData.identifier}
                onChange={handleChange}
                className="w-full h-full pl-[30px] pr-[50px] rounded-[25px] border-none outline-none text-[14px] bg-white text-[#595959]"
              />
            </div>
            <div className="relative flex items-center w-full h-[50px] mt-[10px]">
              <span className="absolute left-0 text-[#666] w-[50px] leading-[50px]">
                <FontAwesomeIcon icon={faLock} className="text-[18px]" />
              </span>
              <input
                name="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full h-full pl-[30px] pr-[50px] rounded-[25px] border-none outline-none text-[14px] bg-white text-[#595959]"
              />
              <span 
                className="absolute right-[-10px] text-[#666] text-[18px] cursor-pointer select-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
            <div className="inline-block text-left mt-[10px] my-[10px]">
              <a 
                //onClick={(e) => { e.preventDefault(); openModal("forgot-password"); }}
                className="text-[16px] text-[#3498db] no-underline hover:text-[#1573b2] hover:underline"
              >
                Forgot Password?
              </a>
            </div>
            <button 
              type="submit" 
              className="w-full h-[50px] text-[18px] font-semibold bg-[#611BF8] rounded-[25px] my-[15px] hover:bg-[#4910c5] text-white"
            >
              Sign in
            </button>
            <div className="my-[10px] text-[16px]">
              Not a member?{' '}
              <a 
                onClick={(e) => { e.preventDefault(); openModal("sign-up"); }}
                className="text-[#3498db] no-underline hover:text-[#1573b2] hover:underline"
              >
                Sign up now
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;