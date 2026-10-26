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

import com.hespinoza.casasescuintleco.hfes.Model.Entity.EstadoProducto;
import com.hespinoza.casasescuintleco.hfes.Service.EstadoProductoService;

@RestController
@CrossOrigin(origins = "http://localhost:9090")
public class EstadoProductoController {

    @Autowired
    private EstadoProductoService estadoProductoService;

    @GetMapping("/estados_producto")
    public List<EstadoProducto> getAllEstadosProducto() {
        return estadoProductoService.findAllEstadosProducto();
    }

    @GetMapping("/estados_producto/{id}")
    public Optional<EstadoProducto> getEstadoProductoById(@PathVariable Integer id) {
        return estadoProductoService.findEstadoProductoById(id);
    }

    @PostMapping("/create_estado_producto")
    public EstadoProducto createEstadoProducto(@RequestBody EstadoProducto epId) {
        if (epId.getIdEstadoProducto() != null && estadoProductoService.findEstadoProductoById(epId.getIdEstadoProducto()).isPresent()) {
            throw new IllegalArgumentException("El estado de producto con ID " + epId.getIdEstadoProducto() + " ya existe.");
        } else {
            return estadoProductoService.saveEstadoProducto(epId);
        }
    }

    @PutMapping("/update_estado_producto/{id}")
    public EstadoProducto updateEstadoProducto(@PathVariable("id") Integer epId, @RequestBody EstadoProducto updateEstadoProducto) {
        Optional<EstadoProducto> existingEstado = estadoProductoService.findEstadoProductoById(epId);
        if (existingEstado.isPresent()) {
            EstadoProducto estadoToUpdate = existingEstado.get();
            estadoToUpdate.setNombre(updateEstadoProducto.getNombre());
            return estadoProductoService.saveEstadoProducto(estadoToUpdate);
        } else {
            throw new IllegalArgumentException("El estado de producto con ID " + epId + " no existe.");
        }
    }

    @DeleteMapping("/delete_estado_producto/{id}")
    public void deleteEstadoProducto(@PathVariable("id") Integer epId) {
        Optional<EstadoProducto> existingEstado = estadoProductoService.findEstadoProductoById(epId);
        existingEstado.ifPresent(estado -> estadoProductoService.deleteEstadoProducto(epId));
    }

}
