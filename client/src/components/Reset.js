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
    Heading,
    Center,
    VStack
  } from "@chakra-ui/react";
  import { useContext, useState, useEffect } from 'react';
  import { useDisclosure } from '@chakra-ui/react';
import { StateContext } from "../contexts/State";
  
  export default function Reset(props) {
      const { isOpen, onClose } = props;  
      const [ activeState, setActiveState ] = useContext(StateContext)

      const handleReset = async () => {
        const response = await fetch(
          `/reset`
        );
        onClose();
        setActiveState('Celtics');
      }

      return(
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>              
              <Heading>Reset Your Progress</Heading>  
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize='2xl'>Are you sure you want to reset?</Text>
              <Text fontSize='xl'>You will lose your progress.</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={handleReset}>
                Yes
              </Button>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                No
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      );
  }