package br.com.fiap.pets.service;

import br.com.fiap.pets.dto.PetDTO;
import br.com.fiap.pets.entity.Pet;
import br.com.fiap.pets.repository.IPetRepository;
import br.com.fiap.pets.service.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PetService {

    @Autowired
    private IPetRepository repository;

    @Transactional(readOnly = true)
    public List<PetDTO> findAll() {
        return repository.findAll()
                .stream().map(PetDTO::new).toList();
    }

    @Transactional
    public PetDTO create(PetDTO dto) {
        Pet pet = new Pet();
        toEntity(dto, pet);
        pet = repository.save(pet);
        return new PetDTO(pet);
    }

    @Transactional
    public void delete(Long id) {

        if(!repository.existsById(id)){
            throw new ResourceNotFoundException("Pet não encontrado. Id: " + id);
        }
        repository.deleteById(id);
    }


    private void toEntity(PetDTO dto, Pet entity){
        entity.setNome(dto.getNome());;
        entity.setCor(dto.getCor());
        entity.setTipo(dto.getTipo());
    }
}
