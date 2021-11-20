package com.gerrymandering.restgerrymandering.model;

import com.gerrymandering.restgerrymandering.constants.Constants;

import javax.persistence.*;

@Entity
@Table(name = "Elections")
public class Election {

    @Id
    @GeneratedValue
    private long id;

    @Enumerated(EnumType.STRING)
    private Constants.ElectionName name;

    private int democrat;

    private int republican;
}
