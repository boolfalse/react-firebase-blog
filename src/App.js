
import "./App.css";
import {auth} from "./utils/firebase";
import {signOut} from "firebase/auth";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Login from "./pages/Login";
import {useState} from "react";

function App() {
    const localStorageAuth = localStorage.getItem("isAuth");
    const [isAuth, setIsAuth] = useState(localStorageAuth === '1');

    const logout = () => {
        signOut(auth).then(() => {
            setIsAuth(false);
            localStorage.setItem("isAuth", '0'); // localStorage.clear();
            window.location.pathname = "/login"; // we can't use useNavigate() hook outside the component
        }).catch(err => {
            console.log(err.message);
        });
    }

    return (
        <Router>
            <nav>
                <Link to="/">Home</Link>
                {isAuth && <Link to="/post">Post</Link>}
                {
                    isAuth ?
                        <button className='logout-btn' onClick={logout}>Logout</button> :
                        <Link to="/login">Login</Link>
                }
            </nav>
            <Routes>
                <Route path="/" element={<Home isAuth={isAuth} />} />
                <Route path="/post" element={<Post isAuth={isAuth} />} />
                <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
            </Routes>
        </Router>
    );
}

export default App;
