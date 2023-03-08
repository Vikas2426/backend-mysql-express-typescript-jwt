import * as dotenv from 'dotenv';

/* eslint-disable @typescript-eslint/no-var-requires */
const FSDB = require('file-system-db');


dotenv.config();
function getUsersDB(){
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let instance:any = null;
    return ()=>
        {if(instance === null){
        instance = new FSDB(process.env.USER_DB_FILENAME, false);
    }
    return instance;};
}
export default getUsersDB();
