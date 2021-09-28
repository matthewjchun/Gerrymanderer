import { Box, Image } from '@chakra-ui/react';

export default function Redistricting(props) {
  const { number, thumbnail, bestMeasure } = props;
  return (
    <Box maxW='100%' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Image src={thumbnail} />
      <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' isTruncated>
        District {number}
      </Box>
      <Box h='100%'>{bestMeasure}</Box>
    </Box>
  );
}
