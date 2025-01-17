import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../lib/useAppSelector';
import { loadStatements } from '../lib/api';
import { addStatements, selectHasLoaded, selectStatements, setHasLoaded } from '../redux/statements';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { APIResponse, Statement } from '../lib/applicationTypes';

export default function MyStatements() {
  const dispatch = useAppDispatch();
  const statements = useAppSelector(selectStatements);
  const hasLoaded = useAppSelector(selectHasLoaded);

  useEffect(() => {
    if (!hasLoaded) {
      loadStatements().then((statements: APIResponse<Statement>) => {
        dispatch(addStatements(statements.data));
      });
    }
  }, [dispatch, hasLoaded]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Statements
      </Typography>
      
      {statements.length === 0 ? (
        <Typography>No statements found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {statements.map((statement) => (
                <TableRow key={statement.id}>
                  <TableCell>{statement.name}</TableCell>
                  <TableCell>
                    {statement.contactInformation.firstName} {statement.contactInformation.lastName}
                  </TableCell>
                  <TableCell>{statement.contactInformation.email}</TableCell>
                  <TableCell>{statement.contactInformation.phoneNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
