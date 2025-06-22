export default function draggable(event,modal){
        event.preventDefault()
            //get the postion of the sticky note
            const posLeft = modal.offsetLeft
            const posTop = modal.offsetTop
            //get the postion of the mouse when mousedown
            const startX  = event.pageX
            const startY  = event.pageY
            //drag function changes the x and y positon of the sticky note based on the postion of the mouse
            const drag = (event)=>{
                modal.style.left = `${posLeft + (event.pageX - startX)}px`
                modal.style.top = `${posTop + (event.pageY - startY)}px`
            }
            //mouseUp function removes the eventlisteners when the the mouse up
            const mouseUp = ()=>{
                document.removeEventListener("mousemove",drag)
                document.removeEventListener("mouseup",mouseUp)
            }
            document.addEventListener("mousemove",drag)//calls the drag func when the mouse moves
            document.addEventListener("mouseup",mouseUp)// calls the mouseUp func when the mouse is no longer being pressed
    }