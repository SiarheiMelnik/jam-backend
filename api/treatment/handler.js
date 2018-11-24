'use strict';

const FEEDBACK_URL = process.env.FEEDBACK_URL;

const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*'
};

exports.treatment = async (event) => {
    console.log(FEEDBACK_URL);
    
    try {
        response = {
            'statusCode': 200,
            headers: { ...CORS },
            'body': JSON.stringify({
                message: 'hi',
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
