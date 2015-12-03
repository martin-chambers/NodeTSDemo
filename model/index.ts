/// <reference path="../typings/tsd.d.ts" />
import express = require('express');
import mongodb = require('mongodb');

interface iPerson {
	_id: string,
	name: string,
	age: number
}
interface iDatabase {
  db: mongodb.Db,
  persons: mongodb.Collection
}
export function clean(input: string): string {
	return input.replace(/\W/g, ' ').trim();
}
export class Person implements iPerson {
	constructor (public _id: string, public name: string, public age: number ){}	
}
export class Database implements iDatabase {
  constructor (public db: mongodb.Db, public persons: mongodb.Collection ){}
} 

