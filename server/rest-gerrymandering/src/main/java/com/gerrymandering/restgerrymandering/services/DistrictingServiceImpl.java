package com.gerrymandering.restgerrymandering.services;

import com.gerrymandering.restgerrymandering.model.Districting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;

@Service
public class DistrictingServiceImpl implements DistrictingService{

    private EntityManager em;

    @Autowired
    public DistrictingServiceImpl(EntityManager em) {
        this.em = em;
    }

    @Override
    public Districting getDistrictingById(int id) {
        return null;
    }
}
