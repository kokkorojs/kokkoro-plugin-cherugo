import { Plugin } from 'kokkoro';
import { valuesDecode, valuesEncode } from './service';

const { version } = require('../package.json');
const plugin = new Plugin('cherugo');

plugin
  .version(version)

plugin
  .command('encode <content>')
  .description('切噜语加密')
  .sugar(/^切噜一下(?<content>.+)$/)
  .action(ctx => {
    const { content } = ctx.query;

    ctx.reply(valuesEncode(content.trim()));
  })

plugin
  .command('decode <content>')
  .description('切噜语解密')
  .sugar(/(?<content>^切噜～♪.+$)/)
  .action(ctx => {
    const { content } = ctx.query;

    ctx.reply(valuesDecode(content.trim()));
  })
