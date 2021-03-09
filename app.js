var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');



var indexRouter = require('./routes/index'); // Recovering the index route (home)
var ProductsRoutes = require('./routes/ProductsRoutes');  // Recovering Products roads
var SegmentsRoutes = require('./routes/SegmentsRoutes');  // Recovering Segments roads
var FormulasRoutes = require('./routes/FormulasRoutes');  // Recovering Formulas roads
var GuaranteeRoutes = require('./routes/GuaranteeRoutes');  // Recovering Guarantee roads
var ProductSegmentRoutes = require('./routes/ProductSegmentRoutes');  // Recovering Product Segment roads
var GuaranteeFormulasRoutes = require('./routes/GuaranteeFormulasRoutes');  // Recovering Product Segment roads

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const swaggerUi = require('swagger-ui-express');
// const swaggerJsdoc = require('swagger-jsdoc');
const YAML = require('yamljs');
const openApiDocumentation = YAML.load('./api/swagger/swagger.yaml');

app.use('/', indexRouter);  // Injection of index routes for display
app.use('/api/products', ProductsRoutes); // Injection of country routes to generate the API
app.use('/api/segments', SegmentsRoutes); // Injection of Segments routes to generate the API
app.use('/api/formulas', FormulasRoutes); // Injection of Formulas routes to generate the API
app.use('/api/guarantee', GuaranteeRoutes); // Injection of Guarantee routes to generate the API
app.use('/api/product-segments', ProductSegmentRoutes); // Injection of Formulas routes to generate the API
app.use('/api/guarantee-formulas', GuaranteeFormulasRoutes); // Injection of Guarantee & Formulas routes to generate the API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
