import React from 'react';
import { TICFile } from '~/interfaces/upload';
import { Table, ScrollArea } from '@mantine/core';

export type ViewTableProps = {
  files: TICFile[];
};

const ViewTable: React.FC<ViewTableProps> = ({ files }) => {
  return (
    <ScrollArea>
      <Table highlightOnHover className="w-full mt-4 border rounded-lg">
        <Table.Thead className="bg-green-800 text-white">
          <Table.Tr>
            <Table.Th className="p-4">#</Table.Th>
            <Table.Th className="p-4">Ver.</Table.Th>
            <Table.Th className="p-4">Plan</Table.Th>
            <Table.Th className="p-4">Reporting Entity</Table.Th>
            <Table.Th className="p-4">Last Updated</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody className="divide-y divide-gray-200">
          {files.map((file) => (
            <Table.Tr key={file.id} className="hover:bg-green-200">
              <Table.Td className="p-4 border">
                <a href={file.url} target="_blank" rel="noreferrer" className="text-green-800">
                  {file.id}
                </a>
              </Table.Td>
              <Table.Td className="p-4 border">{file.data.version}</Table.Td>
              <Table.Td className="p-4 border">{file.data.plan_name}</Table.Td>
              <Table.Td className="p-4 border">{file.data.reporting_entity_name}</Table.Td>
              <Table.Td className="p-4 border">{file.data.last_updated_on}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default ViewTable;
