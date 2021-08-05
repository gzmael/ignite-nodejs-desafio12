import { DynamoDB } from 'aws-sdk'

const options = {
  region: "localhost",
  endpoint: "http://localhost:8000",
  accessKeyId: 'AKIAYBTS72VT33VGMKCX', // essa
  secretAccessKey: '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', // e essa
}

const isOffline = () => {
  return process.env.IS_OFFLINE;
}

export const document = 
  isOffline() ? 
  new DynamoDB.DocumentClient(options) 
  : new DynamoDB.DocumentClient();