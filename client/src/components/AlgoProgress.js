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
} from "@chakra-ui/react";
import { useContext, useState, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';

export default function AlgoProgress(props) {
    const { isOpen, onClose } = props;
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
          <ModalHeader>Algorithm in progress...</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Divider />
            <Text>Change in Population Equality: </Text>
            <Text>Change in Polsby Popper: </Text>
            <Text>Change in Majority Minority: </Text>
            <Divider />
            <Text>Number of iterations: </Text>
            <Text>Algorithm time: </Text>
            <Text>Estimated time to completion: </Text>
            <Divider />
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