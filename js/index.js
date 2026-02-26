console.log("test js")

document.onreadystatechange = function () {
    console.log(document.readyState)
    if(document.readyState == 'interactive') {
        console.log("c'est ok")

        let prix_c = 2.28;
        let prix_d = 1.64;
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

        document.getElementById("prix_c").innerText = "Prix à l'unité " + state.chamallows.prix + " €";
        document.getElementById("poids_c").innerText = "Poids " + state.chamallows.poids + "g";
        document.getElementById("name_1").innerText = state.chamallows.name;
        document.getElementById("prix_d").innerText = "Prix à l'unité " + state.dragibus.prix + " €";
        document.getElementById("poids_d").innerText = "Poids " + state.dragibus.poids + "g";
        document.getElementById("name_2").innerText = state.dragibus.name;
        refreshDragibus()
        refreshChamallows()

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
        input_1.onchange = function () {
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
        }

        function refreshDragibus(){
            document.getElementById("nbr_d").innerText = state.dragibus.qty + " paquets de Dragibus"
            document.getElementById("prix_tot_d").innerText ="Prix total = " + (state.dragibus.prix * state.dragibus.qty).toFixed(2) + " €";
            document.getElementById("poids_tot_d").innerText ="Poids total = " + state.dragibus.poids*state.dragibus.qty + "g";
            document.getElementById("prix_kilo_d").innerText ="Prix au kilo = " +((state.dragibus.poids*state.dragibus.qty)/(state.dragibus.prix * state.dragibus.qty)).toFixed(2) + " €";
        }
        function refreshChamallows(){
            document.getElementById("nbr_c").innerText = state.chamallows.qty + " paquets de Chamallows"
            document.getElementById("prix_tot_c").innerText ="Prix total = " + (state.chamallows.prix * state.chamallows.qty).toFixed(2) + " €";
            document.getElementById("poids_tot_c").innerText ="Poids total = " + state.chamallows.poids*state.chamallows.qty + "g";
            document.getElementById("prix_kilo_c").innerText ="Prix au kilo = " +((state.chamallows.poids*state.chamallows.qty)/(state.chamallows.prix * state.chamallows.qty)).toFixed(2) + " €";
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
            if(state.chamallows.qty <= 0 && state.dragibus.qty <= 0){
                commande.innerHTML = "Aucun Article Sélectionné";
                prix_total.innerHTML = "";
                return;
            }

            let somme = 0;
            /*if(q1>0){
                let li = document.createElement("li");
                li.textContent = "Chamallows x " + q1 + " = " + (q1 * prix_c).toFixed(2) + " €";
                commande.appendChild(li);
                somme += q1 * prix_c;
            }*/
            if(state.chamallows.qty>0){
                let li_name = document.createElement("li");
                li_name.textContent = state.chamallows.name;
                li_name.style.marginBottom = "10px";
                li_name.style.fontSize = "20px";
                commande.appendChild(li_name);
                let li_nbr = document.createElement("li");
                li_nbr.textContent = document.getElementById("nbr_c").innerText
                li_nbr.style.marginBottom = "10px";
                commande.appendChild(li_nbr);
                let li_prix = document.createElement("li");
                li_prix.textContent = document.getElementById("prix_tot_c").innerText
                li_prix.style.marginBottom = "10px";
                commande.appendChild(li_prix);
                let li_poids = document.createElement("li");
                li_poids.textContent = document.getElementById("poids_tot_c").innerText
                li_poids.style.marginBottom = "20px";
                commande.appendChild(li_poids);
                somme += state.chamallows.qty * state.chamallows.prix;
                commande.style.textAlign = "center";

            }

            /*if(q2>0){
                let li = document.createElement("li");
                li.textContent = "Dragibus x " + q2 + " = " + (q2 * prix_d).toFixed(2) + " €";
                commande.appendChild(li);
                somme += q2 * prix_d;
            }*/
            if(state.dragibus.qty>0){
                let li_name = document.createElement("li");
                li_name.textContent = state.dragibus.name;
                li_name.style.marginBottom = "10px";
                li_name.style.fontSize = "20px";
                commande.appendChild(li_name);
                let li_nbr = document.createElement("li");
                li_nbr.textContent = document.getElementById("nbr_d").innerText
                li_nbr.style.marginBottom = "10px";
                commande.appendChild(li_nbr);
                let li_prix = document.createElement("li");
                li_prix.textContent = document.getElementById("prix_tot_d").innerText
                li_prix.style.marginBottom = "10px";
                commande.appendChild(li_prix);
                let li_poids = document.createElement("li");
                li_poids.textContent = document.getElementById("poids_tot_d").innerText
                li_poids.style.marginBottom = "20px";
                commande.appendChild(li_poids);
                commande.style.textAlign = "center";
                somme += state.dragibus.qty * state.dragibus.prix;
            }
            commande.style.marginBottom = "20px";
            commande.append("Récapitulatif de la commande")
            prix_total.innerHTML ="Prix total = " + somme.toFixed(2) + " €";
            prix_total.style.textAlign = "center";
            poids_total.innerHTML ="Poids total = " + (state.chamallows.poids*state.chamallows.qty+state.dragibus.poids*state.dragibus.qty) + "g";
            poids_total.style.textAlign = "center";
        }
    }
}

