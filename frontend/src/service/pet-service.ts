import axios from "axios";
import type { PetDTO, PetInputDTO } from "../models/pet";
import { BASE_URL } from "../utils/system";

export async function findAll(): Promise<PetDTO[]> {

  const response = await axios.get(`${BASE_URL}/pets`);

  return response.data;
}

export async function save(pet: PetInputDTO): Promise<PetDTO> {

  const response = await axios.post(`${BASE_URL}/pets`, pet);
  
  return response.data;
}



