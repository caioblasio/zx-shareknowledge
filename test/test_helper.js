const mongoose = require('mongoose');

before(() => {
    mongoose.connect('mongodb://localhost/test_zx-shareknowledge',  {useNewUrlParser: true });
    mongoose.connection
        .once('open', () => {console.log('Test DB Connected')})
        .on('error', error => {
            console.log('Warning', error)
        });
});


// after((done) => {
//     const { users } = mongoose.connection.collections;
//     users.drop(() => {
//         done();
//     })
// })