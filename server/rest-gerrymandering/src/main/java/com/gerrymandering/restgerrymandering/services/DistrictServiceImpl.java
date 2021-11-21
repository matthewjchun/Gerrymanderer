package com.gerrymandering.restgerrymandering.services;

import com.gerrymandering.restgerrymandering.model.District;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Service
public class DistrictServiceImpl implements DistrictService{

    @PersistenceContext
    private EntityManager em;

    @Autowired
    public DistrictServiceImpl(EntityManager em) {
        this.em = em;
    }

    @Override
    public List<District> getAllDistrictsByDistrictingId(long id) {
        TypedQuery<District> query = em.createQuery("SELECT d FROM Districts d WHERE d.districtingId=:id", District.class).setParameter("id", id);
        return query.getResultList();
    }
}
