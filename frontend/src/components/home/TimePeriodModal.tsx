import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useState} from "react";
import {PeriodPicker} from "./TimePeriodComponent.tsx";


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
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button
                onClick={handleOpen}
                sx={
                    {
                        color: 'var(--text)',
                        backgroundColor: 'var(--primary)',
                        '&:hover': {
                            backgroundColor: 'var(--accent)',
                            color: 'var(--text)',
                        },
                    }
                }
            >Create WorkPlan</Button>
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
                    <PeriodPicker />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                        <Button
                            variant="outlined"
                            onClick={handleClose}
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
                            onClick={handleClose}
                            sx={{
                                backgroundColor: 'var(--primary)',
                                color: 'var(--text)',
                                '&:hover': {
                                    backgroundColor: 'var(--accent)',
                                },
                            }}
                        >
                            Create
                        </Button>

                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
