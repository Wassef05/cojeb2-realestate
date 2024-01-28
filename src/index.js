import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import $ from 'jquery'

// Définition d'un objet contenant les villes et leurs quartiers






$(document).ready(() => {
    $(window).scroll(() => {
        if($(window).scrollTop() !== 0 ) {
            $('nav').removeClass("bg-transparent").addClass('bg-light')
            $('nav').addClass('shadow')
        }
        else{
          $('nav').removeClass('bg-light').addClass('bg-transparent');
          $('nav').removeClass('shadow')

        }

    })
})
$(document).ready(function(){
$('.mySlide').slick({
    
});     
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
