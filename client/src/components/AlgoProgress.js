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
import { SelectedDistrictingContext } from "../contexts/SelectedDistricting";

export default function AlgoProgress(props) {
    const { isOpen, onClose, activeState, algorithmURL } = props;

    const [ algorithm, setAlgorithm ] = useContext(AlgorithmContext);
    const [ selectedDistricting, setSelectedDistricting] = useContext(SelectedDistrictingContext);

    const [ running, setRunning ] = useState(algorithm["running"]);

    let interval;

    console.log(selectedDistricting)

    const handleAlgorithmRun = async () => {
      const response = await fetch(
        `/algorithmSummary`
      );
      const algorithm = await response.json();
      setAlgorithm(algorithm);
      console.log("fetched again")
      console.log(algorithm);
      if(algorithm['running'] == false) {
        clearInterval(interval);
        interval = undefined;
        while (interval !== undefined){
            interval = undefined;
        }
      }
    }

    useEffect(() => {
      if(running == true && typeof(interval) === 'undefined'){
        interval = setInterval(() => {
          handleAlgorithmRun();
        }, 5000);
      }
    }, [running]);
    
    const handlePause = async () => {
      setRunning(false);
      const response = await fetch(
        `/pause`
      );
      const pause = await response.json();
      setAlgorithm(pause);
    }

    const handleResume = async () => {
      setRunning(true);
      const response = await fetch(
        algorithmURL
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
            {algorithm['running'] == false && algorithm['paused'] == false ?
              <>
                <Center>
                  <Text fontSize='2xl'>Algorithm Completed</Text>
                </Center>
                <br/>
                <Divider /> 
                <Text align="left">Original Pop. Equality: {selectedDistricting['summary']['districtingSummaries']['0']['populationEqualityTotal']}
                </Text> 
                <Text align="left">Post-Algo Pop. Equality: {algorithm["populationEqualityTotal"]}</Text>
                <Divider />
                <Text align="left">Original Polsby Popper: {selectedDistricting['summary']['districtingSummaries']['0']['avgPolsbyPopper']}</Text>
                <Text align="left">Post-Algo Polsby Popper: {algorithm["avgPolsbyPopper"]}</Text>
                <Divider />
                <Text align="left">Original Majority Minority: {selectedDistricting['summary']['districtingSummaries']['0']['majorityMinorityCountTotal']}
                </Text>
                <Text align="left">Post-Algo Majority Minority: {algorithm["majorityMinorityCountTotal"]}</Text>
                <Divider />
                <Text align='left'>Total Census Blocks Moved: {algorithm['numberCensusBlocksMoved']}</Text>
                <Text align="left">Number of iterations: {algorithm["numberIterations"]}</Text>
                <Divider/>              
              </>
              
              :
              algorithm['running'] == true ?
                <>
                  <Center>
                    <Text fontSize='2xl'>Algorithm in progress...</Text>
                  </Center>
                  <br/>
                  <Divider />
                  <Text align="left">Pop. Equality: {algorithm["populationEqualityTotal"]}</Text>
                  <Text align="left">Polsby Popper: {algorithm["avgPolsbyPopper"]}</Text>
                  <Text align="left">Majority Minority: {algorithm["majorityMinorityCountTotal"]}</Text>

                  <Divider />
                  <Text align='left'>Census Blocks Moved: {algorithm['numberCensusBlocksMoved']}</Text>
                  <Text align="left">Number of iterations: {algorithm["numberIterations"]}</Text>
                  <Text align="left">Estimated time: {algorithm["estimatedTime"]} seconds</Text>
                  <Divider/>
                </>:
                <>
                  <Center>
                    <Text fontSize='2xl'>Algorithm Paused</Text>
                  </Center>
                  <br/>
                  <Divider/>
                  <Text align="left">Pop. Equality: {algorithm["populationEqualityTotal"]}</Text>
                  <Text align="left">Polsby Popper: {algorithm["avgPolsbyPopper"]}</Text>
                  <Text align="left">Majority Minority: {algorithm["majorityMinorityCountTotal"]}</Text>
                  <Divider />
                  <Text align='left'>Census Blocks Moved: {algorithm['numberCensusBlocksMoved']}</Text>
                  <Text align="left">Number of iterations: {algorithm["numberIterations"]}</Text>
                  <Text align="left">Estimated time: {algorithm["estimatedTime"]} seconds</Text>
                  <Divider/>
                </>
            }
          </ModalBody>

          <ModalFooter>
            {
            running == true ? <Button colorScheme="blue" mr={3} onClick={handlePause}>Pause</Button>:
            running == false && algorithm['paused'] == true ? <Button colorScheme="blue" mr={3} onClick={handleResume}>Run</Button>:
            null
            }
            {
            algorithm['running'] == false && algorithm['paused'] == false ? 
              <Button colorScheme='blue' mr={3} onClick={onClose}>Close Summary</Button>:
              <Button colorScheme="blue" mr={3} onClick={handleTerminate}>
              Stop Algorithm
              </Button>
            }
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
}