import React, { useEffect } from 'react';
import '../App.css';

export default function Legend(props){
    var showDistrict = true;
    var showCounty = true;
    var showPrecinct = true;
    const map = props;
    
    useEffect(() => {
      if (!map.current) return;
      var district = document.getElementById('districtLegend');
      var county = document.getElementById('countyLegend');
      var precinct = document.getElementById('precinctLegend');

      district.onclick = function (e) {
        if (showDistrict) {
          if (map.current.getLayer('azcd_lines') !== 'undefined') {
            map.current.setLayoutProperty('azcd_lines', 'visibility', 'none');
          }
          if (map.current.getLayer('micd_lines') !== 'undefined') {
            map.current.setLayoutProperty('micd_lines', 'visibility', 'none');
          }
          if (map.current.getLayer('vacd_lines') !== 'undefined') {
            map.current.setLayoutProperty('vacd_lines', 'visibility', 'none');
          }
        }
        if (!showDistrict) {
          if (map.current.getLayer('azcd_lines') !== 'undefined') {
            map.current.setLayoutProperty('azcd_lines', 'visibility', 'visible');
          }
          if (map.current.getLayer('micd_lines') !== 'undefined') {
            map.current.setLayoutProperty('micd_lines', 'visibility', 'visible');
          }
          if (map.current.getLayer('vacd_lines') !== 'undefined') {
            map.current.setLayoutProperty('vacd_lines', 'visibility', 'visible');
          }
        }
      };

      county.onclick = function (e) {
        if (showCounty) {
          if (map.current.getLayer('azcounty-boundary') !== 'undefined') {
            map.current.setLayoutProperty('azcounty-boundary', 'visibility', 'none');
          }
          if (map.current.getLayer('micounty-boundary') !== 'undefined') {
            map.current.setLayoutProperty('micounty-boundary', 'visibility', 'none');
          }
          if (map.current.getLayer('vacounty-boundary') !== 'undefined') {
            map.current.setLayoutProperty('vacounty-boundary', 'visibility', 'none');
          }
        }
        if (!showCounty) {
          if (map.current.getLayer('azcounty-boundary') !== 'undefined') {
            map.current.setLayoutProperty('azcounty-boundary', 'visibility', 'visible');
          }
          if (map.current.getLayer('micounty-boundary') !== 'undefined') {
            map.current.setLayoutProperty('micounty-boundary', 'visibility', 'visible');
          }
          if (map.current.getLayer('vacounty-boundary') !== 'undefined') {
            map.current.setLayoutProperty('vacounty-boundary', 'visibility', 'visible');
          }
        }
      };

      precinct.onclick = function (e) {
        if (showPrecinct) {
          if (map.current.getLayer('azprec-boundary') !== 'undefined') {
            map.current.setLayoutProperty('azprec-boundary', 'visibility', 'none');
          }
          if (map.current.getLayer('miprec-boundary') !== 'undefined') {
            map.current.setLayoutProperty('miprec-boundary', 'visibility', 'none');
          }
          if (map.current.getLayer('vaprec-boundary') !== 'undefined') {
            map.current.setLayoutProperty('vaprec-boundary', 'visibility', 'none');
          }
        }
        if (!showPrecinct) {
          if (map.current.getLayer('azprec-boundary') !== 'undefined') {
            map.current.setLayoutProperty('azprec-boundary', 'visibility', 'visible');
          }
          if (map.current.getLayer('miprec-boundary') !== 'undefined') {
            map.current.setLayoutProperty('miprec-boundary', 'visibility', 'visible');
          }
          if (map.current.getLayer('vaprec-boundary') !== 'undefined') {
            map.current.setLayoutProperty('vaprec-boundary', 'visibility', 'visible');
          }
        }
      };
    });

    function toggleDistrict() {
        if (showDistrict) {
          showDistrict = false;
          document.getElementById('districtColor').style.backgroundColor = '#FFFFFF';
        } else {
          showDistrict = true;
          document.getElementById('districtColor').style.backgroundColor = '#45322f';
        }
    }
    
    function toggleCounty() {
      if (showCounty) {
        showCounty = false;
        document.getElementById('countyColor').style.backgroundColor = '#FFFFFF';
      } else {
        showCounty = true;
        document.getElementById('countyColor').style.backgroundColor = '#940f00';
      }
    }
    
    function togglePrecinct() {
      if (showPrecinct) {
        showPrecinct = false;
        document.getElementById('precinctColor').style.backgroundColor = '#FFFFFF';
      } else {
        showPrecinct = true;
        document.getElementById('precinctColor').style.backgroundColor = '#ebd8d3';
      }
    }

    return(
      <div className='legend'>
        <h4>Legend</h4>
        <div id='districtLegend' onClick={toggleDistrict}>
          <span id='districtColor' style={{ backgroundColor: '#45322f' }}/>Districts
        </div>
        <div id='countyLegend' onClick={toggleCounty}>
          <span id='countyColor' style={{ backgroundColor: '#940f00' }}/>Counties
        </div>
        <div id='precinctLegend' onClick={togglePrecinct}>
          <span id='precinctColor' style={{ backgroundColor: '#ebd8d3' }}/>Precincts
        </div>
      </div>
    );
}