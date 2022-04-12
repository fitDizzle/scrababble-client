export function PlaceHolder_Drop_Handler(e) {
  e.preventDefault();

  const placeHolder = document.getElementById("letters");
  const blocks = document.getElementsByClassName("block");

  if (e.target === placeHolder || e.target === blocks) {
    try {
      const data = e.dataTransfer.getData("block-letter-data");
      e.target.appendChild(document.getElementById(data));
    } catch (error) {
      if (error) {
        return;
      }
    }
  } else return;
}

export function PlaceHolder_Dragover_Handler(e) {
  e.preventDefault();

  try {
    e.dataTransfer.dropEffect = "move";
  } catch (error) {
    if (error) {
      return;
    }
  }
}

export default (PlaceHolder_Dragover_Handler, PlaceHolder_Drop_Handler);

// dragleave	ondragleave	…a dragged item leaves a valid drop target.

// dragend	ondragend	…a drag operation ends
//(such as releasing a mouse button or hitting the Esc key; see Finishing a Drag.)
