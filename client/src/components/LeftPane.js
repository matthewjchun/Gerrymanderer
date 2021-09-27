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
import { BoxZoomHandler } from 'mapbox-gl';

export default function LeftPane(props) {
  const { isOpen, onClose } = props;
  const [popEquality, setPopEquality] = useState(0);
  const [majorityMinority, setMajorityMinority] = useState(0);
  const [racialDeviation, setRacialDeviation] = useState(0);

  const handlePopEqualityInput = (val) => setPopEquality(val);
  const handleMajorityMinorityInput = (val) => setMajorityMinority(val);
  const handleRacialDeviationInput = (val) => setRacialDeviation(val);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement={'left'}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Text>User Measure Limits</Text>
        </DrawerHeader>

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
            <Text>Racial Deviation</Text>
            <HStack>
              <Slider
                aria-label='racial-deviation'
                defaultValue={racialDeviation}
                onChange={handleRacialDeviationInput}
                focusThumbOnChange={false}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb bg={themes.colors.blue[500]} />
              </Slider>
              <NumberInput
                value={racialDeviation}
                min={0}
                max={100}
                onChange={handleRacialDeviationInput}
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

        <DrawerFooter>
          <Button>
            <Text>Generate</Text>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
