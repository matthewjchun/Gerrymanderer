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
import { PieChart } from 'react-minimal-pie-chart';
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

  const tData = [
    { title: 'White', value: tWhite, color: '#87CEEB' },
    { title: 'Black or African', value: tAfrican, color: '#ADD8E6' },
    { title: 'Asian', value: tAsian, color: '#A7C7E7' },
    { title: 'Hispanic', value: tHispanic, color: '#4682B4' },
    { title: 'Native American', value: tNative, color: '#0F52BA' },
    { title: 'Pacific Islander', value: tPacific, color: '#0818A8'},
  ];

  const vData = [
    { title: 'White', value: vWhite, color: '#87CEEB' },
    { title: 'Black or African', value: vAfrican, color: '#ADD8E6' },
    { title: 'Asian', value: vAsian, color: '#A7C7E7' },
    { title: 'Hispanic', value: vHispanic, color: '#4682B4' },
    { title: 'Native American', value: vNative, color: '#0F52BA' },
    { title: 'Pacific Islander', value: vPacific, color: '#1C7CFF'},
  ];

  const cData = [
    { title: 'White', value: cWhite, color: '#87CEEB' },
    { title: 'Black or African', value: cAfrican, color: '#ADD8E6' },
    { title: 'Asian', value: cAsian, color: '#A7C7E7' },
    { title: 'Hispanic', value: cHispanic, color: '#4682B4' },
    { title: 'Native American', value: cNative, color: '#0F52BA' },
    { title: 'Pacific Islander', value: cPacific, color: '#0818A8'},
  ];


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
        {popType == 0 ?
        <PieChart
            data={tData}
            label={({ dataEntry }) =>
              Math.round(dataEntry.percentage) + '%'
            }
            labelStyle={(index) => ({
              fill: tData[index].color,
              fontSize: '5px',
              fontFamily: 'sans-serif',
            })}
            radius={25}
            labelPosition={112}
        />:
        popType == 1 ?
        <PieChart
            data={vData}
            label={({ dataEntry }) =>
              Math.round(dataEntry.percentage) + '%'
            }
            labelStyle={(index) => ({
              fill: vData[index].color,
              fontSize: '5px',
              fontFamily: 'sans-serif',
            })}
            radius={25}
            labelPosition={112}
        />:
        popType == 2 ?
        <PieChart
            data={cData}
            label={({ dataEntry }) =>
              Math.round(dataEntry.percentage) + '%'
            }
            labelStyle={(index) => ({
              fill: cData[index].color,
              fontSize: '5px',
              fontFamily: 'sans-serif',
            })}
            radius={25}
            labelPosition={112}
        />:
        null
      }
    </>
  );
}
