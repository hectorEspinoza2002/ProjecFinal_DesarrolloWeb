package com.hespinoza.casasescuintleco.hfes.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hespinoza.casasescuintleco.hfes.Model.Entity.Usuario;
import com.hespinoza.casasescuintleco.hfes.Service.UsuarioService;

@RestController
@CrossOrigin(origins = "http://localhost:9090")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/usuarios")
    public List<Usuario> getAllUsuarios() {
        return usuarioService.findAllUsuarios();
    }

    @GetMapping("/usuarios/{id}")
    public Optional<Usuario> getUsuarioById(@PathVariable Integer id) {
        return usuarioService.findUsuarioById(id);
    }

    @PostMapping("/create_usuario")
    public Usuario createUsuario(@RequestBody Usuario uId) {
        if (uId.getIdUsuario() != null && usuarioService.findUsuarioById(uId.getIdUsuario()).isPresent()) {
            throw new IllegalArgumentException("El usuario con ID " + uId.getIdUsuario() + " ya existe.");
        } else {
            return usuarioService.saveUsuario(uId);
        }
    }

    @PutMapping("/update_usuario/{id}")
    public Usuario updateUsuario(@PathVariable("id") Integer uId, @RequestBody Usuario updateUsuario) {
        Optional<Usuario> existingUsuario = usuarioService.findUsuarioById(uId);
        if (existingUsuario.isPresent()) {
            Usuario usuarioToUpdate = existingUsuario.get();
            usuarioToUpdate.setNombre(updateUsuario.getNombre());
            usuarioToUpdate.setUsuario(updateUsuario.getUsuario());
            usuarioToUpdate.setPassword(updateUsuario.getPassword());
            usuarioToUpdate.setRol(updateUsuario.getRol());
            usuarioToUpdate.setEstado(updateUsuario.getEstado());
            return usuarioService.saveUsuario(usuarioToUpdate);
        } else {
            throw new IllegalArgumentException("El usuario con ID " + uId + " no existe.");
        }
    }

    @DeleteMapping("/delete_usuario/{id}")
    public void deleteUsuario(@PathVariable("id") Integer uId) {
        Optional<Usuario> existingUsuario = usuarioService.findUsuarioById(uId);
        existingUsuario.ifPresent(usuario -> usuarioService.deleteUsuario(uId));
    }

}
