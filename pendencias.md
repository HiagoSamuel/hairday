# 📋 Pendências — HairDay App

Análise completa do projeto com base nos requisitos do desafio Rocketseat.

---

## 🔴 Crítico — Funcionalidades quebradas ou ausentes

### 1. `PeriodSection.tsx` está completamente vazio
O arquivo existe mas não tem nenhum conteúdo. Precisa ser implementado como componente reutilizável para exibir cada período (Manhã, Tarde, Noite) com cabeçalho, lista de agendamentos e estado vazio.

### 2. `Sidebar.tsx` está completamente vazio
O arquivo existe mas não tem nenhum conteúdo. O layout deve ter uma Sidebar como componente separado, contendo o formulário de agendamento (`AppointmentForm`).

### 3. Botão de remover agendamento não existe
O `AppointmentItem` não possui botão de lixeira nem callback `onRemove`. A função de remoção não foi implementada em nenhum componente.

### 4. `removeAppointment` não existe no `App.tsx`
Não há função de remoção no estado do `App`. Precisa ser criada com `filter` e passada como prop até o `AppointmentItem`.

### 5. Períodos com horas erradas no `getPeriod.ts`
Os intervalos não batem com o requisito:
- **Atual (errado):** Manhã 6h–11h, Tarde 12h–17h
- **Correto (requisito):** Manhã 9h–12h, Tarde 13h–18h, Noite 19h–21h

### 6. O formulário usa inputs livres de texto/data/hora em vez de seletores do layout
O Figma mostra um **date picker** com dropdown estilizado e **botões de horário clicáveis** (time slots), não inputs nativos de texto/time. O formulário atual não segue o design proposto.

---

## 🟡 Importante — Requisitos não atendidos

### 7. Layout incorreto — não segue o Figma
O `App.tsx` renderiza tudo em uma `<main>` simples com `flex`. O layout correto é:
- **Esquerda:** Sidebar com logo + formulário de agendamento
- **Direita:** Listagem de agendamentos com cabeçalho de data

### 8. Estado vazio por período não implementado
Quando um período não tem agendamentos, deve exibir a mensagem:
> _"Você ainda não tem agendamentos cadastrados nesse período."_

O `ScheduleList` atual não exibe mensagem alguma para períodos vazios.

### 9. Header não exibe o logo correto
O `Header.tsx` apenas renderiza texto "HairDay" sem o logo com o ícone de tesoura (conforme o Figma). Falta o SVG/asset do logo "HairDay✂️".

### 10. Filtro de agendamentos por data não implementado
A listagem da direita deve mostrar os agendamentos **do dia selecionado**. Atualmente, todos os agendamentos de todas as datas são exibidos juntos sem filtro.

### 11. Seletor de data na listagem ("Sua agenda") não existe
O lado direito deve ter um dropdown/seletor de data para navegar entre dias, como mostra o Figma ("10/01/2024 ▾"). Isso não foi implementado.

### 12. `AppointmentForm` não está dentro da `Sidebar`
O formulário está sendo importado e usado diretamente no `App.tsx`, fora da `Sidebar`. Deve ser movido para dentro do componente `Sidebar`.

---

## 🟠 Estilização — Design system não aplicado

### 13. Nenhuma estilização do design system foi aplicada
Apesar de o `tailwind.config.ts` ter as cores e fontes corretas (`yellowLight`, `gray900`, fonte `Catamaran`), nenhum componente usa essas classes. Todos os componentes usam classes genéricas (`border`, `bg-blue-500`, `text-white`).

### 14. Fonte Catamaran não está sendo importada
A fonte está configurada no Tailwind, mas não há `@import` do Google Fonts no `index.css` ou no `index.html`.

### 15. Fundo escuro global não aplicado
O fundo da aplicação deve ser `gray-900` (`#050505`). O `index.css` não define o background global.

### 16. Componentes sem estilo visual correto
Todos os componentes abaixo precisam de estilização conforme o Figma:
- `AppointmentForm` — inputs dark, botões de time slot estilizados, botão "AGENDAR" amarelo
- `AppointmentItem` — linha com horário em destaque, nome do cliente, ícone de lixeira
- `PeriodSection` — cabeçalho com ícone, título do período e faixa de horário (ex: "09h–12h")
- `ScheduleList` — container com borda sutil e fundo escuro por seção
- `Header` / `Sidebar` — fundo cinza escuro, logo com ícone

---

## 🔵 Qualidade de código

### 17. `AppointmentItem` recebe `appointment` mas `onRemove` nunca foi conectado
O componente precisa receber uma prop `onRemove: (id: string) => void` e renderizar o botão de lixeira que chama essa função.

### 18. Verificação de horário duplicado ignora a data
O `AppointmentForm` verifica se o horário já existe, mas não filtra por data. Um horário "15:00" em dias diferentes deveria ser permitido.

### 19. Validação de campos obrigatórios ausente
O formulário não valida se `name`, `date` ou `time` estão vazios antes de tentar criar o agendamento.

### 20. `ScheduleList` poderia usar o componente `PeriodSection`
Atualmente repete estrutura 3 vezes (`<div><h2>Manhã</h2>...</div>`). Após implementar `PeriodSection`, o `ScheduleList` deve usá-lo para cada período.

---

## ✅ O que já está correto

- Estrutura de projeto com Vite + React + TypeScript ✔️
- Tipo `Appointment` com `id`, `name`, `date`, `time` ✔️
- Estado de agendamentos com `useState` no `App.tsx` ✔️
- Função `addAppointment` implementada corretamente ✔️
- Ordenação dos agendamentos por horário com `sort` ✔️
- Separação dos agendamentos por período com `filter` ✔️
- Configuração do Tailwind com as cores e fontes do design ✔️
- Estrutura de pastas por componente ✔️
- `crypto.randomUUID()` para geração de IDs ✔️

---

## 📊 Resumo

| Categoria | Pendências |
|---|---|
| 🔴 Funcionalidades críticas | 6 |
| 🟡 Requisitos não atendidos | 6 |
| 🟠 Estilização / Design | 5 |
| 🔵 Qualidade de código | 4 |
| **Total** | **21** |
