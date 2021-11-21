package com.gerrymandering.restgerrymandering.services;

import com.gerrymandering.restgerrymandering.model.Precinct;

import java.util.List;

public interface PrecinctService {

    public List<Precinct> getAllPrecinctsByDistrictId(long districtId);
}
