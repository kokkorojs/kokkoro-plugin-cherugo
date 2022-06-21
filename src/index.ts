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

console.log(valuesEncode('诶嘿~'));
