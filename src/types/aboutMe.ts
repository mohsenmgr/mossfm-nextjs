export type AboutMeTextItem = {
    value: string;
    highlight: boolean;
};

export type AboutMeObj = {
    _id: string;
    text: AboutMeTextItem[];
    skills: string[];
    photoUrl: string;
};
