package com.ufc.apiPenduraAi.services.divida.implementation;

import com.ufc.apiPenduraAi.domain.divida.Divida;
import com.ufc.apiPenduraAi.domain.user.User;
import com.ufc.apiPenduraAi.dtos.divida.CreateDividaDTO;
import com.ufc.apiPenduraAi.dtos.divida.ReturnDividasDTO;
import com.ufc.apiPenduraAi.dtos.divida.UpdateDividaDTO;
import com.ufc.apiPenduraAi.exceptions.divida.NotFoundDivida;
import com.ufc.apiPenduraAi.exceptions.user.NotFoundUser;
import com.ufc.apiPenduraAi.repositories.divida.DividaRepository;
import com.ufc.apiPenduraAi.repositories.user.UserRepository;
import com.ufc.apiPenduraAi.services.divida.DividaServices;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DividaServicesImpl implements DividaServices {

    private final DividaRepository repository;
    private final UserRepository userRepository;

    private User getAuthenticatedUser() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Usuário não autenticado");
        }
        String email = authentication.getName();
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new NotFoundUser("Usuário autenticado não encontrado!");
        }
        return user;
    }

    @Override
    public void addDivida(CreateDividaDTO data) {
        User user = getAuthenticatedUser();
        Divida novaDivida = new Divida(data.cliente(), data.valor(), user);
        repository.save(novaDivida);
    }

    @Override
    public Page<ReturnDividasDTO> findDivida(String cliente, Pageable pageable) {
        User user = getAuthenticatedUser();
        String searchString = cliente != null ? cliente : "";
        Page<Divida> devedores = repository.findAllByUserAndClienteContainingIgnoreCase(user, searchString, pageable);
        return devedores.map(d -> new ReturnDividasDTO(d.getId(), d.getCliente(), d.getValor(), d.getCreatedAt()));
    }

    @Override
    public void updateValor(UpdateDividaDTO data, Long id) {
        User user = getAuthenticatedUser();
        Divida divida = repository.findByIdAndUser(id, user)
                .orElseThrow(() -> new NotFoundDivida("Dívida não encontrada!"));

        divida.setValor(data.novoValor());
        repository.save(divida);
    }

    @Override
    public void quitarDivida(Long id) {
        User user = getAuthenticatedUser();
        Divida divida = repository.findByIdAndUser(id, user)
                .orElseThrow(() -> new NotFoundDivida("Dívida não encontrada!"));

        repository.delete(divida);
    }
}
