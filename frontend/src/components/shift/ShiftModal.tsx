import { Button, Modal, Box, Typography, CircularProgress } from '@mui/material';
import { ChangeEvent, useState } from "react";
import { format } from "date-fns";
import {TimePeriodPicker} from "./timePeriodPicker.tsx";
import {useShifts} from "../../hooks/UseShifts.tsx";
import {ShiftData} from "../../model/Shift.ts";

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

function CloseButton(props: { onClick: () => void, disabled: false | true }) {
    return <Button
        variant="outlined"
        onClick={props.onClick}
        disabled={props.disabled}
        sx={{
            color: "var(--secondary)",
            borderColor: "var(--secondary)",
            "&:hover": {
                backgroundColor: "var(--accent)",
                color: "var(--text)",
            },
        }}
    >
        Close
    </Button>;
}

function CreateButton(props: { onClick: () => void, disabled: false | true }) {
    return <Button
        variant="contained"
        onClick={props.onClick}
        disabled={props.disabled}
        sx={{
            backgroundColor: "var(--primary)",
            color: "var(--text)",
            "&:hover": {
                backgroundColor: "var(--accent)",
            },
        }}
    >
        {props.disabled ? (
            <CircularProgress size={24} sx={{color: "var(--text)"}}/>
        ) : (
            "Create"
        )}
    </Button>;
}

export function ShiftModal() {
    const { addShift, isAddingShift, isErrorShift } = useShifts();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const [name, setName] = useState<string>('');

    const handleStartTimeChange = (time: Date | null) => {
        setStartTime(time);
    };

    const handleEndTimeChange = (time: Date | null) => {
        setEndTime(time);
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleOpen = () => {
        setName('');
        setStartTime(null);
        setEndTime(null);
        setOpen(true);
    };

    const handleClose = () => {
        if (!isAddingShift) {
            setOpen(false);
            setError(null);
        }
    };

    const handleCreate = () => {
        if (!name || !startTime || !endTime) {
            setError('All fields are required.');
            return;
        }

        const startFormatted = format(startTime, 'HH:mm');
        const endFormatted = format(endTime, 'HH:mm');

        const newShift: ShiftData = {
            name,
            start: startFormatted,
            end: endFormatted,
        };

        addShift(newShift, {
            onSuccess: () => {
                setOpen(false);
                setError(null);
            },
            onError: () => {
                setError("Failed to create shift. Please try again.");
            },
        });
    };

    return (
        <div>
            <Button
                onClick={handleOpen}
                sx={{
                    color: 'var(--text)',
                    backgroundColor: 'var(--primary)',
                    '&:hover': {
                        backgroundColor: 'var(--accent)',
                        color: 'var(--text)',
                    },
                }}
            >
                Create Shift
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" color="var(--text)" sx={{mb: 2}}>
                        Create Shift
                    </Typography>
                    <TimePeriodPicker
                        name={name}
                        startTime={startTime}
                        endTime={endTime}
                        handleNameChange={handleNameChange}
                        handleStartTimeChange={handleStartTimeChange}
                        handleEndTimeChange={handleEndTimeChange}
                    />
                    {error && (
                        <Typography color="error" sx={{mt: 2}}>
                            {error}
                        </Typography>
                    )}
                    {isErrorShift && (
                        <Typography color="error" sx={{mt: 2}}>
                            Failed to create shift. Please try again.
                        </Typography>
                    )}
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3}}>
                        <CloseButton onClick={handleClose} disabled={isAddingShift}/>
                        <CreateButton onClick={handleCreate} disabled={isAddingShift}/>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
