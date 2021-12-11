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
    const [ running, setRunning ] = useState(algorithm["running"]);
    // const [ interval ] = useState();


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
      let interval = setInterval(() => {
        handleAlgorithmRun();
      }, 5000);

      if(running == false){
        return () => clearInterval(interval);
      }
    }, [running]);
    
    const handlePause = async () => {
      setRunning(false);
      const response = await fetch(
        `/pause`
      );
      const pause = await response.json();
      console.log("paused");
      console.log(pause);
      setAlgorithm(pause);
    }

    const handleResume = async () => {
      setRunning(true);
      const response = await fetch(
        `/resume`
      );
      const resume = await response.json();
      console.log("resumed");
      console.log(resume);
      setAlgorithm(resume);
    }

    const handleTerminate = async () => {
      setRunning(false);
      const response = await fetch(
        `/stop`
      );
      const terminate = await response.json();
      console.log("terminated");
      console.log(terminate);
      setAlgorithm(terminate);
    }

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
            running == true ? <Button colorScheme="blue" mr={3} onClick={handlePause}>Pause</Button>:
            running == false ? <Button colorScheme="blue" mr={3} onClick={handleResume}>Run</Button>:
            null
            }
            <Button colorScheme="blue" mr={3} onClick={handleTerminate}>
              Stop Algorithm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
}