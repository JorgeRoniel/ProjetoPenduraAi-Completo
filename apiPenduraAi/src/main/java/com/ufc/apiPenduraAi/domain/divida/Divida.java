package com.ufc.apiPenduraAi.domain.divida;

import com.ufc.apiPenduraAi.domain.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="divida_tb")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Divida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String cliente;
    @Column
    private String valor;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Divida(String cliente, String valor, Long user_id) {
        this.cliente = cliente;
        this.valor = valor;
        this.user_id = user_id;
    }
}
