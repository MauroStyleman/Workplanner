import { Button, Modal, Box, Typography, CircularProgress } from '@mui/material';
import { ChangeEvent, useState } from "react";
import { PeriodPicker } from "./PeriodPicker.tsx";
import {startOfMonth, endOfMonth, format} from "date-fns";
import { useWorkplans } from "../../hooks/UseWorkPlans.tsx";
import {WorkplanData} from "../../model/Workplan.ts";

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

export function TimePeriodModal() {
    const { addWorkplan, isAddingWorkplan, isErrorWorkplan } = useWorkplans();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [name, setName] = useState<string>('');

    const handleStartDateChange = (date: Date | null) => {
        if (date) {
            const firstDay = startOfMonth(date);
            setStartDate(firstDay);

            if (endDate && endDate < firstDay) {
                setEndDate(firstDay);
            }
        }
    };

    const handleEndDateChange = (date: Date | null) => {
        if (date) {
            const lastDay = endOfMonth(date);

            if (startDate && lastDay <= startDate) {
                setEndDate(startDate);
            } else {
                setEndDate(lastDay);
            }
        }
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleOpen = () => {
        setName('');
        setStartDate(null);
        setEndDate(null);
        setOpen(true);
    };

    const handleClose = () => {
        if (!isAddingWorkplan) {
            setOpen(false);
            setError(null);
        }
    };

    const handleCreate = () => {
        if (!name || !startDate || !endDate) {
            setError('All fields are required.');
            return;
        }

        const startDateOnly = new Date(startDate);
        const endDateOnly = new Date(endDate);

        const startFormatted = format(startDateOnly, 'yyyy-MM-dd');
        const endFormatted = format(endDateOnly, 'yyyy-MM-dd');

        const newWorkplan: WorkplanData = {
            name,
            start: startFormatted,
            end: endFormatted,
            planningShifts: [],
        };

        addWorkplan(newWorkplan, {
            onSuccess: () => {
                setOpen(false);
                setError(null);
            },
            onError: () => {
                setError("Failed to create workplan. Please try again.");
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
                Create WorkPlan
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" color="var(--text)" sx={{mb: 2}}>
                        Create WorkPlan
                    </Typography>
                    <PeriodPicker
                        name={name}
                        startDate={startDate}
                        endDate={endDate}
                        handleNameChange={handleNameChange}
                        handleStartDateChange={handleStartDateChange}
                        handleEndDateChange={handleEndDateChange}
                    />
                    {error && (
                        <Typography color="error" sx={{mt: 2}}>
                            {error}
                        </Typography>
                    )}
                    {isErrorWorkplan && (
                        <Typography color="error" sx={{mt: 2}}>
                            Failed to create workplan. Please try again.
                        </Typography>
                    )}
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3}}>
                        <CloseButton onClick={handleClose} disabled={isAddingWorkplan}/>
                        <CreateButton onClick={handleCreate} disabled={isAddingWorkplan}/>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
