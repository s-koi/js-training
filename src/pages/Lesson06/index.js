import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart06";
import instruction from "./instruction.md";

const convertData = (input) => {
  // 性別のデータを表示する際の色を指定
  const colors = {
    男性: "blue",
    女性: "red",
  };
  return input.map(({gender, y, x}) => {
    return { // それぞれのデータから詳細を参照&表示
      color: colors[gender],
      gender,
      bmi: x/(y/100)**2,
      weight: x,
      height: y,
    };
  });
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer06"
      convertData={convertData}
      dataUrl="data/size-and-weight.json"
      instruction={instruction}
      title="Lesson 06"
      Chart={Chart}
    />
  );
};

export default Lesson;
