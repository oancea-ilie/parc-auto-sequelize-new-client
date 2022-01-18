import Data from "../data.js";
import viewLogin from "./viewLogin.js";

export default class viewHome{

    constructor(){
        this.body = document.querySelector('body');

        this.header();
        this.main();
        this.footer();
        this.mainContainer = document.querySelector('main');
        this.allCards();
        this.cardsContainer = document.querySelector('.cards-container');

        this.conectare = document.querySelector('.conectare');
        this.conectare.addEventListener('click',this.handleConnect);


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
            });

            let perioada = document.querySelectorAll('.perioada-inchiriere');
            perioada.forEach(e=>e.addEventListener('click',this.handlePerioada));

            let inchiriereBtns = document.querySelectorAll('.inchiriere-btn');
            inchiriereBtns.forEach(e=>e.addEventListener('click',this.handleInchiriere));


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
                    <a href="#" class="conectare" >Conectare</a>
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
                <select class="sort">
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

    insertAllCards= async (obj)=>{

        this.cardsContainer.innerHTML = '';
        let cars = await this.data.getAllCars();

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

    handleInchiriere = ()=>{
        let nou = new viewLogin();
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

    handleConnect=()=>{
        let nou = new viewLogin();
    }

}