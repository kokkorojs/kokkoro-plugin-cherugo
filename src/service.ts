import charMap from './char-map';

function isAscii(unicode: number) {
  return unicode === 0x20ac || (unicode <= 0x007f && unicode >= 0x0000);
}

const charData = charMap
  .replace(/#(\d+)\$/g, (a, b) => {
    return Array(+b + 3).join('#');
  })
  .replace(/#/g, '####')
  .replace(/(\w\w):([\w#]+)(?:,|$)/g, (a, hd, dt) => {
    return dt.replace(/../g, (a: string) => {
      if (a != '##') {
        return hd + a;
      } else {
        return a;
      }
    });
  });

class Cherugo {
  charsetDict: { [k: string]: number };
  unicode2gbk: { [k: string]: string };
  gbk2unicode: { [k: string]: string };

  constructor(private charset: string) {
    this.charsetDict = {};
    this.unicode2gbk = {};
    this.gbk2unicode = {};

    for (let i = 0; i < charset.length; i++) {
      const char = charset[i];
      this.charsetDict[char] = i;
    }

    let k = 0;
    let data: string[] = charData.match(/..../g)!;

    for (let i = 0x81; i <= 0xfe; i++) {
      for (let j = 0x40; j <= 0xfe; j++) {
        this.unicode2gbk[data[k++]] =
          charset[i & 0xf] +
          charset[i >> 4] +
          charset[j & 0xf] +
          charset[j >> 4];
      }
    }
    for (let key in this.unicode2gbk) {
      this.gbk2unicode[this.unicode2gbk[key]] = key;
    }
  }

  encode(str: string) {
    return str.replace(/./g, a => {
      let code = a.charCodeAt(0);

      if (isAscii(code)) {
        return this.charset[code & 0xf] + this.charset[code >> 4];
      } else {
        let key = code.toString(16);

        if (key.length != 4) key = ('000' + key).match(/....$/)![0];
        return this.unicode2gbk[key] || a;
      }
    });
  }

  decode(str: string) {
    let output = '';
    let h = null;

    for (let i = 0, charsLength = str.length; i < charsLength; i += 2) {
      if (h !== null) {
        let a = h + str.substr(i, 2);
        h = null;
        output += String.fromCharCode(+('0x' + this.gbk2unicode[a]));
      } else if (this.charsetDict[str[i + 1]] < 8) {
        let code =
          (this.charsetDict[str[i + 1]] << 4) +
          this.charsetDict[str[i]];
        output += String.fromCharCode(code);
      } else {
        h = str.substr(i, 2);
      }
    }
    return output;
  }
}

// TODO ／人◕ ‿‿ ◕人＼ 群自定义词典
const cherugo = new Cherugo('切卟叮咧哔唎啪啰啵嘭噜噼巴拉蹦铃');

export function valuesDecode(encoded_string: string) {
  if (encoded_string.substr(0, 4) !== '切噜～♪') {
    return '错误';
  }
  return encoded_string
    .substr(4)
    .replace(/切[切卟叮咧哔唎啪啰啵嘭噜噼巴拉蹦铃]+/g, che =>
      cherugo.decode(che.substr(1))
    );
}

export function valuesEncode(raw_string: string) {
  var new_string = raw_string.replace(
    /[^，。？！、…：“”,\.\?!\s]+/g,
    word => '切' + cherugo.encode(word)
  );
  return '切噜～♪' + new_string;
}
