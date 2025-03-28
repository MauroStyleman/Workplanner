import {Alert, CircularProgress, Modal} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {useState} from "react";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {useShiftsNotOnPlanning} from "../../hooks/UseShifts.tsx";
import {useParams} from "react-router-dom";
import { Box, Select, MenuItem} from '@mui/material';
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
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const { id } = useParams();


    const { isLoading: shiftLoading, isError: shiftError, shifts } = useShiftsNotOnPlanning(
        id!,
        date,
        isSelectOpen // Pass isSelectOpen as the enabled option
    );


    // Handle when select box is opened
    const handleSelectOpen = () => {
        setIsSelectOpen(true); // Trigger the fetch when the select box opens
    };

    // Handle when select box is closed
    const handleSelectClose = () => {
        setIsSelectOpen(false); // Stop fetching data if needed
    };


    console.log(shifts)
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h2 id="modal-modal-title">Select a Date</h2>
                <p id="modal-modal-description"></p>
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

                    displayEmpty
                    onOpen={handleSelectOpen} // Trigger fetching when select box is opened
                    onClose={handleSelectClose} // Stop fetching when select box is closed
                >
                    {shiftLoading && <CircularProgress sx={{ padding: 2 }} />}
                    {shiftError && (
                        <Alert severity="error" sx={{ marginTop: 2 }}>
                            Error loading shifts. Please try again later.
                        </Alert>
                    )}

                    {shifts && shifts.length > 0 ? (
                        shifts.map((shift : Shift) => (
                            <MenuItem key={shift.id} value={shift.id}>
                                {shift.name}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>No shifts available</MenuItem>
                    )}
                </Select>
            </Box>
</Modal>
    );
}