package com.hespinoza.casasescuintleco.hfes.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hespinoza.casasescuintleco.hfes.Model.Entity.Categoria;
import com.hespinoza.casasescuintleco.hfes.Service.CategoriaService;

@RestController
@CrossOrigin(origins = {"http://localhost:9090", "http://localhost:4200"})
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping("/categorias")
    public List<Categoria> getAllCategorias() {
        return categoriaService.findAllCategorias();
    }

    @GetMapping("/categorias/{id}")
    public Optional<Categoria> getCategoriaById(@PathVariable Integer id) {
        return categoriaService.findCategoriaById(id);
    }

    @PostMapping("/create_categoria")
    public Categoria createCategoria(@RequestBody Categoria cId) {
        if (cId.getIdCategoria() != null && categoriaService.findCategoriaById(cId.getIdCategoria()).isPresent()) {
            throw new IllegalArgumentException("La categoría con ID " + cId.getIdCategoria() + " ya existe.");
        } else {
            return categoriaService.saveCategoria(cId);
        }
    }

    @PutMapping("/update_categoria/{id}")
    public Categoria updateCategoria(@PathVariable("id") Integer cId, @RequestBody Categoria updateCategoria) {
        Optional<Categoria> existingCategoria = categoriaService.findCategoriaById(cId);
        if (existingCategoria.isPresent()) {
            Categoria categoriaToUpdate = existingCategoria.get();
            categoriaToUpdate.setNombre(updateCategoria.getNombre());
            return categoriaService.saveCategoria(categoriaToUpdate);
        } else {
            throw new IllegalArgumentException("La categoría con ID " + cId + " no existe.");
        }
    }

    @DeleteMapping("/delete_categoria/{id}")
    public void deleteCategoria(@PathVariable("id") Integer cId) {
        Optional<Categoria> existingCategoria = categoriaService.findCategoriaById(cId);
        existingCategoria.ifPresent(categoria -> categoriaService.deleteCategoria(cId));
    }

}
