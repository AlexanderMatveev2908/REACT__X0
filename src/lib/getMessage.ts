import { EndGameType } from "../features/Game/gameSlice";

export const getMessage = (res: EndGameType) => {
  let headTxt: string = "";
  let mainTxt: string = "TAKES THE ROUND";
  const leftBtn = "QUIT";
  const rightBtn = "NEXT ROUND";

  if (res === "user") {
    headTxt = "YOU WON!";
  } else if (res === "CPU") {
    headTxt = "YOU LOST...";
  } else {
    headTxt = "NOBODY WON!";
    mainTxt = "ROUND TIED";
  }

  return {
    headTxt,
    mainTxt,
    leftBtn,
    rightBtn,
  };
};
