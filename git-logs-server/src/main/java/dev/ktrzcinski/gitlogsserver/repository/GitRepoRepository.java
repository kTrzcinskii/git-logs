package dev.ktrzcinski.gitlogsserver.repository;

import dev.ktrzcinski.gitlogsserver.model.GitRepo;
import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GitRepoRepository extends JpaRepository<GitRepo, Integer> {
    @NonNull
    Page<GitRepo> findAllByUserUsername(@NonNull String username, @NonNull Pageable pageable);
}
