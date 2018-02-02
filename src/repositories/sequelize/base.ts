import * as fs from 'fs';
import * as Sequelize from 'sequelize';
import * as path from 'path';

export class BaseRepository {

    public static models: {
        Address: Sequelize.Model<{}, {}>,
        ContactInformation: Sequelize.Model<{}, {}>,
        Customer: Sequelize.Model<{}, {}>,
    } = null;

    protected static sequelize: Sequelize.Sequelize = null;

    private static defineModels(): void {

        const Address = BaseRepository.sequelize.define('address', {
            city: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            country: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            line1: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            line2: {
                allowNull: false,
                type: Sequelize.NUMERIC,
            },
            postalCode: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
        });

        const ContactInformation = BaseRepository.sequelize.define('contactInformation', {
            emailAddress: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            phoneNumber: {
                allowNull: false,
                type: Sequelize.STRING,
            },
        });

        const Customer = BaseRepository.sequelize.define('customer', {
            firstName: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            identificationNumber: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            lastName: {
                allowNull: false,
                type: Sequelize.STRING,
            },
        });

        Customer.hasOne(ContactInformation, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
        ContactInformation.belongsTo(Customer, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

        ContactInformation.hasOne(Address, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
        Address.belongsTo(ContactInformation, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

        this.models = {
            Address,
            ContactInformation,
            Customer,
        };
    }

    constructor() {

        if (!BaseRepository.sequelize) {

            BaseRepository.sequelize = new Sequelize(null, null, null, {
                dialect: 'sqlite',
                logging: false,
            });

            BaseRepository.defineModels();
        }
    }

    public close(): void {
        if (BaseRepository.sequelize) {
            BaseRepository.sequelize.close();
            BaseRepository.sequelize = null;
        }
    }

    public sync(): Promise<void> {
        return new Promise((resolve, reject) => {
            BaseRepository.sequelize.sync({ force: true }).then(() => {
                resolve();
            });
        });
    }
}