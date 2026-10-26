package com.hespinoza.casasescuintleco.hfes.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hespinoza.casasescuintleco.hfes.Model.Entity.Cliente;
import com.hespinoza.casasescuintleco.hfes.Model.Repository.ClienteRepository;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepo;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepo = clienteRepository;
    }

    public List<Cliente> findAllClientes() {
        return (List<Cliente>) clienteRepo.findAll();
    }

    public Optional<Cliente> findClienteById(Integer id) {
        return clienteRepo.findById(id);
    }

    public Cliente saveCliente(Cliente cliente) {
        return clienteRepo.save(cliente);
    }

    public void deleteCliente(Integer id) {
        clienteRepo.deleteById(id);
    }

}
