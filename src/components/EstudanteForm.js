import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import api from '../services/api';

const EstudanteForm = ({ estudante, onClose }) => {
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    serie: '',
    notaMedia: '',
    endereco: '',
    nomePai: '',
    nomeMae: '',
    dataNascimento: ''
  });

  useEffect(() => {
    if (estudante && estudante.id) {
      setFormData(estudante);
    }
  }, [estudante]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (estudante.id) {
        await api.put(`/estudantes/${estudante.id}`, formData);
      } else {
        await api.post('/estudantes', formData);
      }
      onClose();
    } catch (error) {
      alert('Erro ao salvar estudante');
    }
  };

  return (
    <Container>
      <Typography variant="h4">{estudante.id ? 'Editar Estudante' : 'Adicionar Estudante'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Idade"
          name="idade"
          value={formData.idade}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Série"
          name="serie"
          value={formData.serie}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nota Média"
          name="notaMedia"
          value={formData.notaMedia}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Endereço"
          name="endereco"
          value={formData.endereco}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nome do Pai"
          name="nomePai"
          value={formData.nomePai}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nome da Mãe"
          name="nomeMae"
          value={formData.nomeMae}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Data de Nascimento"
          name="dataNascimento"
          value={formData.dataNascimento}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="date"
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" variant="contained" color="primary">Salvar</Button>
        <Button onClick={onClose} variant="contained" color="secondary">Cancelar</Button>
      </form>
    </Container>
  );
};

export default EstudanteForm;
