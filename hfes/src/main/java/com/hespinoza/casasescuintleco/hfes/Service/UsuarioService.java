package com.hespinoza.casasescuintleco.hfes.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hespinoza.casasescuintleco.hfes.Model.Entity.Usuario;
import com.hespinoza.casasescuintleco.hfes.Model.Repository.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepo;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepo = usuarioRepository;
    }

    public List<Usuario> findAllUsuarios() {
        return (List<Usuario>) usuarioRepo.findAll();
    }

    public Optional<Usuario> findUsuarioById(Integer id) {
        return usuarioRepo.findById(id);
    }

    public Usuario saveUsuario(Usuario usuario) {
        return usuarioRepo.save(usuario);
    }

    public void deleteUsuario(Integer id) {
        usuarioRepo.deleteById(id);
    }

}
