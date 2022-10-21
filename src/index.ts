import { Plugin } from 'kokkoro';
import Encoder from './encoder';

const cherugo = new Encoder('切卟叮咧哔唎啪啰啵嘭噜噼巴拉蹦铃');

function valuesDecode(encoded_string: string) {
  if (encoded_string.substr(0, 4) !== '切噜～♪') {
    return '错误';
  }
  return encoded_string
    .substr(4)
    .replace(/切[切卟叮咧哔唎啪啰啵嘭噜噼巴拉蹦铃]+/g, che =>
      cherugo.decode(che.substr(1))
    );
}

function valuesEncode(raw_string: string) {
  var new_string = raw_string.replace(
    /[^，。？！、…：“”,\.\?!\s]+/g,
    word => '切' + cherugo.encode(word)
  );
  return '切噜～♪' + new_string;
}


const plugin = new Plugin('cherugo');

plugin
  .command('encode <content>')
  .description('切噜语转换')
  .sugar(/^切噜一下(?<content>.+)$/)
  .action(ctx => {
    const { content } = ctx.query;
    ctx.reply(valuesEncode(content));
  })

plugin
  .command('decode <content>')
  .description('切噜语转换')
  .sugar(/(?<content>^切噜～♪.+$)/)
  .action(ctx => {
    const { content } = ctx.query;
    ctx.reply(valuesDecode(content.trim()));
  })
