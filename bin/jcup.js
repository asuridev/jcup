#!/usr/bin/env node
const yargs = require('yargs/yargs')(process.argv.slice(2))
const { newProyect } = require('../lib/commands/new')
const { generate } = require('../lib/commands/generate')

yargs.command({
  command:'new <name>',
  aliases:['n'],
  describe:'genera un nuevo proyecto de spring boot',
  handler: newProyect
}).positional('name',{
  describe: 'nombre del proyecto',
  type: 'string',
});

yargs.command({
  command:'generate <type> <name>',
  aliases:[ 'g'],
  describe:'genera un nuevo recurso de spring boot',
  handler: generate
}).positional('type',{
  desc:'tipo de componente que se desea generara',
  type:'string',
  choices:['reseorce', 'res']
}).positional('name',{
  describe: 'nombre del componente',
  type: 'string',
}).argv;

