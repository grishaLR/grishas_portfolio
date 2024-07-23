import React from 'react';
import {
  useGetMigraineTypesQuery,
  useDeleteMigraineTypeMutation,
} from '../../../../redux/api/migraineApi';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Typography,
  CircularProgress,
  Box,
  Alert,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default (() => {
  const { data: migraineTypes, error, isLoading } = useGetMigraineTypesQuery();
  const [deleteMigraineType] = useDeleteMigraineTypeMutation();

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  if (error) return <Alert severity="error">Error loading migraine types</Alert>;

  return (
    <Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="migraine-types-content"
          id="migraine-types-header"
        >
          <Typography>Click to open and modify migraine type list</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h4" component="h2" gutterBottom>
            Migraine Types
          </Typography>
          <List>
            {migraineTypes.map((type: any) => (
              <ListItem
                key={type.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteMigraineType(type.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={type.name} />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}) as React.FC;
