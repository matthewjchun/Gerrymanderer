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
import { Pie } from 'react-chartjs-2';

export default function Districts(props) {
  const { districtingId, number, population, popType, election } = props;

  let arrowFlag = false;

  let offset = (districtingId - 1) * 9;

  // election

  // const dem = election[0]["democratic"];
  // const rep = election[0]["republican"];
  const dem = 2;
  const rep = 3;

  if (dem > rep) {
    arrowFlag = true;
  }

  let TOTAL = population[0]["total"].toLocaleString();
  let VAP = population[1]["total"].toLocaleString();
  let CVAP = population[2]["total"].toLocaleString();

  let tWhite = population[0]['white'];
  let tAfrican = population[0]['african'];
  let tAsian = population[0]['asian'];
  let tHispanic = population[0]['hispanic'];
  let tNative = population[0]['nativeAmerican'];
  let tPacific = population[0]['pacificIslander'];

  let vWhite = population[1]['white'];
  let vAfrican = population[1]['african'];
  let vAsian = population[1]['asian'];
  let vHispanic = population[1]['hispanic'];
  let vNative = population[1]['nativeAmerican'];
  let vPacific = population[1]['pacificIslander'];

  let cWhite = population[2]['white'];
  let cAfrican = population[2]['african'];
  let cAsian = population[2]['asian'];
  let cHispanic = population[2]['hispanic'];
  let cNative = population[2]['nativeAmerican'];
  let cPacific = population[2]['pacificIslander'];

  const tData = {
    labels: ['White', 'Black or African', 'Asian', 'Hispanic', 'Native American', 'Pacific Islander'],
    datasets: [
      {
        label: '# of people',
        data: [ tWhite, tAfrican, tAsian, tHispanic, tNative, tPacific ],
        backgroundColor: [
          '#87CEEB',
          '#ADD8E6',
          '#A7C7E7',
          '#4682B4',
          '#0F52BA',
          '#0818A8'
        ],
        borderColor:  [
          '#87CEEB',
          '#ADD8E6',
          '#A7C7E7',
          '#4682B4',
          '#0F52BA',
          '#0818A8'
        ],
        borderWidth: 1,
      },
    ],
  };

  const vData = {
    labels: ['White', 'Black or African', 'Asian', 'Hispanic', 'Native American', 'Pacific Islander'],
    datasets: [
      {
        label: '# of people',
        data: [ vWhite, vAfrican, vAsian, vHispanic, vNative, vPacific ],
        backgroundColor: [
          '#87CEEB',
          '#ADD8E6',
          '#A7C7E7',
          '#4682B4',
          '#0F52BA',
          '#0818A8'
        ],
        borderColor:  [
          '#87CEEB',
          '#ADD8E6',
          '#A7C7E7',
          '#4682B4',
          '#0F52BA',
          '#0818A8'
        ],
        borderWidth: 1,
      },
    ],
  };

  const cData = {
    labels: ['White', 'Black or African', 'Asian', 'Hispanic', 'Native American', 'Pacific Islander'],
    datasets: [
      {
        label: '# of people',
        data: [ cWhite, cAfrican, cAsian, cHispanic, cNative, cPacific ],
        backgroundColor: [
          '#87CEEB',
          '#ADD8E6',
          '#A7C7E7',
          '#4682B4',
          '#0F52BA',
          '#0818A8'
        ],
        borderColor:  [
          '#87CEEB',
          '#ADD8E6',
          '#A7C7E7',
          '#4682B4',
          '#0F52BA',
          '#0818A8'
        ],
        borderWidth: 1,
      },
    ],
  };


  return (
      <>
        <Text fontSize='xl' align='center'><b>District {number-offset}</b></Text>
        <Table variant='striped' colorScheme='gray' overflow='hidden'>
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
                  {dem.toLocaleString()}
                </Td>
                <Td isNumeric>
                  {rep.toLocaleString()}
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
        {popType == 0 ?
          <Pie data={tData}></Pie>:
        popType == 1 ?
          <Pie data={vData}></Pie>:
        popType == 2 ?
          <Pie data={cData}></Pie>:
        null
        }
        <br />
    </>
  );
}
