package com.gerrymandering.restgerrymandering.model;

import com.gerrymandering.restgerrymandering.constants.Constants;

import javax.persistence.*;

@Entity
@Table(name = "Elections")
public class Election implements Cloneable {

    @Id
    @GeneratedValue
    private long id;

    @Enumerated(EnumType.STRING)
    private Constants.ElectionName name;

    private int democrat;

    private int republican;

    public Election() {}

    public Election(long id, Constants.ElectionName name, int democrat, int republican) {
        this.id = id;
        this.name = name;
        this.democrat = democrat;
        this.republican = republican;
    }
    @Override
    public Object clone() {
        try {
            return super.clone();
        }
        catch (CloneNotSupportedException e) {
            return new Election(id, name, democrat, republican);
        }
    }
}
