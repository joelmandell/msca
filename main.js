if ('ondevicelight' in window) {
    window.addEventListener('devicelight', function(event) {
        var body = document.querySelector('body');
        if (event.value < 50) {
        body.classList.add('darklight');
        body.classList.remove('brightlight');
        } else {
        body.classList.add('brightlight');
        body.classList.remove('darklight');
        }
    });
} else {
    console.log('devicelight event not supported');
}


function isObject(o)
{
    return typeof o === 'object'
}

function hasProp(o,prop)
{
    return o.hasOwnProperty(prop)
}

function missingProp(err)
{
    console.log(err)
    return
}


class BaseComponent extends HTMLElement {
    constructor() {
        super();

        this.addEventListener("click", e => {
            console.log("SPOTTTA UT DET NUT")
          });
    }

    set land(data) {
        this.data = data

        this.outerHTML += "LAND:" + this.data
    }

    get land() {
        this.outerHTML += "LAND:" + this.data

        return this.data
    }
}

function createCustomElment(ExpComponent) {
    if(isObject(ExpComponent)) {
        
        //Måste ha en el att fästa sig på...
        if(!hasProp(ExpComponent,"el")) return missingProp("Du saknar el-property på exp-objektet.")

        const el = document.querySelector(ExpComponent["el"])

        //Har data props
        if(hasProp(ExpComponent,"data"))
        {

        }

        //Har componentnamn
        if(hasProp(ExpComponent,"compName"))
        {
            //Skapa en component som dom'en kan använda nu.
            let newComp = BaseComponent

            window.customElements.define(ExpComponent["compName"],newComp)
            
            let newEl = document.createElement("my-comp")
            newEl.setAttribute("data-mintext","")

            newEl.setAttribute("land","sverige")

            newEl.innerHTML = "MY CUSTOM COMPOONTENT: GÖR DIG I ORDNING NU"
            el.appendChild(newEl)
            
            return ExpComponent
        }
    }
}


let nComp = createCustomElment({
    data: {
        test:"YOLO"
    },
    compName:"my-comp",
    el:"body"
})

console.log(nComp)

document.onreadystatechange = (ev) => {
    compileDataProps()
}    

function iterateEls(el)
{
    Array.from(el.children).forEach( (child,idx) => {

        if(child.children.length>0) {
            iterateEls(child)
        }

        Object.getOwnPropertyNames(child.dataset).forEach( (o) => {

            //Skapa events för input när det är ett element med dataset satt.
            child.oninput = (e) => {
                e.target.value = e.target.value

                let css = document.createElement("style")
                css.id = o+"_1"
                css.type ="text/css"
                css.innerHTML = "*[data-"+o+"]:after { content:'"+e.target.value+"' }"
                let existingCss = document.querySelector("#"+o+"_1")

                if(existingCss) document.body.removeChild(existingCss)

                document.body.appendChild(css)
            }
        })
    })

}

//Steg 1: Gå igenom alla element i dom-trädet.
function compileDataProps()
{
    //Inget return-värde än så länge.
    let getProps = iterateEls(document)
}
