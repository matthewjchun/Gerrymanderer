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
import Chart from 'chart.js/auto';
import boxData from '../data/finalboxwhisker/a_tot.json';

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

    window.onload = () => {
      console.log("hi")
      const ctx = document.getElementById("canvas").getContext("2d");
      window.myBar = new Chart(ctx, {
        type: 'boxplot',
        data: boxplotData,
        options: {
          responsive: true,
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Box and Whisker Data'
          }
        }
      });
    };
    
    return(
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Box And Whisker</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Divider />
            {/* <Image maxW='100%' src={plot} /> */}
            <canvas id="canvas"></canvas>
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