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
    console.log("ji")
  };

  const handleMouseLeave = (e) => {
    e.target.style.boxShadow = 'none';
  };
  
  return (
    <Popover isLazy trigger='hover'>
      <PopoverTrigger>
        <Box
          maxW='md'
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
          {/* <Image maxW='100%' src={thumbnail} /> */}
          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            isTruncated
          >
            <Text fontSize='2xl'>District {number}</Text>
          </Box>
          <Text maxW='100%' h='50px'> {bestMeasure} </Text>
          {/* <Box maxW='100%' h='50px' overflow='hidden'>
            <Text maxW='100%'>{bestMeasure}</Text>
          </Box> */}
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
