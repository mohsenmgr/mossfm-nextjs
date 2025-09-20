import connectToDB from '@/lib/mongoose';

import { Model } from 'mongoose';

export const getLastUpdate = async (model: Model<any>) => {
    try {
        // Connect to MongoDB
        await connectToDB();

        const item = await model.findOne().sort({ _id: -1 }).exec();

        return item;
    } catch (err) {
        return { data: null, error: err };
    }
};
