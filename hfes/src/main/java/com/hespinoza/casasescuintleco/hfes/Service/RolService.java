package com.hespinoza.casasescuintleco.hfes.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hespinoza.casasescuintleco.hfes.Model.Entity.Rol;
import com.hespinoza.casasescuintleco.hfes.Model.Repository.RolReposository;

@Service 
public class RolService {

    private final RolReposository rolRepo;

    public RolService(RolReposository rolRepository) {
        this.rolRepo = rolRepository;
    }

    public List<Rol> findAllRoles() {
        return (List<Rol>) rolRepo.findAll();
    }

    public Optional<Rol> findRoleById(Integer id) {
        return rolRepo.findById(id);
    }

    public Rol saveRole(Rol rol) {
        return rolRepo.save(rol);
    }

    public void deleteRole(Integer id) {
        rolRepo.deleteById(id);
    }

}
