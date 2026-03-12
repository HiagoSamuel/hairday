type Props = {
  // A mensagem que aparece no modal, ex: "Ryan Dorwart" ou "todos os clientes"
  clientLabel: string

  // Funções chamadas pelos botões
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmModal({ clientLabel, onConfirm, onCancel }: Props) {
  return (
    // Overlay — a camada escura que cobre a tela inteira
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onCancel} // ← clicou fora do modal = cancelar
    >
      {/* Caixa do modal */}
      {/* O stopPropagation impede que clicar DENTRO do modal acione o onClick do overlay */}
      <div
        className="bg-gray700 border border-gray600 rounded-2xl p-8 w-full max-w-md mx-4 flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ícone de aviso */}
        <div className="flex justify-center">
          <div className="bg-red-500/10 rounded-full p-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#f87171" viewBox="0 0 256 256">
              <path d="M236.8,188.09,149.35,36.22a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z"/>
            </svg>
          </div>
        </div>

        {/* Textos */}
        <div className="text-center flex flex-col gap-2">
          <h3 className="text-gray100 font-bold text-lg">
            Desmarcar agendamento
          </h3>
          <p className="text-gray400 text-sm leading-relaxed">
            Tem certeza que deseja desmarcar{" "}
            {/* Destaca o nome do cliente em branco */}
            <span className="text-gray100 font-bold">{clientLabel}</span>
            ? Esta ação não pode ser desfeita.
          </p>
        </div>

        {/* Botões */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-lg border border-gray600 text-gray300 text-sm font-bold hover:bg-gray600 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors"
          >
            Sim, desmarcar
          </button>
        </div>
      </div>
    </div>
  )
}