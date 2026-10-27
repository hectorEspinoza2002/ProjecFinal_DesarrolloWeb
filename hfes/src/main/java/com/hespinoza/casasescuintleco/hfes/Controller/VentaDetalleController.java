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

import com.hespinoza.casasescuintleco.hfes.Model.Entity.VentaDetalle;
import com.hespinoza.casasescuintleco.hfes.Service.VentaDetalleService;

@RestController
@CrossOrigin(origins = {"http://localhost:9090", "http://localhost:4200"})
public class VentaDetalleController {

    @Autowired
    private VentaDetalleService ventaDetalleService;

    @GetMapping("/venta_detalles")
    public List<VentaDetalle> getAllVentaDetalles() {
        return ventaDetalleService.findAllVentaDetalles();
    }

    @GetMapping("/venta_detalles/{id}")
    public Optional<VentaDetalle> getVentaDetalleById(@PathVariable Integer id) {
        return ventaDetalleService.findVentaDetalleById(id);
    }

    @PostMapping("/create_venta_detalle")
    public VentaDetalle createVentaDetalle(@RequestBody VentaDetalle vdId) {
        if (vdId.getIdVentaDetalle() != null && ventaDetalleService.findVentaDetalleById(vdId.getIdVentaDetalle()).isPresent()) {
            throw new IllegalArgumentException("El detalle de venta con ID " + vdId.getIdVentaDetalle() + " ya existe.");
        } else {
            return ventaDetalleService.saveVentaDetalle(vdId);
        }
    }

    @PutMapping("/update_venta_detalle/{id}")
    public VentaDetalle updateVentaDetalle(@PathVariable("id") Integer vdId, @RequestBody VentaDetalle updateVentaDetalle) {
        Optional<VentaDetalle> existingDetalle = ventaDetalleService.findVentaDetalleById(vdId);
        if (existingDetalle.isPresent()) {
            VentaDetalle detalleToUpdate = existingDetalle.get();
            detalleToUpdate.setVenta(updateVentaDetalle.getVenta());
            detalleToUpdate.setProducto(updateVentaDetalle.getProducto());
            detalleToUpdate.setCantidad(updateVentaDetalle.getCantidad());
            detalleToUpdate.setPrecioUnitario(updateVentaDetalle.getPrecioUnitario());
            detalleToUpdate.setSubtotal(updateVentaDetalle.getSubtotal());
            return ventaDetalleService.saveVentaDetalle(detalleToUpdate);
        } else {
            throw new IllegalArgumentException("El detalle de venta con ID " + vdId + " no existe.");
        }
    }

    @DeleteMapping("/delete_venta_detalle/{id}")
    public void deleteVentaDetalle(@PathVariable("id") Integer vdId) {
        Optional<VentaDetalle> existingDetalle = ventaDetalleService.findVentaDetalleById(vdId);
        existingDetalle.ifPresent(detalle -> ventaDetalleService.deleteVentaDetalle(vdId));
    }

}
