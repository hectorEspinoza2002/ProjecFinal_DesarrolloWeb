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

import com.hespinoza.casasescuintleco.hfes.Model.Entity.EstadoCaja;
import com.hespinoza.casasescuintleco.hfes.Service.EstadoCajaService;

@RestController
@CrossOrigin(origins = {"http://localhost:9090", "http://localhost:4200"})
public class EstadoCajaController {

    @Autowired
    private EstadoCajaService estadoCajaService;

    @GetMapping("/estados_caja")
    public List<EstadoCaja> getAllEstadosCaja() {
        return estadoCajaService.findAllEstadosCaja();
    }

    @GetMapping("/estados_caja/{id}")
    public Optional<EstadoCaja> getEstadoCajaById(@PathVariable Integer id) {
        return estadoCajaService.findEstadoCajaById(id);
    }

    @PostMapping("/create_estado_caja")
    public EstadoCaja createEstadoCaja(@RequestBody EstadoCaja ecId) {
        if (ecId.getIdEstadoCaja() != null && estadoCajaService.findEstadoCajaById(ecId.getIdEstadoCaja()).isPresent()) {
            throw new IllegalArgumentException("El estado de caja con ID " + ecId.getIdEstadoCaja() + " ya existe.");
        } else {
            return estadoCajaService.saveEstadoCaja(ecId);
        }
    }

    @PutMapping("/update_estado_caja/{id}")
    public EstadoCaja updateEstadoCaja(@PathVariable("id") Integer ecId, @RequestBody EstadoCaja updateEstadoCaja) {
        Optional<EstadoCaja> existingEstado = estadoCajaService.findEstadoCajaById(ecId);
        if (existingEstado.isPresent()) {
            EstadoCaja estadoToUpdate = existingEstado.get();
            estadoToUpdate.setNombre(updateEstadoCaja.getNombre());
            return estadoCajaService.saveEstadoCaja(estadoToUpdate);
        } else {
            throw new IllegalArgumentException("El estado de caja con ID " + ecId + " no existe.");
        }
    }

    @DeleteMapping("/delete_estado_caja/{id}")
    public void deleteEstadoCaja(@PathVariable("id") Integer ecId) {
        Optional<EstadoCaja> existingEstado = estadoCajaService.findEstadoCajaById(ecId);
        existingEstado.ifPresent(estado -> estadoCajaService.deleteEstadoCaja(ecId));
    }

}
