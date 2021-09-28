import { useState, useContext } from 'react';
import { StateContext } from '../contexts/State';
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
import { QuestionIcon } from '@chakra-ui/icons';

import themes from '../themes';
import Redistricting from './Redistricting';
import az from '../img/az.jpg';
import mi from '../img/mi.jpg';
import va from '../img/va.jpg';
import { BoxZoomHandler } from 'mapbox-gl';

// maps property names to display names
const measureMap = {
  popEquality: 'Population Equality',
  compactness: 'Compactness',
  majorityMinority: 'Majority-Minority',
  enactedDeviation: 'Deviation from Enacted Districting',
};

// returns an array of best measures for each redistricting in a given state
const bestMeasure = (data) => {
  let best = [];
  for (let i = 0; i < data.length; i++) {
    let districting = data[i];
    let maxProp = 'popEquality';
    let max = districting.popEquality;
    for (let measure in districting) {
      if (districting[measure] > max) {
        maxProp = measure;
        max = districting.measure;
      }
    }
    best.push([districting.number, maxProp]);
  }
  return best;
};

const azData = [
  [
    {
      number: 1,
      popEquality: '77',
      compactness: '50',
      majorityMinority: '43',
      enactedDeviation: '10',
    },
    {
      number: 2,
      popEquality: '59',
      compactness: '28',
      majorityMinority: '59',
      enactedDeviation: '83',
    },
    {
      number: 3,
      popEquality: '53',
      compactness: '46',
      majorityMinority: '99',
      enactedDeviation: '55',
    },
  ],
  [
    {
      number: 4,
      popEquality: '72',
      compactness: '54',
      majorityMinority: '42',
      enactedDeviation: '60',
    },
    {
      number: 5,
      popEquality: '53',
      compactness: '46',
      majorityMinority: '99',
      enactedDeviation: '55',
    },
    {
      number: 6,
      popEquality: '77',
      compactness: '50',
      majorityMinority: '43',
      enactedDeviation: '10',
    },
  ],
  [
    {
      number: 7,
      popEquality: '59',
      compactness: '28',
      majorityMinority: '59',
      enactedDeviation: '83',
    },
    {
      number: 8,
      popEquality: '72',
      compactness: '54',
      majorityMinority: '42',
      enactedDeviation: '60',
    },
    {
      number: 9,
      popEquality: '92',
      compactness: '52',
      majorityMinority: '58',
      enactedDeviation: '17',
    },
  ],
  [
    {
      number: 10,
      popEquality: '48',
      compactness: '27',
      majorityMinority: '73',
      enactedDeviation: '14',
    },
    {
      number: 11,
      popEquality: '49',
      compactness: '68',
      majorityMinority: '27',
      enactedDeviation: '17',
    },
    {
      number: 12,
      popEquality: '40',
      compactness: '28',
      majorityMinority: '57',
      enactedDeviation: '94',
    },
  ],
  [
    {
      number: 13,
      popEquality: '72',
      compactness: '45',
      majorityMinority: '48',
      enactedDeviation: '52',
    },
    {
      number: 14,
      popEquality: '95',
      compactness: '27',
      majorityMinority: '65',
      enactedDeviation: '84',
    },
    {
      number: 15,
      popEquality: '69',
      compactness: '87',
      majorityMinority: '53',
      enactedDeviation: '63',
    },
  ],
  [
    {
      number: 16,
      popEquality: '47',
      compactness: '94',
      majorityMinority: '23',
      enactedDeviation: '48',
    },
    {
      number: 17,
      popEquality: '37',
      compactness: '38',
      majorityMinority: '82',
      enactedDeviation: '34',
    },
    {
      number: 18,
      popEquality: '65',
      compactness: '23',
      majorityMinority: '54',
      enactedDeviation: '23',
    },
  ],
  [
    {
      number: 19,
      popEquality: '84',
      compactness: '36',
      majorityMinority: '60',
      enactedDeviation: '48',
    },
    {
      number: 20,
      popEquality: '73',
      compactness: '34',
      majorityMinority: '45',
      enactedDeviation: '28',
    },
    {
      number: 21,
      popEquality: '90',
      compactness: '53',
      majorityMinority: '50',
      enactedDeviation: '37',
    },
  ],
  [
    {
      number: 22,
      popEquality: '48',
      compactness: '26',
      majorityMinority: '59',
      enactedDeviation: '48',
    },
    {
      number: 23,
      popEquality: '27',
      compactness: '49',
      majorityMinority: '49',
      enactedDeviation: '26',
    },
    {
      number: 24,
      popEquality: '93',
      compactness: '84',
      majorityMinority: '27',
      enactedDeviation: '95',
    },
  ],
  [
    {
      number: 25,
      popEquality: '36',
      compactness: '73',
      majorityMinority: '65',
      enactedDeviation: '42',
    },
    {
      number: 26,
      popEquality: '33',
      compactness: '76',
      majorityMinority: '47',
      enactedDeviation: '93',
    },
    {
      number: 27,
      popEquality: '48',
      compactness: '87',
      majorityMinority: '53',
      enactedDeviation: '23',
    },
  ],
  [
    {
      number: 28,
      popEquality: '95',
      compactness: '57',
      majorityMinority: '25',
      enactedDeviation: '37',
    },
    {
      number: 29,
      popEquality: '59',
      compactness: '48',
      majorityMinority: '93',
      enactedDeviation: '65',
    },
    {
      number: 30,
      popEquality: '15',
      compactness: '36',
      majorityMinority: '45',
      enactedDeviation: '87',
    },
  ],
];
const miData = [
  [
    {
      number: 1,
      popEquality: '77',
      compactness: '50',
      majorityMinority: '43',
      enactedDeviation: '10',
    },
    {
      number: 2,
      popEquality: '59',
      compactness: '28',
      majorityMinority: '59',
      enactedDeviation: '83',
    },
    {
      number: 3,
      popEquality: '53',
      compactness: '46',
      majorityMinority: '99',
      enactedDeviation: '55',
    },
  ],
  [
    {
      number: 4,
      popEquality: '72',
      compactness: '54',
      majorityMinority: '42',
      enactedDeviation: '60',
    },
    {
      number: 5,
      popEquality: '53',
      compactness: '46',
      majorityMinority: '99',
      enactedDeviation: '55',
    },
    {
      number: 6,
      popEquality: '77',
      compactness: '50',
      majorityMinority: '43',
      enactedDeviation: '10',
    },
  ],
  [
    {
      number: 7,
      popEquality: '59',
      compactness: '28',
      majorityMinority: '59',
      enactedDeviation: '83',
    },
    {
      number: 8,
      popEquality: '72',
      compactness: '54',
      majorityMinority: '42',
      enactedDeviation: '60',
    },
    {
      number: 9,
      popEquality: '92',
      compactness: '52',
      majorityMinority: '58',
      enactedDeviation: '17',
    },
  ],
  [
    {
      number: 10,
      popEquality: '48',
      compactness: '27',
      majorityMinority: '73',
      enactedDeviation: '14',
    },
    {
      number: 11,
      popEquality: '49',
      compactness: '68',
      majorityMinority: '27',
      enactedDeviation: '17',
    },
    {
      number: 12,
      popEquality: '40',
      compactness: '28',
      majorityMinority: '57',
      enactedDeviation: '94',
    },
  ],
  [
    {
      number: 13,
      popEquality: '72',
      compactness: '45',
      majorityMinority: '48',
      enactedDeviation: '52',
    },
    {
      number: 14,
      popEquality: '95',
      compactness: '27',
      majorityMinority: '65',
      enactedDeviation: '84',
    },
    {
      number: 15,
      popEquality: '69',
      compactness: '87',
      majorityMinority: '53',
      enactedDeviation: '63',
    },
  ],
  [
    {
      number: 16,
      popEquality: '47',
      compactness: '94',
      majorityMinority: '23',
      enactedDeviation: '48',
    },
    {
      number: 17,
      popEquality: '37',
      compactness: '38',
      majorityMinority: '82',
      enactedDeviation: '34',
    },
    {
      number: 18,
      popEquality: '65',
      compactness: '23',
      majorityMinority: '54',
      enactedDeviation: '23',
    },
  ],
  [
    {
      number: 19,
      popEquality: '84',
      compactness: '36',
      majorityMinority: '60',
      enactedDeviation: '48',
    },
    {
      number: 20,
      popEquality: '73',
      compactness: '34',
      majorityMinority: '45',
      enactedDeviation: '28',
    },
    {
      number: 21,
      popEquality: '90',
      compactness: '53',
      majorityMinority: '50',
      enactedDeviation: '37',
    },
  ],
  [
    {
      number: 22,
      popEquality: '48',
      compactness: '26',
      majorityMinority: '59',
      enactedDeviation: '48',
    },
    {
      number: 23,
      popEquality: '27',
      compactness: '49',
      majorityMinority: '49',
      enactedDeviation: '26',
    },
    {
      number: 24,
      popEquality: '93',
      compactness: '84',
      majorityMinority: '27',
      enactedDeviation: '95',
    },
  ],
  [
    {
      number: 25,
      popEquality: '36',
      compactness: '73',
      majorityMinority: '65',
      enactedDeviation: '42',
    },
    {
      number: 26,
      popEquality: '33',
      compactness: '76',
      majorityMinority: '47',
      enactedDeviation: '93',
    },
    {
      number: 27,
      popEquality: '48',
      compactness: '87',
      majorityMinority: '53',
      enactedDeviation: '23',
    },
  ],
  [
    {
      number: 28,
      popEquality: '95',
      compactness: '57',
      majorityMinority: '25',
      enactedDeviation: '37',
    },
    {
      number: 29,
      popEquality: '59',
      compactness: '48',
      majorityMinority: '93',
      enactedDeviation: '65',
    },
    {
      number: 30,
      popEquality: '15',
      compactness: '36',
      majorityMinority: '45',
      enactedDeviation: '87',
    },
  ],
];
const vaData = [
  [
    {
      number: 1,
      popEquality: '77',
      compactness: '50',
      majorityMinority: '43',
      enactedDeviation: '10',
    },
    {
      number: 2,
      popEquality: '59',
      compactness: '28',
      majorityMinority: '59',
      enactedDeviation: '83',
    },
    {
      number: 3,
      popEquality: '53',
      compactness: '46',
      majorityMinority: '99',
      enactedDeviation: '55',
    },
  ],
  [
    {
      number: 4,
      popEquality: '72',
      compactness: '54',
      majorityMinority: '42',
      enactedDeviation: '60',
    },
    {
      number: 5,
      popEquality: '53',
      compactness: '46',
      majorityMinority: '99',
      enactedDeviation: '55',
    },
    {
      number: 6,
      popEquality: '77',
      compactness: '50',
      majorityMinority: '43',
      enactedDeviation: '10',
    },
  ],
  [
    {
      number: 7,
      popEquality: '59',
      compactness: '28',
      majorityMinority: '59',
      enactedDeviation: '83',
    },
    {
      number: 8,
      popEquality: '72',
      compactness: '54',
      majorityMinority: '42',
      enactedDeviation: '60',
    },
    {
      number: 9,
      popEquality: '92',
      compactness: '52',
      majorityMinority: '58',
      enactedDeviation: '17',
    },
  ],
  [
    {
      number: 10,
      popEquality: '48',
      compactness: '27',
      majorityMinority: '73',
      enactedDeviation: '14',
    },
    {
      number: 11,
      popEquality: '49',
      compactness: '68',
      majorityMinority: '27',
      enactedDeviation: '17',
    },
    {
      number: 12,
      popEquality: '40',
      compactness: '28',
      majorityMinority: '57',
      enactedDeviation: '94',
    },
  ],
  [
    {
      number: 13,
      popEquality: '72',
      compactness: '45',
      majorityMinority: '48',
      enactedDeviation: '52',
    },
    {
      number: 14,
      popEquality: '95',
      compactness: '27',
      majorityMinority: '65',
      enactedDeviation: '84',
    },
    {
      number: 15,
      popEquality: '69',
      compactness: '87',
      majorityMinority: '53',
      enactedDeviation: '63',
    },
  ],
  [
    {
      number: 16,
      popEquality: '47',
      compactness: '94',
      majorityMinority: '23',
      enactedDeviation: '48',
    },
    {
      number: 17,
      popEquality: '37',
      compactness: '38',
      majorityMinority: '82',
      enactedDeviation: '34',
    },
    {
      number: 18,
      popEquality: '65',
      compactness: '23',
      majorityMinority: '54',
      enactedDeviation: '23',
    },
  ],
  [
    {
      number: 19,
      popEquality: '84',
      compactness: '36',
      majorityMinority: '60',
      enactedDeviation: '48',
    },
    {
      number: 20,
      popEquality: '73',
      compactness: '34',
      majorityMinority: '45',
      enactedDeviation: '28',
    },
    {
      number: 21,
      popEquality: '90',
      compactness: '53',
      majorityMinority: '50',
      enactedDeviation: '37',
    },
  ],
  [
    {
      number: 22,
      popEquality: '48',
      compactness: '26',
      majorityMinority: '59',
      enactedDeviation: '48',
    },
    {
      number: 23,
      popEquality: '27',
      compactness: '49',
      majorityMinority: '49',
      enactedDeviation: '26',
    },
    {
      number: 24,
      popEquality: '93',
      compactness: '84',
      majorityMinority: '27',
      enactedDeviation: '95',
    },
  ],
  [
    {
      number: 25,
      popEquality: '36',
      compactness: '73',
      majorityMinority: '65',
      enactedDeviation: '42',
    },
    {
      number: 26,
      popEquality: '33',
      compactness: '76',
      majorityMinority: '47',
      enactedDeviation: '93',
    },
    {
      number: 27,
      popEquality: '48',
      compactness: '87',
      majorityMinority: '53',
      enactedDeviation: '23',
    },
  ],
  [
    {
      number: 28,
      popEquality: '95',
      compactness: '57',
      majorityMinority: '25',
      enactedDeviation: '37',
    },
    {
      number: 29,
      popEquality: '59',
      compactness: '48',
      majorityMinority: '93',
      enactedDeviation: '65',
    },
    {
      number: 30,
      popEquality: '15',
      compactness: '36',
      majorityMinority: '45',
      enactedDeviation: '87',
    },
  ],
];

export default function LeftPane(props) {
  const { isOpen, onClose } = props;
  const [popEquality, setPopEquality] = useState(0);
  const [compactness, setCompactness] = useState(0);
  const [majorityMinority, setMajorityMinority] = useState(0);
  const [enactedDeviation, setEnactedDeviation] = useState(0);
  const [activeState, setActiveState] = useContext(StateContext);

  const handlePopEqualityInput = (val) => setPopEquality(val);
  const handleCompactnessInput = (val) => setCompactness(val);
  const handleMajorityMinorityInput = (val) => setMajorityMinority(val);
  const handleEnactedDeviationInput = (val) => setEnactedDeviation(val);

  const popEqualityTooltip =
    'Set the minimum percentage threshold population equality for the improved redistricting. [0, 100]';
  const compactnessTooltip =
    'Set the minimum percentage threshold compactness for the improved redistricting. [0, 100]';
  const majorityMinorityToolTip =
    'Set the minimum percentage threshold for the minority population per congressional district in the improved redistricting. [0, 100]';
  const enactedDeviationToolTip =
    'Set the minimum percentage threshold for the deviation from the enacted districting for the improved redistricting. [0, 100]';

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement={'left'}
      variant='permanent'
    >
      {/* <DrawerOverlay /> */}
      <DrawerContent overflow='scroll'>
        <DrawerCloseButton />
        <DrawerHeader>
          <Text>User Settings</Text>
        </DrawerHeader>
        <Tabs isFitted variant='enclosed'>
          <TabList mb='1em'>
            <Tab>Constraints on Measures</Tab>
            <Tab>SeaWulf Redistrictings</Tab>
          </TabList>
          <TabPanels>
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
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb bg={themes.colors.blue[500]} />
                    </Slider>
                    <NumberInput
                      value={popEquality}
                      min={0}
                      max={100}
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
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb bg={themes.colors.blue[500]} />
                    </Slider>
                    <NumberInput
                      value={majorityMinority}
                      min={0}
                      max={100}
                      onChange={handleMajorityMinorityInput}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </HStack>
                  <HStack>
                    <Text>Deviation from Enacted Districting</Text>
                    <Tooltip
                      label={enactedDeviationToolTip}
                      fontSize='md'
                      placement='right'
                    >
                      <QuestionIcon />
                    </Tooltip>
                  </HStack>
                  <HStack>
                    <Slider
                      aria-label='deviation-from-enacted-districting'
                      defaultValue={enactedDeviation}
                      onChange={handleEnactedDeviationInput}
                      focusThumbOnChange={false}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb bg={themes.colors.blue[500]} />
                    </Slider>
                    <NumberInput
                      value={enactedDeviation}
                      min={0}
                      max={100}
                      onChange={handleEnactedDeviationInput}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </HStack>
                </VStack>
              </DrawerBody>
            </TabPanel>
            <TabPanel>
              {activeState == 'Arizona' ? (
                <VStack spacing='3'>
                  {azData.map((set) => {
                    const best = bestMeasure(set);
                    return (
                      <HStack spacing='3'>
                        {best.map((numMeasure) => {
                          const [number, measure] = numMeasure;
                          return (
                            <Redistricting
                              number={number}
                              thumbnail={az}
                              features={measureMap[measure]}
                            />
                          );
                        })}
                      </HStack>
                    );
                  })}
                </VStack>
              ) : null}
              {activeState == 'Michigan' ? (
                <VStack spacing='3'>
                  {miData.map((set) => {
                    const best = bestMeasure(set);
                    return (
                      <HStack spacing='3'>
                        {best.map((numMeasure) => {
                          const [number, measure] = numMeasure;
                          return (
                            <Redistricting
                              number={number}
                              thumbnail={mi}
                              features={measureMap[measure]}
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
                          const [number, measure] = numMeasure;
                          return (
                            <Redistricting
                              number={number}
                              thumbnail={va}
                              features={measureMap[measure]}
                            />
                          );
                        })}
                      </HStack>
                    );
                  })}
                </VStack>
              ) : null}
            </TabPanel>
          </TabPanels>
        </Tabs>
        <DrawerFooter>
          <VStack spacing='3' align='right'>
            <Button>
              <Text>Generate</Text>
            </Button>
            <Text fontSize='sm'>Last updated: 10 seconds ago</Text>
          </VStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
