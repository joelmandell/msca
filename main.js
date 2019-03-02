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
