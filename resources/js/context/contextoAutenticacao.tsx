import { Usuario } from '@/types';
import { createContext, JSX, useState } from 'react';

interface ContextoAplicacaoType {
  usuario: Usuario | null;
  salvarUsuario: (usuario: Usuario) => void;
}
export const ContextoAplicacao = createContext<ContextoAplicacaoType | null>(null);

export default function AuthProvider({ children, user }: { user: Usuario | null, children: JSX.Element }) {
    const [usuario, setUsuario] = useState<Usuario | null>(user);

    function salvarUsuario(usuario: Usuario) {
        setUsuario(usuario);
    }
    return (
        <ContextoAplicacao.Provider value={{usuario, salvarUsuario}}>
            {children}
        </ContextoAplicacao.Provider>
    );
}