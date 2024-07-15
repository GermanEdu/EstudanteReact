import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../services/api';
import EstudanteForm from './EstudanteForm';

const EstudanteLista = () => {
  const [estudantes, setEstudantes] = useState([]);
  const [editingEstudante, setEditingEstudante] = useState(null);

  const fetchEstudantes = async () => {
    const response = await api.get('/estudantes');
    setEstudantes(response.data);
  };

  useEffect(() => {
    fetchEstudantes();
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/estudantes/${id}`);
    fetchEstudantes();
  };

  const handleEdit = (estudante) => {
    setEditingEstudante(estudante);
  };

  const handleFormClose = () => {
    setEditingEstudante(null);
    fetchEstudantes();
  };

  return (
    <Container>
      <Typography variant="h4">Lista de Estudantes</Typography>
      <Button variant="contained" color="primary" onClick={() => handleEdit({})}>Adicionar Estudante</Button>
      <List>
        {estudantes.map(estudante => (
          <ListItem key={estudante.id}>
            <ListItemText primary={estudante.nome} secondary={`Idade: ${estudante.idade}, Série: ${estudante.serie}`} />
            <IconButton onClick={() => handleEdit(estudante)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(estudante.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      {editingEstudante && <EstudanteForm estudante={editingEstudante} onClose={handleFormClose} />}
    </Container>
  );
};

export default EstudanteLista;
