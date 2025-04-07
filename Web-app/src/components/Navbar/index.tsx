import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useModal } from "../../contexts/ModalContext";
//import Logo from "../../assets/images/Logo/main_logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { openModal } = useModal();

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-2 border-b-2 border-black bg-white z-50">
      <div className="flex items-center gap-6">
        <Link to="/">
          <div
            className="w-[150px] h-[50px] bg-contain bg-no-repeat bg-center hidden sm:block"
            // style={{ backgroundImage: `url(${Logo})` }}
          ></div>
        </Link>
        <div className={`hidden md:flex gap-6 lg:gap-8 ${isOpen ? "flex flex-col absolute top-16 left-0 w-full bg-gray-800 text-white p-4 text-center" : ""}`}>
          {/* <Link to="/article" className="hover:scale-105 transition">Article</Link>
          <Link to="/forum" className="hover:scale-105 transition">Forum</Link>
          <Link to="/about" className="hover:scale-105 transition">About</Link>
          <Link to="/contact" className="hover:scale-105 transition">Contact</Link> */}
        </div>
        <button
          className="block md:hidden text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      <div className="flex items-center gap-4 pr-2">
        {!(location.pathname === "/sign-up" || location.pathname === "/login") && (
          <div className="flex gap-2">
            <button
              onClick={() => openModal("sign-up")}
              className="font-bold text-black rounded-full bg-white border px-4 py-2 hover:bg-white hover:scale-105 transition"
            >
              Sign up
            </button>
            <button
              onClick={() => openModal("login")}
              className="bg-[#0c0a1f] text-white px-4 py-2 rounded-full hover:scale-105 transition"
            >
              Log in
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
