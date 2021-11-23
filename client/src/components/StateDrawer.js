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

  const data = [
    { title: 'White', value: 2849063, color: '#E38627' },
    { title: 'Black or African', value: 178788, color: '#C13C37' },
    { title: 'American Indian', value: 171607, color: '#FC4040' },
    { title: 'Asian', value: 147661, color: '#71DE6A' },
    { title: 'Hispanic', value: 1121876, color: '#6A2135' },
  ];
  /* 
  const processGeoJSONData = () => {
    if (!geoJSONdata) return null;
    let features = geoJSONdata.features;
    let processed = { state: activeState };
    processed.numDistricts = Object.keys(features).length;
    return processed;
  };

  let processedData = processGeoJSONData(); */

  let TOTAL = stateSummary["populations"][0]["total"];
  let VAP = stateSummary["populations"][1]["total"];
  let CVAP = stateSummary["populations"][2]["total"];

  let districts = stateSummary["districtingSummaries"][0]["districtSummaries"];

  const typeMap = {
    0: 'TOTAL',
    1: 'VAP',
    2: 'CVAP',
  };

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
                        <Box flex='1' textAlign='left'>
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
                  <Text> Population: {TOTAL} </Text>
                ) : value == '1' ? (
                  <Text> Population: {VAP} </Text>
                ) : value == '2' ? (
                  <Text> Population: {CVAP} </Text>
                ) : null}
                <Divider />
                {/* <Text>Precincts: 1,495</Text> */}
                <Divider />
                <Text>2018 Attorney General Elections</Text>
                <Table variant='simple'>
                  <TableCaption>Results</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Party</Th>
                      <Th>Districts</Th>
                      <Th isNumeric>Total Votes</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Democratic Party</Td>
                      <Td>5</Td>
                      <Td isNumeric></Td>
                    </Tr>
                    <Tr>
                      <Td>Republican Party</Td>
                      <Td>4</Td>
                      <Td isNumeric>1,638,516</Td>
                    </Tr>
                  </Tbody>
                </Table>
                <StatGroup>
                  <Stat>
                    <StatLabel>Democratic</StatLabel>
                    <StatNumber>1,629,318</StatNumber>
                    <StatHelpText>
                      <StatArrow type='decrease' />
                      49.85%
                    </StatHelpText>
                  </Stat>

                  <Stat>
                    <StatLabel>Republican</StatLabel>
                    <StatNumber>1,638,516</StatNumber>
                    <StatHelpText>
                      <StatArrow type='increase' />
                      50.13%
                    </StatHelpText>
                  </Stat>
                </StatGroup>
                <Divider />
                <p id='chartTitle'>Demographics</p>
                <PieChart
                  data={data}
                  label={({ dataEntry }) =>
                    Math.round(dataEntry.percentage) + '%'
                  }
                  labelStyle={(index) => ({
                    fill: data[index].color,
                    fontSize: '5px',
                    fontFamily: 'sans-serif',
                  })}
                  radius={42}
                  labelPosition={112}
                />
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
                      <Td>2,849,063</Td>
                      <Td bg='#E38627'></Td>
                    </Tr>
                    <Tr>
                      <Td>Hispanic</Td>
                      <Td>1,121,876</Td>
                      <Td bg='#6A2135'></Td>
                    </Tr>
                    <Tr>
                      <Td>Black or African</Td>
                      <Td>178,788</Td>
                      <Td bg='#C13C37'></Td>
                    </Tr>
                    <Tr>
                      <Td>American Indian</Td>
                      <Td>171,607</Td>
                      <Td bg='#FC4040'></Td>
                    </Tr>
                    <Tr>
                      <Td>Asian</Td>
                      <Td>147,661</Td>
                      <Td bg='#71DE6A'></Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TabPanel>
              <TabPanel>
               {districts.map((district) => {
                  return(
                  <Districts number={district.districtId} population={district.populations} 
                  election={district.elections}></Districts>
                  )
                })}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
        {/* <DrawerFooter>
                    </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
}
