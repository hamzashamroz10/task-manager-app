import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://hs1829a:enovy2025@cluster0.amrxo5p.mongodb.net/Taskflow?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('DB connected'))
    .catch((err) => console.error('DB connection error:', err));
};
