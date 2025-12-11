import config from './config/config';
import { connectWithRetry, sequelize } from './config/database';
import { makeApp } from './app';

const app = makeApp();

app.listen(config.port, async() => {
    console.log(`Servidor corriendo en el puerto: ${config.port}`);
    try{
        await connectWithRetry();
        console.log('DB conectado');
        await sequelize.sync(); //sincroniza los modelos con la db
    }catch(error){
        console.error('Error conectando a la DB: ', error)
    }
})