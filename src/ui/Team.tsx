import {} from 'react';
import Typography from './Typography';

function Team() {
  return (
    <div className="flex justify-center">
      {/* <img
        className="w-1/3 rounded-es-full rounded-se-full"
        src={DevF}
        alt="Jovem de terno preto, olhos castanhos, cavanhaque e cabelos ondulados pretos, sorrindo, o jovem mostra-se bem elegante. "
      />*/}
      <div>
        <Typography as="p" variant="sans" size="xl" className="text-bg">
          Somos um grupo de estudantes da ETEC comprometidos em promover o acesso ao conhecimento na
          área da tecnologia. Nosso projeto tem como objetivo orientar e capacitar pessoas para que
          possam compreender melhor o funcionamento de seus dispositivos e, assim, solucionar
          problemas técnicos de forma autônoma e segura. A iniciativa surgiu da percepção de que
          muitas pessoas enfrentam dificuldades ao buscar assistência técnica e, em alguns casos,
          acabam sendo vítimas de serviços fraudulentos. Diante disso, desenvolvemos uma plataforma
          educativa voltada para o aprendizado prático, incentivando o uso consciente da tecnologia
          e a independência digital. O site foi desenvolvido com o uso das tecnologias React e
          TypeScript, priorizando desempenho, acessibilidade e uma interface moderna e intuitiva.
          Nosso propósito é contribuir para a formação de usuários mais informados, críticos e
          preparados para lidar com os desafios tecnológicos do dia a dia.
        </Typography>
      </div>
    </div>
  );
}

export default Team;
