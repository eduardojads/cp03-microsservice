package br.com.fiap.pets.controller;

import br.com.fiap.pets.dto.PetDTO;
import br.com.fiap.pets.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


}
