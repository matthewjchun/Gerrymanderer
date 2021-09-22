import { useDisclosure } from '@chakra-ui/react';
import { HStack, Text, Button } from '@chakra-ui/react';

import LeftPane from './LeftPane';

export default function TopBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack p='5'>
      <Button onClick={onOpen}>
        <Text>Redistricting Settings</Text>
      </Button>
      <LeftPane isOpen={isOpen} onClose={onClose}></LeftPane>
    </HStack>
  );
}
