package br.com.fiap.pets.repository;

import br.com.fiap.pets.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPetRepository extends JpaRepository<Pet, Long> {
}
