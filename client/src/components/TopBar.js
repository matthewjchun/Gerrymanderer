import { useDisclosure } from '@chakra-ui/react';
import { HStack, Text, Button, Select } from '@chakra-ui/react';

import LeftPane from './LeftPane';

export default function TopBar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { activeState } = props;

  return (
    <HStack w='100%' p='5' align='center' justify='center'>
      <Button mr='auto' onClick={onOpen}>
        <Text>Redistricting Settings</Text>
      </Button>
      <LeftPane isOpen={isOpen} onClose={onClose}></LeftPane>
      {/*<Text fontWeight='bold' fontSize='1.5em' m='auto'>
        {activeState}
      </Text>*/}
      <Select placeholder={activeState}>
        <option value='Arizona'>Arizona</option>
        <option value='Michigan'>Michigan</option>
        <option value='Virginia'>Virginia</option>
      </Select>
    </HStack>
  );
}
