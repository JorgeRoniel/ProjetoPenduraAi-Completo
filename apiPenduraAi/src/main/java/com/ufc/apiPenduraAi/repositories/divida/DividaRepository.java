package com.ufc.apiPenduraAi.repositories.divida;

import com.ufc.apiPenduraAi.domain.divida.Divida;
import com.ufc.apiPenduraAi.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DividaRepository extends JpaRepository<Divida, Long> {
    Page<Divida> findAllByUserAndClienteContainingIgnoreCase(User user, String cliente, Pageable pageable);
    Optional<Divida> findByIdAndUser(Long id, User user);
}
