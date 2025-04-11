import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CadastroPage from './pages/cadastro';
import AreaDeTrabalho from './pages/AreaDeTrabalho';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/AreaDeTrabalho" element={<AreaDeTrabalho />} />

      </Routes>
    </Router>
  );
}


export default App;