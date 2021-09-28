import { Box, Image } from '@chakra-ui/react';

export default function Redistricting(props) {
  const { number, thumbnail, features } = props;
  return (
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Image src={thumbnail} />
      <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' isTruncated>
        District {number}
      </Box>
      <Box>{features}</Box>
    </Box>
  );
}
