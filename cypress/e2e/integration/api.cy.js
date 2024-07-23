///<reference types ="cypress" />

import '../../support/commands'
import dayjs from "dayjs"

describe ('teste', () => {
    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NDc3ODR9.f1XjeNsd6WM8KykHJakygYUlam5fTnLb0hZ-G03mE4o";

    before (() => {
        cy.request({
            //Para retirar esse método de login pode ser escrito dessa forma
            //cy.getToken('nathane@teste.com', 'teste').then(token => cy.request({ E aqui adicionar
            // os metodos de delete, post, create e seus códigos de verificação})
            
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/signin',
            body: {
                email: "nathane@teste.com",
                redirecionar: false,
                senha: "teste" 
                }//esse para verificar se o retorno do bady não está vazio
            }).its('body.token').should('not.be.empty')

    })

    it('Criar conta', () =>{
        cy.request({               
            url: 'https://barrigarest.wcaquino.me/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}`},
        body: {
                nome: "Conta de teste12556" 
            }
        }).as('response').then (res =>{
            expect (res.status).to.be.equal(201)
            expect (res.body).to.have.property('id')
            expect (res.body).to.have.property('nome', 'Conta de teste12556')

        }) 
    })

    it('remover conta', () => {       
        cy.request({
            method: 'DELETE',
            url: 'https://barrigarest.wcaquino.me/contas/2064831',
            headers: {Authorization: `JWT ${token}`}
        }).as('response').then (res =>{
            expect (res.status).to.be.equal(204)
            }) 
    })  

    it('Alterar conta', () => {       
        cy.request({
            method: 'PUT',
            url: 'https://barrigarest.wcaquino.me/contas/2064827',
            headers: {Authorization: `JWT ${token}`},
            body: {
                nome: 'Conta alterada por API',
            }
        }).as('response').then (res =>{
            expect (res.status).to.be.equal(200)
            expect (res.body).to.have.property('nome', 'Conta alterada por API')
        })
    })     

    it.only('Não deve criar conta com o mesmo nome', () => {       
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/contas',
            headers: {Authorization: `JWT ${token}`},
            body: {
                nome: 'Conta alterada por API',
            },
            failOnStatusCode: false
        }).as('response').then (res =>{
            console.log(res)
            expect (res.body).to.have.property('error', 'Já existe uma conta com esse nome!')
            
         })      
    }) 
    
        
}) 
   
