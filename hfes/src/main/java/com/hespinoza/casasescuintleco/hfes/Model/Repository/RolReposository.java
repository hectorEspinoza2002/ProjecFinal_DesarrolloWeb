package com.hespinoza.casasescuintleco.hfes.Model.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hespinoza.casasescuintleco.hfes.Model.Entity.Rol;

@Repository 
public interface RolReposository extends JpaRepository<Rol, Integer> {

}
