const express = require('express');
const pRoutes = require('./routes/participants');
const bRoutes = require('./routes/bills');
const camelCaseDeep = require('camelcase-object-deep');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    const originalJson = res.json;
    res.json = function (data) {
        originalJson.call(this, camelCaseDeep(data));
    };
    next();
});

app.use('/api/participants', pRoutes);
app.use('/api/bills', bRoutes);


app.listen(4000, () => console.log('server started'));