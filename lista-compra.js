const advertencia = document.querySelector(".advertencia");
const añadir = document.querySelector(".añadir");
const buscar = document.querySelector(".buscar");
const original = document.querySelector(".clon-original");
const lista = document.querySelector(".lista");
const nombre = document.querySelector(".nombre-clon");
const limpiar = document.querySelector(".limpiar");
const basura = document.querySelector(".fa-trash");
const mensajeAdvertencia = document.querySelector(".overlay");
const noPermitirBorrado = document.querySelector(".cancelar-borrado");
const permitirBorrado = document.querySelector(".aceptar-borrado");
let confirmarBorrado = false;


const clones = [];





function añadirElemento () {
    
    
    if(clones.length===0){
                limpiar.style.display="none";
            } else {
                limpiar.style.display="block";
            }

    if (buscar.value==="") {
            advertencia.classList.add("bad");
            advertencia.textContent= "Introduce  Elemento";
            setTimeout(()=>{
                advertencia.classList.remove("bad");
                advertencia.textContent="";
            }, 1000);
        
    } else {
        const clon = original.cloneNode(true);
        clones.push(clon);
        lista.appendChild(clon);
        limpiar.style.display="block";
        clon.querySelector(".fa-trash").addEventListener("click", ()=>{
            clon.remove();
            const index = clones.indexOf(clon);
            if (index !== -1) {
                clones.splice(index, 1);
            }
            if(clones.length===0){
                limpiar.style.display="none";
            } else {
                limpiar.style.display="block";
            }
        });
        clon.addEventListener("click", ()=>{
            if (clon.style.opacity==="0.5"){
                clon.style.opacity="1";
                clon.style.backgroundColor="white";
                clon.style.textDecoration="none";
                clon.style.fontStyle="normal";
            } else {
                clon.style.opacity="0.5";
                clon.style.backgroundColor="rgba(161, 161, 161, 0.3)";
                clon.style.textDecoration="line-through";
                clon.style.fontStyle="italic";
            }
            
        });
        clon.querySelector(".nombre-clon").textContent=buscar.value;
        clon.style.display="flex";
        advertencia.classList.add("good");
        advertencia.textContent= "Elemento Añadido";
        buscar.value="";
        setTimeout(()=>{
                advertencia.classList.remove("good");
                advertencia.textContent="";
        }, 1000);
    }
};

añadir.addEventListener("click", añadirElemento);

buscar.addEventListener("keydown", (e)=>{
    if (e.key==="Enter"){
        añadirElemento();
    }
});

limpiar.addEventListener("click", ()=>{
    mensajeAdvertencia.style.display="block";
    permitirBorrado.addEventListener("click", ()=>{
        mensajeAdvertencia.style.display="none";
        [...lista.children].forEach(li=>{
            if (li!==original) {
                li.remove();
                limpiar.style.display="none";
            } 
    
        })
    });
    noPermitirBorrado.addEventListener("click", ()=>{
        mensajeAdvertencia.style.display="none";
    })
    clones.length="0";
});




if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log("✅ Service Worker registrado"))
    .catch(error => console.error("❌ Error registrando SW:", error));
}
