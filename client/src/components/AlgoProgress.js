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

export default function AlgoProgress(props) {
    const { isOpen, onClose, activeState } = props;
    // const { runningFlag, setRunningFlag } = useState();
    let runningFlag = true;
    // useEffect(() => {
    //     setRunningFlag(runningFlag)
    // }, [runningFlag])

    // const handlePause = async () => {
    //     setRunningFlag(!runningFlag);
    //     console.log(runningFlag)
    // }


    
    return(
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>              
            <Heading>{activeState}</Heading>  
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="24px">
              <Center>
                <Text>Algorithm in progress...</Text>
              </Center>
              <Divider />
              <Text align="left">Change in Population Equality: </Text>
              <Text align="left">Change in Polsby Popper: </Text>
              <Text align="left">Change in Majority Minority: </Text>
              <Divider />
              <Text align="left">Number of iterations: </Text>
              <Text align="left">Algorithm time: </Text>
              <Text align="left">Estimated time to completion: </Text>
              <Divider/>
            </VStack>
          </ModalBody>

          <ModalFooter>
            {
            runningFlag == true ? <Button colorScheme="blue" mr={3} /*onClick={handlePause}*/>Pause</Button>:
            runningFlag == false ?<Button colorScheme="blue" mr={3} /*onClick={handlePause}*/>Run</Button>:
            null
            }
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Stop Algorithm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
}