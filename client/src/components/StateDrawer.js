import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react"
import {
    Text,
    Button,
    Flex,
    Spacer,
} from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from "@chakra-ui/react";
import { useContext } from 'react';
import { StateContext } from '../contexts/State';


export default function StateDrawer(props){
    const { isOpen, onOpen, onClose } = props;

    const [ activeState ] = useContext(StateContext);

    return(
        <Drawer isOpen={isOpen} onClose={onClose} size="sm" placement="right" variant="permanent">
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                    <Text flex='1' fontWeight='bold' fontSize='1.5em' m='auto' align='center'>
                        {activeState}
                    </Text>
                </DrawerHeader>
                <DrawerBody>
                    
                    <Tabs>
                        <TabList>
                            <Flex align='center' justify='space-evenly'>
                                <Tab>State Statistics</Tab>
                                <Tab>Districts</Tab>
                            </Flex>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <Text>Population: 7,151,502</Text>
                                <Text>Congressional Voting Results</Text>
                                <Table variant="simple">
                                    <TableCaption>Rando Numbers</TableCaption>
                                    <Thead>
                                        <Tr>
                                        <Th>Party</Th>
                                        <Th>Districts</Th>
                                        <Th isNumeric>Total Votes</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr>
                                        <Td>Democratic Party</Td>
                                        <Td>3</Td>
                                        <Td isNumeric>a lot</Td>
                                        </Tr>
                                        <Tr>
                                        <Td>Republican Party</Td>
                                        <Td>2</Td>
                                        <Td isNumeric>slightly less</Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TabPanel>
                            <TabPanel>
                                <Table variant="striped" colorScheme="teal">
                                    <TableCaption>Districtings</TableCaption>
                                    <Thead>
                                        <Tr>
                                        <Th>District #</Th>
                                        <Th>Population</Th>
                                        <Th isNumeric>Democratic</Th>
                                        <Th isNumeric>Republican</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr>
                                        <Td>1</Td>
                                        <Td>a lot</Td>
                                        <Td isNumeric>25.4</Td>
                                        <Td isNumeric>25.4</Td>
                                        </Tr>
                                        <Tr>
                                        <Td>2</Td>
                                        <Td>a lot</Td>
                                        <Td isNumeric>30.48</Td>
                                        <Td isNumeric>25.4</Td>
                                        </Tr>
                                        <Tr>
                                        <Td>3</Td>
                                        <Td>a lot</Td>
                                        <Td isNumeric>0.91444</Td>
                                        <Td isNumeric>25.4</Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
        
                </DrawerBody>
                <DrawerFooter>
                    <Button onClick={onClose}>
                        Close
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>   

    );
}