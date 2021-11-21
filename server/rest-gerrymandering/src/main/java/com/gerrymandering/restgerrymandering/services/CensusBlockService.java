package com.gerrymandering.restgerrymandering.services;

import com.gerrymandering.restgerrymandering.model.CensusBlock;

import java.util.List;

public interface CensusBlockService {

    public List<CensusBlock> getAllCensusBlocksByDistrictId(long districtId);
}
