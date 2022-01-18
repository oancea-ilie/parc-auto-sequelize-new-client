import Data from "../data.js";
import viewRegister from "./viewRegister.js";
import viewUserInterface from "./viewUserInterface.js";


export default  class viewLogin{
    constructor(){
        this.body = document.querySelector('body');
    

        this.setHeader();
        this.setMain();

        this.loginBtn = document.querySelector('.login-btn')
        this.loginBtn.addEventListener('click',this.handleLoginBtn);

        this.registerBtn = document.querySelector('.sign-btn');
        this.registerBtn.addEventListener('click',this.handleRegisterBtn);

        this.email = document.querySelector('.email-input');
        this.pass = document.querySelector('.pass-input');
        this.err = document.querySelector('.login-eror');

        this.data = new Data();
    }

    setHeader=()=>{
        this.body.innerHTML  ='';
        this.body.innerHTML +=
        `
        <section class="login-header">
            <h1>Login</h1>
        </section>

        `;
    }

    setMain=()=>{
        this.body.innerHTML +=
        `
        <section class="login-container">
            <p class="login-eror"></p>
            <p>Email:</p>
            <input type="text" class="email-input">
            <p>Password:</p>
            <input type="password" class="pass-input">

            <section class="login-btns">
                <a href="#" class="login-btn">Login In</a>
                <a href="#" class="sign-btn">Sign In</a>
            </section>
        </section>

        `;
    }

    handleLoginBtn= async ()=>{

        let customers = await this.data.getAllCustomers();

        if(customers){
            for(let obj of customers){
                if(obj.email == this.email.value && obj.password == this.pass.value){
                    let nou = new viewUserInterface(obj.id);
                }
                if(obj.email == this.email.value && obj.password != this.pass.value){
                    this.err.textContent = 'Wrong Password!';
                }
                if(obj.email != this.email.value && obj.password == this.pass.value){
                    this.err.textContent = 'Wrong Email!';
                }
            }
        }
    }

    handleRegisterBtn=()=>{
        let nou = new viewRegister();
    }
}