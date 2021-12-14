import { useContext } from 'react';
import { StateContext } from '../contexts/State';
import { useDisclosure } from '@chakra-ui/react';
import { HStack, Box, Text, Button, Select } from '@chakra-ui/react';

import LeftPane from './LeftPane';

import BoxAndWhisker from './BoxAndWhisker';
import Reset from './Reset';
import { AlgorithmContext } from '../contexts/Algorithm';
import { SelectedDistrictingContext } from '../contexts/SelectedDistricting';

export default function TopBar(props) {
  const { isOpen: isDrawerOpen , onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure()
  const { isOpen: isBoxOpen , onOpen: onBoxOpen, onClose: onBoxClose } = useDisclosure()
  const { isOpen: isResetOpen, onOpen: onResetOpen, onClose: onResetClose } = useDisclosure()

  const [activeState, setActiveState] = useContext(StateContext);
  const [algorithm, setAlgorithm] = useContext(AlgorithmContext);
  const [selectedDistricting, setSelectedDistricting] = useContext(SelectedDistrictingContext);

  return (
    <HStack w='100%' p='5' align='center' justify='center'>
                {/* <BoxAndWhisker isOpen={true} onClose={onBoxClose} onOpen={onBoxOpen} activeState={activeState}></BoxAndWhisker> */}
      {activeState != 'Celtics' ? (
        <Box flex='1' mr='auto'>
          <Button onClick={onDrawerOpen} mr='5px'>
            <Text>User Settings</Text>
          </Button>
          <Button colorScheme='red' ml='10px' onClick={onResetOpen}>
            Reset
          </Button>
          <Reset 
            isOpen={isResetOpen} 
            onClose={onResetClose} 
            onOpen={onResetOpen} 
          ></Reset>
          {selectedDistricting != null ?
            <>
            <LeftPane isOpen={isDrawerOpen} onClose={onDrawerClose} onOpen={onDrawerOpen} onBoxOpen={onBoxOpen}></LeftPane>
            <BoxAndWhisker isOpen={isBoxOpen} onClose={onBoxClose} onOpen={onBoxOpen} activeState={activeState}></BoxAndWhisker>
            </>
            :
            null          
          }
        </Box>
      ) : (
        <Box flex='1' mr='auto' />
      )}
      <Text flex='2' fontWeight='bold' fontSize='1.5em' m='auto' align='center'>
        {activeState}
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
