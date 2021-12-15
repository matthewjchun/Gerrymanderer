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
  CircularProgress,
  HStack,
  Box,
} from "@chakra-ui/react";
import { useContext, useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import ReactApexChart from "react-apexcharts";
import { AlgorithmContext } from "../contexts/Algorithm";
import { StateDataContext } from "../contexts/StateData";
import { GeoJSONContext } from "../contexts/GeoJSON";

export default function AlgoProgress(props) {
    const { isOpen, onClose, activeState, algorithmURL, popEquality } = props;

    const [ algorithm, setAlgorithm ] = useContext(AlgorithmContext);
    const [ stateData ] = useContext(StateDataContext);
    const [ geoJSON, setGeoJSON ] = useContext(GeoJSONContext);

    const [ running, setRunning ] = useState(algorithm["running"]);
    const [ loading, setLoading ] = useState(false);

    let interval;

    // console.log(running); after reset, running is set to false and never changes

    useEffect(() => {
      if(running == true && typeof(interval) === 'undefined'){
        interval = setInterval(() => {
          handleAlgorithmRun();
        }, 5000);
      }
    }, [running]);
    

    const handleAlgorithmRun = async () => {
      const response = await fetch(
        `/algorithmSummary`
      );
      const algorithm = await response.json();
      if(algorithm['running'] == false) {
        clearInterval(interval);
        interval = undefined;
        while (interval !== undefined){
            interval = undefined;
        }
      }
      setAlgorithm(algorithm);
      console.log("fetched again")
      console.log(algorithm);
    }

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
      setAlgorithm(resume);
    }

    const handleTerminate = async () => {
      setRunning(false);
      const response = await fetch(
        `/stop`
      );
      const terminate = await response.json();
      setAlgorithm(terminate);
    }

    const handlePostAlgo = async () => {
      setLoading(true);
      const response = await fetch(
        `/algorithmSummary`
      );
      const body = await response.json();
      if(body['districtingBoundary'] == null){
        while(body['districtingBoundary'] == null){
          const response = await fetch(
            `/algorithmSummary`
          );
          const body = await response.json();
        }
      }
      await setGeoJSON(body['districtingBoundary']);
      onClose();
      setLoading(false);
    }

    console.log(popEquality)

    const series = [
      {
        name: 'blerg',
        data: [stateData['summary']['districtingSummaries']['0']['populationEqualityTotal'], algorithm["populationEqualityTotal"]]
      }
    ];

    const options = {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
        }
      },
      colors: ['#008FFB', '#FEB019'],
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['Original Population Equality', 'Algorithm Population Equality'],
      },
      yaxis: {
        min: 0,
        max: popEquality,
        tickAmount: 5,
        forceNiceScale: true,
        labels: {
          formatter: function(val, index) {
            if(val != null){
              return val.toPrecision(2);
            }
          }
        }
      }
    }

    return(
      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
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
                <Text align="left">Original Pop. Equality: {stateData['summary']['districtingSummaries']['0']['populationEqualityTotal']}
                </Text> 
                <Text align="left">Post-Algo Pop. Equality: {algorithm["populationEqualityTotal"]}</Text>
                <Divider />
                <Text align="left">Original Polsby Popper: {stateData['summary']['districtingSummaries']['0']['avgPolsbyPopper']}</Text>
                <Text align="left">Post-Algo Polsby Popper: {algorithm["avgPolsbyPopper"]}</Text>
                <Divider />
                <Text align="left">Original Majority Minority: {stateData['summary']['districtingSummaries']['0']['majorityMinorityCountTotal']}
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
                  {/* <HStack spacing='5px'>
                    <Box> */}
                      <Text align="left">Pop. Equality: {algorithm["populationEqualityTotal"]}</Text>
                      <Text align="left">Polsby Popper: {algorithm["avgPolsbyPopper"]}</Text>
                      <Text align="left">Majority Minority: {algorithm["majorityMinorityCountTotal"]}</Text>
                      <Divider />
                      <Text align='left'>Census Blocks Moved: {algorithm['numberCensusBlocksMoved']}</Text>
                      <Text align="left">Number of iterations: {algorithm["numberIterations"]}</Text>
                      <Text align="left">Estimated time: {algorithm["estimatedTime"]} seconds</Text>
                      <Divider/>
                    {/* </Box> */}
                    <ReactApexChart options={options} series={series}></ReactApexChart>
                  {/* </HStack> */}
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
              loading == true ?
                <CircularProgress isIndeterminate color='blue.300' />:
                <Button colorScheme='blue' mr={3} onClick={handlePostAlgo}>Close Summary</Button>:
              <Button colorScheme="blue" mr={3} onClick={handleTerminate}>
              Stop Algorithm
              </Button>
            }
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
}