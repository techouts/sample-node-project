import { ColorType } from "../utility/ColorType";

export default interface ProductQAInterface {
  id: number;
  __component: string;
  bgColor: ColorType;
  bgPadding: string;
  placeholderText: string;
  helperText: string;
  buttonText: string;
  SubmitAnswerIcon: string;
  items: [
    {
      Question: string;
      QuestionBy: string;
      Answers: [
        {
          Answer: string;
          AnswerBy: string;
        }
      ];

      LikeCount: number;
    }
  ];
}
