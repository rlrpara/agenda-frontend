import React, { useEffect, useState } from 'react'

import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import LogoImg from '../../assets/logo.png';

export default function Agenda() {

    var dateFormat = require('dateformat');

    const renderHTML = (escapedHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: escapedHTML } });

    const [ agenda, setAgenda ] = useState([]);
    const history = useHistory();

    const usuarioId = localStorage.getItem('UsuarioId').split(' ')[0];
    const nome = localStorage.getItem('UsuarioNome').split(' ')[0];

    useEffect(() => {
        api.get('agenda', {
            headers: {
                Authorization: usuarioId
            }
        }).then(response => {
            setAgenda(response.data)
        })
    }, [usuarioId]);

    async function handleDeleteAgenda(id) {
        try {
            await api.delete(`agenda/${id}`, {
                headers: {
                    Authorization: usuarioId
                }
            });

            setAgenda(agenda.filter(x => x.AgendaId !== id))
        } catch (err) {
            alert('Erro ao deletar agenda, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="agenda-container">
            <header>
                <img src={LogoImg} alt="Agenda"/>

                <span>Seja bem vindo, { nome }</span>

                <Link className="button" to="/agenda/new">Novo compromisso</Link>
                <button onClick={ handleLogout } type="button">
                    <FiPower size={18} color="#00cf3d" />
                </button>
            </header>

            <h1>Compromissos</h1>
            <ul>
                {agenda.map(item => (
                    <li key={item.AgendaId}>
                    <strong>DATA: { dateFormat(item.data, "dd/mm/yyyy") } - INÍCIO: { item.horainicio.substr(0, 5) } - TÉRMINO: { item.horafim.substr(0, 5) }</strong>
                    <p>Inormado no sistema: { item.informado === 1 ? 'Sim': 'não' } </p>

                    <strong>CLIENTE</strong>
                    <p>{ item.TotvsId } - { item.Cliente }</p>

                    <strong>CONTATO</strong>
                    <p>{ item.ContatoNome } ({ item.ContatoEmail })</p>

                    <strong>ATIVIDADE EXECUTADA</strong>
                    <p>{ renderHTML((item.descricao).substr(0, 300) + '(...)') }</p>

                    <button onClick={() => handleDeleteAgenda(item.AgendaId )} type="button">
                        <FiTrash2 size={20} color="#a8a8d3" />
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}