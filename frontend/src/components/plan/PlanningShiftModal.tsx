import {
    Alert,
    Box,
    Button,
    Checkbox,
    CircularProgress,
    MenuItem,
    Modal,
    Select,
    SelectChangeEvent
} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {useEffect, useState} from "react";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {useShiftsNotOnPlanning} from "../../hooks/UseShifts.tsx";
import {useParams} from "react-router-dom";
import {Shift} from "../../model/Shift.ts";


interface PlanningShiftModalProps {
    open: boolean;
    onClose: () => void;
    date: Date;
    startDate: Date;
    endDate: Date;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'var(--background-secondary)',
    boxShadow: '0px 20px 20px rgba(0, 0, 0, 0.6)',
    p: 4,
    borderRadius: 2,
};


export const PlanningShiftModal = ({open,onClose,date,startDate,endDate} : PlanningShiftModalProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(date);
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
    const [selectedShift, setSelectedShift] = useState<string | null>(null);
    const [isRecurrence, setIsRecurrence] = useState<boolean>(false);

    const { id } = useParams();


    const { isLoading: shiftLoading, isError: shiftError, shifts } = useShiftsNotOnPlanning(
        id!,
        date,
        open // Pass isSelectOpen as the enabled option
    );

    useEffect(() => {
        if (shifts && shifts.length > 0) {
            setSelectedShift(shifts[0].id);
        }
    }, [shifts]);

    const handleShiftChange = (event: SelectChangeEvent) => {
        setSelectedShift(event.target.value);
    };

    const handleRecurrenceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsRecurrence(event.target.checked);
    };


    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h2 id="modal-modal-title">Add shift</h2>
                <p id="modal-modal-description"></p>
                <Box sx={{flexDirection: "column", gap: 4}}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            value={selectedDate}
                            onChange={(newDate) => setSelectedDate(newDate)}
                            minDate={startDate}
                            maxDate={endDate}
                        />
                    </LocalizationProvider>

                    <Select
                        labelId="shift-select-label"
                        value={selectedShift || ''}
                        onChange={handleShiftChange}
                    >
                        {shiftLoading && <CircularProgress sx={{padding: 2}}/>}
                        {shiftError && (
                            <Alert severity="error" sx={{marginTop: 2}}>
                                Error loading shifts. Please try again later.
                            </Alert>
                        )}

                        {shifts && shifts.length > 0 ? (
                            shifts.map((shift: Shift) => (
                                <MenuItem key={shift.id} value={shift.id}>
                                    {shift.name}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>No shifts available</MenuItem>
                        )}
                    </Select>

                    <Checkbox
                        checked={isRecurrence}
                        onChange={handleRecurrenceChange}
                        name={"isRecurrence"}
                        color={"primary"}
                    >
                    </Checkbox>
                    {isRecurrence ? (
                        <Box>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    value={selectedEndDate}
                                    onChange={(newDate) => setSelectedEndDate(newDate)}
                                    minDate={selectedDate || startDate}
                                    maxDate={endDate}
                                />
                            </LocalizationProvider>
                            <Button
                                sx={{
                                    color: 'var(--text)',
                                    backgroundColor: 'var(--primary)',
                                    '&:hover': {
                                        backgroundColor: 'var(--accent)',
                                        color: 'var(--text)',
                                    },
                                }}
                                onClick={() => setSelectedEndDate(null)}>
                                Clear
                            </Button>
                        </Box>

                    ) : null}
                </Box>
            </Box>
</Modal>
    );
}