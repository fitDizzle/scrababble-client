import { useDropHandler, useDragoverHandler } from "../../../../hooks/tileHooks"

export async function AI_PlaceHolder_Drop_Handler(e) {
  e.preventDefault();

  let move = await useDropHandler(e)

  // const placeHolder = document.getElementById("ai-letters");
  // const blocks = document.getElementsByClassName("block");

  // if (e.target === placeHolder || e.target === blocks) {
  //   try {
  //     const data = e.dataTransfer.getData("block-letter-data");
  //     e.target.appendChild(document.getElementById(data));
  //   } catch (error) {
  //     if (error) {
  //       return;
  //     }
  //   }
  // } else return;
}

export async function AI_PlaceHolder_Dragover_Handler(e) {
  e.preventDefault();
  useDragoverHandler(e)

  // try {
  //   e.dataTransfer.dropEffect = "move";
  // } catch (error) {
  //   if (error) {
  //     return;
  //   }
  // }
}

export default (AI_PlaceHolder_Dragover_Handler, AI_PlaceHolder_Drop_Handler);

// dragleave	ondragleave	…a dragged item leaves a valid drop target.

// dragend	ondragend	…a drag operation ends
//(such as releasing a mouse button or hitting the Esc key; see Finishing a Drag.)
