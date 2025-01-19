import {Box, CircularProgress} from '@mui/material';
import {useWorkplans} from '../../hooks/UseWorkPlans';
import {Workplan, WorkplanData} from "../../model/Workplan.ts";
import WorkplanCard from "./WorkPlanCard.tsx";

export function WorkplanList() {
    const {workplans, isLoading, isError} = useWorkplans();

    const handleDelete = (workplan: WorkplanData) => {
        console.log('Delete workplan:', workplan);
    };

    if (isLoading) return <CircularProgress size={24} sx={{color: "var(--text)"}}/>;
    if (isError) return <div>Error loading workplans.</div>;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 5,
                padding: 2
            }}
        >
            {workplans?.map((workplan: Workplan) => (
                <Box key={workplan.id}>
                    <WorkplanCard workplan={workplan} onDelete={handleDelete} />
                </Box>
            ))}
        </Box>
    );
}
