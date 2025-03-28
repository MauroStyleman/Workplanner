import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {useState} from "react";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";


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
            </Box>
</Modal>
    );
}