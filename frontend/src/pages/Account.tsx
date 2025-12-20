import { useAuthContext } from "../context/AuthContext";

export const Account = () => {
    const {user, logout} = useAuthContext();
    return(
        <div>
            <p>{user ? `Nombre: ${user.name} Rol:${user.role}` : 'Sesion no iniciada'}</p>
            <button onClick={logout}>Cerrar sesion</button>
        </div>
    )
}