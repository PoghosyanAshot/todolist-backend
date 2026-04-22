"use strict";

const { UserRepository } = require("../repositories");
const { NotFoundError, BadRequestError, ConflictError } = require("../errors");

class UserService {
    static async findById(userId) {
        const user = await UserRepository.getUserById(userId);

        UserService.#checkUserExists(user);

        return user;
    }

    static async updateMe(userId, userData) {
        const user = await UserRepository.getUserById(userId);

        UserService.#checkUserExists(user);

        if (userData.email && user.email !== userData.email) {
            const existing = await UserRepository.existsByEmail(userData.email);

            if (existing) {
                throw new ConflictError();
            }
        }

        const updatedUser = await UserRepository.update(userId, userData);

        UserService.#checkUserExists(updatedUser);

        return updatedUser;
    }

    static async updatePassword(userId, oldPassword, newPassword) {
        const user = await UserRepository.getUserByIdWithPassword(userId);

        UserService.#checkUserExists(user);

        const isMatch = await user.comparePassword(oldPassword);

        if (!isMatch) {
            throw new BadRequestError();
        }

        user.password = newPassword;
        await user.save();
        return user;
    }

    static async deleteUser(userId) {
        const user = await UserRepository.getUserById(userId);

        UserService.#checkUserExists(user);

        return await UserRepository.deleteUser(userId);
    }

    static #checkUserExists(user) {
        if (!user) {
            throw new NotFoundError();
        }
    }
}

module.exports = UserService;
