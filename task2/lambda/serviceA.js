var AWS = require('aws-sdk');
const { SQSClient, SendMessageCommand } = require( "@aws-sdk/client-sqs");
const sqsClient = new SQSClient({ region: "eu-west-1" });

const queueUrl = process.env.QUEUE_URL;

exports.handler = async (event) => {
    let response;

    const params = {
        DelaySeconds: 10,
        MessageAttributes: {
            Author: {
                DataType: "String",
                StringValue: "Author1",
            }
        },
        MessageBody: "Hello World!",
        QueueUrl: queueUrl
    };

    try {
        const data = await sqsClient.send(new SendMessageCommand(params));
        if (data) {
            console.log("Success, message sent. MessageID:", data.MessageId);
            const bodyMessage = 'Message Send to SQS- Here is MessageId: ' +data.MessageId;
            response = {
                statusCode: 200,
                body: JSON.stringify(bodyMessage),
            };
        }else{
            response = {
                statusCode: 500,
                body: JSON.stringify('Some error occured !!')
            };
        }
        return response;
    }
    catch (err) {
        console.log("Error", err);
    }

};
