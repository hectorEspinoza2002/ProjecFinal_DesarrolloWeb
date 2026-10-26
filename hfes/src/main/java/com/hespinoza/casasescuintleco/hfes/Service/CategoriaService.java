package com.hespinoza.casasescuintleco.hfes.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hespinoza.casasescuintleco.hfes.Model.Entity.Categoria;
import com.hespinoza.casasescuintleco.hfes.Model.Repository.CategoriaRepository;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepo;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepo = categoriaRepository;
    }

    public List<Categoria> findAllCategorias() {
        return (List<Categoria>) categoriaRepo.findAll();
    }

    public Optional<Categoria> findCategoriaById(Integer id) {
        return categoriaRepo.findById(id);
    }

    public Categoria saveCategoria(Categoria categoria) {
        return categoriaRepo.save(categoria);
    }

    public void deleteCategoria(Integer id) {
        categoriaRepo.deleteById(id);
    }

}
