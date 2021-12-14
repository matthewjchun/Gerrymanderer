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
  HStack,
} from '@chakra-ui/react';
import { useContext, useState, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';
// import boxData from '../data/finalboxwhisker/a_tot.json';
// import boxData2 from '../data/finalboxwhisker/aa_tot.json';
import ReactApexChart from 'react-apexcharts';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { SelectedDistrictingContext } from "../contexts/SelectedDistricting";
import { StateContext } from "../contexts/State";
import { StateSummaryContext } from "../contexts/StateSummary";
import { PopulationTypeContext } from "../contexts/PopulationType";

export default function BoxAndWhisker(props) {
  const { isOpen, onClose } = props;
  const [value, setValue] = useState('0');
  const [stateSummary] = useContext(StateSummaryContext);
  const [populationType] = useContext(PopulationTypeContext);
  const [activeState] = useContext(StateContext);
  const [series, setSeries] = useState();
  const [basis, setBasis] = useState('african');

  // const districtPops = stateData['summary']["districtingSummaries"][0]["districtSummaries"];

  // SELECTING BASIS AND POPULATION TYPE //

  console.log(stateSummary);

  const basisChange = (value) => {
    setValue(value);
    if(value == 0){
      setBasis('african');
    }
    else if(value == 1){
      setBasis('asian');
    }
    else if(value == 2){
      setBasis('hispanic');
    }
    else if(value == 3){
      setBasis('nativeAmerican');
    }
    else if(value == 4){
      setBasis('pacificIslander');
    }
    else if(value == 5){
      setBasis('democratic');
    }
    else{
      setBasis('republican');
    }
  }

  const boxData = [];

  if(basis == 'democratic' || basis == 'republican'){
    for( const element of stateSummary[basis] ){
      boxData.push(element);
    }
  }
  else{
    for( const element of stateSummary[basis] ){
      if(element.populationType == populationType){
        boxData.push(element);
      }
    }
  }


  // const sortedDistrictArray = () => {
  //   selectedDistricting['summary']
  // };

  let azBoxData;

  if(boxData != null){
    azBoxData = [
      {
        x: "district one",
        y: [ boxData[0]["min"].toPrecision(2), boxData[0]["firstQuartile"].toPrecision(2), boxData[0]["median"].toPrecision(2),
          boxData[0]["thirdQuartile"].toPrecision(2), boxData[0]["max"].toPrecision(2)]
      },
      {
        x: "district two",
        y: [ boxData[1]["min"].toPrecision(2), boxData[1]["firstQuartile"].toPrecision(2), boxData[1]["median"].toPrecision(2), 
        boxData[1]["thirdQuartile"].toPrecision(2), boxData[1]["max"].toPrecision(2)]
      },
      {
        x: "district three",
        y: [ boxData[2]["min"].toPrecision(2), boxData[2]["firstQuartile"].toPrecision(2), boxData[2]["median"].toPrecision(2),
          boxData[2]["thirdQuartile"].toPrecision(2), boxData[2]["max"].toPrecision(2)]
      },
      {
        x: "district four",
        y: [ boxData[3]["min"].toPrecision(2), boxData[3]["firstQuartile"].toPrecision(2), boxData[3]["median"].toPrecision(2), 
        boxData[3]["thirdQuartile"].toPrecision(2), boxData[3]["max"].toPrecision(2)]
      },
      {
        x: "district five",
        y: [ boxData[4]["min"].toPrecision(2), boxData[4]["firstQuartile"].toPrecision(2), boxData[4]["median"].toPrecision(2),
          boxData[4]["thirdQuartile"].toPrecision(2), boxData[4]["max"].toPrecision(2)]
      },
      {
        x: "district six",
        y: [ boxData[5]["min"].toPrecision(2), boxData[5]["firstQuartile"].toPrecision(2), boxData[5]["median"].toPrecision(2), 
        boxData[5]["thirdQuartile"].toPrecision(2), boxData[5]["max"].toPrecision(2)]
      },
      {
        x: "district seven",
        y: [ boxData[6]["min"].toPrecision(2), boxData[6]["firstQuartile"].toPrecision(2), boxData[6]["median"].toPrecision(2), 
        boxData[6]["thirdQuartile"].toPrecision(2), boxData[6]["max"].toPrecision(2)]
      },
      {
        x: "district eight",
        y: [ boxData[7]["min"].toPrecision(2), boxData[7]["firstQuartile"].toPrecision(2), boxData[7]["median"].toPrecision(2),
         boxData[7]["thirdQuartile"].toPrecision(2), boxData[7]["max"].toPrecision(2)]
      },
      {
        x: "district nine",
        y: [ boxData[8]["min"].toPrecision(2), boxData[8]["firstQuartile"].toPrecision(2), boxData[8]["median"].toPrecision(2),
          boxData[8]["thirdQuartile"].toPrecision(2), boxData[8]["max"].toPrecision(2)]
      },
    ];
  }

  // const vaBoxData = [
  //   {
  //     x: "district one",
  //     y: [ boxData[0]["min"].toPrecision(2), boxData[0]["firstQuartile"].toPrecision(2), boxData[0]["median"].toPrecision(2),
  //      boxData[0]["thirdQuartile"].toPrecision(2), boxData[0]["max"].toPrecision(2)]
  //   },
  //   {
  //     x: "district two",
  //     y: [ boxData[1]["min"].toPrecision(2), boxData[1]["firstQuartile"].toPrecision(2), boxData[1]["median"].toPrecision(2), 
  //     boxData[1]["thirdQuartile"].toPrecision(2), boxData[1]["max"].toPrecision(2)]
  //   },
  //   {
  //     x: "district three",
  //     y: [ boxData[2]["min"].toPrecision(2), boxData[2]["firstQuartile"].toPrecision(2), boxData[2]["median"].toPrecision(2),
  //      boxData[2]["thirdQuartile"].toPrecision(2), boxData[2]["max"].toPrecision(2)]
  //   },
  //   {
  //     x: "district four",
  //     y: [ boxData[3]["min"].toPrecision(2), boxData[3]["firstQuartile"].toPrecision(2), boxData[3]["median"].toPrecision(2), 
  //     boxData[3]["thirdQuartile"].toPrecision(2), boxData[3]["max"].toPrecision(2)]
  //   },
  //   {
  //     x: "district five",
  //     y: [ boxData[4]["min"].toPrecision(2), boxData[4]["firstQuartile"].toPrecision(2), boxData[4]["median"].toPrecision(2),
  //      boxData[4]["thirdQuartile"].toPrecision(2), boxData[4]["max"].toPrecision(2)]
  //   },
  //   {
  //     x: "district six",
  //     y: [ boxData[5]["min"].toPrecision(2), boxData[5]["firstQuartile"].toPrecision(2), boxData[5]["median"].toPrecision(2), 
  //     boxData[5]["thirdQuartile"].toPrecision(2), boxData[5]["max"].toPrecision(2)]
  //   },
  //   {
  //     x: "district seven",
  //     y: [ boxData[6]["min"].toPrecision(2), boxData[6]["firstQuartile"].toPrecision(2),
  //      boxData[6]["median"].toPrecision(2), boxData[6]["thirdQuartile"].toPrecision(2), boxData[6]["max"].toPrecision(2)]
  //   },
  //   {
  //     x: "district eight",
  //     y: [ boxData[7]["min"].toPrecision(2), boxData[7]["firstQuartile"].toPrecision(2),
  //       boxData[7]["median"].toPrecision(2), boxData[7]["thirdQuartile"].toPrecision(2),
  //       boxData[7]["max"].toPrecision(2)]
  //   },
  //   {
  //     x: "district nine",
  //     y: [ boxData[8]["min"].toPrecision(2), boxData[8]["firstQuartile"].toPrecision(2),
  //      boxData[8]["median"].toPrecision(2), boxData[8]["thirdQuartile"].toPrecision(2),
  //       boxData[8]["max"].toPrecision(2)]
  //   },      {
  //     x: "district ten",
  //     y: [ boxData[9]["min"].toPrecision(2), boxData[9]["firstQuartile"].toPrecision(2),
  //       boxData[9]["median"].toPrecision(2), boxData[9]["thirdQuartile"].toPrecision(2),
  //       boxData[9]["max"].toPrecision(2)]
  //   },
  //   {
  //     x: "district eleven",
  //     y: [ boxData[10]["min"].toPrecision(2), boxData[10]["firstQuartile"].toPrecision(2),
  //      boxData[10]["median"].toPrecision(2), boxData[10]["thirdQuartile"].toPrecision(2),
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

  return(
    <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
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