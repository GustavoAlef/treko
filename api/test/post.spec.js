import chai from "chai";
import chaiHttp from "chai-http";

//importação do schema do banco
import tasksModel from "../models/task";

chai.use(chaiHttp);

const app = require("../app");
const request = chai.request.agent(app);
const expect = chai.expect;

describe('post', () => {
  context('quando eu cadastro uma tarefa', () => {
    
    let task = {title: "Estudar mongoose", owner:"email@email.com", done: false}
       
    
    it('entao deve retornar 200', (done) => {
      request
        .post('/task')
        .send(task)
        .end((err, res) => {
          expect(res).to.has.status(200);
          expect(res.body.data.title).to.be.an('string');
          done();
        })
    })
  })

  context('quando nao informo o titulo', () => {
    let task = {title: "", owner:"email@email.com", done: false}

    it('entao deve retornar 400', (done) => {
      request
        .post('/task')
        .send(task)
        .end((err, res) => {
          expect(res).to.has.status(400);
          expect(res.body.errors.title.message).to.eql('oops! Title is required.')
          done();
        })
    })
  })
})