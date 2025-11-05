package br.com.fiap.pets.dto;

import br.com.fiap.pets.entity.Pet;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class PetDTO {

    private Long id;
    @NotBlank(message = "O campo Nome não pode ser vazio, nulo ou em branco")
    @Size(min = 3, max = 100, message = "O campo Nome deve ter entre 3 e 100 caracteres")
    private String nome;
    @NotBlank(message = "O campo Tipo não pode ser vazio, nulo ou em branco")
    @Size(min = 3, max = 100, message = "O campo Tipo deve ter entre 3 e 100 caracteres")
    private String tipo;
    @NotBlank(message = "O campo Cor não pode ser vazio, nulo ou em branco")
    @Size(min = 3, max = 100, message = "O campo Cor deve ter entre 3 e 100 caracteres")
    private String cor;

    public PetDTO(Pet entity) {
        id = entity.getId();
        nome = entity.getNome();
        tipo = entity.getTipo();
        cor = entity.getCor();
    }
}
