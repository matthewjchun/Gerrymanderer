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

    private int democratic;

    private int republican;

    public Election() {}

    public Election(long id, Constants.ElectionName name, int democratic, int republican) {
        this.id = id;
        this.name = name;
        this.democratic = democratic;
        this.republican = republican;
    }

    @Override
    public Object clone() {
        try {
            return super.clone();
        }
        catch (CloneNotSupportedException e) {
            return new Election(id, name, democratic, republican);
        }
    }

    // GETTERS AND SETTERS
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Constants.ElectionName getName() {
        return name;
    }

    public void setName(Constants.ElectionName name) {
        this.name = name;
    }

    public int getDemocratic() {
        return democratic;
    }

    public void setDemocratic(int democratic) {
        this.democratic = democratic;
    }

    public int getRepublican() {
        return republican;
    }

    public void setRepublican(int republican) {
        this.republican = republican;
    }
}
