import { useContext } from "react";
import { register, login, getMe} from "../Server/Api";
import { AuthContext } from "./auth.context";

export const useAuth = () => {

    const context = useContext(AuthContext)

    const { user, setUser, loading, setLoading } = context

    const handleLogin = async (formData) => {

        setLoading(true);

        try {

            const data = await login(formData)
            setUser(data.user)
            return data;
        }
        catch (err) {
            console.log(err);

        }
        finally {

            setLoading(false)
        }

    }

    const handleRegister = async (form) => {
        setLoading(true);
        try {

            const data = await register(form)
            setUser(data.user)
            return data;
        } catch (err) {
            console.log(err);
        }
        finally {

            setLoading(false)
        }
    }

const handleLogout = () => {

        setUser(null);

    };

    return { user, loading, handleLogin, handleRegister  , handleLogout}
}