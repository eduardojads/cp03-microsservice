/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
} from "@mui/material";

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

// Implementação: handleSubmit (2,0)

// Implementação: JSX (2,5)
  return (
    <Box sx={{ mt: 2, p: 4 }}>
     
      {/*  Alerts  */}

      <Typography variant="h4" component="h1" gutterBottom>
        Cadastro Pet
      </Typography>

      {/* Box para o Form */}
      <Box
        component="form"        
      >
        {/* Componentes do Form */}
       

        {/* Box para os Botões Cancelar e Salvar*/}
        <Box >
          
        </Box>  

      </Box>  
    </Box>
  );
}
