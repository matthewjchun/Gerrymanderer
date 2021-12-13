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
import az from '../img/az.jpg';
import mi from '../img/mi.jpg';
import va from '../img/va.jpg';
import { BoxZoomHandler } from 'mapbox-gl';
import Reset from './Reset';
import postProcessed from '../data/postprocessed4.json';

// maps property names to display names
const measureMap = {
  popEquality: 'Population Equality',
  compactness: 'Compactness',
  majorityMinority: 'Majority-Minority',
};

// returns an array of best measures for each redistricting in a given state
const bestMeasure = (data) => {
  let best = [];
  for (let i = 0; i < data.length; i++) {
    let districting = data[i];
    let maxProp = 'popEquality';
    let max = parseInt(districting.popEquality);
    for (let measure in districting) {
      if (measure === 'number') continue;
      if (measure === 'popEquality' || measure === 'compactness') {
        if (parseInt(districting[measure]) > max) {
          maxProp = measure;
          max = parseInt(districting.measure);
        }
      } else {
        if (100 - parseInt(districting[measure]) > max) {
          maxProp = measure;
          max = parseInt(districting.measure);
        }
      }
    }
    best.push([districting.number, maxProp, districting]);
  }
  return best;
};

const azData = [
  [
    {
      number: postProcessed["1"]["id"],
      popEquality: postProcessed["1"]["pop_eq"].toLocaleString(undefined, {minimumFractionDigits: 2}),
      compactness: postProcessed["1"]["polsby_avg"],
      majorityMinority: postProcessed["1"]["majority_minority_tot"],
    },
    {
      number: 2,
      popEquality: '59',
      compactness: '28',
      majorityMinority: '59',
    },
  ],
  [
    {
      number: 3,
      popEquality: '53',
      compactness: '46',
      majorityMinority: '99',
    },
    {
      number: 4,
      popEquality: '72',
      compactness: '54',
      majorityMinority: '42',
    },
  ],
  [
    {
      number: 5,
      popEquality: '53',
      compactness: '46',
      majorityMinority: '99',
    },
    {
      number: 6,
      popEquality: '77',
      compactness: '50',
      majorityMinority: '43',
    },
  ],
  [
    {
      number: 7,
      popEquality: '59',
      compactness: '28',
      majorityMinority: '59',
    },
    {
      number: 8,
      popEquality: '72',
      compactness: '54',
      majorityMinority: '42',
    },
  ],
  [
    {
      number: 9,
      popEquality: '92',
      compactness: '52',
      majorityMinority: '58',
    },
    {
      number: 10,
      popEquality: '48',
      compactness: '27',
      majorityMinority: '73',
    },
  ],
  [
    {
      number: 11,
      popEquality: '49',
      compactness: '68',
      majorityMinority: '27',
    },
    {
      number: 12,
      popEquality: '40',
      compactness: '28',
      majorityMinority: '57',
    },
  ],
  [
    {
      number: 13,
      popEquality: '72',
      compactness: '45',
      majorityMinority: '48',
    },
    {
      number: 14,
      popEquality: '95',
      compactness: '27',
      majorityMinority: '65',
    },
  ],
  [
    {
      number: 15,
      popEquality: '69',
      compactness: '87',
      majorityMinority: '53',
    },
    {
      number: 16,
      popEquality: '47',
      compactness: '94',
      majorityMinority: '23',
    },
  ],
  [
    {
      number: 17,
      popEquality: '37',
      compactness: '38',
      majorityMinority: '82',
    },
    {
      number: 18,
      popEquality: '65',
      compactness: '23',
      majorityMinority: '54',
    },
  ],
  [
    {
      number: 19,
      popEquality: '84',
      compactness: '36',
      majorityMinority: '60',
    },
    {
      number: 20,
      popEquality: '73',
      compactness: '34',
      majorityMinority: '45',
    },
  ],
  [
    {
      number: 21,
      popEquality: '90',
      compactness: '53',
      majorityMinority: '50',
    },
    {
      number: 22,
      popEquality: '48',
      compactness: '26',
      majorityMinority: '59',
    },
  ],
  [
    {
      number: 23,
      popEquality: '27',
      compactness: '49',
      majorityMinority: '49',
    },
    {
      number: 24,
      popEquality: '93',
      compactness: '84',
      majorityMinority: '27',
    },
  ],
  [
    {
      number: 25,
      popEquality: '36',
      compactness: '73',
      majorityMinority: '65',
    },
    {
      number: 26,
      popEquality: '33',
      compactness: '76',
      majorityMinority: '47',
    },
  ],
  [
    {
      number: 27,
      popEquality: '48',
      compactness: '87',
      majorityMinority: '53',
    },
    {
      number: 28,
      popEquality: '95',
      compactness: '57',
      majorityMinority: '25',
    },
  ],
  [
    {
      number: 29,
      popEquality: '59',
      compactness: '48',
      majorityMinority: '93',
    },
    {
      number: 30,
      popEquality: '15',
      compactness: '36',
      majorityMinority: '45',
    },
  ],
];

export default function LeftPane(props) {
  const { isOpen, onClose, isModalOpen, onModalOpen, onBoxOpen } = props;
  const [popEquality, setPopEquality] = useState(0);
  const [compactness, setCompactness] = useState(0);
  const [majorityMinority, setMajorityMinority] = useState(0);
  const { isOpen: isResetOpen, onOpen: onResetOpen, onClose: onResetClose } = useDisclosure()

  const [activeState, setActiveState] = useContext(StateContext);
  const [geoJSON, setGeoJSON] = useContext(GeoJSONContext);
  const [algorithm, setAlgorithm] = useContext(AlgorithmContext);

  const handlePopEqualityInput = (val) => setPopEquality(val);
  const handleCompactnessInput = (val) => setCompactness(val);
  const handleMajorityMinorityInput = (val) => setMajorityMinority(val);

  const handleRedistrictingClick = (e) => {
    console.log(e.target.number);
  };

  const handleAlgorithmStart = async () => {
    const response = await fetch(
      `/algorithm?id=0&popEqThresh=${popEquality/100}&polsbyPopperThresh=0.3&majorityMinorityThresh=${majorityMinority}`
    );
    const algorithm = await response.json();
    setAlgorithm(algorithm);
    console.log(algorithm);
    onModalOpen();
  }

  const handleAlgorithmRun = async () => {
    const response = await fetch(
      `/algorithmSummary`
    );
    const algorithm = await response.json();
    setAlgorithm(algorithm);
    console.log("fetched again")
    console.log(algorithm);
  }

  const redistrictingTabTooltip =
    'Select one of the following 30 redistrictings to improve on.';
  const constraintsTabTooltip =
    'Optionally modify thresholds for the following measures for the improved redistricting.';
  const BoxAndWhiskerTabTooltip =
    'Construct a box and whisker plot where the measures of your selected districtings are overlayed on top of the 10,000 districtings measures.';

  const popEqualityTooltip =
    'Set the minimum percentage threshold population equality for the improved redistricting. The final value will be converted to a percentage. [0, 70]';
  const compactnessTooltip =
    'Set the minimum percentage threshold compactness for the improved redistricting. [0, 100]';
  const majorityMinorityToolTip =
    'Set the maximum percentage threshold for the minority population per congressional district in the improved redistricting. [0, 8]';


  return (
    <>
      <Reset 
        isOpen={isResetOpen} 
        onClose={onResetClose} 
        onOpen={onResetOpen} 
        handleAlgorithmRun={handleAlgorithmRun}
      ></Reset>
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
              <Button colorScheme='red' ml='10px' onClick={onResetOpen}>Reset</Button>
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
                    {azData.map((set) => {
                      const best = bestMeasure(set);
                      return (
                        <HStack spacing='2'>
                          {best.map((numMeasure) => {
                            const [number, measure, allMeasures] = numMeasure;
                            return (
                              <Redistricting
                                number={number}
                                thumbnail={az}
                                bestMeasure={measureMap[measure]}
                                measures={allMeasures}
                                handleRedistrictingClick={handleRedistrictingClick}
                              />
                            );
                          })}
                        </HStack>
                      );
                    })}
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
                        max={70}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb bg={themes.colors.blue[500]} />
                      </Slider>
                      <NumberInput
                        value={popEquality}
                        min={0}
                        max={70}
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
                      <Text>Compactness</Text>
                      <Tooltip
                        label={compactnessTooltip}
                        fontSize='md'
                        placement='right'
                      >
                        <QuestionIcon />
                      </Tooltip>
                    </HStack>
                    <HStack spacing='5'>
                      <Slider
                        aria-label='compactness'
                        value={compactness}
                        onChange={handleCompactnessInput}
                        focusThumbOnChange={false}
                        min={0} 
                        max={100}                                                                 // percentage
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb bg={themes.colors.blue[500]} />
                      </Slider>
                      <NumberInput
                        value={compactness}
                        min={0}
                        max={100}
                        onChange={handleCompactnessInput}
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
                      <Text fontSize='sm'>Last updated: 10 seconds ago</Text>
                    </VStack> 
                  </VStack>
                </DrawerBody>
              </TabPanel>
              <TabPanel>
                {activeState == 'Arizona' ? (
                  <VStack spacing='2'>
                    {azData.map((set) => {
                      const best = bestMeasure(set);
                      return (
                        <HStack spacing='2'>
                          {best.map((numMeasure) => {
                            const [number, measure, allMeasures] = numMeasure;
                            return (
                              <>
                                <Redistricting
                                  number={number}
                                  thumbnail={az}
                                  bestMeasure={measureMap[measure]}
                                  measures={allMeasures}
                                  onClick={handleRedistrictingClick}
                                />
                                <Checkbox> {number} </Checkbox>
                              </>
                            );
                          })}
                        </HStack>
                      );
                    })}
                    <VStack spacing='3' align='right'>
                      <Button onClick={onBoxOpen}>
                        <Text>Generate</Text>
                      </Button>
                    </VStack> 
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
