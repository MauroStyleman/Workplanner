import { createTheme,  } from '@mui/material/styles'

const MonthDatePickerTheme = (theme) => createTheme({
    ...theme,
    components: {
        // Customizations for the StaticDatePicker component
        MuiStaticDatePicker: {
            styleOverrides: {
                root: {
                    // You can set styles for the root element here
                }
            }
        },
        MuiPickersCalendarHeader: {
            styleOverrides: {
                root: {
                    // Header styles (month/year)
                    backgroundColor: 'var(--background)', // Background color of the header
                },
                label: {
                    color: 'var(--primary)', // Text color for the label (month/year)
                }
            }
        },
        MuiPickersMonth: {
            styleOverrides: {
                root: {
                    // Styles for the month buttons
                    '& .MuiPickersMonth-monthButton': {
                        color: 'var(--text)', // Text color for the month button
                    },
                    '& .MuiPickersMonth-monthButton.Mui-selected': {
                        backgroundColor: 'var(--primary)', // Background color when month is selected
                        color: 'var(--background)', // Text color when month is selected
                    }
                }
            }
        },
        MuiDateCalendar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'var(--background)', // Background of the calendar (modal view)
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {
                        color: 'var(--primary)', // Text color for input
                    },
                    '& .MuiInputLabel-root': {
                        color: 'var(--primary)', // Label color
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--secondary)', // Border color
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--secondary)', // Border color on hover
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--accent)', // Border color on focus
                    }
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: 'var(--accent)', // Icon button color (e.g., arrows)
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: 'var(--accent)', // SVG icon color (arrows, etc.)
                }
            }
        }
    }
})