"use strict";

const User = require("../models/user.model");

class UserRepository {
    static create(userData) {
        const user = new User(userData);
        return user.save();
    }

    static update(userId, userData) {
        return User.findByIdAndUpdate(userId, userData, {
            runValidators: true,
            returnDocument: "after",
        }).exec();
    }

    static async updatePassword(userId, newPassword) {
        const user = await User.findById(userId).exec();

        if (!user) return null;

        user.password = newPassword;
        return await user.save();
    }

    static getUserById(userId) {
        return User.findById(userId).exec();
    }

    static getUserByIdWithPassword(userId) {
        return User.findById(userId).select("+password").exec();
    }

    static getUserByEmail(email, includePassword = false) {
        const query = User.findOne({ email });

        if (includePassword) {
            query.select("+password");
        }

        return query.exec();
    }

    static getUserLists(page = 1, limit = 10) {
        const skip = (page - 1) * limit;

        return User.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .exec();
    }

    static async existsByEmail(email) {
        const result = await User.exists({ email });
        return result !== null;
    }

    static deleteUser(userId) {
        return User.findByIdAndDelete(userId).exec();
    }
}

module.exports = UserRepository;
