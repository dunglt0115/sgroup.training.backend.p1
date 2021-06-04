require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
// Init app
const path = require('path');
const handlebars = require('express-handlebars');
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

// Connect to DB
db.connect();

// Static file
app.use(express.static(path.join(__dirname, 'public')));

// Cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// Body parser for post
app.use(express.urlencoded({extended: true})); // Gửi từ form HTML thì thằng này xử lý
app.use(express.json()); // Gửi dữ liệu = thư viện như XMLHttpRequest, fetch... hoặc = code js vanilla

// Override with POST
app.use(methodOverride('_method'));

// Custom function cho getter để lấy req method từ req body's method fields
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
        sum: (a, b) => a + b,
    },
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views')); // View engine sẽ được tìm trong path resources/views

// req là object chứa những thông tin mà ứng dụng từ phía client gửi lên server (request message)
// res là object để config để sau khi xử lý request, thì sẽ trả về cái gì, ntn

/** Luồng chạy của route
 * 1. Require folder routes và truyền vào tham số app (express)
 * 2. Chạy đến file index trong folder routes, đây là file chứa tất cả các file route khác
 * 3. Require các file route khác vào file index
 * 4. Các file route khác sẽ khai báo phần path tổng, và require controller của riêng file đó vào
 * 5. Về lại file index, tạo route cụ thể
 */
route(app);

app.listen(port, () => {
    console.log(`Demo app is listening at http://localhost:${port}`);
});
