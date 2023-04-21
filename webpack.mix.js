const mix = require('laravel-mix');



mix.js('resources/js/app.js', 'public/js')
    .react()
    .sass('resources/sass/app.scss', 'public/css')
    .browserSync('http://127.0.0.1:8000')
    .options({
        watchOptions: {
            ignored: /node_modules/
        }
    });




