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


export default function StateDrawer(props){
    const { isOpen, onOpen, onClose } = props;

    return(
        <>
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              size="md"
            >
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <Text>Arizona</Text>
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
        </>

    );
}