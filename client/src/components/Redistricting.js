import { Box, Text, Image, Tooltip } from '@chakra-ui/react';

export default function Redistricting(props) {
  const { number, thumbnail, bestMeasure, measures } = props;
  const { popEquality, compactness, majorityMinority, enactedDeviation } =
    measures;
  return (
    <Tooltip
      label={`Population Equality: ${popEquality}
      Compactness: ${compactness}
      Majority-Minority: ${majorityMinority}
      Deviation from Enacted Districting: ${enactedDeviation}`}
    >
      <Box
        maxW='sm'
        p='3'
        borderWidth='1px'
        borderRadius='lg'
        overflow='hidden'
        __hover={{ boxShadow: '0px 5px 8px #888888' }}
      >
        <Image maxW='100%' src={thumbnail} />
        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          isTruncated
        >
          <Text>District {number}</Text>
        </Box>
        <Box maxW='100%' h='50px' overflow='hidden'>
          <Text maxW='100%'>{bestMeasure}</Text>
        </Box>
      </Box>
    </Tooltip>
  );
}
