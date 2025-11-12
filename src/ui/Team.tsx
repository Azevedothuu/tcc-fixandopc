import {} from 'react';
import DevF from '../assets/Arthur-person.png';
import Typography from './Typography';

function Team() {
  return (
    <div className="flex justify-between">
      <img
        className="w-1/3 rounded-es-full rounded-se-full"
        src={DevF}
        alt="Jovem de terno preto, olhos castanhos, cavanhaque e cabelos ondulados pretos, sorrindo, o jovem mostra-se bem elegante. "
      />
      <div className=''>
        <Typography as="h1" variant="sans" size="4xl" className="text-bg">
          Arthur Azevedo da Conceição
        </Typography>

        <Typography as="p" variant="sans" size="xl" className="text-bg mb-4">
          Desenvolvedor Web
        </Typography>
        <Typography as="p" variant="sans" size="sm" className="text-bg">
          Arthur Azevedo da Conceição é estudante do curso Técnico em Informática na ETEC Aristóteles Ferreira, em Santos – SP. É formado pelo curso federal do Rio Grande do Sul, onde obteve média final de 86,93%. Sempre interessado por tecnologia, busca unir prática e conhecimento para criar soluções úteis e acessíveis.

Durante sua trajetória escolar, participou de projetos voltados à inovação e ao ensino, o que o inspirou a desenvolver um Trabalho de Conclusão de Curso com o objetivo de ensinar e facilitar o aprendizado tecnológico. Determinado e curioso, Arthur segue construindo sua caminhada profissional com foco na evolução constante e no compartilhamento de conhecimento.
        </Typography>
      </div>
    </div>
  );
}

export default Team;
