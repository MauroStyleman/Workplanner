
import { Box } from '@mui/material';

interface ShiftIndicatorProps {
    shifts: { color: string }[];
    onClick?: (shift: { name: string }, index: number) => void;
}


export const  ShiftIndicator = ({shifts,onClick} : ShiftIndicatorProps)  => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                marginTop: 4,
                alignSelf: "flex-start",
            }}
        >
            {shifts.map((shift, index) => (
                <Box
                    key={index}
                    onClick={() => onClick && onClick(shift, index)} // Trigger the click handler if provided
                    sx={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        backgroundColor: shift.color,
                        cursor: onClick ? 'pointer' : 'default', // Change cursor if clickable
                    }}
                />
            ))}
        </Box>
    );
};


