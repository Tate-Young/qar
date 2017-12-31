const { rm, cp, mkdir, exec, echo } = require('shelljs');

exec('ng serve --host localhost --port 8090 -o & gulp watch');