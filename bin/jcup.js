#!/usr/bin/env node
const yargs = require('yargs/yargs')(process.argv.slice(2));
const { newProyect } = require('../lib/commands/new');
const { generate } = require('../lib/commands/generate');
const { install } = require('../lib/commands/install')
const { uninstall } = require('../lib/commands/uninstall')

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
  command:'uninstall <nameDependencie>',
  aliases:['rm'],
  describe:'Elimina una dependencia que haya sido instalada',
  handler: uninstall
}).positional('nameDependencie',{
  describe: 'nombre de la dependencies',
  type: 'string',
});

yargs.command({
  command:'install [newDependencie]',
  aliases:['i'],
  describe:'Instala una dependencia que se encuente en jcup',
  handler: install
}).positional('newDependencie',{
  describe: 'nombre de la nueva dependencies',
  type: 'string',
});

yargs.command({
  command:'generate <type> <name>',
  aliases:[ 'g'],
  describe:'genera un nuevo recurso para spring boot',
  handler: generate
}).positional('type',{
  desc:'tipo de componente que se desea generara',
  type:'string',
  choices:['resource', 'res']
}).positional('name',{
  describe: 'nombre del componente',
  type: 'string',
}).argv;

