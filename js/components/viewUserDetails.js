import viewHome from "./viewHome.js";
import Data from "../data.js";
import viewUserInterface from "./viewUserInterface.js";

export default  class viewUserDetails{
    constructor(id){
        this.customerId = id;
        this.body = document.querySelector('body');
        this.header();
        this.main();
        this.mainContainer = document.querySelector('main');
        this.brand = document.querySelector('.brand');
        this.brand.addEventListener("click",this.handleBrand);

        this.userBtn = document.querySelector('.user-link');
        this.logOutBtn = document.querySelector('.logout-link');

        this.logOutBtn.addEventListener('click',this.handleLogOutBtn);

        this.data = new Data();
        this.asyncHandler();

    }


    asyncHandler =async()=>{
        try{
            await this.getCustomerDetails();

            let changePassBtn = document.querySelector('.change-password');
            let passInput = document.querySelector('.pass-input');
            let passBtn = document.querySelector('.pass-btn');
            let info = document.querySelector('.info');

            changePassBtn.addEventListener('click',()=>{
                passInput.style.display = 'block';
                passBtn.style.display = 'block';
            });


            passBtn.addEventListener('click', async()=>{
                
                let password = {
                    password: passInput.value
                };

              let res = await this.data.updatePassword(password, this.customerId);
              
              if(res != null){
                info.textContent = 'Parola a fost schimbata!';
                
                setTimeout(()=>{
                    let nou = new viewHome();
                },3000);

              }else{
                info.textContent = 'Eroare server schimbarea parolei!';
              }
                
            });

        }catch(e){
            console.log(e);
        }
    }

    getCustomerDetails=async()=>{
        let comenzi = await this.data.getRentailsByCustomerId(this.customerId);
        if(comenzi){
            this.getCustomerData(comenzi);
            this.getCustomerOrders(comenzi);
        }

    }

    getCustomerData=(comenzi)=>{
        this.mainContainer.innerHTML = '';

        this.mainContainer.innerHTML =
        `
        <section class="user-details">
        <h1>Bine ai venit ${comenzi[0].fk_persoana_id.name} !</h1>

        <section class ="user-container">
            <section class="date-personale">
            <h2>Date personale:</h2>
            <section class="date-personale-container">
                <h3>Nume: <span> ${comenzi[0].fk_persoana_id.name}</span> </h3>
                <h3>Parola: <a href="#" class="change-password"> schimba parola</a></h4>
                <h3>Email:<span> ${comenzi[0].fk_persoana_id.email}</span> </h3>
                <h3>Telefon: <span> ${comenzi[0].fk_persoana_id.phone}</span></h3>
                <input type="password" class="pass-input">
                <button class="pass-btn">Schimba parola</button>
                <h4 class="info"></h4>
            </section>
        </section>

        <section class="istoric-comenzi">
            <h2>Istoric Comenzi:</h2>
            <section class="istoric-comenzi-container">

            </section>
        </section>
        </section>
    </section>
        `
    }

    getCustomerOrders=async(comenzi)=>{
        let container = document.querySelector('.istoric-comenzi-container');
        container.innerHTML = '';

        for(let i = 0; i<comenzi.length;i++){
            container.innerHTML +=
            `
                <section class="istoric-comenzi-container-card">
                        <p>${i+1}</p>
                        <p>${comenzi[i].fk_masina_id.marca}</p>
                        <p>${comenzi[i].perioada} luni</p>
                </section>
            `
        }

    }



    header=()=>{
        this.body.innerHTML = '';
        this.body.innerHTML += 
        `
        <header>
            <section class="header-container">
                <a href="#" class="brand"><h2>Parc Auto</h2></a>

                <nav>
                    <a href="#" class="user-link"><i class="fas fa-user"></i></i></a>
                    <a href="#" class="logout-link"><i class="fas fa-sign-out-alt"></i></a>
                </nav>
            </section>
        </header>
        `
    }

    main=()=>{
        this.body.innerHTML +=
        `
        <main>
        </main>
        `;
    }

    handleLogOutBtn=()=>{
        let nou = new viewHome();
    }

    handleBrand=()=>{
        let nou = new viewUserInterface(this.customerId);
    }

}