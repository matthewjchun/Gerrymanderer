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
import { useState } from 'react';

export default function Districts(props) {
  const { number, population, popType } = props;
  const { arrowFlag, setArrowFlag } = useState(false);

  // const dem = election[0]["democratic"];
  // const rep = election[0]["republican"];
  const dem = 2;
  const rep = 3;
  if (dem > rep) {
    setArrowFlag(true);
  }


  // election

  let TOTAL = population[0]["total"].toLocaleString();
  let VAP = population[1]["total"].toLocaleString();
  let CVAP = population[2]["total"].toLocaleString();

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
            {popType == 0 ? 
              <Td>{TOTAL}</Td>:
             popType == 1 ? 
              <Td>{VAP}</Td>:    
             popType == 2 ?
              <Td>{CVAP} </Td>:
             null
            }
                <Td isNumeric>
                  {/* {election[0]["democratic"].toLocaleString()} */}
                </Td>
                <Td isNumeric>
                  {/* {election[0]["republican"].toLocaleString()} */}
                </Td>
            {arrowFlag ? 
              <Tr>
                <Td></Td>
                <Td isNumeric>
                <StatArrow type='increase' />
                </Td>
                <Td isNumeric>
                <StatArrow type='decrease' />
                </Td>
              </Tr>:
            <Tr>
                <Td></Td>
                <Td isNumeric>
                <StatArrow type='decrease' />
                </Td>
                <Td isNumeric>
                <StatArrow type='increase' />
                </Td>
            </Tr>
            }
            </Tbody>
        </Table>
    </>
  );
}
