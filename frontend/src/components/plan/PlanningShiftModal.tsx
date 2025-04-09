import {
    Alert,
    Box,
    Button,
    Checkbox,
    CircularProgress,
    MenuItem,
    Modal,
    Select,
    SelectChangeEvent,
    Stack,
    InputLabel,
    FormControl,
    FormControlLabel

} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {useEffect, useState} from "react";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {useShiftsNotOnPlanning} from "../../hooks/UseShifts.tsx";
import {useParams} from "react-router-dom";
import {Shift} from "../../model/Shift.ts";
import {AddPlanningShiftDto} from "../../model/PlanningShift.ts";
import {createPlanningShift} from "../../service/PlanningShift.ts";


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
    const [intervalType, setIntervalType] = useState<string>('Daily');
    const [intervalValue, setIntervalValue] = useState<number>(1);

    const {id} = useParams();

    const handleCreate = () => {
        if (!selectedDate || !selectedShift || !id) return;

        const newPlanningShift: AddPlanningShiftDto = {
            date: selectedDate.toISOString().split("T")[0],
            endDate: selectedEndDate ? selectedEndDate.toISOString().split("T")[0] : null,
            interval: isRecurrence ? intervalValue : 1,
            isRecurring: isRecurrence,
            recurrenceType: isRecurrence ? intervalType : 'Daily',
            planningPeriodId: id,
            shiftId: selectedShift,
        }

        createPlanningShift(newPlanningShift)
    };

    const {isLoading: shiftLoading, isError: shiftError, shifts} = useShiftsNotOnPlanning(
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
                <h2 id="modal-modal-title">Add Shift</h2>

                <Box sx={{display: 'flex', flexDirection: 'column', gap: 3, mt: 2}}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Start Date"
                                value={selectedDate}
                                onChange={(newDate) => setSelectedDate(newDate)}
                                minDate={startDate}
                                maxDate={endDate}
                            />
                        </LocalizationProvider>

                        <FormControl fullWidth>
                            <InputLabel id="shift-select-label">Shift</InputLabel>
                            <Select
                                labelId="shift-select-label"
                                value={selectedShift || ''}
                                onChange={handleShiftChange}
                                label="Shift"
                            >
                                {shiftLoading && <MenuItem disabled><CircularProgress size={20}/></MenuItem>}
                                {shiftError && (
                                    <MenuItem disabled>
                                        <Alert severity="error">Error loading shifts</Alert>
                                    </MenuItem>
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
                        </FormControl>
                    </Stack>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isRecurrence}
                                onChange={handleRecurrenceChange}
                                name="isRecurrence"
                                color="primary"
                            />
                        }
                        label="Repeat this shift"
                    />

                    {isRecurrence && (
                        <>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <FormControl fullWidth>
                                    <InputLabel id="interval-type-label">Interval Type</InputLabel>
                                    <Select
                                        labelId="interval-type-label"
                                        value={intervalType}
                                        onChange={(e) => setIntervalType(e.target.value)}
                                        label="Interval Type"
                                    >
                                        <MenuItem value="Daily">Daily</MenuItem>
                                        <MenuItem value="Weekly">Weekly</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth>
                                    <InputLabel id="interval-value-label">Every</InputLabel>
                                    <Select
                                        labelId="interval-value-label"
                                        value={intervalValue}
                                        onChange={(e) => setIntervalValue(Number(e.target.value))}
                                        label="Every"
                                    >
                                        {[...Array(31).keys()].map((i) => {
                                            const value = i + 1;
                                            return (
                                                <MenuItem key={value} value={value}>
                                                    {value}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Stack>

                            <Stack direction="row" spacing={2} alignItems="center">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="End Date (optional)"
                                        value={selectedEndDate}
                                        onChange={(newDate) => setSelectedEndDate(newDate)}
                                        minDate={selectedDate || startDate}
                                        maxDate={endDate}
                                    />
                                </LocalizationProvider>

                                <Button
                                    onClick={() => setSelectedEndDate(null)}
                                    sx={{
                                        height: 'fit-content',
                                        mt: 'auto',
                                        mb: 'auto',
                                        backgroundColor: 'var(--primary)',
                                        color: 'var(--text)',
                                        '&:hover': {
                                            backgroundColor: 'var(--accent)',
                                            color: 'var(--text)',
                                        },
                                    }}
                                >
                                    Clear
                                </Button>
                            </Stack>
                        </>

                    )}
                    <Button
                        variant="contained"
                        onClick={handleCreate}
                        sx={{
                            mt: 4,
                            alignSelf: 'center',
                            backgroundColor: 'var(--primary)',
                            color: 'var(--text)',
                            '&:hover': {
                                backgroundColor: 'var(--accent)',
                                color: 'var(--text)',
                            },
                            px: 4,
                            py: 1.5,
                            borderRadius: '12px',
                        }}
                    >
                        Create
                    </Button>
                </Box>
            </Box>
        </Modal>

    );
}