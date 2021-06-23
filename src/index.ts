// Import
import { envConfig } from "./env";
import express from 'express';
import handlebars from 'express-handlebars';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import db from './config/db';
import router from './core';

const app = express();
db.connect();

// Rules
app.use(express.static('public'));
app.use(cookieParser(envConfig.get('COOKIE_SECRET')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));

// Custom function for getter
// enctype="application/x-www-form-urlencoded"
// const getter = function(req, res) {
//     if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//         const method = req.body._method;
//         delete req.body._method;
//         return method;
//     }
// };
// app.use(methodOverride(getter));

app.engine('.hbs', handlebars({
    extname: '.hbs',
    helpers: {
        sum: (a: number, b: number) => a + b,
    },
}));
app.set('view engine', '.hbs');

app.use('/', router);

app.listen(envConfig.get('PORT'), () => {
    console.log(`Demo app is listening at http://localhost:${envConfig.get('PORT')}`);
});
