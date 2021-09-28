import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react"
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
  } from "@chakra-ui/react"
import {
    Text,
    Button,
    Flex,
    Spacer,
    Divider,
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
import { PieChart } from 'react-minimal-pie-chart';


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
                                <Divider />
                                <Text>Precincts: 1,495</Text>
                                <Divider />
                                <Text>2020 Congressional Voting Results</Text>
                                <Table variant="simple">
                                    <TableCaption>Congressional Voting Results</TableCaption>
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
                                        <Td>5</Td>
                                        <Td isNumeric>1,629,318</Td>
                                        </Tr>
                                        <Tr>
                                        <Td>Republican Party</Td>
                                        <Td>4</Td>
                                        <Td isNumeric>1,638,516</Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                                <StatGroup>
                                    <Stat>
                                        <StatLabel>Democratic</StatLabel>
                                        <StatNumber>1,629,318</StatNumber>
                                        <StatHelpText>
                                        <StatArrow type="decrease" />
                                        49.85%
                                        </StatHelpText>
                                    </Stat>

                                    <Stat>
                                        <StatLabel>Republican</StatLabel>
                                        <StatNumber>1,638,516
                                    </StatNumber>
                                        <StatHelpText>
                                        <StatArrow type="increase" />
                                        50.13%
                                        </StatHelpText>
                                    </Stat>
                                </StatGroup>
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