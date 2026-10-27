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

import com.hespinoza.casasescuintleco.hfes.Model.Entity.Venta;
import com.hespinoza.casasescuintleco.hfes.Service.VentaService;

@RestController
@CrossOrigin(origins = {"http://localhost:9090", "http://localhost:4200"})
public class VentaController {

    @Autowired
    private VentaService ventaService;

    @GetMapping("/ventas")
    public List<Venta> getAllVentas() {
        return ventaService.findAllVentas();
    }

    @GetMapping("/ventas/{id}")
    public Optional<Venta> getVentaById(@PathVariable Integer id) {
        return ventaService.findVentaById(id);
    }

    @PostMapping("/create_venta")
    public Venta createVenta(@RequestBody Venta vId) {
        if (vId.getIdVenta() != null && ventaService.findVentaById(vId.getIdVenta()).isPresent()) {
            throw new IllegalArgumentException("La venta con ID " + vId.getIdVenta() + " ya existe.");
        } else {
            return ventaService.saveVenta(vId);
        }
    }

    @PutMapping("/update_venta/{id}")
    public Venta updateVenta(@PathVariable("id") Integer vId, @RequestBody Venta updateVenta) {
        Optional<Venta> existingVenta = ventaService.findVentaById(vId);
        if (existingVenta.isPresent()) {
            Venta ventaToUpdate = existingVenta.get();
            ventaToUpdate.setCaja(updateVenta.getCaja());
            ventaToUpdate.setCliente(updateVenta.getCliente());
            ventaToUpdate.setUsuario(updateVenta.getUsuario());
            ventaToUpdate.setNumeroFactura(updateVenta.getNumeroFactura());
            ventaToUpdate.setFechaVenta(updateVenta.getFechaVenta());
            ventaToUpdate.setTotal(updateVenta.getTotal());
            ventaToUpdate.setMetodoPago(updateVenta.getMetodoPago());
            return ventaService.saveVenta(ventaToUpdate);
        } else {
            throw new IllegalArgumentException("La venta con ID " + vId + " no existe.");
        }
    }

    @DeleteMapping("/delete_venta/{id}")
    public void deleteVenta(@PathVariable("id") Integer vId) {
        Optional<Venta> existingVenta = ventaService.findVentaById(vId);
        existingVenta.ifPresent(venta -> ventaService.deleteVenta(vId));
    }

}
