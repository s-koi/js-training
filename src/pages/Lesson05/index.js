import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart05";
import instruction from "./instruction.md";

const convertData = (input) => {
  // 重複のない性別の配列を作成
  const genders = Array.from(new Set(input.map(({gender}) => gender)));
  // 最大値の計算
  const min = Math.round(Math.min(...input.map(({y}) => y)));
  // 最小値の計算
  const max = Math.round(Math.max(...input.map(({y}) => y)));
  // それぞれのビンを求める
  const bins = Array.from({length: max-min+1}).map((_, i)=>{
    const obj = {
      bin: (min +i).toString(), // ビンの総数を取得
    };
    for (const gender of genders) {
      obj[gender] = 0; // それぞれのビンを初期化
    }
    return obj;
  });
  for (const {y, gender} of input) { // ビンの添字を計算
    const i = Math.round(y)-min;
    bins[i][gender] += 1;
  }
  return bins;
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer05"
      convertData={convertData}
      dataUrl="data/size-and-weight.json"
      instruction={instruction}
      title="Lesson 05"
      Chart={Chart}
    />
  );
};

export default Lesson;
