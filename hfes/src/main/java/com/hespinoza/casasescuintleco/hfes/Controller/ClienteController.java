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

import com.hespinoza.casasescuintleco.hfes.Model.Entity.Cliente;
import com.hespinoza.casasescuintleco.hfes.Service.ClienteService;

@RestController
@CrossOrigin(origins = "http://localhost:9090")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping("/clientes")
    public List<Cliente> getAllClientes() {
        return clienteService.findAllClientes();
    }

    @GetMapping("/clientes/{id}")
    public Optional<Cliente> getClienteById(@PathVariable Integer id) {
        return clienteService.findClienteById(id);
    }

    @PostMapping("/create_cliente")
    public Cliente createCliente(@RequestBody Cliente cId) {
        if (cId.getIdCliente() != null && clienteService.findClienteById(cId.getIdCliente()).isPresent()) {
            throw new IllegalArgumentException("El cliente con ID " + cId.getIdCliente() + " ya existe.");
        } else {
            return clienteService.saveCliente(cId);
        }
    }

    @PutMapping("/update_cliente/{id}")
    public Cliente updateCliente(@PathVariable("id") Integer cId, @RequestBody Cliente updateCliente) {
        Optional<Cliente> existingCliente = clienteService.findClienteById(cId);
        if (existingCliente.isPresent()) {
            Cliente clienteToUpdate = existingCliente.get();
            clienteToUpdate.setNit(updateCliente.getNit());
            clienteToUpdate.setNombre(updateCliente.getNombre());
            clienteToUpdate.setDireccion(updateCliente.getDireccion());
            clienteToUpdate.setTelefono(updateCliente.getTelefono());
            return clienteService.saveCliente(clienteToUpdate);
        } else {
            throw new IllegalArgumentException("El cliente con ID " + cId + " no existe.");
        }
    }

    @DeleteMapping("/delete_cliente/{id}")
    public void deleteCliente(@PathVariable("id") Integer cId) {
        Optional<Cliente> existingCliente = clienteService.findClienteById(cId);
        existingCliente.ifPresent(cliente -> clienteService.deleteCliente(cId));
    }

}
