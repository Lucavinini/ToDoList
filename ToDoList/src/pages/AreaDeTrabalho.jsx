import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Parse from '../parseconfig';
import './AreaDeTrabalho.css';

const AreaDeTrabalho = () => {
  const [blocos, setBlocos] = useState([]);
  const [info, setInfo] = useState('Carregando data...');
  const navigate = useNavigate();


  useEffect(() => {
    const buscarDataHora = async () => {
      try {
        const response = await fetch('https://worldtimeapi.org/api/timezone/America/Sao_Paulo');
        const data = await response.json();
        const dataHora = new Date(data.datetime);
        const dataFormatada = dataHora.toLocaleDateString('pt-BR', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
        const horaFormatada = dataHora.toLocaleTimeString('pt-BR');
        setInfo(`${dataFormatada} - ${horaFormatada}`);
      } catch (error) {
        setInfo('Não foi possível carregar a data e hora agora.');
      }
    };

    buscarDataHora();
  }, []);

  useEffect(() => {
    const carregarBlocos = async () => {
      const Bloco = Parse.Object.extend('Bloco');
      const query = new Parse.Query(Bloco);
      query.equalTo('usuario', Parse.User.current());
      try {
        const resultados = await query.find();
        const blocosFormatados = resultados.map((bloco) => ({
          id: bloco.id,
          texto: bloco.get('texto'),
          cor: bloco.get('cor'),
        }));
        setBlocos(blocosFormatados);
      } catch (err) {
        console.error('Erro ao carregar blocos:', err);
      }
    };

    carregarBlocos();
  }, []);

 
  const adicionarBloco = async () => {
    const Bloco = Parse.Object.extend('Bloco');
    const bloco = new Bloco();

    bloco.set('texto', '');
    bloco.set('cor', '#40E0D0');
    bloco.set('usuario', Parse.User.current());

    try {
      const resultado = await bloco.save();
      setBlocos([...blocos, {
        id: resultado.id,
        texto: '',
        cor: '#40E0D0',
      }]);
    } catch (err) {
      console.error('Erro ao salvar bloco:', err);
    }
  };

  
  const editarTexto = async (id, novoTexto) => {
    const novosBlocos = blocos.map((b) => b.id === id ? { ...b, texto: novoTexto } : b);
    setBlocos(novosBlocos);

    const Bloco = Parse.Object.extend('Bloco');
    const query = new Parse.Query(Bloco);
    try {
      const bloco = await query.get(id);
      bloco.set('texto', novoTexto);
      await bloco.save();
    } catch (err) {
      console.error('Erro ao atualizar bloco:', err);
    }
  };

  const removerBloco = async (id) => {
    const Bloco = Parse.Object.extend('Bloco');
    const query = new Parse.Query(Bloco);
    try {
      const bloco = await query.get(id);
      await bloco.destroy();
      setBlocos(blocos.filter((b) => b.id !== id));
    } catch (err) {
      console.error('Erro ao remover bloco:', err);
    }
  };

  return (
    <div className="area-container">
      <header className="top-bar">
        <span className="info">{info}</span>
        <button className="exit-btn" onClick={() => navigate('/')}>Saída</button>
      </header>

      <div className="blocos-wrapper">
        {blocos.map((bloco) => (
          <div key={bloco.id} className="bloco" style={{ backgroundColor: bloco.cor }}>
            <textarea
              className="bloco-textarea"
              value={bloco.texto}
              onChange={(e) => editarTexto(bloco.id, e.target.value)}
              placeholder="Digite aqui..."
            />
            <button className="remover" onClick={() => removerBloco(bloco.id)}>×</button>
          </div>
        ))}
        <button className="adicionar" onClick={adicionarBloco}>+</button>
      </div>
    </div>
  );
};

export default AreaDeTrabalho;
