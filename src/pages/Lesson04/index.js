import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart04";
import instruction from "./instruction.md";

const convertData = (input) => {
  // 要素を重複なく数えられるようにする
  const species = Array.from(new Set(input.map(({species}) => species)));
  // アヤメの品種ごとのデータを作成
  return species.map((species) => {
    return {
      id: species,
      data: input
        .filter((item) => item.species === species) // idと一致するレコードを取り出す
        .map(({sepalLength: x, petalWidth: y}) => ({x, y})), // オブジェクトを作成
    };
  });
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer04"
      dataUrl="data/iris.json"
      convertData={convertData}
      instruction={instruction}
      title="Lesson 04"
      Chart={Chart}
    />
  );
};

export default Lesson;
