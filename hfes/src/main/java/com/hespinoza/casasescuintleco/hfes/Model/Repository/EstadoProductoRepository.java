package com.hespinoza.casasescuintleco.hfes.Model.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hespinoza.casasescuintleco.hfes.Model.Entity.EstadoProducto;

@Repository
public interface EstadoProductoRepository extends JpaRepository<EstadoProducto, Integer> {

}
