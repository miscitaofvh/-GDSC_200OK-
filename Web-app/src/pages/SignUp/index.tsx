import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEye, faEyeSlash, faEnvelope, faIdCard } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../contexts/ModalContext";
import { isUsernameValid, isEmailValid } from "../../utils/validate/identifier";
import { PasswordStrength, PasswordCheckService } from "../../utils/validate/passwd";
import Image from "../../assets/auth_pic.jpg";
import { useAuth } from "../../contexts/AuthContext";

const validateInput = (name: string, value: string): string => {
    if (name === "username") {
        if (!isUsernameValid(value)) {
            return "Only letters, numbers & underscores allowed.";
        }
    }
    if (name === "email") {
        if (!isEmailValid(value)) {
            return "Email is not valid.";
        }
    }
    if (name === "password") {
        const passwordStrength = PasswordCheckService.checkPasswordStrength(value);
        if (passwordStrength === PasswordStrength.Short) {
            return "Password is too short.";
        }
    }
    return "";
};

const SignUp = () => {
    const { register } = useAuth();
    const [formData, setFormData] = useState({ username: "", email: "", name: "", password: "" });
    const [errors, setErrors] = useState({ username: "", email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const { closeModal, openModal } = useModal();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setErrors((prev) => ({ ...prev, [name]: validateInput(name, value) }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = {
            username: validateInput("username", formData.username),
            email: validateInput("email", formData.email),
            password: validateInput("password", formData.password)
        };
        setErrors(newErrors);

        if (Object.values(newErrors).some(err => err)) return;

        const response = await register(formData.username, formData.email, formData.name, formData.password);

        if (response.success) {
            alert("hehe. Registration successful!");
            closeModal();
        } else {
            alert(response.message);
        }
    };

    return (
        <div className="inline-block">
            <div className="relative flex items-center gap-[30px] pt-[120px] pb-[150px] px-[20px] bg-white rounded-[15px] shadow-[5px_5px_20px_rgba(0,0,0,0.3),-5px_-5px_20px_rgba(255,255,255,0.6)]">
                <div className="pl-[30px] flex-[0_0_50%] max-w-[50vw] flex justify-center">
                    <img src={Image} alt="Sign up visual" className="w-[90%] max-w-[600px]" />
                </div>
                <div className="w-[300px] bg-white pl-[10px]">
                    <h2 className="font-['Poppins'] font-bold text-[33px] mb-[25px] text-black">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col relative items-center w-full h-[50px]">
                            <span className="absolute left-0 text-[#666] w-[50px] leading-[50px]">
                                <FontAwesomeIcon icon={faUser} className="text-[18px]" />
                            </span>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                className="w-full h-full pl-[30px] pr-[50px] rounded-[25px] border-none outline-none text-[14px] bg-white text-[#595959]"
                            />
                            {errors.username && <small className="text-red-500 text-[12px] block">{errors.username}</small>}
                        </div>
                        <div className="flex flex-col relative items-center w-full h-[50px] mt-[10px]">
                            <span className="absolute left-0 text-[#666] w-[50px] leading-[50px]">
                                <FontAwesomeIcon icon={faEnvelope} className="text-[18px]" />
                            </span>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                className="w-full h-full pl-[30px] pr-[50px] rounded-[25px] border-none outline-none text-[14px] bg-white text-[#595959]"
                            />
                            {errors.email && <small className="text-red-500 text-[12px] block">{errors.email}</small>}
                        </div>
                        <div className="flex flex-col relative items-center w-full h-[50px] mt-[10px]">
                            <span className="absolute left-0 text-[#666] w-[50px] leading-[50px]">
                                <FontAwesomeIcon icon={faIdCard} className="text-[18px]" />
                            </span>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full h-full pl-[30px] pr-[50px] rounded-[25px] border-none outline-none text-[14px] bg-white text-[#595959]"
                            />
                        </div>
                        <div className="flex flex-col relative items-center w-full h-[50px] mt-[10px]">
                            <span className="absolute left-0 text-[#666] w-[50px] leading-[50px]">
                                <FontAwesomeIcon icon={faLock} className="text-[18px]" />
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                className="w-full h-full pl-[30px] pr-[50px] rounded-[25px] border-none outline-none text-[14px] bg-white text-[#595959]"
                            />
                            <span
                                className="absolute right-[-10px] text-[#666] text-[18px] cursor-pointer select-none"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </span>
                            {errors.password && <small className="text-red-500 text-[12px] block">{errors.password}</small>}
                        </div>
                        <button
                            type="submit"
                            className="w-full h-[50px] text-[18px] font-semibold bg-[#611BF8] rounded-[25px] my-[15px] hover:bg-[#4910c5] text-white"
                            disabled={Object.values(errors).some(err => err)}
                        >
                            Sign Up
                        </button>
                        <div className="my-[10px] text-[16px]">
                            Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); openModal("login"); }} className="text-[#3498db] no-underline hover:text-[#1573b2] hover:underline">Log in</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;