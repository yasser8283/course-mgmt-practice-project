import { createContext,useContext,useState} from "react";

const AuthContext = createContext();

const useAuthContext = () =>{
    const AuthData = useContext(AuthContext);
    return AuthData;
}

const AuthProvider = ({ children })=>{
    const [loginContext, setloginContext] = useState(null)

    return(
        <AuthContext.Provider value={ { loginContext,setloginContext} }>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider
export { AuthContext,useAuthContext }


