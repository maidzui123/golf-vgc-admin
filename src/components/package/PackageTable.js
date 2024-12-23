import React from 'react';
import * as dayjs from 'dayjs';

import { TableCell, TableBody, TableRow, Avatar } from '@windmill/react-ui';

import MainModal from '../modal/MainModal';
import MainDrawer from '../drawer/MainDrawer';
import PackageDrawer from '../drawer/PackageDrawer';
import useToggleDrawer from '../../hooks/useToggleDrawer';
import EditDeleteButton from '../table/EditDeleteButton';
import ShowHideButton from '../table/ShowHideButton';

const PackageTable = ({ packages }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <MainModal id={serviceId} title={title} />
      <MainDrawer>
        <PackageDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {packages?.map((packageItem) => (
          <TableRow key={packageItem._id}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">
                {' '}
                {packageItem._id.substring(20, 24)}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <div>
                  <h2 className="text-sm font-medium">{packageItem.name}</h2>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <span className="text-sm">{packageItem.description}</span>{' '}
            </TableCell>
            <TableCell>
              <ShowHideButton id={packageItem._id} status={packageItem.status} />
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={packageItem._id}
                title={packageItem.name}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default PackageTable;
