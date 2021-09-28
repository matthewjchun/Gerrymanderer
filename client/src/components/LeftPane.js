import { useState } from 'react';
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

const azData = [ [ 
  {
    id: 0,
    popEquality: '53',
    compactness: '46',
    majorityMinority: '99',
    enactedDeviation: '55',
  },
  {
    id: 1,
    popEquality: '77',
    compactness: '50',
    majorityMinority: '43',
    enactedDeviation: '10',
  },
  {
    id: 2,
    popEquality: '59',
    compactness: '28',
    majorityMinority: '59',
    enactedDeviation: '83',
  }],
  [{
    id: 3,
    popEquality: '72',
    compactness: '54',
    majorityMinority: '42',
    enactedDeviation: '60',
  },
  {
    id: 4,
    popEquality: '53',
    compactness: '46',
    majorityMinority: '99',
    enactedDeviation: '55',
  },
  {
    id: 5,
    popEquality: '77',
    compactness: '50',
    majorityMinority: '43',
    enactedDeviation: '10',
  }],
  [{
    id: 6,
    popEquality: '59',
    compactness: '28',
    majorityMinority: '59',
    enactedDeviation: '83',
  },
  {
    id: 7,
    popEquality: '72',
    compactness: '54',
    majorityMinority: '42',
    enactedDeviation: '60',
  },
  {
    id: 8,
    popEquality: '92',
    compactness: '52',
    majorityMinority: '58',
    enactedDeviation: '17',
  }],
  [{
    id: 9,
    popEquality: '48',
    compactness: '27',
    majorityMinority: '73',
    enactedDeviation: '14',
  },
  {
    id: 10,
    popEquality: '49',
    compactness: '68',
    majorityMinority: '27',
    enactedDeviation: '17',
  },
  {
    id: 11,
    popEquality: '40',
    compactness: '28',
    majorityMinority: '57',
    enactedDeviation: '94',
  }],
  [{
    id: 12,
    popEquality: '72',
    compactness: '45',
    majorityMinority: '48',
    enactedDeviation: '52',
  },
  {
    id: 13,
    popEquality: '95',
    compactness: '27',
    majorityMinority: '65',
    enactedDeviation: '84',
  },
  {
    id: 14,
    popEquality: '69',
    compactness: '87',
    majorityMinority: '53',
    enactedDeviation: '63',
  }],
  [{
    id: 15,
    popEquality: '47',
    compactness: '94',
    majorityMinority: '23',
    enactedDeviation: '48',
  },
  {
    id: 16,
    popEquality: '37',
    compactness: '38',
    majorityMinority: '82',
    enactedDeviation: '34',
  },
  {
    id: 17,
    popEquality: '65',
    compactness: '23',
    majorityMinority: '54',
    enactedDeviation: '23',
  }],
  [{
    id: 18,
    popEquality: '84',
    compactness: '36',
    majorityMinority: '60',
    enactedDeviation: '48',
  },
  {
    id: 19,
    popEquality: '73',
    compactness: '34',
    majorityMinority: '45',
    enactedDeviation: '28',
  },
  {
    id: 20,
    popEquality: '90',
    compactness: '53',
    majorityMinority: '50',
    enactedDeviation: '37',
  }],
  [{
    id: 21,
    popEquality: '48',
    compactness: '26',
    majorityMinority: '59',
    enactedDeviation: '48',
  },
  {
    id: 22,
    popEquality: '27',
    compactness: '49',
    majorityMinority: '49',
    enactedDeviation: '26',
  },
  {
    id: 23,
    popEquality: '93',
    compactness: '84',
    majorityMinority: '27',
    enactedDeviation: '95',
  }],
  [{
    id: 24,
    popEquality: '36',
    compactness: '73',
    majorityMinority: '65',
    enactedDeviation: '42',
  },
  {
    id: 25,
    popEquality: '33',
    compactness: '76',
    majorityMinority: '47',
    enactedDeviation: '93',
  },
  {
    id: 26,
    popEquality: '48',
    compactness: '87',
    majorityMinority: '53',
    enactedDeviation: '23',
  }],
  [{
    id: 27,
    popEquality: '95',
    compactness: '57',
    majorityMinority: '25',
    enactedDeviation: '37',
  },
  {
    id: 28,
    popEquality: '59',
    compactness: '48',
    majorityMinority: '93',
    enactedDeviation: '65',
  },
  {
    id: 29,
    popEquality: '15',
    compactness: '36',
    majorityMinority: '45',
    enactedDeviation: '87',
  }]
];
const miData = [ [ 
  {
    id: 0,
    popEquality: '53',
    compactness: '46',
    majorityMinority: '99',
    enactedDeviation: '55',
  },
  {
    id: 1,
    popEquality: '77',
    compactness: '50',
    majorityMinority: '43',
    enactedDeviation: '10',
  },
  {
    id: 2,
    popEquality: '59',
    compactness: '28',
    majorityMinority: '59',
    enactedDeviation: '83',
  }],
  [{
    id: 3,
    popEquality: '72',
    compactness: '54',
    majorityMinority: '42',
    enactedDeviation: '60',
  },
  {
    id: 4,
    popEquality: '53',
    compactness: '46',
    majorityMinority: '99',
    enactedDeviation: '55',
  },
  {
    id: 5,
    popEquality: '77',
    compactness: '50',
    majorityMinority: '43',
    enactedDeviation: '10',
  }],
  [{
    id: 6,
    popEquality: '59',
    compactness: '28',
    majorityMinority: '59',
    enactedDeviation: '83',
  },
  {
    id: 7,
    popEquality: '72',
    compactness: '54',
    majorityMinority: '42',
    enactedDeviation: '60',
  },
  {
    id: 8,
    popEquality: '92',
    compactness: '52',
    majorityMinority: '58',
    enactedDeviation: '17',
  }],
  [{
    id: 9,
    popEquality: '48',
    compactness: '27',
    majorityMinority: '73',
    enactedDeviation: '14',
  },
  {
    id: 10,
    popEquality: '49',
    compactness: '68',
    majorityMinority: '27',
    enactedDeviation: '17',
  },
  {
    id: 11,
    popEquality: '40',
    compactness: '28',
    majorityMinority: '57',
    enactedDeviation: '94',
  }],
  [{
    id: 12,
    popEquality: '72',
    compactness: '45',
    majorityMinority: '48',
    enactedDeviation: '52',
  },
  {
    id: 13,
    popEquality: '95',
    compactness: '27',
    majorityMinority: '65',
    enactedDeviation: '84',
  },
  {
    id: 14,
    popEquality: '69',
    compactness: '87',
    majorityMinority: '53',
    enactedDeviation: '63',
  }],
  [{
    id: 15,
    popEquality: '47',
    compactness: '94',
    majorityMinority: '23',
    enactedDeviation: '48',
  },
  {
    id: 16,
    popEquality: '37',
    compactness: '38',
    majorityMinority: '82',
    enactedDeviation: '34',
  },
  {
    id: 17,
    popEquality: '65',
    compactness: '23',
    majorityMinority: '54',
    enactedDeviation: '23',
  }],
  [{
    id: 18,
    popEquality: '84',
    compactness: '36',
    majorityMinority: '60',
    enactedDeviation: '48',
  },
  {
    id: 19,
    popEquality: '73',
    compactness: '34',
    majorityMinority: '45',
    enactedDeviation: '28',
  },
  {
    id: 20,
    popEquality: '90',
    compactness: '53',
    majorityMinority: '50',
    enactedDeviation: '37',
  }],
  [{
    id: 21,
    popEquality: '48',
    compactness: '26',
    majorityMinority: '59',
    enactedDeviation: '48',
  },
  {
    id: 22,
    popEquality: '27',
    compactness: '49',
    majorityMinority: '49',
    enactedDeviation: '26',
  },
  {
    id: 23,
    popEquality: '93',
    compactness: '84',
    majorityMinority: '27',
    enactedDeviation: '95',
  }],
  [{
    id: 24,
    popEquality: '36',
    compactness: '73',
    majorityMinority: '65',
    enactedDeviation: '42',
  },
  {
    id: 25,
    popEquality: '33',
    compactness: '76',
    majorityMinority: '47',
    enactedDeviation: '93',
  },
  {
    id: 26,
    popEquality: '48',
    compactness: '87',
    majorityMinority: '53',
    enactedDeviation: '23',
  }],
  [{
    id: 27,
    popEquality: '95',
    compactness: '57',
    majorityMinority: '25',
    enactedDeviation: '37',
  },
  {
    id: 28,
    popEquality: '59',
    compactness: '48',
    majorityMinority: '93',
    enactedDeviation: '65',
  },
  {
    id: 29,
    popEquality: '15',
    compactness: '36',
    majorityMinority: '45',
    enactedDeviation: '87',
  }]
];
const vaData = [ [ 
  {
    id: 0,
    popEquality: '53',
    compactness: '46',
    majorityMinority: '99',
    enactedDeviation: '55',
  },
  {
    id: 1,
    popEquality: '77',
    compactness: '50',
    majorityMinority: '43',
    enactedDeviation: '10',
  },
  {
    id: 2,
    popEquality: '59',
    compactness: '28',
    majorityMinority: '59',
    enactedDeviation: '83',
  }],
  [{
    id: 3,
    popEquality: '72',
    compactness: '54',
    majorityMinority: '42',
    enactedDeviation: '60',
  },
  {
    id: 4,
    popEquality: '53',
    compactness: '46',
    majorityMinority: '99',
    enactedDeviation: '55',
  },
  {
    id: 5,
    popEquality: '77',
    compactness: '50',
    majorityMinority: '43',
    enactedDeviation: '10',
  }],
  [{
    id: 6,
    popEquality: '59',
    compactness: '28',
    majorityMinority: '59',
    enactedDeviation: '83',
  },
  {
    id: 7,
    popEquality: '72',
    compactness: '54',
    majorityMinority: '42',
    enactedDeviation: '60',
  },
  {
    id: 8,
    popEquality: '92',
    compactness: '52',
    majorityMinority: '58',
    enactedDeviation: '17',
  }],
  [{
    id: 9,
    popEquality: '48',
    compactness: '27',
    majorityMinority: '73',
    enactedDeviation: '14',
  },
  {
    id: 10,
    popEquality: '49',
    compactness: '68',
    majorityMinority: '27',
    enactedDeviation: '17',
  },
  {
    id: 11,
    popEquality: '40',
    compactness: '28',
    majorityMinority: '57',
    enactedDeviation: '94',
  }],
  [{
    id: 12,
    popEquality: '72',
    compactness: '45',
    majorityMinority: '48',
    enactedDeviation: '52',
  },
  {
    id: 13,
    popEquality: '95',
    compactness: '27',
    majorityMinority: '65',
    enactedDeviation: '84',
  },
  {
    id: 14,
    popEquality: '69',
    compactness: '87',
    majorityMinority: '53',
    enactedDeviation: '63',
  }],
  [{
    id: 15,
    popEquality: '47',
    compactness: '94',
    majorityMinority: '23',
    enactedDeviation: '48',
  },
  {
    id: 16,
    popEquality: '37',
    compactness: '38',
    majorityMinority: '82',
    enactedDeviation: '34',
  },
  {
    id: 17,
    popEquality: '65',
    compactness: '23',
    majorityMinority: '54',
    enactedDeviation: '23',
  }],
  [{
    id: 18,
    popEquality: '84',
    compactness: '36',
    majorityMinority: '60',
    enactedDeviation: '48',
  },
  {
    id: 19,
    popEquality: '73',
    compactness: '34',
    majorityMinority: '45',
    enactedDeviation: '28',
  },
  {
    id: 20,
    popEquality: '90',
    compactness: '53',
    majorityMinority: '50',
    enactedDeviation: '37',
  }],
  [{
    id: 21,
    popEquality: '48',
    compactness: '26',
    majorityMinority: '59',
    enactedDeviation: '48',
  },
  {
    id: 22,
    popEquality: '27',
    compactness: '49',
    majorityMinority: '49',
    enactedDeviation: '26',
  },
  {
    id: 23,
    popEquality: '93',
    compactness: '84',
    majorityMinority: '27',
    enactedDeviation: '95',
  }],
  [{
    id: 24,
    popEquality: '36',
    compactness: '73',
    majorityMinority: '65',
    enactedDeviation: '42',
  },
  {
    id: 25,
    popEquality: '33',
    compactness: '76',
    majorityMinority: '47',
    enactedDeviation: '93',
  },
  {
    id: 26,
    popEquality: '48',
    compactness: '87',
    majorityMinority: '53',
    enactedDeviation: '23',
  }],
  [{
    id: 27,
    popEquality: '95',
    compactness: '57',
    majorityMinority: '25',
    enactedDeviation: '37',
  },
  {
    id: 28,
    popEquality: '59',
    compactness: '48',
    majorityMinority: '93',
    enactedDeviation: '65',
  },
  {
    id: 29,
    popEquality: '15',
    compactness: '36',
    majorityMinority: '45',
    enactedDeviation: '87',
  }]
];

export default function LeftPane(props) {
  const { isOpen, onClose } = props;
  const [popEquality, setPopEquality] = useState(0);
  const [compactness, setCompactness] = useState(0);
  const [majorityMinority, setMajorityMinority] = useState(0);
  const [enactedDeviation, setEnactedDeviation] = useState(0);

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
      <DrawerContent>
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
              <VStack spacing='3'>
                <HStack spacing='3'>
                  <Redistricting
                    number='0'
                    thumbnail={az}
                    features='Equal Population'
                  />
                  <Redistricting
                    number='1'
                    thumbnail={az}
                    features='Equal Population'
                  />

                  <Redistricting
                    number='2'
                    thumbnail={az}
                    features='Equal Population'
                  />
                </HStack>
              </VStack>
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
