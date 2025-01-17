import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";

import { Statement } from "../lib/applicationTypes";
import { StatementSchema } from "../lib/validations";
import { createStatement, updateStatement } from "../lib/api";
import { useAppDispatch } from "../lib/useAppSelector";
import { AppField } from "../components/AppField";
import { addStatements, selectStatementById } from "../redux/statements";
import { RootState } from "../redux";
import { useSelector } from "react-redux";

export default function StatementPage() {
  const { id = null } = useParams();
  const statement = useSelector((state: RootState) => selectStatementById(state, id));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: Statement) => {
    try {
        let result: Statement;
        if (id) {
            result = await updateStatement(values);
        } else {
            result = await createStatement(values);
        }
      dispatch(addStatements([result]));
      navigate('/statements');
    } catch (error) {
      console.error('Failed to create statement:', error);
    }
  };

  // No statement found for the given id
  if (id != null && statement == null) {
    return (
      <Box>Statement was not found!</Box>
    );
  }

  const initializeValues = (): Statement => {
    return {
      id: '',
      name: '',
      contactInformation: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
      },
      ...statement
    };
  };


  return (
    <Container sx={{ mt: 2 }}>
      <Paper sx={{ p: 5, mt: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
            {id ? "Edit Statement" : "Add a New Statement"}
        </Typography>

        <Formik
          initialValues={initializeValues()}
          validationSchema={StatementSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6">
                  Name
                </Typography>
                <AppField label="Name" name="name" />
                <Typography variant="h6" sx={{ mt: 3 }}>
                    Contact Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <AppField
                      label="First Name"
                      name="contactInformation.firstName"/>
                  </Grid>
                  <Grid item xs={3}>
                    <AppField
                      label="Last Name"
                      name="contactInformation.lastName"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <AppField
                      label="Email"
                      name="contactInformation.email"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <AppField
                      label="Phone Number"
                      name="contactInformation.phoneNumber"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  type="submit"
                >
                   {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
}
