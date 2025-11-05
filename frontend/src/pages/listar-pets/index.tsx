import { useEffect, useState } from "react";
import type { PetDTO } from "../../models/pet";

import * as petService from "../../service/pet-service";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Delete } from "@mui/icons-material";

export default function ListarPet() {
  const [pets, setPets] = useState<PetDTO[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await petService.findAll();
        setPets(data);
        setSuccess("Dados corregados com sucesso!")
        setTimeout( () => setSuccess(null), 1000 )
      } catch (error: unknown) {
        let msg = "Erro ao carregar dados";
        if (axios.isAxiosError(error) && error.message) {
          msg = error.response?.data.error || msg;
        }
        setError(msg);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPets();
  }, []);

  const handleDelete = async (id: number, nome:string) => {
    if(window.confirm(`Tem certeza que deseja excluir o pet ${nome} do id: ${id}`)){
      try{
        await petService.deleteById(id);
        setPets(pets.filter((pet) => pet.id !== id));
        setSuccess("Pet excluído com sucesso!");
        setTimeout(() => setSuccess(null), 2000);
      }catch (error: unknown) {
        let msg = "Erro ao excluir o Pet";

        if (axios.isAxiosError(error) && error.response) {
          msg = error.response.data.error || msg;
        }
        setSuccess(null);
        setError(msg);
        setTimeout(() => setError(null), 2000);
      }
    }
    
  }

  return (
    <Box sx={{ P: 4 }}>
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
     

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Pets - COLOQUE SEU NOME e RA AQUI
        </Typography>

        <Button variant="contained">
          <Link
            to="/pets/novo"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Novo
          </Link>
        </Button>
      </Box>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        !error && (
          <TableContainer component={Paper}>
            <Table sx={{ minWi: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Cor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pets.map((pet) => (
                  <TableRow key={pet.id}>
                    <TableCell>{pet.id}</TableCell>
                    <TableCell>{pet.nome}</TableCell>
                    <TableCell>{pet.tipo}</TableCell>
                    <TableCell>{pet.cor}</TableCell>
                    <TableCell>
                      <IconButton
                      aria-label="excluir"
                      onClick={() => handleDelete(pet.id, pet.nome)}
                      sx={{ ml: 1}}>
                        <Delete/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      )}
    </Box>
  );
}
