import { Plugin } from 'kokkoro';
import { valuesDecode, valuesEncode } from './service';

const plugin = new Plugin('cherugo');

plugin
  .command('encode <content>')
  .description('切噜语转换')
  .sugar(/^切噜一下(?<content>.+)$/)
  .action(ctx => {
    const { content } = ctx.query;

    ctx.reply(valuesEncode(content.trim()));
  })

plugin
  .command('decode <content>')
  .description('切噜语转换')
  .sugar(/(?<content>^切噜～♪.+$)/)
  .action(ctx => {
    const { content } = ctx.query;

    ctx.reply(valuesDecode(content.trim()));
  })
