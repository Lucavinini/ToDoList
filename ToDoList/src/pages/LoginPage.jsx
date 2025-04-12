import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Parse from '../parseconfig';
import "./LoginPage.css";

const LoginPage = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!usuario || !senha) {
      alert('Preencha todos os campos!');
      return;
    }
  
    try {
      await Parse.User.logIn(usuario, senha);
      setMensagem('Login realizado com sucesso!');
      navigate('/AreaDeTrabalho');
    } catch (error) {
      console.error('Erro ao logar:', error);
      setMensagem('Usuário ou senha inválidos!');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-box">
        <input
          type="text"
          placeholder="User"
          className="login-input"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="login-input"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button type="submit" className="login-button">
          Entrar
        </button>

        <Link to="/cadastro" className="login-link">
          Criar cadastro
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
