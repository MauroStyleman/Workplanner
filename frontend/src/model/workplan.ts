
export type Workplan = {
    id: number;
    name: string;
    start_date: Date;
    end_date: Date;
};

export type WorkplanData = Omit<Workplan, 'id'>;