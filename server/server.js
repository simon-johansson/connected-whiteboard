
import watch from 'watch';
import http from 'http';
import app from './lib/app';
import config from './lib/config/environment';
import {createImageJSON} from './lib/images';

const server = http.createServer(app);

// Create image.json
createImageJSON();

// Start server
server.listen(config.port, () => {
 console.log(`Server listening on ${config.port}, in ${app.get('env')} mode`);
});

// Watch for changes in image folder
watch.createMonitor(`${config.root}/images/`, monitor => {
 monitor.on('created', createImageJSON);
});
