// Thuê express quản lý giùm cái server
const express = require('express');
const app = express();
// Init app
const port = 3000; // Khai báo nơi các hoạt động trên app diễn ra (*)
const path = require('path');
const handlebars = require('express-handlebars');
const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

// Body parser for post
app.use(express.urlencoded({extended: true})); // Gửi từ form HTML thì thằng này xử lý
app.use(express.json()); // Gửi dữ liệu = thư viện như XMLHttpRequest, fetch... hoặc = code js vanilla 

// View engine
app.engine('.hbs', handlebars({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views')); // View engine sẽ được tìm trong path resources/views

// req là object chứa những thông tin mà ứng dụng từ phía client gửi lên server (request message)
// res là object để config để sau khi xử lý request, thì sẽ trả về cái gì, ntn

/** Luồng chạy
 * 1. Require folder routes và truyền vào tham số app (express)
 * 2. Chạy đến file index trong folder routes, đây là file chứa tất cả các file route khác
 * 3. Require các file route khác vào file index
 * 4. Các file route khác sẽ khai báo phần path tổng, và require controller của riêng file đó vào
 * 5. Về lại file index, tạo route cụ thể
 */

route(app);

// (*)
app.listen(port, () => {
  console.log(`Demo app is listening at http://localhost:${port}`);
});
