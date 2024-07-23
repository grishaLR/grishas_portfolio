import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#54e49a', // Existing primary color
    },
    secondary: {
      main: '#7f46c9', // Existing secondary color
    },
    text: {
      primary: '#7f46c9', // Purple color for primary text
      secondary: '#5e15dc', // Darker purple for secondary text (if needed)
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      defaultProps: {
        color: 'primary',
        size: 'medium',
        variant: 'contained',
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: '#5e15dc', // Darker purple on hover
          },
          '&.Mui-focused': {
            backgroundColor: '#7f46c9', // Purple when focused
          },
        },
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        color: 'primary',
        orientation: 'horizontal',
        variant: 'contained',
      },
    },
    MuiFormControl: {
      defaultProps: {
        fullWidth: true,
        size: 'medium',
        variant: 'filled',
      },
    },
    MuiSelect: {
      defaultProps: {
        size: 'small',
        variant: 'filled',
      },
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#7f46c9',
          },
          '&.Mui-focused .MuiInputBase-root .MuiInputBase-input': {
            borderColor: '#7f46c9',
          },
          '&.Mui-focused .MuiInput-underline:after': {
            borderBottomColor: '#7f46c9',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        variant: 'filled',
      },
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#7f46c9', // Purple color for the label when focused
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#7f46c9', // Purple underline when focused
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#7f46c9', // Purple border
            },
            '&:hover fieldset': {
              borderColor: '#5e15dc', // Darker purple on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#7f46c9', // Purple border when focused
            },
          },
        },
      },
    },
    MuiAvatar: {
      defaultProps: {
        sx: {
          height: '40px',
          width: '40px',
        },
        variant: 'circular',
      },
    },
    MuiIcon: {
      defaultProps: {
        fontSize: 'medium',
      },
    },
    MuiAccordion: {
      defaultProps: {
        disableGutters: true,
      },
      styleOverrides: {
        root: {
          boxShadow: 'unset',
          '&.MuiAccordion-root': {
            '::before': { opacity: 1 },
          },
        },
      },
    },
  },
});

export default theme;
