package com.hespinoza.casasescuintleco.hfes.Model.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity 
@Table (name = "Rol")
@Data 
public class Rol {

    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)

    @Column (name = "id")
    private Integer idRole;

    @Column(name = "nombre")
    private String nombre;

}
