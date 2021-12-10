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
import { AlgorithmContext } from "../contexts/Algorithm";

export default function AlgoProgress(props) {
    const { isOpen, onClose, activeState } = props;
    const [ algorithm, setAlgorithm ] = useContext(AlgorithmContext);

    // const { runningFlag, setRunningFlag } = useState();
    // let runningFlag = true;
    // useEffect(() => {
    //     setRunningFlag(runningFlag)
    // }, [runningFlag])

    // const handlePause = async () => {
    //     setRunningFlag(!runningFlag);
    //     console.log(runningFlag)
    // }

    let isRunning = algorithm["running"];

    const handleAlgorithmRun = async () => {
      const response = await fetch(
        `/algorithmSummary`
      );
      const algorithm = await response.json();
      setAlgorithm(algorithm);
      console.log("fetched again")
      console.log(algorithm);
    }


    useEffect(() => {
      const interval = setInterval(() => {
        handleAlgorithmRun();
      }, 15000);
      
      if(isRunning == false){
        return () => clearInterval(interval);
      }
    });
    
    return(
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>              
            <Heading>{activeState}</Heading>  
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Text fontSize='2xl'>Algorithm in progress...</Text>
            </Center>
            <Divider />
            <Text align="left">Pop. Equality: {algorithm["populationEqualityTotal"]}</Text>
            <Text align="left">Polsby Popper: {algorithm["avgPolsbyPopper"]}</Text>
            <Text align="left">Majority Minority: {algorithm["majorityMinorityCountTotal"]}</Text>
            <Divider />
            <Text align="left">Number of iterations: {algorithm["numberIterations"]}</Text>
            <Text align="left">Algorithm time: {algorithm["estimatedTime"]}</Text>
            {/* <Text align="left">Estimated time to completion: </Text> */}
            <Divider/>
          </ModalBody>

          <ModalFooter>
            {
            isRunning == true ? <Button colorScheme="blue" mr={3} /*onClick={handlePause}*/>Pause</Button>:
            isRunning == false ?<Button colorScheme="blue" mr={3} /*onClick={handlePause}*/>Run</Button>:
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