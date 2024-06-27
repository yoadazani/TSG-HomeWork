import {DataTypes, Sequelize} from "sequelize";
import { Request, Response, NextFunction} from "express";

const sequelize = new Sequelize("countries_info", "postgres", "208389403", {
    dialect: "postgres",
    host: "localhost",
    port: 5432
});

const Country = sequelize.define('Country', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    capital: {
        type: DataTypes.STRING,
        allowNull: true
    },
    region: {
        type: DataTypes.STRING,
        allowNull: true
    },
    subregion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    population: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    timezone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    continent: {
        type: DataTypes.STRING,
        allowNull: true
    },
    flagUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

const connectDB = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        next();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}

export {
    sequelize,
    Country,
    connectDB
}
