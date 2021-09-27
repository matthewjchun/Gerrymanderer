import { useContext } from 'react';
import { StateContext } from '../contexts/State';
import { useDisclosure } from '@chakra-ui/react';
import { HStack, Box, Text, Button, Select } from '@chakra-ui/react';

import LeftPane from './LeftPane';

export default function TopBar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [activeState, setActiveState] = useContext(StateContext);

  return (
    <HStack w='100%' p='5' align='center' justify='center'>
      <Button flex='1' mr='auto' onClick={onOpen}>
        <Text>Redistricting Settings</Text>
      </Button>
      <LeftPane isOpen={isOpen} onClose={onClose}></LeftPane>
      {/*<Text fontWeight='bold' fontSize='1.5em' m='auto'>
        {activeState}
  </Text>*/}
      <Box flex='3' />
      <Select
        flex='1'
        value={activeState}
        placeholder={activeState}
        onChange={(e) => {
          setActiveState(e.target.value);
        }}
      >
        {activeState != 'Arizona' ? (
          <option value='Arizona'>Arizona</option>
        ) : null}
        {activeState != 'Michigan' ? (
          <option value='Michigan'>Michigan</option>
        ) : null}
        {activeState != 'Virginia' ? (
          <option value='Virginia'>Virginia</option>
        ) : null}
      </Select>
    </HStack>
  );
}
