import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Parse from '../parseconfig.js'
import "./LoginPage.css";

const CadastroPage = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (usuario && senha) {
      const user = new Parse.User();
      user.set('username', usuario);
      user.set('password', senha);
  
      try {
        await user.signUp();
        setMensagem('Usuário cadastrado com sucesso!');
        navigate('/AreaDeTrabalho');
      } catch (error) {
        console.error('Erro ao cadastrar:', error);
        setMensagem('Erro ao cadastrar. Tente outro nome de usuário.');
      }
    } else {
      alert('Preencha todos os campos!');
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
      </form>
    </div>
  );
};

export default CadastroPage;
