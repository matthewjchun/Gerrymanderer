package com.gerrymandering.restgerrymandering.services;

import com.gerrymandering.restgerrymandering.model.District;

import java.util.List;

public interface DistrictService {

    public List<District> getAllDistrictsByDistrictingId(long id);
}
