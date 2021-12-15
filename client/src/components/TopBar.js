import { useContext } from 'react';
import { StateContext } from '../contexts/State';
import { useDisclosure } from '@chakra-ui/react';
import { HStack, Box, Text, Button, Select } from '@chakra-ui/react';

import LeftPane from './LeftPane';

import BoxAndWhisker from './BoxAndWhisker';
import Reset from './Reset';
import { AlgorithmContext } from '../contexts/Algorithm';
import { StateDataContext } from '../contexts/StateData';
import { DistrictingSummaryContext } from '../contexts/DistrictingSummary';

import boxData from '../data/finalboxwhisker/a_tot.json';

export default function TopBar(props) {
  const { isOpen: isDrawerOpen , onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure()
  const { isOpen: isBoxOpen , onOpen: onBoxOpen, onClose: onBoxClose } = useDisclosure()
  const { isOpen: isResetOpen, onOpen: onResetOpen, onClose: onResetClose } = useDisclosure()

  const [activeState, setActiveState] = useContext(StateContext);
  const [algorithm, setAlgorithm] = useContext(AlgorithmContext);
  const [stateData, setStateData] = useContext(StateDataContext);
  const [districtingSummary, setDistrictingSummary] = useContext(DistrictingSummaryContext);
  let stateSummary;

  if(stateData != null){
    stateSummary = stateData['summary'];
  }

  const downloadFile = ({ data, fileName, fileType }) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType })
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
  }
  
  const exportToJson = e => {
    e.preventDefault()
    downloadFile({
      data: JSON.stringify(boxData),
      fileName: 'celtics_districting.json',
      fileType: 'text/json',
    })
  }

  return (
    <HStack w='100%' p='5' align='center' justify='center'>
            {/* <LeftPane isOpen={true} onClose={onDrawerClose} onOpen={onDrawerOpen} onBoxOpen={onBoxOpen}></LeftPane> */}
                {/* <BoxAndWhisker isOpen={true} onClose={onBoxClose} onOpen={onBoxOpen} activeState={activeState}></BoxAndWhisker> */}
      {activeState != 'Celtics' ? (
        <Box flex='1.5' mr='auto'>
          <Button onClick={onDrawerOpen} mr='5px'>
            <Text>User Settings</Text>
          </Button>
          <Button ml='10px' onClick={exportToJson}>
          {`Download JSON`}
          </Button>
          <Button colorScheme='red' ml='10px' mr='auto' onClick={onResetOpen}>
            Reset
          </Button>
          <Reset 
            isOpen={isResetOpen} 
            onClose={onResetClose} 
            onOpen={onResetOpen} 
          ></Reset>
          {stateSummary != null ?
            <>
            <LeftPane isOpen={isDrawerOpen} onClose={onDrawerClose} onOpen={onDrawerOpen} onBoxOpen={onBoxOpen}></LeftPane>
            <BoxAndWhisker isOpen={isBoxOpen} onClose={onBoxClose} onOpen={onBoxOpen} activeState={activeState}></BoxAndWhisker>
            </>
            :
            null          
          }
        </Box>
      ) : (
        <Box flex='1'/>
      )}
      <Text flex='1.5' fontWeight='bold' fontSize='1.5em' m='auto' align='center'>
        {activeState} {districtingSummary != null && activeState != 'Celtics' && districtingSummary['id'] == '1' ? ((' - Enacted')) : null}
        {districtingSummary != null && activeState != 'Celtics' && districtingSummary['id'] != '1' ? ((' - Plan '+districtingSummary['id'])) : null}
      </Text>
      <Select
        flex='1'
        value={activeState}
        placeholder='Select state'
        onChange={(e) => {
          setActiveState(e.target.value);
        }}
      >
        {activeState != 'Celtics' ? (
          <option value='Celtics'>Celtics</option>
        ) : null}
        {activeState != 'Arizona' ? (
          <option value='Arizona'>Arizona</option>
        ) : null}
        {activeState != 'Michigan' ? (
          <option value='Michigan'>Michigan</option>
        ) : null}
        {activeState != 'Virginia' ? (
          <option value='Virginia'>Virginia</option>
        ) : null}
      </Select>
    </HStack>
  );
}
