package com.ufc.apiPenduraAi.repositories.user;

import com.ufc.apiPenduraAi.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
