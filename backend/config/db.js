import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect('mongodb://hs1829a:enovy2025@ac-q5zp32y-shard-00-00.amrxo5p.mongodb.net:27017,ac-q5zp32y-shard-00-01.amrxo5p.mongodb.net:27017,ac-q5zp32y-shard-00-02.amrxo5p.mongodb.net:27017/?ssl=true&replicaSet=atlas-3e0apt-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('DB connected'))
    .catch((err) => console.error('DB connection error:', err));
};
