import dotenv from 'dotenv'
dotenv.config()

const validateEnv = () => {
 const required = ['PORT', 'PROJECT_ID', 'LOCATION', 'MODEL_NAME']
 for (const name of required) {
   if (!process.env[name]) {
     throw new Error(`Missing ${name} environment variable`)
   }
 }
}

validateEnv()

export const config = {
 port: process.env.PORT,
 projectId: process.env.PROJECT_ID, 
 location: process.env.LOCATION,
 modelName: process.env.MODEL_NAME
}
