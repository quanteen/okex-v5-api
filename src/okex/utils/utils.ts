// 首字母小写
export const firstCharacterLowerBound = (str: string) => {
  if (!str) return str;
  return str.replace(str[0], str[0].toLowerCase());
};

// 横线转换驼峰
export const toHump = (name: string) => {
  return name.replace(/_(\w)/g, function(all: string, letter: string) {
    return letter.toUpperCase();
  });
};
