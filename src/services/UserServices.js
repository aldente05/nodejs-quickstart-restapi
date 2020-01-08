/**
 * Created by f.putra on 2019-05-02.
 */
let User = require('./../core/schema/UserSchema')
let config = require('./../config.json');
let jwt = require('jsonwebtoken');
let crypto = require('crypto');

let userService = {
    login: async (email, password) => {
        this.salt = crypto.randomBytes(16).toString('hex');
        let user = await User.findOne({
            where: {
                email: email
            },
            returning: true
        })

        if (user === null) {
            return {code: 400, message: "User not found."}
        } else {
            let hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, `sha512`).toString(`hex`);
            if (hash === user.hash) {
                const token = jwt.sign({
                    sub: user.id,
                    user: user.name,
                    role: user.role
                }, config.secret);
                return {
                    code: 200,
                    message: {
                        id : user.id,
                        token: token,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        location : user.location
                    }
                }
            } else {
                return {code: 403, message: "Wrong Password"}
            }
        }
    },

    register: async (body) => {
        // method to set salt and hash the password for a user
        // setPassword method first creates a salt unique for every user
        // then it hashes the salt with user password and creates a hash
        // this hash is stored in the database as user password
        // creating a unique salt for a particular user
        this.salt = crypto.randomBytes(16).toString('hex');

        // hashing user's salt and password with 1000 iterations,
        // 64 length and sha512 digest
        this.hash = crypto.pbkdf2Sync(body.password, this.salt,
            1000, 64, `sha512`).toString(`hex`);

        User.create({
            name: body.name,
            email: body.email,
            salt: this.salt,
            hash: this.hash,
            role: body.role,
            location : body.location
        })

        return {
            name: body.name,
            email: body.email,
            role: body.role,
            location : body.location
        }
    },

    updateProfile: async (body) => {
        return User.update({
            name: body.name,
            email: body.email,
            role: body.role,
            location : body.location
        }, {
            where: {
                id: body.id
            },
            returning: true
        })
    },
    findById: (userId) => {
        return User.findByPk(userId, {
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'hash', 'salt', 'token']
            }
        })
    },

    findByName: (name) => {
        return User.findOne({
            where: {
                name: name
            }
        })
    },

    getAll: (offset, limit) => {
        return User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'hash', 'salt', 'token']
            }
        })
    },

    deleteById: (id) => {
        return User.destroy({
            where: {
                id: id
            }
        })
    }
};
module.exports = userService;
