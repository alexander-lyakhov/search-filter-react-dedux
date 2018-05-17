del /f/s/q package.json
del /f/s/q webpack.config.js

copy ..\..\package.json %cd%
copy ..\..\webpack.config.js %cd%
