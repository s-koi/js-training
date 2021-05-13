import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart09";
import instruction from "./instruction.md";

const convertData = (input) => {
  const raito = 0.01;
  const ministryCount = {};
  const ministries = Array.from(
    new Set(input.map(({ministry})=>ministry))
  ).map((ministry)=> { // 全データからx省の事業を絞り込む
    const ministryProjects = input.filter((item) => item.ministry === ministry);
    const bureauCount = {};
    const bureaus = Array.from( // x省の事業に出現する部局を重複なく配列に格納
      new Set(ministryProjects.map(({bureau})=>bureau))
    )
      .map((bureau)=>{ // 各部局に対応するデータを作成
        const bureauProjects = ministryProjects.filter(
          (item) => item.bureau === bureau
        );
        const departments = Array.from(
          new Set(bureauProjects.map(({department})=>department))
        )
          .map((department)=> { // 部局の中の課に対応するデータの作成
            const departmentProjects = bureauProjects.filter(
             (item)=>item.department === department
            );
           return {
              name: department,
              count: departmentProjects.length,
            };
         })
         .filter(({count})=>count/input.length >= raito); // 事業数が1%以下の要素を取り除く
         // 部局に含まれる事業数（部局の中の課）を降順にソート
       departments.sort((item1, item2) =>item2.count - item1.count);
       // 取り除いた要素の合計を"その他"として追加
       departments.push({
          name: "その他",
          count:
            bureauProjects.length -
            departments.reduce((a, {count}) => a + count, 0),
       });
       bureauCount[bureau] = bureauProjects.length;
       return {
          name: bureau,
          children: departments,
       };
     })
     .filter(({name})=>bureauCount[name]/input.length >= raito);
     // 部局に含まれる事業数（部局）を降順にソート
   bureaus.sort(
      (item1, item2)=>bureauCount[item2.name]-bureauCount[item1.name]
   );
   // 取り除いた要素の合計を"その他"として追加
   bureaus.push({
     name: "その他",
     count:
       ministryProjects.length -
       bureaus.reduce((a, {name})=> a + bureauCount[name], 0),
    });
   ministryCount[ministry] = ministryProjects.length;
   return {
     name: ministry,
     children: bureaus,
   };
  });
  // データの"省"を降順にソート
  ministries.sort(
    (item1, item2) => ministryCount[item2.name]-ministryCount[item1.name]
  );
  return { 
    children: ministries,
  }; 
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer09"
      convertData={convertData}
      dataUrl="data/judgit-departments.json"
      instruction={instruction}
      title="Lesson 09"
      Chart={Chart}
    />
  );
};

export default Lesson;
