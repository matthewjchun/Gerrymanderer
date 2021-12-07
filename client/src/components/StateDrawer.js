import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react';
import { Text, Button, Flex, Spacer, Divider } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  VStack,
  Center,
} from '@chakra-ui/react';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
import { useContext, useState, useEffect } from 'react';
import { DataContext, StateContext } from '../contexts/State';
import { PieChart } from 'react-minimal-pie-chart';
import Districts from './Districts';

export default function StateDrawer(props) {
  const { isOpen, onOpen, onClose, stateSummary } = props;
  const [activeState] = useContext(StateContext);
  const [value, setValue] = useState('0');

  // POPULATION MEASURE
  const typeMap = {
    0: 'TOTAL',
    1: 'VAP',
    2: 'CVAP',
  };
  
  let TOTAL = stateSummary['populations'][0]['total'];
  let VAP = stateSummary['populations'][1]['total'];
  let CVAP = stateSummary['populations'][2]['total'];
  
  let districts = stateSummary['districtingSummaries'][0]['districtSummaries'];

  // DEMOGRAPHICS PIE CHART AND TABLE

  let tWhite = stateSummary['populations'][0]['white'];
  let tAfrican = stateSummary['populations'][0]['african'];
  let tAsian = stateSummary['populations'][0]['asian'];
  let tHispanic = stateSummary['populations'][0]['hispanic'];
  let tNative = stateSummary['populations'][0]['nativeAmerican'];
  let tPacific = stateSummary['populations'][0]['pacificIslander'];

  let vWhite = stateSummary['populations'][1]['white'];
  let vAfrican = stateSummary['populations'][1]['african'];
  let vAsian = stateSummary['populations'][1]['asian'];
  let vHispanic = stateSummary['populations'][1]['hispanic'];
  let vNative = stateSummary['populations'][1]['nativeAmerican'];
  let vPacific = stateSummary['populations'][1]['pacificIslander'];

  let cWhite = stateSummary['populations'][2]['white'];
  let cAfrican = stateSummary['populations'][2]['african'];
  let cAsian = stateSummary['populations'][2]['asian'];
  let cHispanic = stateSummary['populations'][2]['hispanic'];
  let cNative = stateSummary['populations'][2]['nativeAmerican'];
  let cPacific = stateSummary['populations'][2]['pacificIslander'];

  const tData = [
    { title: 'White', value: tWhite, color: '#87CEEB' },
    { title: 'Black or African', value: tAfrican, color: '#ADD8E6' },
    { title: 'Asian', value: tAsian, color: '#A7C7E7' },
    { title: 'Hispanic', value: tHispanic, color: '#4682B4' },
    { title: 'Native American', value: tNative, color: '#0F52BA' },
    { title: 'Pacific Islander', value: tPacific, color: '#0818A8'},
  ];

  const vData = [
    { title: 'White', value: vWhite, color: '#ABCEFD' },
    { title: 'Black or African', value: vAfrican, color: '#C13C37' },
    { title: 'Asian', value: vAsian, color: '#71DE6A' },
    { title: 'Hispanic', value: vHispanic, color: '#6A2135' },
    { title: 'Native American', value: vNative, color: '#FC4040' },
    { title: 'Pacific Islander', value: vPacific, color: '#1C7CFF'},
  ];

  const cData = [
    { title: 'White', value: cWhite, color: '#ABCEFD' },
    { title: 'Black or African', value: cAfrican, color: '#C13C37' },
    { title: 'Asian', value: cAsian, color: '#71DE6A' },
    { title: 'Hispanic', value: cHispanic, color: '#6A2135' },
    { title: 'Native American', value: cNative, color: '#FC4040' },
    { title: 'Pacific Islander', value: cPacific, color: '#1C7CFF'},
  ];

  // ELECTION SPLIT STATISTICS

  // let dem = stateSummary['elections'][0]['democratic'];
  // let rep = stateSummary['elections'][0]['republican'];
  let dem = 2;
  let rep = 5;
  let total = dem + rep;
  let demPercent = dem / total;
  let repPercent = rep / total;

  const populationFetch = async (value) => {
    setValue(value);
    const response = await fetch('/populationType', {
      method: 'POST',
      body: JSON.stringify({ populationType: typeMap[value] }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    const body = await response.json();
    console.log(body);
    return body;
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      size='sm'
      placement='right'
      variant='permanent'
    >
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Text
            flex='1'
            fontWeight='bold'
            fontSize='1.5em'
            m='auto'
            align='center'
          >
            {activeState}
          </Text>
        </DrawerHeader>
        <DrawerBody>
          <Tabs>
            <TabList>
              <Flex align='center' justify='space-evenly'>
                <Tab>State Statistics</Tab>
                <Tab>Districts</Tab>
              </Flex>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex='1' textAlign='center'>
                          Population Measure
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <RadioGroup
                        onChange={populationFetch}
                        value={value}
                        defaultValue='0'
                      >
                        <Stack>
                          <Radio
                            size='md'
                            value='0'
                            colorScheme='blue'
                            defaultChecked
                          >
                            Total Population
                          </Radio>
                          <Radio size='md' value='1' colorScheme='blue'>
                            Voting Age Population
                          </Radio>
                          <Radio size='md' value='2' colorScheme='blue'>
                            Citizen Voting Age Population
                          </Radio>
                        </Stack>
                      </RadioGroup>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
                <br />
                <Text fontSize='3xl'>Statistics</Text>
                <br />
                <Divider />
                {value == '0' ? (
                  <Text> Population: {TOTAL.toLocaleString()} </Text>
                ) : value == '1' ? (
                  <Text> Population: {VAP.toLocaleString()} </Text>
                ) : value == '2' ? (
                  <Text> Population: {CVAP.toLocaleString()} </Text>
                ) : null}
                <Divider />
                <VStack spacing='24px'>
                  <br />
                  <Center>
                    <Text fontSize='xl'>2018 Attorney General Elections</Text>
                  </Center>
                  <br />
                </VStack>
                <StatGroup>
                  <Stat>
                    <StatLabel>Democratic</StatLabel>
                    <StatNumber>
                      {dem}
                    </StatNumber>
                    <StatHelpText>
                    {dem > rep ? 
                    <StatArrow type='increase' />:
                    <StatArrow type='decrease' />
                    }
                      {demPercent.toLocaleString("en", {style: "percent"})}
                    </StatHelpText>
                  </Stat>
                  <Stat>
                    <StatLabel>Republican</StatLabel>
                    <StatNumber>
                      {rep}
                    </StatNumber>
                    <StatHelpText>
                    {dem < rep ? 
                    <StatArrow type='increase' />:
                    <StatArrow type='decrease' />
                    }
                      {repPercent.toLocaleString("en", {style: "percent"})}
                    </StatHelpText>
                  </Stat>
                </StatGroup>
                <Divider />
                <p id='chartTitle'>Demographics</p>
                {value == 0 ?
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
                      radius={35}
                      labelPosition={112}
                  />:
                 value == 1 ?
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
                      radius={35}
                      labelPosition={112}
                  />:
                 value == 2 ?
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
                      radius={35}
                      labelPosition={112}
                  />:
                 null
                }
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th>Race</Th>
                      <Th>Population</Th>
                      <Th>Color</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>White</Td>
                      {value == 1 ?
                        <Td isNumeric>{vWhite.toLocaleString()}</Td>:
                       value == 2 ?
                        <Td isNumeric>{cWhite.toLocaleString()}</Td>:
                       <Td isNumeric>{tWhite.toLocaleString()}</Td>}
                      <Td bg='#87CEEB'></Td>
                    </Tr>
                    <Tr>
                      <Td>Black or African</Td>
                      {value == 1 ?
                        <Td isNumeric>{vAfrican.toLocaleString()}</Td>:
                       value == 2 ?
                        <Td isNumeric>{cAfrican.toLocaleString()}</Td>:
                       <Td isNumeric>{tAfrican.toLocaleString()}</Td>}
                      <Td bg='#ADD8E6'></Td>
                    </Tr>
                    <Tr>
                      <Td>Asian</Td>
                      {value == 1 ?
                        <Td isNumeric>{vAsian.toLocaleString()}</Td>:
                       value == 2 ?
                        <Td isNumeric>{cAsian.toLocaleString()}</Td>:
                       <Td isNumeric>{tAsian.toLocaleString()}</Td>}
                      <Td bg='#A7C7E7'></Td>
                    </Tr>
                    <Tr>
                      <Td>Hispanic</Td>
                      {value == 1 ?
                        <Td isNumeric>{vHispanic.toLocaleString()}</Td>:
                       value == 2 ?
                        <Td isNumeric>{cHispanic.toLocaleString()}</Td>:
                       <Td isNumeric>{tHispanic.toLocaleString()}</Td>}
                      <Td bg='#4682B4'></Td>
                    </Tr>
                    <Tr>
                      <Td>Native American</Td>
                      {value == 1 ?
                        <Td isNumeric>{vNative.toLocaleString()}</Td>:
                       value == 2 ?
                        <Td isNumeric>{cNative.toLocaleString()}</Td>:
                       <Td isNumeric>{tNative.toLocaleString()}</Td>}
                      <Td bg='#0F52BA'></Td>
                    </Tr>
                    <Tr>
                      <Td>Pacific Islander</Td>
                      {value == 1 ?
                        <Td isNumeric>{vPacific.toLocaleString()}</Td>:
                       value == 2 ?
                        <Td isNumeric>{cPacific.toLocaleString()}</Td>:
                       <Td isNumeric>{tPacific.toLocaleString()}</Td>}
                      <Td bg='#0818A8'></Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TabPanel>
              <TabPanel>
               {districts.map((district) => {
                  return(
                  <Districts 
                    number={district.districtId} 
                    population={district.populations} 
                    // election={district.elections} 
                    popType={value}>  
                  </Districts>
                  )
                })}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
