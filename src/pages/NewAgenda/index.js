import React from 'react'
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import LogoImg from '../../assets/logo.png';

export default function NewAgenda() {
    return (
        <div className="new-agenda-container">
            <div className="content">
                <section>
                    <img src={ LogoImg } alt="Agenda"/>
                    
                    <h1>Cadastrar novo compromisso</h1>
                    <p>Relate aqui seu desenvolvimento na plataforma.</p>

                    <Link to="/" className="back-link">
                        <FiArrowLeft fontSize={16} color="#00cf3d" />
                        Voltar par Home
                    </Link>
                </section>
                
                <form>
                    <input type="text" placeholder="Título" />
                    <input type="text" placeholder="Data" />
                    <textarea placeholder="Descrição" />
                    <input type="text" placeholder="Início" />
                    <input type="text" placeholder="Fim" />
                    <input type="text" placeholder="Informado" />
                    <input type="text" placeholder="Cliente" />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}