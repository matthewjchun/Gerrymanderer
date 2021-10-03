package com.gerrymandering.restgerrymandering;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "State")
public class State {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
}
