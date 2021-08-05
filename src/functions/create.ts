import { document } from '../utils/dynamodbClient'
import dayjs from 'dayjs'
import { v4 as uuid } from 'uuid'

interface ICreateTodos {
  id: string;
  user_id: string;
  title: string;
  done: boolean;
  deadline: Date;
}


export const handle = async (event, _context, callback) => {
  const { title, deadline } = JSON.parse(event.body) as ICreateTodos;
  const { userid } = event.pathParameters

  if(typeof title !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: 'Couldn\'t create the todo item.'
      }),
    });
    return;
  }

  const params = {
    TableName: "desafio12",
    Item: {
      id: uuid(),
      user_id: userid,
      title,
      deadline: dayjs(deadline).format(),
      done: false,
      createdAt: dayjs().format(),
      updatedAt: dayjs().format()
    }
  };

  await document.put(params).promise().then(() => {
    const response = {
      statusCode: 201,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params.Item),
    }
  
    callback(null, response)

  }).catch(error => {
    callback(null, {
      statusCode: error.statusCode || 501,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: 'Couldn\'t create the todo item.',
      }),
    });

  })
 
}