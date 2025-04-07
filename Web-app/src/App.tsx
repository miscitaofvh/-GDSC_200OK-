import { Route, Routes } from "react-router-dom";
//import Home from './pages/Home';
//import { UserProvider } from "./contexts/UserContext";
import Home from './pages/Home';
import { ModalProvider } from './contexts/ModalContext';
import SignUp from "./pages/SignUp";
function App() {
    return (
        //<UserProvider>
            <ModalProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<h1>Page Not Found</h1>} />
                    <Route path="/sign-up" element={<SignUp />} />
                </Routes>
            </ModalProvider>
        //</UserProvider>
    );
}

export default App;

