import viewHome from "./viewHome.js";
import Data from "../data.js";
import viewUserDetails from "./viewUserDetails.js";

export default  class viewUserInterface{
    constructor(id){
        this.customerId = id;
        this.body = document.querySelector('body');
        this.header();
        this.main();
        this.footer();
        this.mainContainer = document.querySelector('main');

        this.userBtn = document.querySelector('.user-link');
        this.logOutBtn = document.querySelector('.logout-link');

        this.userBtn.addEventListener('click',this.handleUserBtn);
        this.logOutBtn.addEventListener('click',this.handleLogOutBtn);

        this.allCards();
        this.cardsContainer = document.querySelector('.cards-container');

        this.data = new Data();
        this.asyncHandler();

        this.table = document.querySelector('.tbody');
        this.select = document.querySelector('.sort');
    }


    asyncHandler =async()=>{
        try{
            await this.insertTableData();
            
            this.cardsContainer.innerHTML = '';
            let cars = await this.data.getCarsSort('an');
            if(cars){
                for( let e of cars){
                    this.createCard(e,0);
                }
            }

            this.select.addEventListener('change',async(e)=>{
                await this.handleSort(e);
                
                let inchiriereBtns = document.querySelectorAll('.inchiriere-btn');
                inchiriereBtns.forEach(e=>e.addEventListener('click', async(e)=>{
                    await this.handleInchiriere(e);
                }));
            });

            let perioada = document.querySelectorAll('.perioada-inchiriere');
            perioada.forEach(e=>e.addEventListener('click',this.handlePerioada));

            let inchiriereBtns = document.querySelectorAll('.inchiriere-btn');
            inchiriereBtns.forEach(e=>e.addEventListener('click', async(e)=>{
                await this.handleInchiriere(e);
            }));

        }catch(e){
            console.log(e);
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
                    <a href="#" class="user-link"><i class="far fa-user"></i></a>
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
            <section class="inchirieri">
                <h1>Ultimele 5 inchirieri</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Nr:</th>
                            <th>Client</th>
                            <th>Marca</th>
                            <th>Pret</th>
                            <th>Perioada</th>
                        </tr>
                    </thead>
                    <tbody class ="tbody">
                    </tbody>
                </table>
            </section>
        </main>
        `;
    }

    footer=()=>{
        this.body.innerHTML +=
        `
        <footer>
            <p>Made by <a href="#">Oancea Ilie</a></p>
        </footer>
        `;
    }

    allCards=()=>{
        this.mainContainer.innerHTML +=
        `
        <section class="all-cards">
            <section class="title">
                <h1>Portofoliu Masini</h1>
                <select  class="sort">
                    <option>An</option>
                    <option>Populare</option>
                    <option>Pret</option>
                    <option>Marca</option>
                </select>
            </section>

            <section class="cards-container">

            </section>
        </section>
        `;
        
    }

    insertAllCards= async ()=>{

        let cars = await this.data.getAllCars();
        
        this.cardsContainer.innerHTML = '';
        if(cars){
            for( let e of cars){

                this.createCard(e);
            }
        }
        
    }

    insertTableData = async()=>{
        
        let obj = await this.data.getAllAssociation();
        let nr= 1;

        if(obj){
            for(let e of obj){
                if(nr<=5){
                    this.createTableTr(e,nr);
                    nr++;
                }
            }
        }

    }
    
    createTableTr=(obj, nr)=>{
        this.table.innerHTML +=
        `
        <tr>
            <td>${nr}</td>
            <td>${obj.fk_persoana_id.name}</td>
            <td>${obj.fk_masina_id.marca}</td>
            <td>${obj.total}$</td>
            <td>${obj.perioada} luni</td>
        </tr>
        `
    } 

    createCard=(obj,ok)=>{
        let id = obj.id;
        if(ok == 1){
            id = obj.masina_id;
        }
        this.cardsContainer.innerHTML +=
        `
        <section class="card" id = "${id}">
            <img src="${obj.img}">
            <section class="marca">
                <img src="img/volan.png"> 
                <span>${obj.marca}</span>
            </section>
            <section class="model">
                <img src="img/key.png">
                <span>${obj.model}</span>
            </section>
            <section class="an">
                <img src="img/an.png">
                <span>${obj.an}</span>
            </section>
            <section class="pret">
                <img src="img/pret.png">
                <span>${obj.pret}</span>
            </section>
            <select class="perioada-inchiriere">
                <option>1 luna</option>
                <option>3 luni</option>
                <option>6 luni</option>
            </select>
            <p>Total: <span class="pret-inchiriere">${obj.pret} $</span></p>
            <p class="car-info"></p>
            <section class="card-btns">
                <a href="#" class="inchiriere-btn">Inchiriere</a>
            </section>
        </section>
        `
    }

    handleInchiriere = async(e)=>{
        e.preventDefault();

        let curr = e.target;

        let luna = curr.parentNode.parentNode.children[5].value;
        luna = parseInt(luna[0]);

        let price =  curr.parentNode.parentNode.children[6].children[0];
        price = price.textContent;
        price= price.split(' ');
        price = parseInt(price);

        let carId = curr.parentNode.parentNode.getAttribute('id');
        carId = parseInt(carId);

        let obj = {
            perioada: luna,
            total: price,
            persoana_id: this.customerId,
            masina_id: carId
        }

        let info = curr.parentNode.parentNode.children[7];

        let res = await this.data.createInchiriere(obj);
        if(res !=null){
            info.style.display = 'block';
            info.textContent = 'Multumim pentru inchiriere!';
            
            setTimeout(()=>{
                let nou = new viewUserInterface(this.customerId);
            },3000);
        }else{
            info.style.display = 'block';
            info.textContent = 'EROARE DE SERVER!';
        }


    }

    handlePerioada = (e)=>{
        let totalPrice =  e.target.parentNode.children[6].children[0];
        let luni = e.target;
        luni = parseInt(luni.value[0]);

        let pret = e.target.parentNode.children[4].children[1].textContent;
        pret = parseInt(pret);

        let total = luni * pret;
        totalPrice.textContent = `${total} $`;

    }

    handleSort=async(e)=>{
        let sort = e.target.value;
        sort = sort.toLowerCase();

        if(sort == "pret" || sort=="an" || sort=="marca" || sort =='populare'){
            this.cardsContainer.innerHTML = '';
            let cars = await this.data.getCarsSort(sort);

            if(cars){
                for( let e of cars){
                    if(sort =='populare'){
                        this.createCard(e,1);
                    }else{
                        this.createCard(e,0);
                    }
                }
            }
        }
    }


    handleUserBtn=()=>{
        let nou = new viewUserDetails(this.customerId);
    }

    handleLogOutBtn=()=>{
        let nou = new viewHome();
    }

}