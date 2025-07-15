import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('assignment', 'root', '7904', {
  host: 'localhost',
  dialect: 'mysql',
});

export const dbconnection = async () =>{
  try{
    //await sequelize.authenticate();
    await sequelize.sync({ alter: true ,force:false});
    console.log('db connected');
    
  }catch(error){
    console.log('error in db');  
  }
}
