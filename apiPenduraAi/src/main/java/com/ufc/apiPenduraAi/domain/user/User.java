package com.ufc.apiPenduraAi.domain.user;

import com.ufc.apiPenduraAi.domain.divida.Divida;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name="users_tb")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String nome;
    @Column
    private String email;
    @Column
    private String senha;
    @Column
    private UserRoles role;

    @OneToMany(mappedBy = "users_tb")
    private List<Divida> dividas;

    public User(String nome, String email, String senha){
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    public User(String nome, String email, String senha, UserRoles role) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.role = role;
    }

    public User(String nome, String email) {
        this.nome = nome;
        this.email = email;
    }
}
