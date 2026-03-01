console.log("test js")

document.onreadystatechange = function () {
    console.log(document.readyState)
    if(document.readyState == 'interactive') {
        console.log("c'est ok")
        //TODO: add tagada.

        let prix_Chamallows = 2.28;
        let prix_Dragibus = 1.64;
        let poid_init_c = 100;
        let poid_init_d = 300;
        let commande  = document.getElementById("commande-list");
        let prix_total = document.getElementById("prix_total");
        let poids_total = document.getElementById("poids_total");

        const state = {
            chamallows: {name:"Chamallows", prix: prix_Chamallows,  qty: parseInt(document.getElementsByClassName("number")[0].value), poids: poid_init_c, img: "images/chamallows.jpg" },
            dragibus:   {name:"Dragibus", prix: prix_Dragibus,  qty: parseInt(document.getElementsByClassName("number")[1].value), poids: poid_init_d, img: "images/dragibus.jpg" }
        };

        Object.values(state).forEach(object => {
            document.getElementById("prix_" + object.name).innerText = "Prix à l'unité " + object.prix + " €";
            document.getElementById("poids_" + object.name).innerText = "Poids " + object.poids + "g";
            document.getElementById("name_" + object.name).innerText = object.name;
            document.getElementById("img_" + object.name).src = object.img;
        })

        refresh()

        for (let i = 0; i < document.getElementsByClassName("number").length; i++) {
            document.getElementsByClassName("number")[i].onchange = function () {
                Object.values(state)[i].qty=Number(document.getElementsByClassName("number")[i].value);
                if(Object.values(state)[i].qty < 0) {
                    document.getElementsByClassName("number")[i].value = 0;
                    Object.values(state)[i].qty=0;
                }
                Object.values(state)[i].qty = document.getElementsByClassName("number")[i].value;
                updateCommande();
            }

            document.getElementsByClassName("btn-medium blue darken-1 -")[i].onclick = function () {
                Object.values(state)[i].qty--;
                document.getElementsByClassName("number")[i].value = Object.values(state)[i].qty;
                if(Object.values(state)[i].qty < 0) {
                    document.getElementsByClassName("number")[i].value = 0;
                    Object.values(state)[i].qty=0;
                }
                updateCommande();
            }


            document.getElementsByClassName("btn-medium blue darken-1 +")[i].onclick = function () {
                Object.values(state)[i].qty++;
                document.getElementsByClassName("number")[i].value = Object.values(state)[i].qty;
                if(Object.values(state)[i].qty < 0) {
                    document.getElementsByClassName("number")[i].value = 0;
                    Object.values(state)[i].qty=0;
                }
                updateCommande();
            }

        }

        function refresh() {
            Object.values(state).forEach(object => {
                document.getElementById("nbr_" + object.name).innerText = object.qty + " paquets de Dragibus"
                document.getElementById("prix_tot_" + object.name).innerText ="Prix total = " + (object.prix * object.qty).toFixed(2) + " €";
                let poid = object.poids*object.qty;
                if(poid>=1000) {
                    unité = "kg";
                    poid = poid/1000;
                }
                else{
                    unité = "g";
                }
                document.getElementById("poids_tot_" + object.name).innerText ="Poids total = " + poid + unité;
                document.getElementById("prix_kilo_" + object.name).innerText ="Prix au kilo = " +((object.prix*1000)/ object.poids).toFixed(2) + " €";
            })
        }


        function updateCommande(){
            refresh()
            commande.innerHTML = "";

            let valeur = 0;
            Object.values(state).forEach(object => {
                valeur += object.qty;
            });
            if(valeur <= 0){
                commande.innerHTML = "Aucun Article Sélectionné";
                prix_total.innerHTML = "";
                poids_total.innerHTML = "";
                return;
            }

            let somme = 0;
            Object.values(state).forEach(product => {
                if(product.qty>0) {
                    let li_name = document.createElement("li");
                    li_name.textContent = product.name;
                    li_name.style.marginBottom = "10px";
                    li_name.style.fontSize = "20px";
                    commande.appendChild(li_name);
                    let li_nbr = document.createElement("li");
                    li_nbr.textContent = product.qty + " paquets de " + product.name;
                    li_nbr.style.marginBottom = "10px";
                    commande.appendChild(li_nbr);
                    let li_prix = document.createElement("li");
                    li_prix.textContent = "Prix total = " + (product.prix*product.qty).toFixed(2) + " €";
                    li_prix.style.marginBottom = "10px";
                    commande.appendChild(li_prix);
                    let li_poids = document.createElement("li");
                    let poid =product.poids*product.qty;
                    let unité;
                    if(poid>=1000) {
                        unité = "kg";
                        poid = poid/1000;
                    }
                    else{
                        unité = "g";
                    }
                    li_poids.textContent = "Poids total = " + poid + unité;
                    li_poids.style.marginBottom = "20px";
                    commande.appendChild(li_poids);
                    somme += product.qty * product.prix;
                    commande.style.textAlign = "center";
                }
            });

            let poids_tot = 0 ;
            Object.values(state).forEach(product => {
                poids_tot += product.poids*product.qty;
            })
            if(poids_tot>=1000) {
                unité = "kg";
                poids_tot = poids_tot/1000;
            }
            else{
                unité = "g";
            }
            commande.style.marginBottom = "20px";
            commande.append("Récapitulatif de la commande")
            prix_total.innerHTML ="Prix total = " + somme.toFixed(2) + " €";
            prix_total.style.textAlign = "center";
            poids_total.innerHTML ="Poids total = " + poids_tot + unité;
            poids_total.style.textAlign = "center";
        }
    }
}

