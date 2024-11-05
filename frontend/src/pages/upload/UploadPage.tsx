import { useEffect } from 'react';
import { useUploadStore } from '~/stores/UploadStore';
import { Title, Box, Container, Loader, Center, Card, Text } from '@mantine/core';
import ViewTable from '~/components/ViewTable';
import { observer } from 'mobx-react-lite';
import UploadSection from '~/components/UploadSection';
import ScreenCenter from '~/components/ScreenCenter';

const UploadPage = observer(() => {
  const { isLoading, TICFiles, fetchFiles } = useUploadStore();

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  if (isLoading)
    return (
      <ScreenCenter>
        <Loader />
      </ScreenCenter>
    );

  if (TICFiles.length === 0) {
    return (
      <ScreenCenter>
        <Box size="xl">
          <Card className="!w-full text-center p-4">
            <Title size="lg" mb="md">
              No files uploaded
            </Title>
            <Text mb="md">Please upload your files.</Text>
            <UploadSection />
          </Card>
        </Box>
      </ScreenCenter>
    );
  }

  return (
    <Container size="xl">
      <Center>
        <Card className="w-full">
          <Box className="flex flex-row justify-between">
            <Title size="lg" className="text-center px-4">
              Uploaded Files
            </Title>
          </Box>
          <ViewTable files={TICFiles} />
        </Card>
      </Center>
    </Container>
  );
});

export default UploadPage;
