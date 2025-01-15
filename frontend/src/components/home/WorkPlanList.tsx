import {Box, Grid} from '@mui/material';
import {useWorkplans} from '../../hooks/UseWorkPlans';
import {Workplan, WorkplanData} from "../../model/workplan.ts";
import WorkplanCard from "./WorkPlanCard.tsx";

export function WorkplanList() {
    const {workplans, isLoading, isError} = useWorkplans();

    const handleDelete = (workplan: WorkplanData) => {
        console.log('Delete workplan:', workplan);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading workplans.</div>;

    return (
        <Box sx={{padding: 2}}>
            <Grid container spacing={2}>
                {workplans?.map((workplan: Workplan) => (
                    <Grid item xs={12} sm={6} md={4} key={workplan.id}>
                        <WorkplanCard
                            workplan={workplan}
                            onDelete={handleDelete}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
