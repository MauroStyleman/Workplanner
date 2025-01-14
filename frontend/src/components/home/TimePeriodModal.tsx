import { Button, Modal, Box, Typography, CircularProgress } from '@mui/material';
import {useState} from "react";
import {PeriodPicker} from "./TimePeriodComponent.tsx";
import usePeriodPicker from "../../hooks/UsePeriodPicker.ts";
import {WorkplanData} from "../../model/workplan.ts";
import {createWorkplan} from "../../service/WorkplanService.ts";


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



export function TimePeriodModal() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        name,
        startDate,
        endDate,
        handleNameChange,
        handleStartDateChange,
        handleEndDateChange,
    } = usePeriodPicker();

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        if (!loading) {
            setOpen(false);
            setError(null);
        }
    };

    const handleCreate = async () => {
        if (!name || !startDate || !endDate) {
            console.log(name);
            console.log(startDate);
            console.log(endDate);
            setError('All fields are required.');
            return;
        }

        setLoading(true);
        setError(null);

        const newWorkplan: WorkplanData = {
            name,
            start_date: startDate,
            end_date: endDate,
        };

        try {
            await createWorkplan(newWorkplan);
            setLoading(false);
            setOpen(false);
        } catch (err) {
            setLoading(false);
            setError('Failed to create workplan. Please try again.');
            console.log(err)
        }
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
                    <Typography id="modal-modal-title" variant="h6" component="h2" color="var(--text)" sx={{ mb: 2 }}>
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
                        <Typography color="error" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                        <Button
                            variant="outlined"
                            onClick={handleClose}
                            disabled={loading}
                            sx={{
                                color: 'var(--secondary)',
                                borderColor: 'var(--secondary)',
                                '&:hover': {
                                    backgroundColor: 'var(--accent)',
                                    color: 'var(--text)',
                                },
                            }}
                        >
                            Close
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleCreate}
                            disabled={loading}
                            sx={{
                                backgroundColor: 'var(--primary)',
                                color: 'var(--text)',
                                '&:hover': {
                                    backgroundColor: 'var(--accent)',
                                },
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={24} sx={{ color: 'var(--text)' }} />
                            ) : (
                                'Create'
                            )}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
