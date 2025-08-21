package com.ufc.apiPenduraAi.repositories.divida;

import com.ufc.apiPenduraAi.domain.divida.Divida;
import com.ufc.apiPenduraAi.dtos.divida.ReturnDividasDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DividaRepository extends JpaRepository<Divida, Integer> {
    List<ReturnDividasDTO> findAllByClienteContaining(String cliente);
}
