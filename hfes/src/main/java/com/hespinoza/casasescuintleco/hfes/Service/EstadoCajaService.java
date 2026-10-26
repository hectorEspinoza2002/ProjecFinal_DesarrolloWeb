package com.hespinoza.casasescuintleco.hfes.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hespinoza.casasescuintleco.hfes.Model.Entity.EstadoCaja;
import com.hespinoza.casasescuintleco.hfes.Model.Repository.EstadoCajaRepository;

@Service
public class EstadoCajaService {

    private final EstadoCajaRepository estadoCajaRepo;

    public EstadoCajaService(EstadoCajaRepository estadoCajaRepository) {
        this.estadoCajaRepo = estadoCajaRepository;
    }

    public List<EstadoCaja> findAllEstadosCaja() {
        return (List<EstadoCaja>) estadoCajaRepo.findAll();
    }

    public Optional<EstadoCaja> findEstadoCajaById(Integer id) {
        return estadoCajaRepo.findById(id);
    }

    public EstadoCaja saveEstadoCaja(EstadoCaja estadoCaja) {
        return estadoCajaRepo.save(estadoCaja);
    }

    public void deleteEstadoCaja(Integer id) {
        estadoCajaRepo.deleteById(id);
    }

}
