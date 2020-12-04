import app from './app';

const { PORT } = require('./Config/envConfig');

app.listen(PORT, () => console.log(`server running at port ${PORT}`));
