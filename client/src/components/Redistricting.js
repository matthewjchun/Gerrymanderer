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
} from '@chakra-ui/react';

export default function Redistricting(props) {
  const { number, bestMeasure, measures } = props;
  const { popEquality, compactness, majorityMinority } =
    measures;

  const handleMouseEnter = (e) => {
    e.target.style.boxShadow = '0px 5px 8px #888888';
  };

  const handleMouseLeave = (e) => {
    e.target.style.boxShadow = 'none';
  };
  
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
          onClick={props.handleRedistrictingClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Text 
            fontSize='2xl'
            fontWeight='semibold' 
            lineHeight='tight' mt='1' 
            isTruncated
          > District {number}</Text>
          <VStack align='left'>
            <Text>Population Equality: {popEquality}</Text>
            <Text>Compactness: {compactness}</Text>
            <Text>Majority-Minority: {majorityMinority}</Text>
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
