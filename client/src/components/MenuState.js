import { useState } from 'react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuIcon,
    MenuCommand,
    MenuDivider,
  } from "@chakra-ui/react"
import {
    Text,
    Button,
    Flex,
    HStack,
    VStack,
    Grid,
    GridItem,
    } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

export default function MenuState() {
    return (
        <Menu>
        {({ isOpen }) => (
            <>
            <MenuButton
    px={4}
    py={2}
    transition="all 0.2s"
    borderRadius="md"
    borderWidth="1px"
    _hover={{ bg: "gray.400" }}
    _expanded={{ bg: "blue.400" }}
    _focus={{ boxShadow: "outline" }}
  >
    Select a State <ChevronDownIcon />
  </MenuButton>
            <MenuList>
                <MenuItem>Arizona</MenuItem>
                <MenuItem>Michigan</MenuItem>
                <MenuItem >Virginia</MenuItem>
            </MenuList>
            </>
        )}
        </Menu>
    );
}