import { errors } from 'celebrate';
import cors from 'cors';
import express from 'express';
import propertiesRouter from './http/routes/property.routes';
import userRouter from './http/routes/user.routes';

const app = express();

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    return res.json({
        message: 'Hello world!'
    })
})

app.use('/uploads', express.static('uploads'));

app.use('/user', userRouter);
app.use('/property', propertiesRouter);


app.use(errors());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`
    =====================================================
        🚀🚀 Running in http://localhost:${PORT} 🚀🚀
    =====================================================
    `);
})