import app from './app';
import config from './config/config';

app.listen(config.port, () => {
    console.log(`${new Date().toLocaleTimeString()} Server running on ${config.nodeEnv} http://localhost:${config.port}`);
});