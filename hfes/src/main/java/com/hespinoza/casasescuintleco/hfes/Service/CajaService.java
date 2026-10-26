package com.hespinoza.casasescuintleco.hfes.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hespinoza.casasescuintleco.hfes.Model.Entity.Caja;
import com.hespinoza.casasescuintleco.hfes.Model.Repository.CajaRepository;

@Service
public class CajaService {

    private final CajaRepository cajaRepo;

    public CajaService(CajaRepository cajaRepository) {
        this.cajaRepo = cajaRepository;
    }

    public List<Caja> findAllCajas() {
        return (List<Caja>) cajaRepo.findAll();
    }

    public Optional<Caja> findCajaById(Integer id) {
        return cajaRepo.findById(id);
    }

    public Caja saveCaja(Caja caja) {
        return cajaRepo.save(caja);
    }

    public void deleteCaja(Integer id) {
        cajaRepo.deleteById(id);
    }

}
