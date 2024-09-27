package com.example.reportgenerator.repository;

import com.example.reportgenerator.model.UserInput;
import org.springframework.data.jpa.repository.JpaRepository;

// JPA Repository interface to handle database operations for UserInput entities
public interface UserInputRepository extends JpaRepository<UserInput, Long> {
}
