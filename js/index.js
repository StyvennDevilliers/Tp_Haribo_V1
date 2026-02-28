console.log("test js")

document.onreadystatechange = function () {
    console.log(document.readyState)
    if(document.readyState == 'interactive') {
        console.log("c'est ok")
        //TODO: add tagada, ajouter le path des images dans les objets, essayer de faire une boucle pour les infos de la commande et pour les numbers il faut passer par la classe pas l'id.

        let prix_Chamallows = 2.28;
        let prix_Dragibus = 1.64;
        let poid_init_c = 100;
        let poid_init_d = 300;
        let commande  = document.getElementById("commande-list");
        let prix_total = document.getElementById("prix_total");
        let poids_total = document.getElementById("poids_total");
        //let q1 = 0; // Chamallows
        //let q2 = 0; // Dragibus

        let input_1 = document.getElementById("number_1");
        let input_2 = document.getElementById("number_2");
        let plus_1 = document.getElementById("plus_1");
        let plus_2 = document.getElementById("plus_2");
        let moins_1 = document.getElementById("moins_1");
        let moins_2 = document.getElementById("moins_2");

        const state = {
            chamallows: {name:"Chamallows", prix: prix_c,  qty: parseInt(input_1.value), poids: poid_init_c },
            dragibus:   {name:"Dragibus", prix: prix_d,  qty: parseInt(input_2.value), poids: poid_init_d }
        };

        Object.values(state).forEach(object => {
            document.getElementById("prix_" + object.name).innerText = "Prix à l'unité " + object.prix + " €";
            document.getElementById("poids_" + object.name).innerText = "Poids " + object.poids + "g";
            document.getElementById("name_" + object.name).innerText = object.name;
            document.getElementById("img_" + object.name).src = object.img;
        })

        refreshDragibus()
        refreshChamallows()

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
        }

        plus_1.onclick = function () {
            //q1++;
            //input_1.value = q1;
            state.chamallows.qty++;
            input_1.value = state.chamallows.qty;
            if(state.chamallows.qty < 0) {
                input_1.value = 0;
                state.chamallows.qty=0;
            }
            updateCommande();
        }
        plus_2.onclick = function () {
            //q2++;
            //input_2.value = q2;
            state.dragibus.qty++;
            input_2.value = state.dragibus.qty;
            if(state.dragibus.qty < 0) {
                input_2.value = 0;
                state.dragibus.qty=0;
            }
            updateCommande();
        }
        moins_1.onclick = function () {
            //q1--;
            //input_1.value = q1;
            state.chamallows.qty--;
            input_1.value = state.chamallows.qty;
            if(state.chamallows.qty < 0) {
                input_1.value = 0;
                state.chamallows.qty=0;
            }
            updateCommande();
        }
        moins_2.onclick = function () {
            //q2--;
            //input_2.value = q2;
            state.dragibus.qty--;
            input_2.value = state.dragibus.qty;
            if(state.dragibus.qty < 0) {
                input_2.value = 0;
                state.dragibus.qty=0;
            }
            updateCommande();
        }
        /*input_1.onchange = function () {
            //q1 = Number(input_1.value);
            state.chamallows.qty=Number(input_1.value);
            if(state.chamallows.qty < 0) {
                input_1.value = 0;
                state.chamallows.qty=0;
                //q1 = 0;
            }
            state.chamallows.qty = input_1.value;
            updateCommande();
        }
        input_2.onchange = function () {
            //q2 = Number(input_2.value)
            state.dragibus.qty=Number(input_2.value);
            if(state.dragibus.qty < 0) {
                input_2.value = 0;
                state.dragibus.qty=0;
                //q2 = 0;
            }
            state.dragibus.qty = input_2.value;
            updateCommande();
        }*/

        function refreshDragibus(){
            document.getElementById("nbr_d").innerText = state.dragibus.qty + " paquets de Dragibus"
            document.getElementById("prix_tot_d").innerText ="Prix total = " + (state.dragibus.prix * state.dragibus.qty).toFixed(2) + " €";
            let poid = state.dragibus.poids*state.dragibus.qty;
            if(poid>=1000) {
                unité = "kg";
                poid = poid/1000;
            }
            else{
                unité = "g";
            }
            document.getElementById("poids_tot_d").innerText ="Poids total = " + poid + unité;
            document.getElementById("prix_kilo_d").innerText ="Prix au kilo = " +((state.dragibus.prix*1000)/ state.dragibus.poids).toFixed(2) + " €";
        }
        function refreshChamallows(){
            document.getElementById("nbr_c").innerText = state.chamallows.qty + " paquets de Chamallows"
            document.getElementById("prix_tot_c").innerText ="Prix total = " + (state.chamallows.prix * state.chamallows.qty).toFixed(2) + " €";
            let poid = state.chamallows.poids*state.chamallows.qty;
            if(poid>=1000) {
                unité = "kg";
                poid = poid/1000;
            }
            else{
                unité = "g";
            }
            document.getElementById("poids_tot_c").innerText ="Poids total = " + poid + unité;
            document.getElementById("prix_kilo_c").innerText ="Prix au kilo = " +((state.chamallows.prix*1000)/state.chamallows.poids).toFixed(2) + " €";
        }
        function updateCommande(){
            refreshChamallows()
            refreshDragibus()
            commande.innerHTML = "";

            /*if(q1 === 0 && q2 === 0){
                commande.innerHTML = "Aucun Article Sélectionné";
                prix_total.innerHTML = "";
                return;
            }*/
            /*if(q1>0){
                let li = document.createElement("li");
                li.textContent = "Chamallows x " + q1 + " = " + (q1 * prix_Chamallows).toFixed(2) + " €";
                commande.appendChild(li);
                somme += q1 * prix_Chamallows;
            }*/
            /*if(q2>0){
    let li = document.createElement("li");
    li.textContent = "Dragibus x " + q2 + " = " + (q2 * prix_Dragibus).toFixed(2) + " €";
    commande.appendChild(li);
    somme += q2 * prix_Dragibus;
}*/
            if(state.chamallows.qty <= 0 && state.dragibus.qty <= 0){
                commande.innerHTML = "Aucun Article Sélectionné";
                prix_total.innerHTML = "";
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
                    li_nbr.textContent = state.chamallows.qty + " paquets de " + product.name;
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
                poids_tot = poids_tot + (product.poids*product.qty);
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
            poids_total.innerHTML ="Poids total = " + (poids_tot) + unité;
            poids_total.style.textAlign = "center";
        }
    }
}

