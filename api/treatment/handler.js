'use strict';

// const axios = require('axios');
const mock = require('./mock');
const AWS = require('aws-sdk');

const TableName = process.env.TABLE_NAME;
const FORM_URL = process.env.FORM_URL;
const ddb = new AWS.DynamoDB.DocumentClient();

const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*'
};
// const getLetter = async (templateId) => await `Hi from ${templateId}`;

// const sendForm = async (data) => {
//     const templateId = data.template;

//     const result = await axios.post(`${FORM_URL}/submit`, data);
//     console.log('Result');
//     console.log(result.data);
// };

exports.treatment = async (evt) => {
    try {
        console.log(evt.body);

        const data = JSON.parse(evt.body || '{}');

        if (!data.email || !data.name || !data.coords || !data.complaint) {
            throw new Error('Missed email or name or coords or complaint');
        }

        const row = {
            TableName,
            Item: {
                ...data,
                status: 'PENDING',
                title: 'Title',
                message: 'Some message',
                timestamp: Date.now(),
            },
            ReturnValues: 'NONE'
        };

        await new Promise(
            (resolve, reject) => ddb.put(
                row,
                (err, res) => err ? reject(err) : resolve(res)));
        
        return {
            'statusCode': 200,
            headers: { ...CORS },
            'body': JSON.stringify({ status: 'OK' })
        };
    } catch (e) {
        console.log(e);
        
        return {
            'statusCode': 500,
            headers: { ...CORS },
            'body': JSON.stringify({ status: e.message })
        };
    }
};

exports.list = async (evt) => {
    try {
        const request = {
            TableName,
            FilterExpression: '#timestamp <= :timestamp',
            ExpressionAttributeNames: { '#timestamp': 'timestamp' },
            ExpressionAttributeValues: { ':timestamp': Date.now() }
        };
    
        const { Items } = await new Promise(
            (resolve, reject) => ddb.scan(request, (err, res) => err ? reject(err) : resolve(res))
        );
    
        console.log(Items);
    
        return {
            'statusCode': 200,
            headers: { ...CORS },
            'body': JSON.stringify(Items)
        };
    } catch (e) {
        console.log(e);
        return {
            'statusCode': 500,
            headers: { ...CORS },
            'body': JSON.stringify({ error: e.message })
        };
    }
};