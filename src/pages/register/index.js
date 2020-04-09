import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Alert  } from 'reactstrap';

import './styles.css';

import LogoImg from '../../assets/logo.png';
import api from '../../services/api';

export default function Register() {
    const [ nome     , setNome      ] = useState('');  // para cada input, é necessário a mudança de estado
    const [ email    , setEmail     ] = useState('');
    const [ senha    , setSenha     ] = useState('');
    const [ confSenha, setConfSenha ] = useState('');
    const [ cidade   , setCidade    ] = useState('');
    const [ uf       , setUf        ] = useState('');

    const history = useHistory();

    const [visibleOk, setVisibleOK] = useState(false);
    const onDismissOK = () => setVisibleOK(false);

    const [visibleErr, setVisibleErr] = useState(false);
    const onDismissErr = () => setVisibleErr(false);

    // Função criada para registrar no banco
    async function handleRegister(e){
        e.preventDefault(); // esta Função desativa recarregar a página ao enviar o formuário

        const data = {
            nome,
            email,
            senha,
            confSenha,
            cidade,
            uf
        };

        try {
            const response = await api.post('usuario', data);
            // Exibe a mensagem de registro concluido
            setVisibleOK(true);
            setVisibleErr(false);

            history.push('/'); //redireciona para a pagina principal quando ok
        } catch (err) {
            setVisibleOK(false);
            setVisibleErr(true);
        }
    }

    return (
        <div className="container">

            <div className="alertas">
                <Alert color="success " isOpen={visibleOk} toggle={onDismissOK}>
                    Registro concluído com sucesso!
                </Alert>
                <Alert color="danger" isOpen={visibleErr} toggle={onDismissErr}>
                    Erro ao salvar dados.
                </Alert>
            </div>

            <div className="register-container">
                <div className="content">
                    <section>
                        <img src={ LogoImg } alt="Agenda"/>
                        
                        <h1>Cadastros</h1>
                        <p>Faça seu cadastro, entre na plataforma e organize seus trabalhos de forma prática.</p>

                        <Link to="/" className="back-link">
                            <FiArrowLeft fontSize={16} color="#00cf3d" />
                            Não tenho cadastro.
                        </Link>
                    </section>
                    
                    <form onSubmit={ handleRegister }>
                        <input 
                            placeholder="Nome"
                            value={ nome }
                            onChange={ e => setNome(e.target.value) }
                        />
                        <input
                            type="email"
                            placeholder="E-mail"
                            value={ email }
                            onChange={ e => setEmail(e.target.value) }
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={ senha }
                            onChange={ e => setSenha(e.target.value) }
                        />
                        <input
                            type="password"
                            placeholder="Confirmar Senha"
                            value={ confSenha }
                            onChange={ e => setConfSenha(e.target.value) }
                        />

                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Cidade"
                                value={ cidade }
                                onChange={ e => setCidade(e.target.value) }
                            />
                            <input
                                type="text"
                                placeholder="UF"
                                style={{ width: 80 }}
                                value={ uf }
                                onChange={ e => setUf(e.target.value) }
                            />
                        </div>

                        <button className="button" type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}