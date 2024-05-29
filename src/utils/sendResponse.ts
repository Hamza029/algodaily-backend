import { Request, response, Response } from 'express';
import { json2xml } from 'xml-js';
const json2html = require('json2html');
import { jsonToPlainText, Options } from 'json-to-plain-text';

import { AuthType, UserType } from '../interfaces';

type ResponseType =
    | {
          status: string;
          message: string;
          data: any;
      }
    | string;

const createResponseObject = (
    status: string,
    message: string,
    data: Response,
    contentType: string
): JSON | string => {
    const responseObject: ResponseType = {
        status,
        message,
        data,
    };

    const json = JSON.stringify(responseObject);

    if (contentType === 'application/json') {
        return json;
    } else if (contentType === 'application/xml') {
        return json2xml(json, {
            compact: true,
            ignoreComment: true,
            spaces: 2,
        });
    } else if (contentType === 'text/html') {
        return json2html.render(responseObject);
    } else {
        const options: Options = {
            color: false,
            spacing: true,
            seperator: ':',
            squareBracketsForArray: true,
            doubleQuotesForKeys: false,
            doubleQuotesForValues: false,
        };
        return jsonToPlainText(responseObject, options);
    }
};

const sendResponse = (
    req: Request,
    res: Response,
    statusCode: number,
    status: string,
    message: string,
    data: any
) => {
    const contentType: string = req.headers.accept || 'application/json';

    res.set('content-type', contentType);

    const response = createResponseObject(status, message, data, contentType);

    res.status(statusCode).send(response);
};

export default sendResponse;
