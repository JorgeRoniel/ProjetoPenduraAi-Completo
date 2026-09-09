package com.ufc.apiPenduraAi.services.divida;

import com.ufc.apiPenduraAi.dtos.divida.CreateDividaDTO;
import com.ufc.apiPenduraAi.dtos.divida.ReturnDividasDTO;
import com.ufc.apiPenduraAi.dtos.divida.UpdateDividaDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DividaServices {

    void addDivida(CreateDividaDTO createDividaDTO);
    Page<ReturnDividasDTO> findDivida(String cliente, Pageable pageable);
    void updateValor(UpdateDividaDTO updateDividaDTO, Long id);
    void quitarDivida(Long id);
}
