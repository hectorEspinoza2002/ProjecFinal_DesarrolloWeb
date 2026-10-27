package com.hespinoza.casasescuintleco.hfes.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.hespinoza.casasescuintleco.hfes.Model.Entity.Rol;
import com.hespinoza.casasescuintleco.hfes.Service.RolService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@CrossOrigin(origins = {"http://localhost:9090", "http://localhost:4200"})
public class RolController {

    @Autowired
    private RolService rolService;

    @GetMapping ("/roles")
    public List<Rol> getAllRoles() {
        return rolService.findAllRoles();
    }

    @GetMapping("/roles/{id}")
    public Optional<Rol> getRoleById(@PathVariable Integer id) {
        return rolService.findRoleById(id);
    }

    @PostMapping("/create_rol")
    public Rol createRol(@RequestBody Rol rId) {
        if(rId.getIdRole() != null && rolService.findRoleById(rId.getIdRole()).isPresent()) {
            throw new IllegalArgumentException("El rol con ID " + rId.getIdRole() + " ya existe.");
        } else {
            return rolService.saveRole(rId);
        }
    }

    @PutMapping("update_role/{id}")
    public Rol updateRole(@PathVariable("id") Integer rId, @RequestBody Rol updateRole) {
        
        Optional<Rol> existingRole = rolService.findRoleById(rId);
        if (existingRole.isPresent()) {
            Rol roleToUpdate = existingRole.get();
            roleToUpdate.setNombre(updateRole.getNombre());
            return rolService.saveRole(roleToUpdate);
        } else {
            throw new IllegalArgumentException("El rol con ID " + rId + " no existe.");
        }      
        
    }

    @DeleteMapping ("/delete_role/{id}")
    public void deleteRole(@PathVariable ("id") Integer rId) {
        Optional<Rol> existingRole = rolService.findRoleById(rId);
        existingRole.ifPresent(role -> rolService.deleteRole(rId));
    }  

}
