import {connection} from '../connections'
import sequelize from 'sequelize'
import { max_len } from '../functions'

const IDObj = {        
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    type: sequelize.DataTypes.INTEGER
}

export  const ServerStsusEnums:{
    Ban:"BN",
    Verifide:"VF"
} = {
    Verifide:"VF",
    Ban:"BN",
}

export const UsersTable = connection.define('users', {
    // done
    id:IDObj,
    email:{
        allowNull:false,
        unique:true,
        type:sequelize.DataTypes.STRING({
          length: max_len.email
        })
    },
    pay_pal_email:{
        allowNull:true,
        type:sequelize.DataTypes.STRING({
          length: max_len.email
        }),
    },
    user_id:{
        allowNull:false,
        unique:true,
        type:sequelize.DataTypes.STRING({
          length: max_len.discord_id
        })
    },
    status: {
        allowNull:true,
        type:sequelize.DataTypes.CHAR(3),
    }
}, {timestamps: false})

export const ServersTable = connection.define('servers', {
    // done
    id:IDObj,
    our_user_id:{
        allowNull:false,
        type:sequelize.DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    server_name:{
        allowNull:false,
        type:sequelize.DataTypes.STRING({
            length:max_len.server_name
        }),
    },
    server_id:{
        allowNull:false,
        unique:true,
        type:sequelize.DataTypes.STRING({
          length: max_len.discord_id
        }),
    },
    user_id:{
        allowNull:true,
        unique:true,
        type:sequelize.DataTypes.STRING({
          length: max_len.discord_id
        }),
        references: {
            model: 'users',
            key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    lang:{
        type: sequelize.DataTypes.CHAR(7),
        allowNull:false
    },
    products_mangers:{
        type: sequelize.DataTypes.TEXT,
        allowNull:false,
    },
    pay_pal_email:{
        allowNull:false,
        type:sequelize.DataTypes.STRING({
          length: max_len.email
        }),
    },
    logs_channel:{
        allowNull:false,
        unique:true,
        type:sequelize.DataTypes.STRING({
            length: max_len.discord_id
        }),
    },
    basket_embed_description:{
        type: sequelize.DataTypes.STRING({
            length:max_len.description
        }),
        allowNull:true,
    },
    basket_embed_imageURL:{
        type: sequelize.DataTypes.STRING({
            length:150
        }),
        allowNull:true,
    },
    invite_link:{
        type: sequelize.DataTypes.STRING({
            length:100
        }),
        allowNull:true,
    },
    disc:{
        type: sequelize.DataTypes.STRING({
            length:max_len.description
        }),
        allowNull:true,
    },
    rate:{
        type:sequelize.DataTypes.FLOAT,
        allowNull:false,
    },
    status:{
        type:sequelize.DataTypes.CHAR(2),
        allowNull:true,
    }
}, {timestamps:false})

export const SectionTable = connection.define('sections', {
    // done
    id: IDObj,
    server_id:{
      allowNull:false,
      type:sequelize.DataTypes.STRING({
        length: max_len.discord_id
      }),
      references: {
            model: 'servers',
            key: 'server_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    section_name:{
        allowNull:false,
        type:sequelize.DataTypes.STRING({
          length:max_len.section_name
        })
    },
}, {timestamps: false})

export const ProductsWithSectionTable = connection.define('products_with_sections', {
    // done
    id: IDObj,
    server_id:{
        allowNull:false,
        type:sequelize.DataTypes.STRING({
          length: max_len.discord_id
        }),
        references: {
              model: 'servers',
              key: 'server_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    section_name:{
        allowNull:false,
        type:sequelize.DataTypes.STRING({
            length:max_len.section_name
        }),
    },
    product_name:{
        allowNull:false,
        type:sequelize.DataTypes.STRING({
            length:max_len.product_name
        })
    },
    product_price:{
        allowNull:false,
        type:sequelize.DataTypes.FLOAT
    },
}, {timestamps: false})

export const SingleProductsTable = connection.define('single_products', {
    // done
    id: IDObj,
    server_id:{
        allowNull:false,
        type:sequelize.DataTypes.STRING({
          length: max_len.discord_id
        }),
        references: {
              model: 'servers',
              key: 'server_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    product_name:{
        allowNull:false,
        type:sequelize.DataTypes.STRING({
            length:max_len.product_name
        })
    },
    product_price:{
        allowNull:false,
        type:sequelize.DataTypes.FLOAT
    },
    product_disc:{
        allowNull:true,
        type:sequelize.DataTypes.STRING({
            length:max_len.description
        })
    },
    product_img_url:{
        allowNull:true,
        type:sequelize.DataTypes.STRING({
            length:max_len.image_url
        })
    },
}, {timestamps: false})

export const BascitTaple = connection.define('baskets', {
    // done
    id: IDObj,
    server_id:{
        allowNull:false,
        type:sequelize.DataTypes.STRING({
          length: max_len.discord_id
        }),
        references: {
              model: 'servers',
              key: 'server_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    user_id:{
        allowNull:false,
        type:sequelize.DataTypes.STRING({
          length: max_len.discord_id
        }),
    },
    isLoked:{
        type:sequelize.DataTypes.BOOLEAN,
        allowNull:false,
    },
    payment_path:{
        allowNull:true,
        unique:true,
        type:sequelize.DataTypes.STRING(150)
    },
    products:{
        type:sequelize.DataTypes.TEXT,
        allowNull:false,
    },
}, {timestamps: false})

export const RatesServersTable = connection.define('rates_servers', {
    // done
    id: IDObj,
    server_id:{
        allowNull:false,
        type:sequelize.DataTypes.STRING({
          length: max_len.discord_id
        }),
        references: {
              model: 'servers',
              key: 'server_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    user_id:{
        allowNull:false,
        type:sequelize.DataTypes.STRING({
          length: max_len.discord_id
        }),
        references: {
              model: 'users',
              key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    rate:{
        type:sequelize.DataTypes.FLOAT,
        allowNull:false,
    }
}, {timestamps: false})

export const InvoicesTable = connection.define('invoices', {
    // done
    id: IDObj,
    server_id:{
        allowNull:false,
        type:sequelize.DataTypes.STRING({
            length: max_len.discord_id
        })
    },
    server_name:{
        allowNull:false,
        type:sequelize.DataTypes.STRING({
            length:max_len.server_name
        }),
    },
    user_id:{
        allowNull:false,
        type:sequelize.DataTypes.STRING({
            length:(max_len.discord_id * 2) + 4
        }),
    },
    user_username:{
        allowNull:false,
        type:sequelize.DataTypes.STRING({
            length:100
        }),
    },
    invoice_id:{
        type:sequelize.DataTypes.STRING({
            length:40
        }),
        allowNull:false,
        unique:true
    },
    total_amount:{
        type:sequelize.DataTypes.FLOAT,
        allowNull:false,
    },
    createdAt:{
        type:sequelize.DataTypes.DATE,
        allowNull:false,
    }
}, {timestamps: false})

export const DonationsTable = connection.define('donations', {
    id: IDObj,
    sender_user_id:{
        allowNull:false,
        type:sequelize.DataTypes.STRING({
            length: max_len.discord_id
        })
    },
    sender_username:{
        allowNull:false,
        type:sequelize.DataTypes.STRING({
            length:50
        }),
    },
    resiver_server_or_user_id:{
        allowNull:false,
        type:sequelize.DataTypes.STRING({
            length:max_len.discord_id
        })
    },
    resiver_server_or_user_name:{
        allowNull:false,
        type:sequelize.DataTypes.STRING({
            length:50
        }),
    },
    invoice_id:{
        type:sequelize.DataTypes.STRING({
            length:40
        }),
        allowNull:false,
        unique:true
    },
    amount:{
        type:sequelize.DataTypes.FLOAT,
        allowNull:false,
    },
    createdAt:{
        type:sequelize.DataTypes.DATE,
        allowNull:false,
    }
}, {timestamps: false})
export const AcceptedUsersConditionsTable = connection.define('accepted_users_conditions', {
    id: IDObj,
    user_id:{
        allowNull:false,
        unique:true,
        type:sequelize.DataTypes.STRING({
          length: max_len.discord_id
        }),
        references: {
              model: 'users',
              key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
}, {timestamps: false})