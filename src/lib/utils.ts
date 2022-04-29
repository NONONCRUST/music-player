// 배열의 길이 범위 중 지정한 숫자가 아닌 랜덤한 숫자를 리턴함
export const getRandomNum = (arr: number[], excludeNum: number): any => {
  const randomNum = Math.floor(Math.random() * arr.length);

  // 만약 randomNum이 지정한 숫자이면 재귀하여 randomNum을 다시 선택함
  return arr[randomNum] === excludeNum
    ? getRandomNum(arr, excludeNum)
    : arr[randomNum];
};

// 오디오 src를 인자로 받아서 음악의 길이를 리턴함
export const getDuration = (src: string) => {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.onloadedmetadata = () => {
      const minute = `0${parseInt(String(audio.duration / 60), 10)}`;
      const second = `0${parseInt(String(audio.duration % 60))}`;
      resolve(`${minute}:${second.slice(-2)}`);
    };
    audio.src = src;
  });
};
