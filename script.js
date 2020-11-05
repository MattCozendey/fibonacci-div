const CONFIG = {
    dark: false,
    numbers: true,
    inverted: false,
}

const fibonacciDivs = () =>{
    const container = document.querySelector("#container");
    let allFibonnaciDivs = [];

    function generateFibonacciArrayFrom(num) {
        var x = 0;
        var y = 1;
        var fibarray = [0];
        
        while(y < num) {
            fibarray.push(y);
            y += x;
            x = y - x;
        }
        
        return fibarray;
    }

    function generateRandomColor() {
        var r = function () { return Math.floor(Math.random()*256) };
        return "rgb(" + r() + "," + r() + "," + r() + ")";
    }

    function generateDiv(size, index){
        if(!size) return;
        if(!(typeof size === "number")) return;

        const div = document.createElement("div");
        const innerDiv = document.createElement("div");

        //div.setAttribute("id", `box-${index}`);
        div.setAttribute("style",
        `
        position: absolute;
        width: ${size}0px;
        height: ${size}0px;
        background: ${generateRandomColor()};
        `);

        innerDiv.setAttribute("class", "fibo-in");
        innerDiv.dataset.size = size;


        div.appendChild(innerDiv);

        allFibonnaciDivs.push(div);

        return div;
    }

    function repositionDiv(div, index){
        const PARENT_CONTAINER_BOX_DATA = container.getBoundingClientRect();
        //const previousDiv = allFibonnaciDivs[index - 2];
        const computedStyles = div.getAttribute("style");

        if(index === 1){
            div.setAttribute("style", computedStyles + "left: 50%; top: 50%;");
            //console.log(div.getBoundingClientRect() )
        }
        else{

            let leftPos, topPos;
            const PREVIOUS_DIV_BOX_DATA = allFibonnaciDivs[index - 2].getBoundingClientRect();

            switch(index % 4){
                case 0:{
                    const BEFORE_PREVIOUS_DIV_BOX_DATA = allFibonnaciDivs[index - 3].getBoundingClientRect();

                    leftPos = PREVIOUS_DIV_BOX_DATA.left - (PREVIOUS_DIV_BOX_DATA.width + BEFORE_PREVIOUS_DIV_BOX_DATA.width);
                    topPos = BEFORE_PREVIOUS_DIV_BOX_DATA.top;
                    break;
                }
                case 1:{
                    const BEFORE_PREVIOUS_DIV_BOX_DATA = allFibonnaciDivs[index - 3].getBoundingClientRect();
                    leftPos = PREVIOUS_DIV_BOX_DATA.left;
                    topPos = PREVIOUS_DIV_BOX_DATA.top - (BEFORE_PREVIOUS_DIV_BOX_DATA.height + PREVIOUS_DIV_BOX_DATA.height);
                    break;
                }
                case 2:{
                    leftPos = PREVIOUS_DIV_BOX_DATA.left + PREVIOUS_DIV_BOX_DATA.width;
                    topPos = PREVIOUS_DIV_BOX_DATA.top;
                    break;
                }
                case 3:{
                    const BEFORE_PREVIOUS_DIV_BOX_DATA = allFibonnaciDivs[index - 3].getBoundingClientRect();

                    leftPos = BEFORE_PREVIOUS_DIV_BOX_DATA.left;
                    topPos = PREVIOUS_DIV_BOX_DATA.top + PREVIOUS_DIV_BOX_DATA.height; 
                    break;
                }

            }
            div.setAttribute("style", computedStyles + `left: ${leftPos - PARENT_CONTAINER_BOX_DATA.left}px; top: ${topPos - PARENT_CONTAINER_BOX_DATA.top}px;`);
            //console.log(previousDiv.getBoundingClientRect());
        }

        //console.log(index % 4);

        return div;
    }

    function start(LIMIT){
        const FIBONACCI_ARRAY_FROM_LIMIT = generateFibonacciArrayFrom(LIMIT);

        FIBONACCI_ARRAY_FROM_LIMIT.forEach((number, index)=>{
            if(!number) return; //prevents zero and non-numbers;
            const div = generateDiv(number, index);
            const repositionedDiv = repositionDiv(div, index);

            //document.body.appendChild(div);
            container.appendChild(div);
        });
    }

    return {start}
}

fibonacciDivs().start(500);

const arrFiboIn = [].slice.call(document.getElementsByClassName("fibo-in"));
if(CONFIG.dark){
    arrFiboIn.forEach((element)=>{
        element.setAttribute("class", element.getAttribute("class") + " dark");
    });
}

if(CONFIG.numbers){
    arrFiboIn.forEach((element)=>{
        if(CONFIG.dark){
            return element.setAttribute("class", element.getAttribute("class") + " numbers-dark");
        }
        element.setAttribute("class", element.getAttribute("class") + " numbers-light");
    })
}

if(CONFIG.inverted){
    document.querySelector("body").setAttribute("style", "filter: invert(1);");
}