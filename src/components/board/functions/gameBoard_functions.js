// @ts-ignore
import CenterBlock from "../../../data/GridData/centerBlock";
// @ts-ignore
import DoubleLetterBlocks from "../../../data/GridData/doubleLetterBlock";
// @ts-ignore
import DoubleWordBlocks from "../../../data/GridData/doubleWordBlocks";
// @ts-ignore
import TrippleLetterBlocks from "../../../data/GridData/tripleLetterBlocks";
import TrippleWordBlocks from "../../../data/GridData/tripleWordBlocks";

export const buildBlocksArray = () => {
   // REFACTORED----new blocks start-------------------------------------------------------------
   let x = 1;
   let y = 15;

   let i = 1;

   let newBlocks = [];
   let allBlockMods = [
     ...TrippleLetterBlocks,
     ...TrippleWordBlocks,
     ...DoubleLetterBlocks,
     ...DoubleWordBlocks,
     ...CenterBlock,
   ];
   while (i < 226) {
     i++;

     let filtered = allBlockMods.filter(
       (modBlock) => modBlock.x == x && modBlock.y == y
     );

     if (filtered.length > 0) {
       newBlocks.push({
         x,
         y,
         value: filtered[0].value,
         color: filtered[0].color,
       });
     } else {
       newBlocks.push({
         x,
         y,
         value: "none",
         color: "clear",
       });
     }

     if (x == 15) {
       x = 1;
       y -= 1;
     } else {
       x += 1;
     }
   }

   return newBlocks
}