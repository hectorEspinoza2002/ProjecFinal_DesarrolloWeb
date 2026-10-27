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

import com.hespinoza.casasescuintleco.hfes.Model.Entity.MetodoPago;
import com.hespinoza.casasescuintleco.hfes.Service.MetodoPagoService;

@RestController
@CrossOrigin(origins = {"http://localhost:9090", "http://localhost:4200"})
public class MetodoPagoController {

    @Autowired
    private MetodoPagoService metodoPagoService;

    @GetMapping("/metodos_pago")
    public List<MetodoPago> getAllMetodosPago() {
        return metodoPagoService.findAllMetodosPago();
    }

    @GetMapping("/metodos_pago/{id}")
    public Optional<MetodoPago> getMetodoPagoById(@PathVariable Integer id) {
        return metodoPagoService.findMetodoPagoById(id);
    }

    @PostMapping("/create_metodo_pago")
    public MetodoPago createMetodoPago(@RequestBody MetodoPago mpId) {
        if (mpId.getIdMetodoPago() != null && metodoPagoService.findMetodoPagoById(mpId.getIdMetodoPago()).isPresent()) {
            throw new IllegalArgumentException("El método de pago con ID " + mpId.getIdMetodoPago() + " ya existe.");
        } else {
            return metodoPagoService.saveMetodoPago(mpId);
        }
    }

    @PutMapping("/update_metodo_pago/{id}")
    public MetodoPago updateMetodoPago(@PathVariable("id") Integer mpId, @RequestBody MetodoPago updateMetodoPago) {
        Optional<MetodoPago> existingMetodo = metodoPagoService.findMetodoPagoById(mpId);
        if (existingMetodo.isPresent()) {
            MetodoPago metodoToUpdate = existingMetodo.get();
            metodoToUpdate.setNombre(updateMetodoPago.getNombre());
            return metodoPagoService.saveMetodoPago(metodoToUpdate);
        } else {
            throw new IllegalArgumentException("El método de pago con ID " + mpId + " no existe.");
        }
    }

    @DeleteMapping("/delete_metodo_pago/{id}")
    public void deleteMetodoPago(@PathVariable("id") Integer mpId) {
        Optional<MetodoPago> existingMetodo = metodoPagoService.findMetodoPagoById(mpId);
        existingMetodo.ifPresent(metodo -> metodoPagoService.deleteMetodoPago(mpId));
    }

}
