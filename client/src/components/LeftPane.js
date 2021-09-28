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

import themes from '../themes';
import Redistricting from './Redistricting';
import az from '../img/az.jpg';
import mi from '../img/mi.jpg';
import va from '../img/va.jpg';
import { BoxZoomHandler } from 'mapbox-gl';

const azData = [
  {
    popEquality: '50',
    compactness: '50',
    majorityMinority: '50',
    enactedDeviation: '50',
  },
  {
    popEquality: '70',
    compactness: '50',
    majorityMinority: '100',
    enactedDeviation: '50',
  },
  {
    popEquality: '80',
    compactness: '50',
    majorityMinority: '50',
    enactedDeviation: '100',
  },
  {
    popEquality: '50',
    compactness: '50',
    majorityMinority: '50',
    enactedDeviation: '50',
  },
  {
    popEquality: '50',
    compactness: '50',
    majorityMinority: '50',
    enactedDeviation: '50',
  },
  {
    popEquality: '50',
    compactness: '50',
    majorityMinority: '50',
    enactedDeviation: '50',
  },
  {
    popEquality: '50',
    compactness: '50',
    majorityMinority: '50',
    enactedDeviation: '50',
  },
  {
    popEquality: '50',
    compactness: '50',
    majorityMinority: '50',
    enactedDeviation: '50',
  },
  {
    popEquality: '50',
    compactness: '50',
    majorityMinority: '50',
    enactedDeviation: '50',
  },
  {
    popEquality: '50',
    compactness: '50',
    majorityMinority: '50',
    enactedDeviation: '50',
  },
  {
    popEquality: '50',
    compactness: '50',
    majorityMinority: '50',
    enactedDeviation: '50',
  },
  {
    popEquality: '50',
    compactness: '50',
    majorityMinority: '50',
    enactedDeviation: '50',
  },
  {
    popEquality: '50',
    compactness: '50',
    majorityMinority: '50',
    enactedDeviation: '50',
  },
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

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement={'left'}>
      <DrawerOverlay />
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
                  <Text>Population Equality</Text>
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
                  <Text>Compactness</Text>
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
                  <Text>Majority-Minority Districts</Text>
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
                  <Text>Deviation from Enacted Districting</Text>
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
