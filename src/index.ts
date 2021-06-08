// Import
import { envConfig } from "./env";
import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import db from './config/db';
import route from './routes';

const app = express();
db.connect();

// Rules
app.use(express.static(path.join(__dirname, 'public'))); // Static files
app.use(cookieParser(envConfig.get('COOKIE_SECRET'))); // Cookie parser
app.use(express.urlencoded({extended: true})); // Gửi từ form HTML thì thằng này xử lý
app.use(express.json()); // Gửi dữ liệu = thư viện như XMLHttpRequest, fetch... hoặc = code js vanilla
app.use(methodOverride('_method')); // Override with POST

// ---- Bài tập: Custom function cho getter để lấy req method từ req body's method fields
// enctype="application/x-www-form-urlencoded"
// const getter = function(req, res) {
//     if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//         const method = req.body._method;
//         delete req.body._method;
//         return method;
//     }
// };
// app.use(methodOverride(getter));

// View engine
app.engine('.hbs', handlebars({
    extname: '.hbs',
    helpers: {
        sum: (a: number, b: number) => a + b,
    },
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views')); // View engine sẽ được tìm trong path resources/views

// req là object chứa những thông tin mà ứng dụng từ phía client gửi lên server (request message)
// res là object để config để sau khi xử lý request, thì sẽ trả về cái gì, ntn
route(app);

app.listen(envConfig.get('PORT'), () => {
    console.log(`Demo app is listening at http://localhost:${envConfig.get('PORT')}`);
});
