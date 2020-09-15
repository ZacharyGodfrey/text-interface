(() => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const charWidth = document.getElementById('unit').clientWidth;
    const maxLineWidth = Math.floor(screenWidth / charWidth);

    console.log(`screen width: ${screenWidth}px`);
    console.log(`screen height: ${screenHeight}px`);
    console.log(`1ch = ${charWidth}px`);
    console.log(`each line may contain up to ${maxLineWidth} characters`);
})();