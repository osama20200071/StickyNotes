export const setNewOffset = (card, mouseMoveDir = { x: 0, y: 0 }) => {
  let offsetLeft = card.offsetLeft - mouseMoveDir.x;
  let offsetTop = card.offsetTop - mouseMoveDir.y;

  const style = card.getBoundingClientRect();
  const cardWidth = style.width.toFixed();
  const cardHeight = style.height.toFixed();

  if (offsetLeft >= window.innerWidth - cardWidth) {
    offsetLeft = window.innerWidth - cardWidth;
  }

  if (offsetTop >= window.innerHeight - cardHeight) {
    offsetTop = window.innerHeight - cardHeight;
  }

  return {
    x: offsetLeft > 0 ? offsetLeft : 0,
    y: offsetTop > 0 ? offsetTop : 0,
  };
};

export const autoGrow = (textAreaRef) => {
  const { current } = textAreaRef;
  current.style.height = "auto"; // Reset the height
  current.style.height = current.scrollHeight + "px"; // Set the new height
};

// this should be called when typing in a card or selecting it
export const setZIndex = (selectedCard) => {
  // console.log(selectedCard);
  selectedCard.style.zIndex = 999;
  Array.from(document.getElementsByClassName("card")).forEach((card) => {
    if (card !== selectedCard) {
      card.style.zIndex = selectedCard.style.zIndex - 1;
    }
  });
};

// @desc: if it's json parse if not let it
export const bodyParser = (body) => {
  try {
    return JSON.parse(body);
  } catch (error) {
    return body;
  }
};
