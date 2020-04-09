import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import PessoasImg from '../../assets/pessoas.png';
import LogoImg from '../../assets/logo.png';

export default function Logon() {
    const [ login, setLogin ] = useState('');
    const [ senha, setSenha ] = useState('');

    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        const data = {
            login,
            senha
        }

        try{
            const response = await api.post('sessions', data );

            localStorage.setItem('UsuarioId', response.data.usuarioid);
            localStorage.setItem('UsuarioNome', response.data.nome);

            history.push('agenda');
        } catch (err) {
            alert(`Falha no login, tente novamente.`);
        }
    }

    return (
        <div className="logon-container">

            <section className="form">
                <img src={ LogoImg } alt="Minha Agenda" />

                <form onSubmit={ handleLogin }>
                    <h1>Faça seu Logon!</h1>

                    <input
                        placeholder="E-mail"
                        value={ login }
                        onChange={ e => setLogin(e.target.value) }
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={ senha }
                        onChange={ e => setSenha(e.target.value) }
                    />

                    <button type="submit" className="button">Entrar</button>

                    <Link to="/register" className="back-link">
                        <FiLogIn fontSize={16} color="#00cf3d" />
                        Não tenho cadastro.
                    </Link>
                </form>
            </section>

            <img src={ PessoasImg } alt="Pessoas"/>

        </div>
    );
}