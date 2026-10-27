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

import com.hespinoza.casasescuintleco.hfes.Model.Entity.Producto;
import com.hespinoza.casasescuintleco.hfes.Service.ProductoService;

@RestController
@CrossOrigin(origins = {"http://localhost:9090", "http://localhost:4200"})
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @GetMapping("/productos")
    public List<Producto> getAllProductos() {
        return productoService.findAllProductos();
    }

    @GetMapping("/productos/{id}")
    public Optional<Producto> getProductoById(@PathVariable Integer id) {
        return productoService.findProductoById(id);
    }

    @PostMapping("/create_producto")
    public Producto createProducto(@RequestBody Producto pId) {
        if (pId.getIdProducto() != null && productoService.findProductoById(pId.getIdProducto()).isPresent()) {
            throw new IllegalArgumentException("El producto con ID " + pId.getIdProducto() + " ya existe.");
        } else {
            return productoService.saveProducto(pId);
        }
    }

    @PutMapping("/update_producto/{id}")
    public Producto updateProducto(@PathVariable("id") Integer pId, @RequestBody Producto updateProducto) {
        Optional<Producto> existingProducto = productoService.findProductoById(pId);
        if (existingProducto.isPresent()) {
            Producto productoToUpdate = existingProducto.get();
            productoToUpdate.setCodigoBarras(updateProducto.getCodigoBarras());
            productoToUpdate.setCategoria(updateProducto.getCategoria());
            productoToUpdate.setNombre(updateProducto.getNombre());
            productoToUpdate.setPrecioVenta(updateProducto.getPrecioVenta());
            productoToUpdate.setStock(updateProducto.getStock());
            productoToUpdate.setEstadoProducto(updateProducto.getEstadoProducto());
            return productoService.saveProducto(productoToUpdate);
        } else {
            throw new IllegalArgumentException("El producto con ID " + pId + " no existe.");
        }
    }

    @DeleteMapping("/delete_producto/{id}")
    public void deleteProducto(@PathVariable("id") Integer pId) {
        Optional<Producto> existingProducto = productoService.findProductoById(pId);
        existingProducto.ifPresent(producto -> productoService.deleteProducto(pId));
    }

}
