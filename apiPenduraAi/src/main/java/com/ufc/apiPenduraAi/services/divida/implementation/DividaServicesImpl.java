package com.ufc.apiPenduraAi.services.divida.implementation;

import com.ufc.apiPenduraAi.domain.divida.Divida;
import com.ufc.apiPenduraAi.dtos.divida.CreateDividaDTO;
import com.ufc.apiPenduraAi.dtos.divida.ReturnDividasDTO;
import com.ufc.apiPenduraAi.dtos.divida.UpdateDividaDTO;
import com.ufc.apiPenduraAi.repositories.divida.DividaRepository;
import com.ufc.apiPenduraAi.services.divida.DividaServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DividaServicesImpl implements DividaServices {

    @Autowired
    private DividaRepository repository;

    @Override
    public void addDivida(CreateDividaDTO data) {
        Divida nova_divida = new Divida(data.nome(), data.valor(), data.user_id());
        repository.save(nova_divida);
    }

    @Override
    public List<ReturnDividasDTO> findDivida(String cliente) {
        List<ReturnDividasDTO> devedores = repository.findAllByClienteContaining(cliente);
        if(!devedores.isEmpty()){
            return devedores;
        }
        return null;
    }

    @Override
    public void updadeValor(UpdateDividaDTO data, Long id) {
        var divida = repository.findById(id).orElseThrow();
        divida.setValor(data.novo_valor());
        repository.save(divida);

    }

    @Override
    public void quitarDivida(Long id) {
        repository.deleteById(id);
    }
}
