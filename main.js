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




function createCustomElement(ExpComponent) {
    if(isObject(ExpComponent)) {
        
        //Måste ha en el att fästa sig på...
        if(!hasProp(ExpComponent,"el")) return missingProp("Du saknar el-property på exp-objektet.")

        // const el = document.querySelector(ExpComponent["el"])

        console.log(ExpComponent)
        //Har data props
        if(hasProp(ExpComponent,"data"))
        {

        }

        //Har componentnamn
        if(hasProp(ExpComponent,"compName"))
        {
            //Skapa en component som dom'en kan använda nu.
            window.customElements.define(ExpComponent["compName"],class extends HTMLElement {
                constructor() {
                    super();
            
                    const shadowRoot = this.attachShadow({mode: 'closed'}).innerHTML = ExpComponent["template"]
                    this.addEventListener("click", e => {
                        console.log("SPOTTTA UT DET NUT")
                    });
                }
            
            })
            
            return ExpComponent
        }
    }
}


let nComp = createCustomElement({
    data: {
        test:"YOLO"
    },
    compName:"my-comp",
    el:"body",
    template:"<h3>TESTAR</h3>"
})

let f = createCustomElement({
    data: {
        test:"tOLO"
    },
    compName:"anna-dist",
    template:"<p>HOLA</p>",
    el:"body"
});


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
