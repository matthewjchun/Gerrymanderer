import { Box, Text, Image, VStack } from '@chakra-ui/react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
  } from '@chakra-ui/react';
import {
Stat,
StatLabel,
StatNumber,
StatHelpText,
StatArrow,
StatGroup,
} from '@chakra-ui/react';

export default function Districs(props) {
  const { number, population, election } = props;

  return (
      <>
        <Text> DISTRICT {number} </Text>
        <Table variant='striped' colorScheme='gray'>
            <Thead>
            <Tr>
                <Th>Population</Th>
                <Th isNumeric>Democratic</Th>
                <Th isNumeric>Republican</Th>
            </Tr>
            </Thead>
            <Tbody>
            <Tr>
                <Td>{population[0]["total"]}</Td>
                <Td isNumeric>{election[0]["democratic"]}</Td>
                <Td isNumeric>{election[0]["republican"]}</Td>
            </Tr>
            <Tr>
                <Td></Td>
                <Td isNumeric>
                <StatArrow type='increase' />
                </Td>
                <Td isNumeric>
                <StatArrow type='decrease' />
                </Td>
            </Tr>
            </Tbody>
        </Table>
    </>
  );
}
