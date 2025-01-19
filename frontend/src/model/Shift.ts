
export type Shift = {
    id: string;
    name: string;
    start: string;
    end: string;
    color: string;
};

export type ShiftData = Omit<Shift, 'id' | 'color'>;
