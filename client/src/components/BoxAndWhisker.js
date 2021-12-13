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
import boxData from '../data/finalboxwhisker/a_tot.json';
import ApexCharts from 'apexcharts'

import plot from '../img/dummy.jpg';

export default function BoxAndWhisker(props) {
    const { isOpen, onClose } = props;

    const boxplotData = {
      labels: ['District 1', 'District 2', 'District 3', 'District 4', 'District 5', 'District 6', 'District 7', 'District 8',
      'District 9'],
      datasets: [{
        label: 'Seawulf Data',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        borderColor: 'red',
        borderWidth: 1,
        padding: 10,
        itemRadius: 0,
        data: boxData
      }]
    };

    const loggingConsole = () => {
      console.log(boxData);
    }
    
    return(
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Box And Whisker</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Divider />
            {/* <Image maxW='100%' src={plot} /> */}
          </ModalBody>

          <ModalFooter>
            <Button onClick={loggingConsole}>
              test
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
}