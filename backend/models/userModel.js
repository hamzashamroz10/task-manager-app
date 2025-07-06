import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true, // normalize emails
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
    },
    { timestamps: true }
);

// Remove password when sending JSON
userSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    },
});

// Export model
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
