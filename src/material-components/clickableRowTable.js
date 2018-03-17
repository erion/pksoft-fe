import React from 'react';
import { TableRow } from 'material-ui/Table';

//https://github.com/mui-org/material-ui/issues/1783
export const ClickableRow = (props) => {
  const {rowData, eventFunction, ...restProps} = props;
  return (
    <TableRow
      {...restProps}
      onMouseDown={()=> props.eventFunction(props.rowData)}>
      {props.children}
    </TableRow>
  )
}