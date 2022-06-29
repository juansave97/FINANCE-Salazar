function captura_dat(event) {
    let user = document.getElementById("exampleInputEmail1").value
    let pass = document.getElementById("exampleInputPassword1").value

    localStorage.setItem("name",user)
    localStorage.setItem("passw", pass)

    event.preventDefault()

    location.href = "../simulator.html"

}

fetch('https://mindicador.cl/api')
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data)
        document.getElementById("dolar").innerHTML = '$ ' + data.dolar.valor
        document.getElementById("euro").innerHTML = '€ ' + data.euro.valor
        document.getElementById("dolar_intercambio").innerHTML = '$ ' +data.dolar_intercambio.valor
        document.getElementById("bitcoin").innerHTML = '$ ' + data.bitcoin.valor
        document.getElementById("ivp").innerHTML = '$ ' + data.ivp.valor
        document.getElementById("ipc").innerHTML = '$ ' + data.ipc.valor
        document.getElementById("utm").innerHTML = '$ ' + data.utm.valor
    })



const form = document.getElementById("form")
form.addEventListener('submit', captura_dat)

function gen_table() {
    tab = document.getElementById("tab")
    tab.innerHTML= ""
    let capital = Number(document.getElementById("capital").value)
    console.log("hola", capital)
    let cuotas = Number(document.getElementById("couta").value)
    let intereses = Number(document.getElementById("interes").value)
    var name = localStorage.getItem("name")       
    var text = document.createTextNode(`Bienvenido(a) ${name}`)
    var parrafo = document.createElement("h1")

    parrafo.appendChild(text)

    let datos = document.getElementById("datos")

    datos.appendChild(parrafo)   
    
    if (capital > 0) { 
        Swal.fire({
            icon: 'success',
            title: 'Tu resultado esta listo',
            showConfirmButton: false,
            timer: 1500
          })  
        for (i = 1; i <= cuotas; i++) {
            cap_mensual = capital/cuotas;
            int_mensual = ((capital * intereses) / 100) / cuotas;
            total_mensual = cap_mensual + int_mensual;
            
            tab.innerHTML= tab.innerHTML +
            `<tr>
                <td> ${i}</td>
                <td> ${cap_mensual.toFixed(2)}</td>
                <td> ${int_mensual.toFixed(2)}</td>
                <td> ${total_mensual.toFixed(2)}</td>
            </tr>`
        }

        total_int = int_mensual * cuotas
        total_pago = total_mensual * cuotas

        document.getElementById("t1").innerHTML = capital.toFixed(2)
        document.getElementById("t2").innerHTML = total_int.toFixed(2)
        document.getElementById("t3").innerHTML = total_pago.toFixed(2)
    } 
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Faltan datos para realizar tu cálculo',
          })

        var error_text = document.createTextNode(`🔔No fue posible generar los calculos, faltan datos🔔`)
        var parrafo_error = document.createElement("h2")

        parrafo_error.appendChild(error_text)
        datos.appendChild(parrafo_error)   

    }
}
