import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Statement } from "../lib/applicationTypes";

export type StatementsSlice = {
  statements: Statement[];
  hasLoaded: boolean;
}

const initialState: StatementsSlice = {
  statements: [],
  hasLoaded: false,
};

const statementsSlice = createSlice({
    name: "statements",
    initialState,
    reducers: {
      addStatements: (state, action: PayloadAction<Statement[]>) => {
        // For each statement, check if it already exists in state
        // If it does, update it, otherwise add it
        action.payload.forEach(newStatement => {
          const existingIndex = state.statements.findIndex(
            existing => existing.id === newStatement.id
          );
          
          if (existingIndex >= 0) {
            // Update existing statement
            state.statements[existingIndex] = newStatement;
          } else {
            // Add new statement
            state.statements.push(newStatement);
          }
        });
      },
      setHasLoaded: (state, action: PayloadAction<boolean>) => {
        state.hasLoaded = action.payload;
      },
    },
  });

export const {
  addStatements,
  setHasLoaded,
} = statementsSlice.actions;

// Selectors
export const selectStatements = ({ statements }: RootState) =>
    statements.statements;

export const selectStatementById = ({ statements }: RootState, id: string | null) =>
    statements.statements.find(statement => statement.id === id);

export const selectHasLoaded = ({ statements }: RootState) =>
    statements.hasLoaded;

export default statementsSlice;