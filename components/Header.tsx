import React from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Button,
  Icon,
  Kbd,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  IoChevronDown,
  IoExitOutline,
  IoPersonOutline,
  IoStatsChartOutline,
} from "react-icons/io5";
import { useAuthContext } from "contexts/AuthContext";
import api from "@api";

const Header: React.FC = () => {
  const { user } = useAuthContext();

  const handleSignOut = () => {
    api.app.logout();
  };

  return (
    <Box
      as="header"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Link href="/">
        <Kbd as="a" href="/" fontSize="4xl">
          cisdord
        </Kbd>
      </Link>
      <Box as="nav">
        {user && (
          <Link href="/channels/me">
            <Button
              as="a"
              href="/channels/me"
              colorScheme="brand"
              variant="ghost"
              mr="4"
            >
              Dashboard
            </Button>
          </Link>
        )}
        <Link href="/channels">
          <Button
            as="a"
            href="/channels"
            colorScheme="brand"
            variant="ghost"
            ml={user ? "4" : undefined}
            mr="8"
          >
            Channels
          </Button>
        </Link>
        {user ? (
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              rightIcon={<Icon as={IoChevronDown} color="brand.400" />}
            >
              <Avatar size="sm" name={user.name} />
            </MenuButton>
            <MenuList>
              <MenuItem icon={<Icon as={IoPersonOutline} />}>Profile</MenuItem>
              <MenuItem isDisabled icon={<Icon as={IoStatsChartOutline} />}>
                Stats (coming soon)
              </MenuItem>
              <MenuDivider />
              <MenuItem
                icon={<Icon as={IoExitOutline} />}
                onClick={handleSignOut}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Link href="/sign-in">
            <Button as="a" href="/sign-in" colorScheme="brand">
              Sign in
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default Header;
