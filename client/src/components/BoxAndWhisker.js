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
import ReactApexChart from 'react-apexcharts';
import plot from '../img/dummy.jpg';
import { StateDataContext } from "../contexts/StateData";

export default function BoxAndWhisker(props) {
    const { isOpen, onClose } = props;
    const [stateData, setStateData] = useContext(StateDataContext);

    const districtPops = stateData["summary"]["districtingSummaries"][0]["districtSummaries"];

    const sortedDistrictArray = () => {
      
    };

    const series = [
      {
        name: "Seawulf Districtings",
        type: 'boxPlot',
        data: [
          {
            x: "district one",
            y: [ boxData[0]["min"].toPrecision(3), boxData[0]["1q"].toPrecision(3), boxData[0]["med"].toPrecision(3),
             boxData[0]["3q"].toPrecision(3), boxData[0]["max"].toPrecision(3)]
          },
          {
            x: "district two",
            y: [ boxData[1]["min"].toPrecision(3), boxData[1]["1q"].toPrecision(3), boxData[1]["med"].toPrecision(3), 
            boxData[1]["3q"].toPrecision(3), boxData[1]["max"].toPrecision(3)]
          },
          {
            x: "district three",
            y: [ boxData[2]["min"].toPrecision(3), boxData[2]["1q"].toPrecision(3), boxData[2]["med"].toPrecision(3),
             boxData[2]["3q"].toPrecision(3), boxData[2]["max"].toPrecision(3)]
          },
          {
            x: "district four",
            y: [ boxData[3]["min"].toPrecision(3), boxData[3]["1q"].toPrecision(3), boxData[3]["med"].toPrecision(3), 
            boxData[3]["3q"].toPrecision(3), boxData[3]["max"].toPrecision(3)]
          },
          {
            x: "district five",
            y: [ boxData[4]["min"].toPrecision(3), boxData[4]["1q"].toPrecision(3), boxData[4]["med"].toPrecision(3),
             boxData[4]["3q"].toPrecision(3), boxData[4]["max"].toPrecision(3)]
          },
          {
            x: "district six",
            y: [ boxData[5]["min"].toPrecision(3), boxData[5]["1q"].toPrecision(3), boxData[5]["med"].toPrecision(3), 
            boxData[5]["3q"].toPrecision(3), boxData[5]["max"].toPrecision(3)]
          },
          {
            x: "district seven",
            y: [ boxData[6]["min"].toPrecision(3), boxData[6]["1q"].toPrecision(3),
             boxData[6]["med"].toPrecision(3), boxData[6]["3q"].toPrecision(3), boxData[6]["max"].toPrecision(3)]
          },
          {
            x: "district eight",
            y: [ boxData[7]["min"].toPrecision(3), boxData[7]["1q"].toPrecision(3),
              boxData[7]["med"].toPrecision(3), boxData[7]["3q"].toPrecision(3),
              boxData[7]["max"].toPrecision(3)]
          },
          {
            x: "district nine",
            y: [ boxData[8]["min"].toPrecision(3), boxData[8]["1q"].toPrecision(3),
             boxData[8]["med"].toPrecision(3), boxData[8]["3q"].toPrecision(3),
              boxData[8]["max"].toPrecision(3)]
          },
        ],
      },
      {
        name: 'Selected Districting',
        type: 'scatter',
        data: [
          {
            x: "district one",
            y: districtPops
          }
        ],
      }
    ];

    const options = {
      title: {
        text: 'BoxPlot - Scatter Chart',
        align: 'left',
        visiblity: false
      },
      colors: ['#008FFB', '#FEB019'],
    };
  
    return(
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Box And Whisker</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Divider />
            <ReactApexChart options={options} series={series} type='boxPlot' height={350}/>
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