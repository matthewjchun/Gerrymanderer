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
import { DistrictingSummaryContext } from '../contexts/DistrictingSummary';

export default function Redistricting(props) {
  const { number, bestMeasure, measures, thumbnail } = props;
  const { popEquality, compactness, majorityMinority } = measures;

  const [ stateData, setStateData ] = useContext(StateDataContext);
  const stateSummary = stateData['summary'];
  const [districtingSummary, setDistrictingSummary] = useContext(DistrictingSummaryContext);


  const handleRedistrictingClick = async () => {
    // const response = await fetch (
    //   `/redistrictingClick?id=${number}`
    // )
    // const body = await response.json();
    console.log(number);
    // setDistrictingSummary()

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
          > Districting {number}</Text>
          <VStack align='left'>
            <Image 
              src={thumbnail[number-1]}
              onMouseEnter={stopPropagation}
              onMouseLeave={stopPropagation}
            ></Image>
            <Text
              fontSize={"xl"}
              onMouseEnter={stopPropagation}
              onMouseLeave={stopPropagation}
            >{bestMeasure}</Text>
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
