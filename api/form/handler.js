'use strict';

const axios = require('axios');
const mock = require('./mock.json');

const FEEDBACK_URL = process.env.FEEDBACK_URL;

const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*'
};
const getLetter = async (templateId) => await `Hi from ${templateId}`;

const sendForm = async (data) => {
    const templateId = data.template;

    const result = await axios.post(`${FEEDBACK_URL}/1`, {
       mode: 'send',
       yur: '',
       value: 1, // goverment
       type: 'special',
       org: 1, // goverment
       whois: data.email,
       name: `${data.firstName} ${data.secondName} ${data.lastName}`,
       address: data.address,
       letter: await getLetter(templateId),
       capcha: 'xxjb'
    });

    console.log('Result');
    console.log(result.data);
}

exports.treatment = async (evt) => {
    let response;
    try {
        console.log(FEEDBACK_URL);
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

exports.list = (evt) => {
    return {
        'statusCode': 200,
        headers: { ...CORS },
        'body': JSON.stringify(mock)
    };
};