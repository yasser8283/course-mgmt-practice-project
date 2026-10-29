import { createContext,useContext,useState} from "react";

const AuthContext = createContext();

const useAuthContext = () =>{
    const AuthData = useContext(AuthContext);
    return AuthData;
}

const AuthProvider = ({ children })=>{
    const savedData = localStorage.getItem('loggedInUser')
    const [loginContext, setloginContext] = useState(
        savedData ? JSON.parse(savedData) : null
    )

    localStorage.getItem('loggedInUser')

    return(
        <AuthContext.Provider value={ { loginContext,setloginContext} }>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider
export { AuthContext,useAuthContext }


