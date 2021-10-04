import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react';
import { Text, Button, Flex, Spacer, Divider } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { DataContext, StateContext } from '../contexts/State';
import { PieChart } from 'react-minimal-pie-chart';

export default function StateDrawer(props) {
  const { isOpen, onOpen, onClose } = props;

  const [activeState] = useContext(StateContext);
  const [geoJSONdata, setGeoJSONdata] = useContext(DataContext);

  const data = [
    { title: 'White', value: 2849063, color: '#E38627' },
    { title: 'Black or African', value: 178788, color: '#C13C37' },
    { title: 'American Indian', value: 171607, color: '#FC4040' },
    { title: 'Asian', value: 147661, color: '#71DE6A' },
    { title: 'Hispanic', value: 1121876, color: '#6A2135' },
  ];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      size='sm'
      placement='right'
      variant='permanent'
    >
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Text
            flex='1'
            fontWeight='bold'
            fontSize='1.5em'
            m='auto'
            align='center'
          >
            {activeState}
          </Text>
        </DrawerHeader>
        <DrawerBody>
          <Tabs>
            <TabList>
              <Flex align='center' justify='space-evenly'>
                <Tab>State Statistics</Tab>
                <Tab>Districts</Tab>
                <Tab>Data</Tab>
              </Flex>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Text>Population: 7,151,502</Text>
                <Divider />
                <Text>Precincts: 1,495</Text>
                <Divider />
                <Text>2020 Congressional Voting Results</Text>
                <Table variant='simple'>
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
                      <StatArrow type='decrease' />
                      49.85%
                    </StatHelpText>
                  </Stat>

                  <Stat>
                    <StatLabel>Republican</StatLabel>
                    <StatNumber>1,638,516</StatNumber>
                    <StatHelpText>
                      <StatArrow type='increase' />
                      50.13%
                    </StatHelpText>
                  </Stat>
                </StatGroup>
                <Divider />
                <p id='chartTitle'>Demographics</p>
                <PieChart
                  data={data}
                  label={({ dataEntry }) =>
                    Math.round(dataEntry.percentage) + '%'
                  }
                  labelStyle={(index) => ({
                    fill: data[index].color,
                    fontSize: '5px',
                    fontFamily: 'sans-serif',
                  })}
                  radius={42}
                  labelPosition={112}
                />
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th>Race</Th>
                      <Th>Population</Th>
                      <Th>Color</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>White</Td>
                      <Td>2,849,063</Td>
                      <Td bg='#E38627'></Td>
                    </Tr>
                    <Tr>
                      <Td>Hispanic</Td>
                      <Td>1,121,876</Td>
                      <Td bg='#6A2135'></Td>
                    </Tr>
                    <Tr>
                      <Td>Black or African</Td>
                      <Td>178,788</Td>
                      <Td bg='#C13C37'></Td>
                    </Tr>
                    <Tr>
                      <Td>American Indian</Td>
                      <Td>171,607</Td>
                      <Td bg='#FC4040'></Td>
                    </Tr>
                    <Tr>
                      <Td>Asian</Td>
                      <Td>147,661</Td>
                      <Td bg='#71DE6A'></Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TabPanel>
              <TabPanel>
                <Text> DISTRICT 1 </Text>
                <Table variant='striped' colorScheme='gray'>
                  <Thead>
                    <Tr>
                      <Th>Population</Th>
                      <Th isNumeric>Democratic</Th>
                      <Th isNumeric>Republican</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>724,868</Td>
                      <Td isNumeric>50.1</Td>
                      <Td isNumeric>48.4</Td>
                    </Tr>
                    <Tr>
                      <Td></Td>
                      <Td isNumeric>
                        <StatArrow type='increase' />
                      </Td>
                      <Td isNumeric>
                        <StatArrow type='decrease' />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
                <Divider />

                <Text> DISTRICT 2 </Text>
                <Table variant='striped' colorScheme='gray'>
                  <Thead>
                    <Tr>
                      <Th>Population</Th>
                      <Th isNumeric>Democratic</Th>
                      <Th isNumeric>Republican</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>724,868</Td>
                      <Td isNumeric>54.5</Td>
                      <Td isNumeric>43.9</Td>
                    </Tr>
                    <Tr>
                      <Td></Td>
                      <Td isNumeric>
                        <StatArrow type='increase' />
                      </Td>
                      <Td isNumeric>
                        <StatArrow type='decrease' />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
                <Divider />

                <Text> DISTRICT 3 </Text>
                <Table variant='striped' colorScheme='gray'>
                  <Thead>
                    <Tr>
                      <Th>Population</Th>
                      <Th isNumeric>Democratic</Th>
                      <Th isNumeric>Republican</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td> 724,868</Td>
                      <Td isNumeric>54.5</Td>
                      <Td isNumeric>43.9</Td>
                    </Tr>
                    <Tr>
                      <Td></Td>
                      <Td isNumeric>
                        <StatArrow type='increase' />
                      </Td>
                      <Td isNumeric>
                        <StatArrow type='decrease' />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
                <Divider />

                <Text> DISTRICT 4 </Text>
                <Table variant='striped' colorScheme='gray'>
                  <Thead>
                    <Tr>
                      <Th>Population</Th>
                      <Th isNumeric>Democratic</Th>
                      <Th isNumeric>Republican</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td> 724,868</Td>
                      <Td isNumeric>54.5</Td>
                      <Td isNumeric>43.9</Td>
                    </Tr>
                    <Tr>
                      <Td></Td>
                      <Td isNumeric>
                        <StatArrow type='increase' />
                      </Td>
                      <Td isNumeric>
                        <StatArrow type='decrease' />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
                <Divider />

                <Text> DISTRICT 5 </Text>
                <Table variant='striped' colorScheme='gray'>
                  <Thead>
                    <Tr>
                      <Th>Population</Th>
                      <Th isNumeric>Democratic</Th>
                      <Th isNumeric>Republican</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td> 724,868</Td>
                      <Td isNumeric>54.5</Td>
                      <Td isNumeric>43.9</Td>
                    </Tr>
                    <Tr>
                      <Td></Td>
                      <Td isNumeric>
                        <StatArrow type='increase' />
                      </Td>
                      <Td isNumeric>
                        <StatArrow type='decrease' />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
                <Divider />

                <Text> DISTRICT 6 </Text>
                <Table variant='striped' colorScheme='gray'>
                  <Thead>
                    <Tr>
                      <Th>Population</Th>
                      <Th isNumeric>Democratic</Th>
                      <Th isNumeric>Republican</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td> 724,868</Td>
                      <Td isNumeric>54.5</Td>
                      <Td isNumeric>43.9</Td>
                    </Tr>
                    <Tr>
                      <Td></Td>
                      <Td isNumeric>
                        <StatArrow type='increase' />
                      </Td>
                      <Td isNumeric>
                        <StatArrow type='decrease' />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
                <Divider />

                <Text> DISTRICT 7 </Text>
                <Table variant='striped' colorScheme='gray'>
                  <Thead>
                    <Tr>
                      <Th>Population</Th>
                      <Th isNumeric>Democratic</Th>
                      <Th isNumeric>Republican</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td> 724,868</Td>
                      <Td isNumeric>54.5</Td>
                      <Td isNumeric>43.9</Td>
                    </Tr>
                    <Tr>
                      <Td></Td>
                      <Td isNumeric>
                        <StatArrow type='increase' />
                      </Td>
                      <Td isNumeric>
                        <StatArrow type='decrease' />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
                <Divider />

                <Text> DISTRICT 8 </Text>
                <Table variant='striped' colorScheme='gray'>
                  <Thead>
                    <Tr>
                      <Th>Population</Th>
                      <Th isNumeric>Democratic</Th>
                      <Th isNumeric>Republican</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td> 724,868</Td>
                      <Td isNumeric>54.5</Td>
                      <Td isNumeric>43.9</Td>
                    </Tr>
                    <Tr>
                      <Td></Td>
                      <Td isNumeric>
                        <StatArrow type='increase' />
                      </Td>
                      <Td isNumeric>
                        <StatArrow type='decrease' />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
                <Divider />

                <Text> DISTRICT 9 </Text>
                <Table variant='striped' colorScheme='gray'>
                  <Thead>
                    <Tr>
                      <Th>Population</Th>
                      <Th isNumeric>Democratic</Th>
                      <Th isNumeric>Republican</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td> 724,868</Td>
                      <Td isNumeric>54.5</Td>
                      <Td isNumeric>43.9</Td>
                    </Tr>
                    <Tr>
                      <Td></Td>
                      <Td isNumeric>
                        <StatArrow type='increase' />
                      </Td>
                      <Td isNumeric>
                        <StatArrow type='decrease' />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
                <Divider />
              </TabPanel>
              <TabPanel>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>State Name</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>{geoJSONdata.state}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
        {/* <DrawerFooter>
                    </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
}
