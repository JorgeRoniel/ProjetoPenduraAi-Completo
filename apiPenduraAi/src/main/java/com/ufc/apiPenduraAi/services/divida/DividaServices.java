package com.ufc.apiPenduraAi.services.divida;

import com.ufc.apiPenduraAi.dtos.divida.CreateDividaDTO;
import com.ufc.apiPenduraAi.dtos.divida.ReturnDividasDTO;
import com.ufc.apiPenduraAi.dtos.divida.UpdateDividaDTO;

import java.util.List;

public interface DividaServices {

    void addDivida(CreateDividaDTO createDividaDTO);
    List<ReturnDividasDTO> findDivida(String nome);
    void updadeValor(UpdateDividaDTO updateDividaDTO, Long id);
    void quitarDivida(Long id);
}
