import { useDisclosure } from '@chakra-ui/react';
import { HStack, Text, Button } from '@chakra-ui/react';

import LeftPane from './LeftPane';

export default function TopBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack>
      <Button onClick={onOpen}>
        <Text>Open</Text>
      </Button>
      <LeftPane isOpen={isOpen} onClose={onClose}></LeftPane>
    </HStack>
  );
}
