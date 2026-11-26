package com.edumanager;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
public class CatalogController {
    public record Formation(long id, String title, int duration, String description) {}

    private final StudentRepository students;
    private final List<Formation> formations = List.of(
            new Formation(1, "Informatique", 120, "Développement et systèmes d’information."),
            new Formation(2, "Mathématiques", 90, "Algèbre, analyse et statistiques."));

    public CatalogController(StudentRepository students) { this.students = students; }

    @GetMapping("/stats/students-count")
    public long studentCount() { return students.count(); }

    @GetMapping("/formations")
    public List<Formation> formations() { return formations; }

    @GetMapping("/formations/{id}")
    public Formation formation(@PathVariable long id) {
        return formations.stream().filter(item -> item.id() == id).findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Formation introuvable"));
    }
}
