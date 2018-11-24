'use strict';

const FEEDBACK_URL = process.env.FEEDBACK_URL;

const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*'
};

exports.treatment = async (evt) => {
    let response;
    try {
        console.log(FEEDBACK_URL);
        console.log(evt.body);

        const data = JSON.parse(evt.body || '{}');
        
        console.log(data);

        response = {
            'statusCode': 200,
            headers: { ...CORS },
            'body': JSON.stringify({ form: data, status: 'OK' })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
