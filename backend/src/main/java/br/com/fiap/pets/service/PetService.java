package br.com.fiap.pets.service;

import br.com.fiap.pets.dto.PetDTO;
import br.com.fiap.pets.repository.IPetRepository;
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
}
