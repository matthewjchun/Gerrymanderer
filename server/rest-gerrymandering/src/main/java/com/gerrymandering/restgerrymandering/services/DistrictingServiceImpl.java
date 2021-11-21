package com.gerrymandering.restgerrymandering.services;

import com.gerrymandering.restgerrymandering.model.Districting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Service
public class DistrictingServiceImpl implements DistrictingService{

    @PersistenceContext
    private EntityManager em;

    @Autowired
    public DistrictingServiceImpl(EntityManager em) {
        this.em = em;
    }

    @Override
    public Districting getDistrictingById(long id) {
        return em.find(Districting.class, id);
    }
}
