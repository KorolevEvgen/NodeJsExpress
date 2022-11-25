const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true, default: '' },
    email: { type: String, required: true, trim: true, lowercase: true, unique:true },
    password: { type: String },
    age: { type: Number, default: 18 },
},{
    timestamps: true
})


module.exports = model('User', userSchema);

// 'User' - це назва нашої колекції...
// Schema - це опис полів які будуть знаходиться у нашій колекції...
// type (тип значення), required:true (означає це поле обов'язкове), default (дефолтне значення)
// trim:true (обрізає в кінці пробіли), lowercase:true (приводить все до нижнього регістру)
// timestamps: true - це параметр опцій (дає 2 доп поля: created/updated add)
// unique:true (забороняє 2 однакових записи в нашому випадку поля email)
