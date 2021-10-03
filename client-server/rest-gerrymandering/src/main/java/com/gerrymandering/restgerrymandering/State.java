package com.gerrymandering.restgerrymandering;

import javax.persistence.*;

@Entity
@Table(name = "State")
public class State {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "STATE_NAME", length = 50, nullable = false, unique = true)
    private String name;

    public State() {

    }

    public State(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
