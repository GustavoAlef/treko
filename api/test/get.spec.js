import chai from "chai";
import chaiHttp from "chai-http";

//importação do schema do banco
import tasksModel from "../models/task";

chai.use(chaiHttp);

const app = require("../app");
const request = chai.request.agent(app);
const expect = chai.expect;

describe("get", () => {
  context("quando eu tenho tarefas cadastradas", () => {
    before((done) => {
      let tasks = [
        { title: "Estudar nodeJS", owner: "email@email.com", done: true },
        { title: "Tirar o lixo", owner: "email@email.com", done: false },
        { title: "Estudar testes de sw", owner: "email@email.com", done: false,
        },
      ];

      tasksModel.insertMany(tasks);
      done();
    });

    it("deve retornar uma lista", (done) => {
      request
        .get("/task")
        .end((err, res) => {
        expect(res).to.has.status(200);
        // console.log(typeof res.body.data);
        expect(res.body.data).to.be.an("array");
        done();
      });
    });

    it("deve filtrar por palavra chave", (done) => {
      request
        .get("/task")
        .query({ title: "estudar" })
        .end((err, res) => {
          expect(res).to.has.status(200);
          expect(res.body.data[0].title).to.equal("Estudar nodeJS");
          expect(res.body.data[1].title).to.equal("Estudar testes de sw");
          done();
        });
    });
  });

  context("quando busco por id", () => {
    it("deve retornar uma unica tarefa", (done) => {
      let tasks = [
        { title: "Ler um livro de JS", owner: "email@email.com", done: true },
      ];

      tasksModel.insertMany(tasks, (err, result) => {
        let id = result[0]._id
        request
          .get(`/task/${id}`)
          .end((err, res) => {
            expect(res).to.has.status(200);
            expect(res.body.data.title).to.equal(tasks[0].title);
            done();

          })
      });
    });
  });

  context("quando a tarefa nao existe", () => {
    it("deve retornar 404", (done) => {
      let id = require('mongoose').Types.ObjectId();

        request
          .get(`/task/${id}`)
          .end((err, res) => {
            expect(res).to.has.status(404);
            //equal valida tipo, eql valida conteudo
            expect(res.body).to.eql({});
            done();
          })
      });
    });
  });
