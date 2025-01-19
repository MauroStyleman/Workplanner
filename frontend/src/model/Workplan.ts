
export type Workplan = {
    id: string;
    name: string;
    start: string;
    end: string;
};

export type WorkplanData = Omit<Workplan, 'id'>;