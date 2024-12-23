import React from 'react';
import * as dayjs from 'dayjs';
import { TableCell, TableBody, TableRow, Avatar } from '@windmill/react-ui';

import MainModal from '../modal/MainModal';
import MainDrawer from '../drawer/MainDrawer';
import VoucherDrawer from '../drawer/VoucherDrawer';
import useToggleDrawer from '../../hooks/useToggleDrawer';
import EditDeleteButton from '../table/EditDeleteButton';
import ShowHideButton from '../table/ShowHideButton';

const VoucherTable = ({ vouchers }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <MainModal id={serviceId} title={title} />
      <MainDrawer>
        <VoucherDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        { vouchers?.map((voucher) => (
          <TableRow key={ voucher._id}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">
                {' '}
                { voucher._id.substring(20, 24)}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <div>
                  <h2 className="text-sm font-medium">{ voucher.name}</h2>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <span className="text-sm">{ voucher.description}</span>{' '}
            </TableCell>
            <TableCell>
              <ShowHideButton id={ voucher._id} status={ voucher.status} />
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={ voucher._id}
                title={ voucher.name}
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

export default VoucherTable;
