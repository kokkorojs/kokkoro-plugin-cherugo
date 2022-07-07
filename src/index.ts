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
  .command('encode <text>', 'group')
  .description('切噜语转换')
  .sugar(/^切噜一下(?<text>.+)$/)
  .action(event => {
    const { query } = event;
    event.reply(valuesEncode(query.text));
  })

plugin
  .command('decode <text>', 'group')
  .description('切噜语转换')
  .sugar(/^切噜～♪.+$/)
  .action(event => {
    const { raw_message } = event;
    event.reply(valuesDecode(raw_message.trim()));
  })
