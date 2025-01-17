import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";

import { selectClaimedListingById } from "../redux/listings";
import { useAppSelector } from "../lib/useAppSelector";
import { Submission } from "../lib/applicationTypes";
import { SubmissionSchema } from "../lib/validations";
import { requestExtension } from "../lib/api";
import { useAppDispatch } from "../lib/useAppSelector";
import { addSubmission } from "../redux/submissions";
import { AppField } from "../components/AppField";

export default function Listing() {
  const { id = null } = useParams();
  const listing = useAppSelector((state) => selectClaimedListingById(state, id))
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: Submission) => {
    console.log(values);
    try {
      const result = await requestExtension(values);
      dispatch(addSubmission(result));
      navigate('/submissions');
    } catch (error) {
      console.error('Failed to submit extension request:', error);
    }
  };

  if (!listing) {
    return (
      <Box>Listing was not found!</Box>
    );
  }

  const initialValues: Submission = {
    listing: {
      ...listing,
      mailingAddress: listing.mailingAddress || {
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: ''
      }
    },
    reason: ''
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Paper sx={{ p: 5, mt: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Request An Extension For {listing.name}
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={SubmissionSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <AppField label="Name" name="listing.name" />
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6">
                  Mailing Address
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <AppField
                      label="Address 1"
                      name="listing.mailingAddress.address1"/>
                  </Grid>
                  <Grid item xs={3}>
                    <AppField
                      label="Address 2"
                      name="listing.mailingAddress.address2"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <AppField
                      label="City"
                      name="listing.mailingAddress.city"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <AppField
                      label="State"
                      name="listing.mailingAddress.state"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <AppField
                      label="Zip"
                      name="listing.mailingAddress.zip"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography variant="h6">
                  Physical Address
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <AppField
                      label="Address 1"
                      name="listing.physicalAddress.address1"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <AppField
                      label="Address 2"
                      name="listing.physicalAddress.address2"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <AppField
                      label="City"
                      name="listing.physicalAddress.city"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <AppField
                      label="State"
                      name="listing.physicalAddress.state"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <AppField
                      label="Zip"
                      name="listing.physicalAddress.zip"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Grid item xs={12}>
                  <AppField
                    label="Reason"
                    name="reason"
                    multiline
                  />
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
