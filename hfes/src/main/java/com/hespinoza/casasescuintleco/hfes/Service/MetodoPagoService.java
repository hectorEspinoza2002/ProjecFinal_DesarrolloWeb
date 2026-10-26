package com.hespinoza.casasescuintleco.hfes.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hespinoza.casasescuintleco.hfes.Model.Entity.MetodoPago;
import com.hespinoza.casasescuintleco.hfes.Model.Repository.MetodoPagoRepository;

@Service
public class MetodoPagoService {

    private final MetodoPagoRepository metodoPagoRepo;

    public MetodoPagoService(MetodoPagoRepository metodoPagoRepository) {
        this.metodoPagoRepo = metodoPagoRepository;
    }

    public List<MetodoPago> findAllMetodosPago() {
        return (List<MetodoPago>) metodoPagoRepo.findAll();
    }

    public Optional<MetodoPago> findMetodoPagoById(Integer id) {
        return metodoPagoRepo.findById(id);
    }

    public MetodoPago saveMetodoPago(MetodoPago metodoPago) {
        return metodoPagoRepo.save(metodoPago);
    }

    public void deleteMetodoPago(Integer id) {
        metodoPagoRepo.deleteById(id);
    }

}
