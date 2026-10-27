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

import com.hespinoza.casasescuintleco.hfes.Model.Entity.Caja;
import com.hespinoza.casasescuintleco.hfes.Service.CajaService;

@RestController
@CrossOrigin(origins = {"http://localhost:9090", "http://localhost:4200"})
public class CajaController {

    @Autowired
    private CajaService cajaService;

    @GetMapping("/cajas")
    public List<Caja> getAllCajas() {
        return cajaService.findAllCajas();
    }

    @GetMapping("/cajas/{id}")
    public Optional<Caja> getCajaById(@PathVariable Integer id) {
        return cajaService.findCajaById(id);
    }

    @PostMapping("/create_caja")
    public Caja createCaja(@RequestBody Caja cId) {
        if (cId.getIdCaja() != null && cajaService.findCajaById(cId.getIdCaja()).isPresent()) {
            throw new IllegalArgumentException("La caja con ID " + cId.getIdCaja() + " ya existe.");
        } else {
            return cajaService.saveCaja(cId);
        }
    }

    @PutMapping("/update_caja/{id}")
    public Caja updateCaja(@PathVariable("id") Integer cId, @RequestBody Caja updateCaja) {
        Optional<Caja> existingCaja = cajaService.findCajaById(cId);
        if (existingCaja.isPresent()) {
            Caja cajaToUpdate = existingCaja.get();
            cajaToUpdate.setUsuario(updateCaja.getUsuario());
            cajaToUpdate.setMontoApertura(updateCaja.getMontoApertura());
            cajaToUpdate.setMontoCierre(updateCaja.getMontoCierre());
            cajaToUpdate.setFechaApertura(updateCaja.getFechaApertura());
            cajaToUpdate.setFechaCierre(updateCaja.getFechaCierre());
            cajaToUpdate.setEstadoCaja(updateCaja.getEstadoCaja());
            return cajaService.saveCaja(cajaToUpdate);
        } else {
            throw new IllegalArgumentException("La caja con ID " + cId + " no existe.");
        }
    }

    @DeleteMapping("/delete_caja/{id}")
    public void deleteCaja(@PathVariable("id") Integer cId) {
        Optional<Caja> existingCaja = cajaService.findCajaById(cId);
        existingCaja.ifPresent(caja -> cajaService.deleteCaja(cId));
    }

}
