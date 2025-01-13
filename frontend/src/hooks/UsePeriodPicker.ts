import {ChangeEvent, useState} from 'react';
import { startOfMonth, endOfMonth } from 'date-fns';

function usePeriodPicker() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [name, setName] = useState<string>('');

    const handleStartDateChange = (date: Date | null) => {
        if (date) {
            const firstDay = startOfMonth(date);
            setStartDate(firstDay);
            console.log('Start date:', firstDay);

            if (endDate && endDate < firstDay) {
                setEndDate(firstDay);
                console.log('Reset end date to start date');
            }
        }
    };

    const handleEndDateChange = (date: Date | null) => {
        if (date) {
            const lastDay = endOfMonth(date);
            console.log('Last day of month:', lastDay);

            if (startDate) {
                if (lastDay <= startDate) {
                    setEndDate(startDate);
                    console.log('End date set to last day of start month:', lastDay);
                } else {
                    setEndDate(lastDay);
                    console.log('End date:', lastDay);
                }
            }
        }
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    return {
        startDate,
        endDate,
        handleStartDateChange,
        handleEndDateChange,
        handleNameChange,
        name,
    };
}

export default usePeriodPicker;
