package com.gerrymandering.restgerrymandering.services;

import com.gerrymandering.restgerrymandering.model.Precinct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Service
public class PrecinctServiceImpl implements PrecinctService{

    @PersistenceContext
    private EntityManager em;

    @Autowired
    public PrecinctServiceImpl(EntityManager em) {
        this.em = em;
    }

    @Override
    public List<Precinct> getAllPrecinctsByDistrictId(long districtId) {
        TypedQuery<Precinct> query = em.createQuery("SELECT p FROM Precincts p WHERE d.districtId =:id", Precinct.class).setParameter("id", districtId);
        return query.getResultList();
    }
}
