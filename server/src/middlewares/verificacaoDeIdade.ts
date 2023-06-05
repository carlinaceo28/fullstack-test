import { NextFunction, Request, Response } from "express";

function isOver18(req: Request, res: Response, next: NextFunction) {
  const { dataDeNascimento } = req.body
  if (!dataDeNascimento) {
    res.status(400).send({ message: 'Data de nascimento inválida!' });
    return;
  }

  const [day, month, year] = dataDeNascimento.split('/').map(Number);
  const birthDate = new Date(year, month - 1, day);
  const currentDate = new Date();
  const ageDiffMs = currentDate.getTime() - birthDate.getTime();
  const ageDate = new Date(ageDiffMs);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);
  if (age >= 18) {
    next();
  } if (age > 116) {
    return res.status(403).send({ message: 'Data de nascimento inválida!' });
  } else {
    return res.status(403).send({ message: 'O aluno precisa ser maior de 18 anos!' });
  }
}

export default isOver18;