import Header from "@/components/molecules/header"
import Footer from "@/components/molecules/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPath="/termos-de-uso" />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Termos de Uso</h1>

          <div className="prose prose-orange max-w-none">
            <p className="lead text-lg mb-8">
              Estes Termos de Uso ("Termos") regem o uso do serviço forge webstudio ("Serviço") operado por forge
              webstudio ("nós", "nosso" ou "nos"). Ao acessar ou usar o Serviço, você concorda em ficar vinculado a
              estes Termos. Se você não concordar com qualquer parte destes Termos, não poderá acessar o Serviço.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Contas</h2>
            <p>
              Quando você cria uma conta conosco, você deve fornecer informações precisas, completas e atualizadas em
              todos os momentos. O não cumprimento disso constitui uma violação dos Termos, o que pode resultar no
              encerramento imediato de sua conta em nosso Serviço.
            </p>
            <p>
              Você é responsável por proteger a senha que você usa para acessar o Serviço e por quaisquer atividades ou
              ações sob sua senha, seja com nosso Serviço ou um serviço de terceiros.
            </p>
            <p>
              Você concorda em não divulgar sua senha a terceiros. Você deve nos notificar imediatamente após tomar
              conhecimento de qualquer violação de segurança ou uso não autorizado de sua conta.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Conteúdo</h2>
            <p>
              Nosso Serviço permite que você poste, vincule, armazene, compartilhe e disponibilize determinadas
              informações, textos, gráficos, vídeos ou outros materiais ("Conteúdo"). Você é responsável pelo Conteúdo
              que postar em ou através do Serviço, incluindo sua legalidade, confiabilidade e adequação.
            </p>
            <p>
              Ao postar Conteúdo em ou através do Serviço, você declara e garante que: (i) o Conteúdo é seu (você é o
              proprietário) e/ou você tem o direito de usá-lo e conceder a nós os direitos e licença conforme previsto
              nestes Termos, e (ii) que a postagem de seu Conteúdo em ou através do Serviço não viola os direitos de
              privacidade, direitos de publicidade, direitos autorais, direitos contratuais ou quaisquer outros direitos
              de qualquer pessoa.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Uso Aceitável</h2>
            <p>Você concorda em não usar o Serviço para:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Violar quaisquer leis, regulamentos ou direitos de terceiros</li>
              <li>Publicar conteúdo ilegal, abusivo, difamatório, obsceno ou fraudulento</li>
              <li>Enviar spam ou mensagens não solicitadas</li>
              <li>Interferir ou interromper a integridade ou o desempenho do Serviço</li>
              <li>Tentar enganar ou explorar outros usuários</li>
              <li>Coletar ou rastrear informações pessoais de outros usuários</li>
              <li>Acessar o Serviço por meios automatizados sem nossa permissão</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Propriedade Intelectual</h2>
            <p>
              O Serviço e seu conteúdo original, recursos e funcionalidades são e permanecerão propriedade exclusiva do
              forge webstudio e seus licenciadores. O Serviço é protegido por direitos autorais, marcas registradas e
              outras leis de propriedade intelectual.
            </p>
            <p>
              Nossos logotipos e nomes comerciais são marcas registradas de nossa empresa. Você não deve usá-los sem
              nossa aprovação prévia por escrito.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Rescisão</h2>
            <p>
              Podemos encerrar ou suspender sua conta imediatamente, sem aviso prévio ou responsabilidade, por qualquer
              motivo, incluindo, sem limitação, se você violar os Termos.
            </p>
            <p>
              Após a rescisão, seu direito de usar o Serviço cessará imediatamente. Se você deseja encerrar sua conta,
              você pode simplesmente descontinuar o uso do Serviço.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Limitação de Responsabilidade</h2>
            <p>
              Em nenhum caso o forge webstudio, nem seus diretores, funcionários, parceiros, agentes, fornecedores ou
              afiliados, serão responsáveis por quaisquer danos indiretos, incidentais, especiais, consequenciais ou
              punitivos, incluindo, sem limitação, perda de lucros, dados, uso, boa vontade, ou outras perdas
              intangíveis, resultantes de (i) seu acesso ou uso ou incapacidade de acessar ou usar o Serviço; (ii)
              qualquer conduta ou conteúdo de terceiros no Serviço; (iii) qualquer conteúdo obtido do Serviço; e (iv)
              acesso não autorizado, uso ou alteração de suas transmissões ou conteúdo.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Alterações</h2>
            <p>
              Reservamo-nos o direito, a nosso exclusivo critério, de modificar ou substituir estes Termos a qualquer
              momento. Se uma revisão for material, tentaremos fornecer um aviso de pelo menos 30 dias antes que
              quaisquer novos termos entrem em vigor. O que constitui uma alteração material será determinado a nosso
              exclusivo critério.
            </p>
            <p>
              Ao continuar a acessar ou usar nosso Serviço após essas revisões se tornarem efetivas, você concorda em
              ficar vinculado aos termos revisados. Se você não concordar com os novos termos, por favor, pare de usar o
              Serviço.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">8. Contato</h2>
            <p>
              Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco pelo e-mail:
              contato@forgewebstudio.com.br
            </p>

            <p className="mt-8 text-sm text-gray-500">Última atualização: 5 de abril de 2025</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
