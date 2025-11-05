/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Alert, Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { save } from "../../service/pet-service";
import axios from "axios";

type FormData = {
  nome: string;
  tipo: string;
  cor: string;
};

export default function NovoPet() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    tipo: "",
    cor: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Implementação: handleChange (0,5)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  }

  // Implementação: handleSubmit (2,0)
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      save(formData);
      setSuccess("Pet salvo com sucesso!");
      setFormData({ nome: "", tipo: "", cor: "" });
      setTimeout(() => navigate("/"), 2000);
    } catch (error: unknown) {
      let msg = "Erro ao salvar Pet";
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        if (
          error.response.data.errors &&
          Array.isArray(error.response.data.errors)
        ) {
          const errorMessages = error.response.data.errors
            .map((e: any) => e.message)
            .join(", ");
          msg = `Dados inválidos: ${errorMessages}. Tente novamente.`;
        } else {
          msg = error.response.data.error || msg;
        }
      }
      setError(msg);
      setTimeout(() => setError(null), 2000);
    } finally {
      setIsLoading(false);
    }
  }

  // Implementação: JSX (2,5)
  return (
    <Box sx={{ mt: 2, p: 4 }}>
      {/*  Alerts  */}
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

      <Typography variant="h4" component="h1" gutterBottom>
        Cadastro Pet
      </Typography>

      {/* Box para o Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        {/* Componentes do Form */}
        <TextField
          id="nome"
          name="nome"
          label="Nome do Pet"
          value={formData.nome}
          onChange={handleChange}
          error={!!error}
          fullWidth
        />

        <TextField
          id="tipo"
          name="tipo"
          label="Tipo do Pet"
          value={formData.tipo}
          onChange={handleChange}
          error={!!error}
          fullWidth
        />

        <TextField
          id="cor"
          name="cor"
          label="Cor do Pet"
          value={formData.cor}
          onChange={handleChange}
          error={!!error}
          fullWidth
        />

        {/* Box para os Botões Cancelar e Salvar*/}
        <Box
          sx={{ my: 2, display: "flex", justifyContent: "flex-end", gap: 2 }}
        >
          <Button variant="contained" color="secondary">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Cancelar
            </Link>
          </Button>

          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Salvar"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
