import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Divider,
  Image,
} from "@chakra-ui/react";
import { useContext, useState, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import plot from '../img/boxandwhiskerdummy.png';

export default function BoxAndWhisker(props) {
    const { isOpen, onClose } = props;


    
    return(
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Box And Whisker</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Divider />
            <Image maxW='100%' src={plot} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
}