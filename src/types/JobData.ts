export type JobItem = {
    _id: string;
    title: string;
    dateStart: string;
    dateFinish: string;
    jobDescription: string;
    responsibilities: {
        title: string;
        items: string[];
    };
    skills: string[];
    location: string;
    photos: string[];
};

export type JobInput = Omit<JobItem, '_id'>;
