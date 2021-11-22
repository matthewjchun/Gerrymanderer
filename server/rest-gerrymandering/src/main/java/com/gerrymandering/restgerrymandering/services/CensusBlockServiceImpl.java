package com.gerrymandering.restgerrymandering.services;

import com.gerrymandering.restgerrymandering.model.CensusBlock;
import com.gerrymandering.restgerrymandering.model.Precinct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Service
public class CensusBlockServiceImpl implements CensusBlockService{

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<CensusBlock> getAllCensusBlocksByDistrictId(long districtId) {
        TypedQuery<CensusBlock> query = em.createQuery("SELECT cb FROM CensusBlocks cb WHERE cb.districtId =:id", CensusBlock.class).setParameter("id", districtId);
        return query.getResultList();
    }
}