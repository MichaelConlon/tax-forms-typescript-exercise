import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";

import { Statement } from "../lib/applicationTypes";
import { StatementSchema } from "../lib/validations";
import { createStatement } from "../lib/api";
import { useAppDispatch } from "../lib/useAppSelector";
import { AppField } from "../components/AppField";
import { addStatements } from "../redux/statements";

export default function Listing() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: Statement) => {
    try {
      console.log("hello",values);
      const result = await createStatement(values);
      console.log("result",result);
      dispatch(addStatements([result]));
      navigate('/statements');
    } catch (error) {
      console.error('Failed to create statement:', error);
    }
  };

  const initialValues: Statement = {
    id: '',
    name: '',
    contactInformation: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    }
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Paper sx={{ p: 5, mt: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
            Add a New Statement
        </Typography>

        <Formik
          initialValues={initialValues}
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
