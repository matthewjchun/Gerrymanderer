import { useState, useContext } from 'react';
import { DataContext, StateContext } from '../contexts/State';
import { GeoJSONContext } from '../contexts/GeoJSON';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import {
  Text,
  Button,
  Flex,
  HStack,
  VStack,
  Grid,
  GridItem,
  Tooltip,
} from '@chakra-ui/react';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { Checkbox, CheckboxGroup } from "@chakra-ui/react"
import { QuestionIcon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/hooks';
import { AlgorithmContext } from '../contexts/Algorithm';

import themes from '../themes';
import Redistricting from './Redistricting';
import az from '../img/az/az.js';
import mi from '../img/mi/mi.js';
import va from '../img/va/va.js';
import { BoxZoomHandler } from 'mapbox-gl';
import postProcessed from '../data/postprocessed4.json';
import AlgoProgress from './AlgoProgress';
import { StateDataContext } from '../contexts/StateData';
import { DistrictingSummaryContext } from '../contexts/DistrictingSummary';


// maps property names to display names
const measureMap = {
  popEquality: 'Population Equality',
  compactness: 'Compactness',
  majorityMinority: 'Majority-Minority',
};

export default function LeftPane(props) {
  const { isOpen, onClose, onBoxOpen } = props;
  const [popEquality, setPopEquality] = useState(0);
  const [compactness, setCompactness] = useState(0);
  const [majorityMinority, setMajorityMinority] = useState(0);

  const { isOpen: isModalOpen , onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()

  const [activeState, setActiveState] = useContext(StateContext);
  const [stateData, setStateData] = useContext(StateDataContext);
  const [geoJSON, setGeoJSON] = useContext(GeoJSONContext);
  const [algorithm, setAlgorithm] = useContext(AlgorithmContext);
  const [districtingSummary, setDistrictingSummary] = useContext(DistrictingSummaryContext);

  const stateSummary = stateData['summary'];
  const districtingSummaries = stateSummary['districtingSummaries'];
  console.log(districtingSummaries);

  const handlePopEqualityInput = (val) => setPopEquality(val);
  const handleCompactnessInput = (val) => setCompactness(val);
  const handleMajorityMinorityInput = (val) => setMajorityMinority(val);

  // const handleRedistrictingClick = (e) => {
  //   console.log();
  // };

  const districtingId = districtingSummary["id"] - 1;
  console.log(districtingId);

  const algorithmURL = `/algorithm?id=${districtingId}&popEqThresh=${popEquality/100}&polsbyPopperThresh=${compactness}&majorityMinorityThresh=${majorityMinority}`;

  const handleAlgorithmStart = async () => {
    const response = await fetch(
      `/algorithm?id=${districtingId}&popEqThresh=${popEquality/100}&polsbyPopperThresh=${compactness}&majorityMinorityThresh=${majorityMinority}`
    );
    const algorithm = await response.json();
    setAlgorithm(algorithm);
    console.log(algorithm);
    onModalOpen();
  }

  const redistrictingTabTooltip =
    'Select one of the following 30 redistrictings to improve on.';
  const constraintsTabTooltip =
    'Optionally modify thresholds for the following measures for the improved redistricting.';
  const BoxAndWhiskerTabTooltip =
    'Construct a box and whisker plot where the measures of your selected districtings are overlayed on top of the 10,000 districtings measures.';

  const popEqualityTooltip =
    'Set the minimum percentage threshold population equality for the improved redistricting. The final value will be converted to a percentage. [0, 10]';
  const majorityMinorityToolTip =
    'Set the maximum percentage threshold for the minority population per congressional district in the improved redistricting. [0, 9]';

  let i = 1;

  return (
    <>
      {algorithm != null ? 
        <AlgoProgress 
          isOpen={isModalOpen} 
          onClose={onModalClose} 
          onModalOpen={onModalOpen} 
          activeState={activeState}
          algorithmURL={algorithmURL}
          popEquality={popEquality/100}
        > </AlgoProgress>:
        null
      }
      <Drawer
        size='md'
        isOpen={isOpen}
        onClose={onClose}
        placement={'left'}
        variant='permanent'
      >
        {/* <DrawerOverlay /> */}
        <DrawerContent overflow='scroll'>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack spacing='200px'>
              <Text>User Settings</Text>
            </HStack>  
          </DrawerHeader>
          <Tabs isFitted variant='enclosed'>
            <TabList mb='1em'>
              <Tab>
                <HStack spacing='5'>
                  <Text>SeaWulf Redistrictings</Text>
                  <Tooltip
                    label={redistrictingTabTooltip}
                    fontSize='md'
                    placement='right'
                  >
                    <QuestionIcon />
                  </Tooltip>
                </HStack>
              </Tab>
              <Tab>
                <HStack spacing='5'>
                  <Text>Algorithm Measures</Text>
                  <Tooltip
                    label={constraintsTabTooltip}
                    fontSize='md'
                    placement='right'
                  >
                    <QuestionIcon />
                  </Tooltip>
                </HStack>
              </Tab>
              <Tab>
                <HStack spacing='5'>
                  <Text>Box And Whisker</Text>
                  <Tooltip
                    label={BoxAndWhiskerTabTooltip}
                    fontSize='md'
                    placement='right'
                  >
                    <QuestionIcon />
                  </Tooltip>
                </HStack>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {activeState == 'Arizona' ? (
                  <VStack spacing='2'>
                  {/* <HStack spacing='5px'> */}
                    {stateSummary['districtingSummaries'].map((districting) => {
                        
                        return (
                            <Redistricting
                              display={i++}
                              number={districting.id}
                              thumbnail={az}
                              popEquality={districting.populationEqualityTotal}
                              compactness={districting.avgPolsbyPopper}
                              majorityMinority={districting.majorityMinorityCountTotal}
                              onClose={onClose}
                            />
                        );
                    })}
                    {/* </HStack> */}
                  </VStack>
                ) : null}
                {/* {activeState == 'Michigan' ? (
                  <VStack spacing='3'>
                    {miData.map((set) => {
                      const best = bestMeasure(set);
                      return (
                        <HStack spacing='3'>
                          {best.map((numMeasure) => {
                            const [number, measure, allMeasures] = numMeasure;
                            return (
                              <Redistricting
                                number={number}
                                thumbnail={mi}
                                bestMeasure={measureMap[measure]}
                                measures={allMeasures}
                              />
                            );
                          })}
                        </HStack>
                      );
                    })}
                  </VStack>
                ) : null}
                {activeState == 'Virginia' ? (
                  <VStack spacing='3'>
                    {vaData.map((set) => {
                      const best = bestMeasure(set);
                      return (
                        <HStack spacing='3'>
                          {best.map((numMeasure) => {
                            const [number, measure, allMeasures] = numMeasure;
                            return (
                              <Redistricting
                                number={number}
                                thumbnail={va}
                                bestMeasure={measureMap[measure]}
                                measures={allMeasures}
                              />
                            );
                          })}
                        </HStack>
                      );
                    })}
                  </VStack>
                ) : null}*/}
              </TabPanel> 
              <TabPanel>
                <DrawerBody>
                  <VStack align='left' spacing='5'>
                    <HStack spacing='5'>
                      <Text>Population Equality</Text>
                      <Tooltip
                        label={popEqualityTooltip}
                        fontSize='md'
                        placement='right'
                      >
                        <QuestionIcon />
                      </Tooltip>
                    </HStack>
                    <HStack spacing='5'>
                      <Slider
                        aria-label='population-equality'
                        value={popEquality}
                        onChange={handlePopEqualityInput}
                        focusThumbOnChange={false}
                        min={0} 
                        max={10}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb bg={themes.colors.blue[500]} />
                      </Slider>
                      <NumberInput
                        value={popEquality}
                        min={0}
                        max={10}
                        onChange={handlePopEqualityInput}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </HStack>
                    <HStack>
                      <Text>Majority-Minority Districts</Text>
                      <Tooltip
                        label={majorityMinorityToolTip}
                        fontSize='md'
                        placement='right'
                      >
                        <QuestionIcon />
                      </Tooltip>
                    </HStack>
                    <HStack>
                      <Slider
                        aria-label='majority-minority-districts'
                        defaultValue={majorityMinority}
                        onChange={handleMajorityMinorityInput}
                        focusThumbOnChange={false}
                        min={0} 
                        max={9}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb bg={themes.colors.blue[500]} />
                      </Slider>
                      <NumberInput
                        value={majorityMinority}
                        min={0}
                        max={9}
                        onChange={handleMajorityMinorityInput}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </HStack>
                    <VStack spacing='3' align='right'>
                      <Button onClick={handleAlgorithmStart}>
                        <Text>Generate</Text>
                      </Button>
                    </VStack> 
                  </VStack>
                </DrawerBody>
              </TabPanel>
              <TabPanel>
                {activeState == 'Arizona' ? (
                    <VStack spacing='3' align='right'>
                      <Button onClick={onBoxOpen}>
                        <Text>Generate</Text>
                      </Button>
                    </VStack> 
                    ) : null}
              </TabPanel>
            </TabPanels>
          </Tabs>
          <DrawerFooter>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
