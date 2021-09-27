import { useContext } from 'react';
import { StateContext } from '../contexts/State';
import { useDisclosure } from '@chakra-ui/react';
import { HStack, Text, Button, Select } from '@chakra-ui/react';

import LeftPane from './LeftPane';

export default function TopBar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [activeState, setActiveState] = useContext(StateContext);

  return (
    <HStack w='100%' p='5' align='center' justify='center'>
      <Button mr='auto' onClick={onOpen}>
        <Text>Redistricting Settings</Text>
      </Button>
      <LeftPane isOpen={isOpen} onClose={onClose}></LeftPane>
      {/*<Text fontWeight='bold' fontSize='1.5em' m='auto'>
        {activeState}
  </Text>*/}
      <Select
        value={activeState}
        placeholder={activeState}
        onChange={(e) => {
          setActiveState(e.target.value);
        }}
      >
        <option value='Arizona'>Arizona</option>
        <option value='Michigan'>Michigan</option>
        <option value='Virginia'>Virginia</option>
      </Select>
    </HStack>
  );
}
