/*Fluxo(id, titulo, paiId,
Texto(id, html);
FluxoTexto(id_fluxo, id_texto);
Imagem(id, localizacao);
FluxoImagem(id_fluxo, id_imagem);
FluxoFilho(id_fluxo_pai, id_fluxo_filho);*/

export default interface IFluxo {
  id: number;
  titulo: string;
  paiId: number;
}
