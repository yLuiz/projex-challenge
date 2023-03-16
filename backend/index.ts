import express from 'express';
import cors from 'cors';
import userRouter from './http/routes/user.routes';
import propertiesRouter from './http/routes/properties.routes';
import { errors } from 'celebrate';


const app = express();

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    return res.json({
        message: 'Hello world!'
    })
})

app.use(userRouter);
app.use(propertiesRouter);


app.use(errors());
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`
    =====================================================
        🚀🚀 Running in http://localhost:${PORT} 🚀🚀
    =====================================================
    `);
})