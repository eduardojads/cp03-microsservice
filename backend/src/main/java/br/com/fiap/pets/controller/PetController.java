package br.com.fiap.pets.controller;

import br.com.fiap.pets.dto.PetDTO;
import br.com.fiap.pets.service.PetService;
import jakarta.servlet.Servlet;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/pets")
public class PetController {

    @Autowired
    private PetService service;

    @GetMapping
    public ResponseEntity<List<PetDTO>> findAll() {
        List<PetDTO> dto = service.findAll();
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public ResponseEntity<PetDTO> createPet(@Valid @RequestBody PetDTO dto){
        dto = service.create(dto);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequestUri()
                .path("/{id}")
                .buildAndExpand(dto.getId())
                .toUri();

        return ResponseEntity.created(uri).body(dto);
    }


}
