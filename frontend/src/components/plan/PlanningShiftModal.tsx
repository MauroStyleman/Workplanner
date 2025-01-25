import {Modal} from "@mui/material";


interface PlanningShiftModalProps {
    open: boolean;
    onClose: () => void;
    date: Date;
}


export const PlanningShiftModal = ({open,onClose,date} : PlanningShiftModalProps) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div>
                <h2 id="modal-modal-title">Text in a modal</h2>
                <p id="modal-modal-description">
                    {date.toDateString()}
                </p>
            </div>
        </Modal>
    );
}