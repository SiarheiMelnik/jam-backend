'use strict';

const axios = require('axios');
const mock = require('./mock');

const FORM_URL = process.env.FORM_URL;

const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*'
};
const getLetter = async (templateId) => await `Hi from ${templateId}`;

const sendForm = async (data) => {
    const templateId = data.template;

    const result = await axios.post(`${FORM_URL}/submit`, data);
    console.log('Result');
    console.log(result.data);
};

exports.treatment = async (evt) => {
    let response;
    try {
        console.log(FORM_URL);
        console.log(evt.body);

        const data = JSON.parse(evt.body || '{}');
        
        await sendForm(data);

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

exports.list = async (evt) => {
    return {
        'statusCode': 200,
        headers: { ...CORS },
        'body': JSON.stringify(mock)
    };
};