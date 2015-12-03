/// <reference path="./../typings/tsd.d.ts" />
import express = require('express');
import data = require("../data/index");

export function list(request: express.Request, response: express.Response) {
    data.getPersons(function (error, persons) {
        response.render("index", {
            "persons": persons,
            "title": "NodeJS Demo"
        })
    })
}