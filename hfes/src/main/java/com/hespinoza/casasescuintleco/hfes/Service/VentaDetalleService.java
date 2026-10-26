package com.hespinoza.casasescuintleco.hfes.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hespinoza.casasescuintleco.hfes.Model.Entity.VentaDetalle;
import com.hespinoza.casasescuintleco.hfes.Model.Repository.VentaDetalleRepository;

@Service
public class VentaDetalleService {

    private final VentaDetalleRepository ventaDetalleRepo;

    public VentaDetalleService(VentaDetalleRepository ventaDetalleRepository) {
        this.ventaDetalleRepo = ventaDetalleRepository;
    }

    public List<VentaDetalle> findAllVentaDetalles() {
        return (List<VentaDetalle>) ventaDetalleRepo.findAll();
    }

    public Optional<VentaDetalle> findVentaDetalleById(Integer id) {
        return ventaDetalleRepo.findById(id);
    }

    public VentaDetalle saveVentaDetalle(VentaDetalle ventaDetalle) {
        return ventaDetalleRepo.save(ventaDetalle);
    }

    public void deleteVentaDetalle(Integer id) {
        ventaDetalleRepo.deleteById(id);
    }

}
