import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';

const timePickerStyles = {
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
    desktopPaper: {
        sx: {
            backgroundColor: 'var(--background-secondary)',
            color: 'var(--text)',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.6)',
            borderRadius: '8px',
        },
    },
};

interface TimePickerProps {
    name: string;
    startTime: Date | null;
    endTime: Date | null;
    handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleStartTimeChange: (time: Date | null) => void;
    handleEndTimeChange: (time: Date | null) => void;
}

export function TimePeriodPicker({
                                     name,
                                     startTime,
                                     endTime,
                                     handleNameChange,
                                     handleStartTimeChange,
                                     handleEndTimeChange,
                                 }: TimePickerProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', maxWidth: '300px' }}>
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
                        },
                    }}
                />
                <TimePicker
                    label="Start Time"
                    value={startTime}
                    onChange={handleStartTimeChange}
                    slotProps={timePickerStyles}
                />
                <TimePicker
                    label="End Time"
                    value={endTime}
                    onChange={handleEndTimeChange}
                    slotProps={timePickerStyles}
                />
            </div>
        </LocalizationProvider>
    );
}
