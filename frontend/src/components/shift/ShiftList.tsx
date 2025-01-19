import {Box, Typography} from "@mui/material";
import {Shift} from "../../model/Shift.ts";


export function ShiftList({ shifts }: { shifts: Shift[] }) {
    return (
        <>
            <Typography variant="h6">Shifts</Typography>
            {shifts?.map((shift: Shift) => (
                <Box key={shift.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                    <Box
                        sx={{
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            backgroundColor: shift.color,
                            marginRight: 2
                        }}
                    />
                    <Typography variant="body1" sx={{ marginRight: 2, color: "var(--text)" }}>
                        {shift.name}
                    </Typography>
                    <Typography variant="body2" color="var(--text)">
                        {shift.start} - {shift.end}
                    </Typography>
                </Box>
            ))}
        </>
    );
}