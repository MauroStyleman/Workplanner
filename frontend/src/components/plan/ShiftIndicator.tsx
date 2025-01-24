import {Box} from "@mui/material";

interface Shift {
    name: string;
    color: string;
}

interface ShiftIndicatorProps {
    shifts: Shift[];
    onClick?: (shift: Shift, index: number) => void;
}

export const ShiftIndicator = ({shifts, onClick}: ShiftIndicatorProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                marginTop: 4,
                alignSelf: "flex-start",
                "& > div": {
                    transition: "width 0.2s ease-in-out, height 0.2s ease-in-out",
                    width: 18,
                    height: 18,
                },
                "& > div:hover": {
                    width: 24,
                    height: 24,
                },
            }}
        >
            {shifts.map((shift, index) => (
                <Box
                    key={index}
                    onClick={(event) => {
                        event.stopPropagation(); // Prevent parent click event
                        if (onClick) onClick(shift, index);
                    }}                    sx={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        backgroundColor: shift.color,
                        cursor: onClick ? "pointer" : "default",
                    }}
                />
            ))}
        </Box>
    );
};
