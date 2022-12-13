// 'User' - це назва нашої колекції...
// Schema - це опис полів які будуть знаходиться у нашій колекції...
// type (тип значення), required:true (означає це поле обов'язкове), default (дефолтне значення)
// trim:true (обрізає в кінці пробіли), lowercase:true (приводить все до нижнього регістру)
// timestamps: true - це параметр опцій (дає 2 доп поля: created/updated add)
// unique:true (забороняє 2 однакових записи в нашому випадку поля email)
//
// statics-methods - писати лише звичайними функціями,
// -- бо стрілочні силаються на глобал і не мають свій this!!!

const { Schema, model } = require('mongoose');
const oauthService = require('../service/oauth.service');

const userSchema = new Schema({
    name: { type: String, required: true, default: '' },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    password: { type: String },
    age: { type: Number, default: 18 },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

userSchema.virtual('fullName').get(function () {
    return `${this.name} Kmin`;
});
// буде вертатись віртуальне поло при find, але в базі його не буде


userSchema.statics = { // for schema (наприклад User (dataBase/User)) / THIS = MODEL
    testStatic() {
        console.log('I AM STATIC');
    },

    async createWithHashPassword(userObject = {}) {
        const hashPassword = await oauthService.hashPassword(userObject.password);

        return this.create({ ...userObject, password: hashPassword });
    },
};

userSchema.methods = { // for single record (наприклад наш 1 user) / THIS = RECORD
    testMethod() {
        console.log('I AM METHOD');
    },

    async comparePasswords(password) {
        await oauthService.comparePasswords(this.password, password);
    },
};

module.exports = model('User', userSchema);


