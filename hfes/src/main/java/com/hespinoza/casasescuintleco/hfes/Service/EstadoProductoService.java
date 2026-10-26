package com.hespinoza.casasescuintleco.hfes.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hespinoza.casasescuintleco.hfes.Model.Entity.EstadoProducto;
import com.hespinoza.casasescuintleco.hfes.Model.Repository.EstadoProductoRepository;

@Service
public class EstadoProductoService {

    private final EstadoProductoRepository estadoProductoRepo;

    public EstadoProductoService(EstadoProductoRepository estadoProductoRepository) {
        this.estadoProductoRepo = estadoProductoRepository;
    }

    public List<EstadoProducto> findAllEstadosProducto() {
        return (List<EstadoProducto>) estadoProductoRepo.findAll();
    }

    public Optional<EstadoProducto> findEstadoProductoById(Integer id) {
        return estadoProductoRepo.findById(id);
    }

    public EstadoProducto saveEstadoProducto(EstadoProducto estadoProducto) {
        return estadoProductoRepo.save(estadoProducto);
    }

    public void deleteEstadoProducto(Integer id) {
        estadoProductoRepo.deleteById(id);
    }

}
