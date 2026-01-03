import cors from 'cors';
import 'dotenv/config';

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        if(!origin) return callback(null, true);

        if(origin.startsWith('http://localhost')){
            return callback(null, true)
        }

        
        if(origin.endsWith('.vercel.app')){
            return callback(null, true)
        }

        console.error('Bloqueado por CORS: ', origin);
        callback(new Error('Not allowed by cors'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-type', 'Authorization', 'X-Requested-with'],
    credentials: true,
};

export default cors(corsOptions);