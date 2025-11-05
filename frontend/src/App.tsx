import { Box } from "@mui/material";
import Header from "./components/Header";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import ListarPet from "./pages/listar-pets";
import NovoPet from "./pages/novo-pet";

function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header title="Pets" />

      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ListarPet />} />

            <Route path="/pets/novo" element={<NovoPet />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </Box>

      <Footer />
    </Box>
  );
}

export default App;
