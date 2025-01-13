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
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const buttonStyle = {
    color: 'white',

}

export function TimePeriodModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button style={buttonStyle} onClick={handleOpen}>Create WorkPlan</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" color="black" sx={{ mb: 2 }}>
                        Create WorkPlan
                    </Typography>
                    <PeriodPicker />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                        <Button variant="outlined" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="contained" onClick={handleClose}>
                            Create
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
