import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import usePeriodPicker from '../../hooks/UsePeriodPicker.ts';
import { TextField } from '@mui/material';


const datePickerStyles = {
    textField: {
        InputProps: {
            sx: {
                color: 'var(--primary)',
            },
        },
        InputLabelProps: {
            sx: {
                color: 'var(--primary)',
            },
        },
        sx: {
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--secondary)',
            },
            '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--secondary)',
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--accent)',
            },
            '& .MuiFormLabel-root': {
                color: 'var(--primary)',
            },
        },
    },
    openPickerIcon: {
        sx: {
            color: 'var(--accent)',
        },
    },
    calendarHeader: {
        sx: {
            color: 'var(--primary)',
        },
    },
    monthButton: {
        sx: {
            color: 'var(--text)',
            backgroundColor: 'var(--secondary)',
            '&:hover': {
                backgroundColor: 'var(--accent)',
                color: 'var(--text)',
            },
            padding: '0.5rem',
            textAlign: 'center',
        },
    },
    yearButton: {
        sx: {
            color: 'var(--secondary)',
            '&:hover': {
                backgroundColor: 'var(--accent)',
                color: 'var(--text)',
            },
            padding: '0.5rem',
            textAlign: 'center',
        },
    },
    desktopPaper: {
        sx: {
            backgroundColor: 'var(--background-secondary)',
            color: 'var(--text)',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.6)',
            borderRadius: '8px',
        },
    },
};


export function PeriodPicker() {
    const { startDate, endDate, handleStartDateChange, handleEndDateChange, handleNameChange, name} = usePeriodPicker();

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div style={{display: 'flex', gap: '1rem', flexDirection: 'column', maxWidth: '300px'}}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={handleNameChange}
                    variant="outlined"
                    fullWidth
                    sx={{
                        '& .MuiInputLabel-root': { color: 'var(--primary)' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'var(--secondary)' },
                            '&:hover fieldset': { borderColor: 'var(--accent)' },
                            '&.Mui-focused fieldset': { borderColor: 'var(--accent)' },
                            '& input': { color: 'var(--primary)' },
                        }
                    }}
                />
                <DatePicker
                    label="Start Period"
                    views={['month', 'year']}
                    value={startDate}
                    onChange={handleStartDateChange}
                    slotProps={datePickerStyles}
                />
                <DatePicker
                    label="End Period"
                    views={['month', 'year']}
                    value={endDate}
                    onChange={handleEndDateChange}
                    slotProps={datePickerStyles}
                />
            </div>
        </LocalizationProvider>
    );
}

