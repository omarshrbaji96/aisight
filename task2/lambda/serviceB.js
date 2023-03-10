let count = 0;
exports.handler = async (event) => {

    if ( event?.Records?.[0]?.eventSource === 'aws:sqs') {
        count++;
        console.log('SERVICE B', JSON.stringify(event, null, 2));
        console.log('Being called by SQS count will be increased', count);
    } else {
        return {
            statusCode: 200,
            body: JSON.stringify({count})
        }
    }

};
