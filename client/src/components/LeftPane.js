import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { Text, HStack } from '@chakra-ui/react';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';

export default function LeftPane(props) {
  const { isOpen, onClose } = props;
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement={'left'}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Text>Redistricting Settings</Text>
        </DrawerHeader>

        <DrawerBody>
          <HStack>
            <Text>Population Equality</Text>
            <Slider aria-label='population-equality' defaultValue={0}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </HStack>
          <HStack>
            <Text>Majority Minority Districts</Text>
            <Slider aria-label='majority-minority-districts' defaultValue={0}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </HStack>
          <HStack>
            <Text>Racial Deviation</Text>
            <Slider aria-label='racial-deviation' defaultValue={0}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </HStack>
        </DrawerBody>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
