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
import Chart from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import Districts from './Districts';
import { StateContext } from '../contexts/State';
import { PopulationTypeContext } from '../contexts/PopulationType';
import { StateDataContext } from '../contexts/StateData';
import { DistrictingSummaryContext } from '../contexts/DistrictingSummary';


export default function StateDrawer(props) {
  const { isOpen, onOpen, onClose } = props;
  const [activeState] = useContext(StateContext);
  const [value, setValue] = useState('0');
  const [populationType, setPopulationType] = useContext(PopulationTypeContext);
  const [districtingSummary, setDistrictingSummary] = useContext(DistrictingSummaryContext);
  const [stateData, setStateData] = useContext(StateDataContext);
  const stateSummary = stateData['summary'];
  console.log(stateSummary)

  // POPULATION MEASURE
  const typeMap = {
    0: 'TOTAL',
    1: 'VAP',
    2: 'CVAP',
  };

  let TOTAL = stateSummary['populations'][0]['total'];
  let VAP = stateSummary['populations'][1]['total'];
  let CVAP = stateSummary['populations'][2]['total'];
  
  let districts = districtingSummary['districtSummaries'];
  let districtingId = districtingSummary['id'];

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

  // ELECTION SPLIT STATISTICS

  let dem = stateSummary['elections'][0]['democratic'];
  let rep = stateSummary['elections'][0]['republican'];
  let total = dem + rep;
  let demPercent = dem / total;
  let repPercent = rep / total;

  const populationFetch = async (value) => {
    setValue(value);
    setPopulationType(typeMap[value]);
    const response = await fetch('/populationType', {
      method: 'POST',
      body: JSON.stringify({ populationType: typeMap[value] }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    const body = await response.json();
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
                <Text fontSize='3xl'><b>Statistics</b></Text>
                {value == '0' ? (
                  <Text>Population: {TOTAL.toLocaleString()}
                  <br/>
                  Total Congressional Districts: {stateData['enacted']['districts']['features'].length}
                  <br/>
                  Population Equality: {districtingSummary['populationEqualityTotal'].toPrecision(3)}
                  <br/>
                  Compactness: {districtingSummary['avgPolsbyPopper'].toPrecision(3)}
                  <br/>
                  Majority Minority Districts: {districtingSummary['majorityMinorityCountTotal']}
                  <br />
                  Efficiency Gap: 0.49456
                  <br />
                  Objective Function: {districtingSummary['objectiveValue']}
                  </Text>
                ) : value == '1' ? (
                  <Text> Population: {VAP.toLocaleString()}
                  <br/>
                  Total Congressional Districts: {stateData['enacted']['districts']['features'].length}
                  <br/>
                  Population Equality: {districtingSummary['populationEqualityVAP'].toPrecision(3)}
                  <br/>
                  Compactness: {districtingSummary['avgPolsbyPopper'].toPrecision(3)}
                  <br/>
                  Majority Minority Districts: {districtingSummary['majorityMinorityCountVAP']}
                  <br />
                  Efficiency Gap: 0.49456
                  <br />
                  Objective Function: {districtingSummary['objectiveValue']}
                  </Text>
                ) : value == '2' ? (
                  <Text> Population: {CVAP.toLocaleString()}
                  <br/>
                  Total Congressional Districts: {stateData['enacted']['districts']['features'].length}
                  <br/>
                  Population Equality: {districtingSummary['populationEqualityCVAP'].toPrecision(3)}
                  <br/>
                  Compactness: {districtingSummary['avgPolsbyPopper'].toPrecision(3)}
                  <br/>
                  Majority Minority Districts: {districtingSummary['majorityMinorityCountCVAP']} 
                  <br />
                  Efficiency Gap: 0.49456
                  <br />
                  Objective Function: {districtingSummary['objectiveValue']}
                  </Text>
                ) : null}
                <br />
                <Text fontSize='2xl'><b>2018 Attorney General Elections</b></Text>
                <StatGroup>
                  <Stat>
                    <StatLabel>Democratic</StatLabel>
                    <StatNumber>
                      {dem.toLocaleString()}
                    </StatNumber>
                    <StatHelpText>
                    {dem > rep ? 
                    <StatArrow type='increase' />:
                    <StatArrow type='decrease' />
                    }
                      {demPercent.toLocaleString("en", {style: "percent", minimumFractionDigits: 2})}
                    </StatHelpText>
                  </Stat>
                  <Stat>
                    <StatLabel>Republican</StatLabel>
                    <StatNumber>
                      {rep.toLocaleString()}
                    </StatNumber>
                    <StatHelpText>
                    {dem < rep ? 
                    <StatArrow type='increase' />:
                    <StatArrow type='decrease' />
                    }
                      {repPercent.toLocaleString("en", {style: "percent", minimumFractionDigits: 2})}
                    </StatHelpText>
                  </Stat>
                </StatGroup>
                <Text fontSize='2xl'><p id='chartTitle'><b>Demographics</b></p></Text>
                {value == 0 ?
                  <Pie data={tData}></Pie>:
                 value == 1 ?
                  <Pie data={vData}></Pie>:
                 value == 2 ?
                  <Pie data={cData}></Pie>:
                 null
                }
              </TabPanel>
              <TabPanel style={{maxWidth: '100%'}}>
               {districts.map((district) => {
                  return(
                  <Districts
                    districtingId={districtingId} 
                    number={district.districtId} 
                    population={district.populations} 
                    election={district.elections} 
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
