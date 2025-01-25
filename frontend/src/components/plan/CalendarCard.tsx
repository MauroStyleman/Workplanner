import {Paper, Typography} from "@mui/material";
import {ShiftIndicator} from "./ShiftIndicator";
import {PlanningShiftModal} from "./PlanningShiftModal.tsx";
import {useState} from "react";

interface Shift {
    name: string;
    color: string;
}

interface CalendarCardProps {
    date: Date;
    shifts?: Shift[];
    onShiftClick?: (shift: Shift, index: number) => void;
}

export const CalendarCard = ({ date, shifts, onShiftClick }: CalendarCardProps) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleCardClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => setModalOpen(false);

    const formatDate = (date: Date) => date.getDate();
    return (
        <>

        <Paper
            elevation={2}
            sx={{
                padding: 1,
                width: { xs: 35, sm: 50, md: 70, lg: 90 },
                height: { xs: 35, sm: 50, md: 70, lg: 90 },
                backgroundColor: "var(--text)",
                color: "var(--text)",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-end",
                flexDirection: "column",
                cursor: "pointer",
                "&:hover": {
                   backgroundColor: "var(--primary)",
                },
            }}
            onClick={handleCardClick}
        >
            <Typography
                variant="body1"
                sx={{
                    border: "2px solid var(--secondary)",
                    borderRadius: "50%",
                    backgroundColor: "var(--accent)",
                    width: 10,
                    height: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 1,
                }}
            >
                {formatDate(date)}
            </Typography>
            {shifts && (
                <ShiftIndicator
                    shifts={shifts}
                    onClick={onShiftClick}
                />
            )}
        </Paper>
            <PlanningShiftModal
                open={modalOpen}
                onClose={handleCloseModal}
                date={date}
            />
        </>
    );
};

export const OffSetCalendarCard = () => {
    return(
        <Paper
            sx={{
                padding: 1,
                width: {xs: 35, sm: 50, md: 70, lg: 90},
                height: {xs: 35, sm: 50, md: 70, lg: 90},
                backgroundColor: "var(--accent)",
                display: "flex",
                justifyContent: "center",
            }}
        >
        </Paper>
    )
}
