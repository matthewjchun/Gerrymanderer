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
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
import { useContext, useState, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import boxData from '../data/finalboxwhisker/a_tot.json';
import boxData2 from '../data/finalboxwhisker/aa_tot.json';
import ReactApexChart from 'react-apexcharts';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { SelectedDistrictingContext } from "../contexts/SelectedDistricting";
import { StateContext } from "../contexts/State";

export default function BoxAndWhisker(props) {
    const { isOpen, onClose } = props;
    const [value, setValue] = useState('0');
    const [selectedDistricting, setSelectedDistricting] = useContext(SelectedDistrictingContext);
    const [activeState, setActiveState] = useContext(StateContext);
    const [series, setSeries] = useState();

    // const districtPops = stateData['summary']["districtingSummaries"][0]["districtSummaries"];

    const basisMap = {
      0: boxData2,
      1: boxData,
      Virginia: 'va',
    };


    const sortedDistrictArray = () => {
      
    };

    // change to boxData / basisMap[value]
    const azBoxData = [
      {
        x: "district one",
        y: [ basisMap[value][0]["min"].toPrecision(2), basisMap[value][0]["1q"].toPrecision(2), basisMap[value][0]["med"].toPrecision(2),
         basisMap[value][0]["3q"].toPrecision(2), basisMap[value][0]["max"].toPrecision(2)]
      },
      {
        x: "district two",
        y: [ basisMap[value][1]["min"].toPrecision(2), basisMap[value][1]["1q"].toPrecision(2), basisMap[value][1]["med"].toPrecision(2), 
        basisMap[value][1]["3q"].toPrecision(2), basisMap[value][1]["max"].toPrecision(2)]
      },
      {
        x: "district three",
        y: [ basisMap[value][2]["min"].toPrecision(2), basisMap[value][2]["1q"].toPrecision(2), basisMap[value][2]["med"].toPrecision(2),
         basisMap[value][2]["3q"].toPrecision(2), basisMap[value][2]["max"].toPrecision(2)]
      },
      {
        x: "district four",
        y: [ basisMap[value][3]["min"].toPrecision(2), basisMap[value][3]["1q"].toPrecision(2), basisMap[value][3]["med"].toPrecision(2), 
        basisMap[value][3]["3q"].toPrecision(2), basisMap[value][3]["max"].toPrecision(2)]
      },
      {
        x: "district five",
        y: [ basisMap[value][4]["min"].toPrecision(2), basisMap[value][4]["1q"].toPrecision(2), basisMap[value][4]["med"].toPrecision(2),
         basisMap[value][4]["3q"].toPrecision(2), basisMap[value][4]["max"].toPrecision(2)]
      },
      {
        x: "district six",
        y: [ basisMap[value][5]["min"].toPrecision(2), basisMap[value][5]["1q"].toPrecision(2), basisMap[value][5]["med"].toPrecision(2), 
        basisMap[value][5]["3q"].toPrecision(2), basisMap[value][5]["max"].toPrecision(2)]
      },
      {
        x: "district seven",
        y: [ basisMap[value][6]["min"].toPrecision(2), basisMap[value][6]["1q"].toPrecision(2),
         basisMap[value][6]["med"].toPrecision(2), basisMap[value][6]["3q"].toPrecision(2), basisMap[value][6]["max"].toPrecision(2)]
      },
      {
        x: "district eight",
        y: [ basisMap[value][7]["min"].toPrecision(2), basisMap[value][7]["1q"].toPrecision(2),
          basisMap[value][7]["med"].toPrecision(2), basisMap[value][7]["3q"].toPrecision(2),
          basisMap[value][7]["max"].toPrecision(2)]
      },
      {
        x: "district nine",
        y: [ basisMap[value][8]["min"].toPrecision(2), basisMap[value][8]["1q"].toPrecision(2),
         basisMap[value][8]["med"].toPrecision(2), basisMap[value][8]["3q"].toPrecision(2),
          basisMap[value][8]["max"].toPrecision(2)]
      },
    ];

    // const vaBoxData = [
    //   {
    //     x: "district one",
    //     y: [ boxData[0]["min"].toPrecision(2), boxData[0]["1q"].toPrecision(2), boxData[0]["med"].toPrecision(2),
    //      boxData[0]["3q"].toPrecision(2), boxData[0]["max"].toPrecision(2)]
    //   },
    //   {
    //     x: "district two",
    //     y: [ boxData[1]["min"].toPrecision(2), boxData[1]["1q"].toPrecision(2), boxData[1]["med"].toPrecision(2), 
    //     boxData[1]["3q"].toPrecision(2), boxData[1]["max"].toPrecision(2)]
    //   },
    //   {
    //     x: "district three",
    //     y: [ boxData[2]["min"].toPrecision(2), boxData[2]["1q"].toPrecision(2), boxData[2]["med"].toPrecision(2),
    //      boxData[2]["3q"].toPrecision(2), boxData[2]["max"].toPrecision(2)]
    //   },
    //   {
    //     x: "district four",
    //     y: [ boxData[3]["min"].toPrecision(2), boxData[3]["1q"].toPrecision(2), boxData[3]["med"].toPrecision(2), 
    //     boxData[3]["3q"].toPrecision(2), boxData[3]["max"].toPrecision(2)]
    //   },
    //   {
    //     x: "district five",
    //     y: [ boxData[4]["min"].toPrecision(2), boxData[4]["1q"].toPrecision(2), boxData[4]["med"].toPrecision(2),
    //      boxData[4]["3q"].toPrecision(2), boxData[4]["max"].toPrecision(2)]
    //   },
    //   {
    //     x: "district six",
    //     y: [ boxData[5]["min"].toPrecision(2), boxData[5]["1q"].toPrecision(2), boxData[5]["med"].toPrecision(2), 
    //     boxData[5]["3q"].toPrecision(2), boxData[5]["max"].toPrecision(2)]
    //   },
    //   {
    //     x: "district seven",
    //     y: [ boxData[6]["min"].toPrecision(2), boxData[6]["1q"].toPrecision(2),
    //      boxData[6]["med"].toPrecision(2), boxData[6]["3q"].toPrecision(2), boxData[6]["max"].toPrecision(2)]
    //   },
    //   {
    //     x: "district eight",
    //     y: [ boxData[7]["min"].toPrecision(2), boxData[7]["1q"].toPrecision(2),
    //       boxData[7]["med"].toPrecision(2), boxData[7]["3q"].toPrecision(2),
    //       boxData[7]["max"].toPrecision(2)]
    //   },
    //   {
    //     x: "district nine",
    //     y: [ boxData[8]["min"].toPrecision(2), boxData[8]["1q"].toPrecision(2),
    //      boxData[8]["med"].toPrecision(2), boxData[8]["3q"].toPrecision(2),
    //       boxData[8]["max"].toPrecision(2)]
    //   },      {
    //     x: "district ten",
    //     y: [ boxData[9]["min"].toPrecision(2), boxData[9]["1q"].toPrecision(2),
    //       boxData[9]["med"].toPrecision(2), boxData[9]["3q"].toPrecision(2),
    //       boxData[9]["max"].toPrecision(2)]
    //   },
    //   {
    //     x: "district eleven",
    //     y: [ boxData[10]["min"].toPrecision(2), boxData[10]["1q"].toPrecision(2),
    //      boxData[10]["med"].toPrecision(2), boxData[10]["3q"].toPrecision(2),
    //       boxData[10]["max"].toPrecision(2)]
    //   },
    // ];

    const miBoxData = {

    }

    const azSeries = [
      {
        name: "Seawulf Districtings",
        type: 'boxPlot',
        data: azBoxData
      },
      {
        name: 'Selected Districtings',
        type: 'scatter',
        data: [
          {
            x: 'district one',
            y: [0.02, 0.03, 0.05]
          }
        ],
      },
    ];

    const vaSeries = [
      {
        name: "Seawulf Districtings",
        type: 'boxPlot',
        data: azBoxData             // CHANGE TO VA
      },
      {
        name: 'Selected Districtings',
        type: 'scatter',
        data: [
          {
            x: 'district one',
            y: [0.02, 0.03, 0.05]
          }
        ],
      },
    ];

    const miSeries = [
      {
        name: "Seawulf Districtings",
        type: 'boxPlot',
        data: azBoxData             // CHANGE TO MI LATER
      },
      {
        name: 'Selected Districtings',
        type: 'scatter',
        data: [
          {
            x: 'district one',
            y: [0.02, 0.03, 0.05]
          }
        ],
      },
    ];

    const options = {
      title: {
        visible: false
      },
      colors: ['#008FFB', '#FEB019', '#87CEEB'],
      yaxis: {
        forceNiceScale: true,
        labels: {
          formatter: function(val, index) {
            if(val != null){
              return val.toLocaleString("en", {style: "percent"});
            }
          }
        }
      }
    };

    const basisChange = (value) => {
      setValue(value);
      // GOING TO WRITE A FETCH HERE

    }
  
    return(
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Box And Whisker</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Divider />
            { activeState == 'Arizona' ?
              (value == 0 ?
                <ReactApexChart options={options} series={azSeries} type='boxPlot' height={350}/>:
                <ReactApexChart options={options} series={azSeries} type='boxPlot' height={350}/>):
              <ReactApexChart options={options} series={azSeries} type='boxPlot' height={350}/>
            }
            
            
            <Divider />
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='center'>
                      Basis
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <RadioGroup
                    onChange={basisChange}
                    value={value}
                    defaultValue='0'
                  >
                    <Stack>
                      <Radio size='md' value='0' colorScheme='blue' defaultChecked>
                        African American
                      </Radio>
                      <Radio size='md' value='1' colorScheme='blue'>
                        Asian
                      </Radio>
                      <Radio size='md' value='2' colorScheme='blue'>
                        Hispanic
                      </Radio>
                      <Radio size='md' value='3' colorScheme='blue'>
                        Native American
                      </Radio>
                      <Radio size='md' value='4' colorScheme='blue'>
                        Pacific Islander
                      </Radio>
                      <Radio size='md' value='5' colorScheme='blue'>
                        Democratic
                      </Radio>
                      <Radio size='md' value='6' colorScheme='blue'>
                        Republican
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
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