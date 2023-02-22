import { Plugin } from '@kokkoro/core';
import { valuesDecode, valuesEncode } from './service';

const pkg = require('../package.json');
const plugin = new Plugin('cherugo');

plugin
  .version(pkg.version)

plugin
  .command('encode <content>')
  .description('切噜语加密')
  .sugar(/^切噜一下(?<content>.+)$/)
  .action(async (ctx) => {
    const { content } = ctx.query;
    await ctx.reply(valuesEncode(content.trim()));
  })

plugin
  .command('decode <content>')
  .description('切噜语解密')
  .sugar(/(?<content>^切噜～♪.+$)/)
  .action(async (ctx) => {
    const { content } = ctx.query;
    await ctx.reply(valuesDecode(content.trim()));
  })
