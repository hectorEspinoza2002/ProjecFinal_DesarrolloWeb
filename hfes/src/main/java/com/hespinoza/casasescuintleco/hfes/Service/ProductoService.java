package com.hespinoza.casasescuintleco.hfes.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hespinoza.casasescuintleco.hfes.Model.Entity.Producto;
import com.hespinoza.casasescuintleco.hfes.Model.Repository.ProductoRepository;

@Service
public class ProductoService {

    private final ProductoRepository productoRepo;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepo = productoRepository;
    }

    public List<Producto> findAllProductos() {
        return (List<Producto>) productoRepo.findAll();
    }

    public Optional<Producto> findProductoById(Integer id) {
        return productoRepo.findById(id);
    }

    public Producto saveProducto(Producto producto) {
        return productoRepo.save(producto);
    }

    public void deleteProducto(Integer id) {
        productoRepo.deleteById(id);
    }

}
