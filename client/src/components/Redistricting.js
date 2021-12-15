import { useContext } from 'react';
import { Box, Text, Image, VStack } from '@chakra-ui/react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Center
} from '@chakra-ui/react';
import { StateDataContext } from '../contexts/StateData';
import { GeoJSONContext } from '../contexts/GeoJSON';
import { DistrictingSummaryContext } from '../contexts/DistrictingSummary';

export default function Redistricting(props) {
  const { display, number, thumbnail, popEquality, compactness, majorityMinority, onClose  } = props;
  // const { popEquality, compactness, majorityMinority } = measures;

  const [ stateData, setStateData ] = useContext(StateDataContext);
  const stateSummary = stateData['summary'];
  const [ geoJSON, setGeoJSON ] = useContext(GeoJSONContext);
  const [ districtingSummary, setDistrictingSummary] = useContext(DistrictingSummaryContext);

  
// returns an array of best measures for each redistricting in a given state
const bestMeasure = (data) => {
  let best = [];
  for (let i = 0; i < data.length; i++) {
    let districting = data[i];
    let minProp = 'populationEqualityTotal';
    let min = parseInt(districting.populationEqualityTotal);
    for (let measure in districting) {
      if (measure === 'populationEqualityTotal' || measure === 'avgPolsbyPopper') {
        if (parseInt(districting[measure]) < min) {
          minProp = measure;
          min = parseInt(districting.measure);
        }
      } 
      else if (measure === 'majorityMinorityCountTotal') {
        if (parseInt(districting[measure]) > min) {
          minProp = measure;
          min = parseInt(districting.measure);
        }
      }
    }
    best.push([i, minProp, districting]);
  }
  return best;
};


  const handleRedistrictingClick = async () => {
    // const response = await fetch (
    //   `/redistrictingClick?id=${number}`
    // )
    // const body = await response.json();
    setGeoJSON(stateData['seawulf'][number-2]);
    for( const summary of stateData['summary']['districtingSummaries'] ){
      if( summary['id'] == number){
        await setDistrictingSummary(summary)
      }
    }
  }


  const handleMouseEnter = (e) => {
    if(e.target == e.currentTarget){
      e.target.style.boxShadow = '0px 1px 1px #888888';
    }
  };

  const handleMouseLeave = (e) => {
    if(e.target == e.currentTarget){
      e.target.style.boxShadow = 'none';
    }
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
}
  
  return (
    <Popover isLazy trigger='hover'>
      <PopoverTrigger>
        <Box
          maxW='sm'
          w='100%'
          p='3'
          borderWidth='1px'
          borderRadius='lg'
          overflow='hidden'
          cursor='pointer'
          onClick={handleRedistrictingClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Text 
            fontSize='2xl'
            fontWeight='semibold' 
            lineHeight='tight' mt='1' 
            isTruncated
            onMouseEnter={stopPropagation}
            onMouseLeave={stopPropagation}
          > Districting {display}</Text>
          <VStack align='left'>
            <Image 
              src={thumbnail[number-1]}
              onMouseEnter={stopPropagation}
              onMouseLeave={stopPropagation}
            ></Image>
          </VStack>        
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight='semibold'>
          Redistricting Details
        </PopoverHeader>
        <PopoverArrow />
        <PopoverBody>
          <VStack align='left'>
            <Text>Population Equality: {popEquality}</Text>
            <Text>Compactness: {compactness}</Text>
            <Text>Majority-Minority: {majorityMinority}</Text>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
