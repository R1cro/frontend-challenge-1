import { Outlet } from 'react-router-dom';
import { Box } from '@mantine/core';
import NavigationBar from '~/components/NavigationBar';

export default function BasicLayout() {
  return (
    <Box className="!w-full bg-gray-200">
      <NavigationBar />
      <Box p="md" className="!w-full">
        <Outlet />
      </Box>
    </Box>
  );
}
