package com.gerrymandering.restgerrymandering.services;

import com.gerrymandering.restgerrymandering.model.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Service
public class StateServiceImpl implements StateService{

    @PersistenceContext
    private EntityManager em;

    @Autowired
    public StateServiceImpl(EntityManager em) {
        this.em = em;
    }

    @Override
    public State getStateByName(String name) {
        return em.find(State.class, name);
    }
}
