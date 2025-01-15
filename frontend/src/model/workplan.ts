
export type Workplan = {
    id: number;
    name: string;
    start: string;
    end: string;
};

export type WorkplanData = Omit<Workplan, 'id'>;