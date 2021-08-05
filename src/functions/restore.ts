import { document } from "src/utils/dynamodbClient";


export const handle = async (event, _context, callback) => {
  
  const { userid } = event.pathParameters;

  const params = {
    TableName: 'desafio12',
    key: {
      user_id: userid
    }
  };

  await document.scan(params).promise().then(result => {

    const response = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(result.Items)
    }

    callback(null, response);

  }).catch(error => {
    console.log(error)
    callback(null, {
      statusCode: error.statusCode || 501,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: 'Couldn\'t fetch the todo items.'
      }),
    });

  })
  
}