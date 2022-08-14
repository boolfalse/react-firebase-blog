
import {signInWithPopup} from "firebase/auth";
import {auth, googleAuthProvider} from "../utils/firebase";
import {useNavigate} from "react-router-dom";

const Login = ({setIsAuth}) => {
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        signInWithPopup(auth, googleAuthProvider).then(() => {
            setIsAuth(true);
            localStorage.setItem("isAuth", '1');
            navigate("/");
        }).catch(err => {
            console.log(err.message);
        });
    }

    return (
        <div className='page-login'>
            <p>Sign in with Google.</p>
            <button onClick={signInWithGoogle} className='login-with-google-btn'>Sign-in</button>
        </div>
    );
}

export default Login;
