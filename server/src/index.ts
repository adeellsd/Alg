import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { AuthMiddleware } from './middleware/authMiddleware';

/*Routes Imports*/
import particulierRoutes from './routes/particulierRoutes';
import proRoutes from './routes/proRoutes';


/*Configuration*/
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/*Routes */
app.get("/", (req, res) => {
    res.send("Ca marche yakho....");
});

// Particulier routes (protected) - FREE tier users
app.use("/particulier", AuthMiddleware(["FREE"]), particulierRoutes);

// Pro routes (protected) - STARTER, PRO and ELITE tier users
app.use("/pro", AuthMiddleware(["STARTER", "PRO", "ELITE"]), proRoutes);

/* Server */
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`aw yemchi sur le port ${PORT}`);
});