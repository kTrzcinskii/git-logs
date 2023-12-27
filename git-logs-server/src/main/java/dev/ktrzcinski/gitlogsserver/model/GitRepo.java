package dev.ktrzcinski.gitlogsserver.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GitRepo {

    @Id
    @GeneratedValue
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String repositoryUrl;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
