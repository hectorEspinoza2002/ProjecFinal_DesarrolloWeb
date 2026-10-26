package com.hespinoza.casasescuintleco.hfes.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hespinoza.casasescuintleco.hfes.Model.Entity.Venta;
import com.hespinoza.casasescuintleco.hfes.Model.Repository.VentaRepository;

@Service
public class VentaService {

    private final VentaRepository ventaRepo;

    public VentaService(VentaRepository ventaRepository) {
        this.ventaRepo = ventaRepository;
    }

    public List<Venta> findAllVentas() {
        return (List<Venta>) ventaRepo.findAll();
    }

    public Optional<Venta> findVentaById(Integer id) {
        return ventaRepo.findById(id);
    }

    public Venta saveVenta(Venta venta) {
        return ventaRepo.save(venta);
    }

    public void deleteVenta(Integer id) {
        ventaRepo.deleteById(id);
    }

}
