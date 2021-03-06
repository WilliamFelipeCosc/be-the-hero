import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi'

import './styles.css'
import '../../global.css'

export default function Profile() {
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();
  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ongId])

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      })

      setIncidents(incidents.filter(incidents => incidents.id !== id));
    } catch (e) {
      alert('Erro ao deletar caso, tente novamente')
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR</strong>
            <p>{Intl.NumberFormat('pt-br', { style: 'currency', currency: "BRL" }).format(incident.value)}</p>

            <button>
              <FiTrash2 size={20} color="#a8a8b3" onClick={() => handleDeleteIncident(incident.id)} />
            </button>
          </li>
        ))}

      </ul>
    </div>
  )
}