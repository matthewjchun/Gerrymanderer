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
import { AlgorithmContext } from "../contexts/Algorithm";
import { DistrictingSummaryContext } from "../contexts/DistrictingSummary";
import { GeoJSONContext } from "../contexts/GeoJSON";
import { PopulationTypeContext } from "../contexts/PopulationType";
import { StateDataContext } from "../contexts/StateData";
  
  export default function Reset(props) {
      const { isOpen, onClose } = props;  
      const [ activeState, setActiveState ] = useContext(StateContext);
      const [ algorithm, setAlgorithm ] = useContext(AlgorithmContext);
      const [ districtingSummary, setDistrictingSummary ] = useContext(DistrictingSummaryContext);
      const [ geoJSON, setGeoJSON ] = useContext(GeoJSONContext);
      const [ populationType, setPopulationType ] = useContext(PopulationTypeContext);
      const [ stateData, setStateData ] = useContext(StateDataContext);

      const handleReset = async () => {
        const response = await fetch(
          `/reset`
        );
        onClose();
        setActiveState('Celtics');
        setAlgorithm(null);
        setDistrictingSummary(null);
        setGeoJSON(null);
        setPopulationType('TOTAL');
        setStateData(null);
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