import Data from "../data.js";
import viewLogin from "./viewLogin.js";

export default  class viewRegister{
    constructor(){
        this.body = document.querySelector('body');

        this.setHeader();
        this.setMain();

        this.loginBtn = document.querySelector('.login-btn')
        this.loginBtn.addEventListener('click',this.handleLoginBtn);

        this.registerBtn = document.querySelector('.sign-btn');
        this.registerBtn.addEventListener('click',this.handleRegisterBtn);

        this.name = document.querySelector(".name");
        this.password = document.querySelector(".password");
        this.email = document.querySelector(".email");
        this.phone = document.querySelector(".phone");

        this.eror = document.querySelector('.login-eror');

        this.data = new Data();
    }

    
    setHeader=()=>{
        this.body.innerHTML  ='';
        this.body.innerHTML +=
        `
        <section class="login-header">
            <h1>Register</h1>
        </section>

        `;
    }

    setMain=()=>{
        this.body.innerHTML +=
        `
        <section class="login-container">
            
            <p class="login-eror"></p>
            <p>Name:</p>
            <input type="text" class="name">
            <p>Password:</p>
            <input type="password" class="password">
            <p>Email:</p>
            <input type="text" class="email">
            <p>Phone:</p>
            <input type="number" class="phone">

            <section class="login-btns">
                <a href="#" class="sign-btn">Sign In</a>
                <a href="#" class="login-btn">Login In</a>
            </section>
        </section>
        `;
    }
    
    handleRegisterBtn=()=>{

        if(this.name.value =='' || this.password.value ==''  || this.email.value =='' || this.phone.value ==''){
            this.eror.textContent = 'You must fill all the inputs!';
        }else{
            let obj = {
                name: this.name.value,
                password: this.password.value,
                email: this.email.value,
                phone: parseInt(this.phone.value)
            }

            if(typeof phone == 'number'){
                this.data.createCustomer(obj);
            }

            this.eror.innerHTML = `Registration complete!<br>You can Login In now!`;
            this.eror.style.color = 'rgb(18, 236, 18)';

            setTimeout(()=>{
                let nou = new viewLogin();
            },3000);

        }

    }
    
    handleLoginBtn=()=>{
        let nou = new viewLogin();
    }

    
}