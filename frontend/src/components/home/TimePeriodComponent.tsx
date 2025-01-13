import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import usePeriodPicker from '../../hooks/UsePeriodPicker.ts';

export function PeriodPicker() {
    const { startDate, endDate, handleStartDateChange, handleEndDateChange } = usePeriodPicker();

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', maxWidth: '300px' }}>
                <DatePicker
                    label="Start Period"
                    views={['month', 'year']}
                    value={startDate}
                    onChange={handleStartDateChange}
                />

                <DatePicker
                    label="End Period"
                    views={['month', 'year']}
                    value={endDate}
                    onChange={handleEndDateChange}
                />
            </div>
        </LocalizationProvider>
    );
}

