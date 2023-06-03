import { Request, Response } from "express";
import Aluno from "../../models/aluno/Aluno";
import { IAlunoModel } from "../../models/aluno/interfaceIAlunoModel";

export default {
  async registrarAluno(req: Request, res: Response) {
    try {
      const { nome, dataDeNascimento } = req.body;

      const procurarAlunoExistente = await Aluno.findOne({ nome, dataDeNascimento })
      if (procurarAlunoExistente) {
        return res.status(400).send({ message: "Aluno já cadastrado" });
      }

      const newAluno = new Aluno({
        nome,
        dataDeNascimento
      });

      newAluno.save((error: any) => {
        if (error) {
          return res.status(400).send({ message: "Preencha os campos corretamente", error });
        } else {
          return res.status(200).send({ message: "Registrado(a) com sucesso!" });
        }
      });

    } catch (error) {
      res.status(500).send({ message: "Internal Server Error", error })
    }
  },

  async buscarTodosAlunos(req: Request, res: Response) {
    try {
      const buscarTodosAlunos = await Aluno.find();

      if (buscarTodosAlunos) {
        return res.status(200).send(buscarTodosAlunos);
      } else {
        return res.status(404).send({ alunos: 'Nenhum aluno encontrado!' });
      }
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error", error })
    }
  },

  async buscarAluno(req: Request, res: Response) {
    try {
      const { _id } = req.params;
      const buscarAluno = await Aluno.findById({ _id });

      if (buscarAluno) {
        return res.status(200).send(buscarAluno);
      } else {
        return res.status(404).send({ alunos: 'Aluno não encontrado!' });
      }
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error", error })
    }
  },

  async atualizarDadosAlunos(req: Request, res: Response) {
    try {
      const { _id } = req.params;
      const { nome, dataDeNascimento } = req.body;

      !nome && !dataDeNascimento && res.status(400).send({ message: "Preencha os dados corretamente" });

      await Aluno.findByIdAndUpdate({ _id }, {
        $set: { nome: nome, dataDeNascimento: dataDeNascimento }
      })
        .then(() => {
          return res.status(200).send({ message: 'Dados atualizados' });
        }).catch((error) => {
          return res.status(400).send({ message: "Falha ao atualizar dados", error });
        })

    } catch (error) {
      res.status(500).send({ message: "Internal Server Error", error });
    }
  },

  async deletarAluno(req: Request, res: Response) {
    try {
      const { _id } = req.params;

      await Aluno.findByIdAndDelete(_id)
        .then(() => {
          return res.status(200).send({ message: "Aluno deletado!" })
        })
        .catch((error) => {
          return res.status(400).send({ message: "Falha ao deletar o aluno!" })
        });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error", error })
    }
  }
}