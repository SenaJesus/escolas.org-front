
import { Localizacao, TipoDependencia, CategoriaEscolaPrivada } from "./enums";

export interface Estado {
    id: number;
    nome: string;
    sigla: string;
    regiao: string;
};

export interface Cidade {
    id: number;
    nome: string;
    estado: Estado;
};

export interface EscolaList {
    id: number;
    nome: string;
    bairro: string;
    cidade: Cidade;
    average_avaliacoes: number | null;
};

export interface PaginatedEscolasListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: EscolaList[];
};

export interface Escola {
    id: number;
    nome: string;
    codigo_ibge: string;
    tipo_dependencia: TipoDependencia;
    categoria_escola_privada?: CategoriaEscolaPrivada | null;
    localizacao: Localizacao;
    cidade: Cidade;
    endereco: string;
    numero?: string | null;
    complemento?: string | null;
    bairro?: string | null;
    cep: string;
    ddd?: string | null;
    telefone?: string | null;
    inicio_ano_letivo?: string | null;
    fim_ano_letivo?: string | null;
    censo: CensoEscolar[];
    avaliacoes: Avaliacao[];
};

export interface CensoEscolar {
    id: number;
    escola: Escola;
    ano: number;
    infraestrutura: Infraestrutura;
    educacao: Educacao;
};

export interface Acessibilidade {
    corrimao: boolean;
    elevador: boolean;
    pisos_tateis: boolean;
    vao_livre: boolean;
    rampas: boolean;
    sinal_sonoro: boolean;
    sinal_tatil: boolean;
    sinal_visual: boolean;
};

export interface Internet {
    internet_aluno: boolean;
    internet_administrativo: boolean;
    internet_aprendizagem: boolean;
    internet_comunidade: boolean;
    internet_computador_aluno: boolean;
    internet_computador_pessoal_aluno: boolean;
};

export interface Funcionarios {
    administrativos_quantidade: number;
    servico_geral_quantidade: number;
    bibliotecario_quantidade: number;
    saude_quantidade: number;
    coordenador_quantidade: number;
    fonoaudiologo_quantidade: number;
    nutricionista_quantidade: number;
    psicologo_quantidade: number; 
    alimentacao_quantidade: number;
    pedagogia_quantidade: number;
    secretario_quantidade: number;
    seguranca_quantidade: number;
    monitores_quantidade: number;
    gestao_quantidade: number; 
    assistente_social_quantidade: number;
};

export interface Infraestrutura {
    censo: CensoEscolar;
    agua_potavel: boolean;
    almoxarifado: boolean;
    area_verde: boolean;
    auditorio: boolean;
    banheiro: boolean;
    banheiro_infantil: boolean;
    banheiro_pne: boolean;
    banheiro_funcionarios: boolean; 
    banheiro_chuveiro: boolean; 
    biblioteca: boolean; 
    cozinha: boolean; 
    dormitorio_aluno: boolean; 
    dormitorio_professor: boolean; 
    lab_ciencias: boolean; 
    lab_informatica: boolean; 
    patio_coberto: boolean; 
    patio_descoberto: boolean; 
    parque_infantil: boolean; 
    piscina: boolean; 
    quadra_esportes_coberta: boolean; 
    quadra_esportes_descoberta: boolean;
    sala_artes: boolean; 
    sala_musica: boolean; 
    sala_danca: boolean; 
    sala_recreativa: boolean;
    sala_diretoria: boolean; 
    sala_leitura: boolean; 
    sala_professor: boolean;
    sala_repouso_aluno: boolean;
    sala_secretaria: boolean; 
    sala_atendimento_especial: boolean; 
    terreirao_recreativo: boolean; 
    acessibilidade: Acessibilidade;
    salas_quantidade: number;
    salas_quantidade_fora: number;
    salas_quantidade_dentro: number;
    salas_climatizadas: number;
    salas_acessibilidade: number;
    dvd_quantidade: number;
    som_quantidade: number;
    tv_quantidade: number;
    lousa_digital_quantidade: number;
    projetor_quantidade: number; 
    computador_quantidade: number; 
    notebook_quantidade: number; 
    internet_aluno: Internet;
    funcionarios: Funcionarios;
    alimentacao: boolean;
    rede_social: boolean;
};

export interface Cotas {
    ppi: boolean; // 
    renda: boolean; 
    escola_publica: boolean; 
    pcd: boolean; 
    outros: boolean; 
};

export interface Educacao {
    censo: CensoEscolar;
    educacao_indigena: boolean; 
    exame_selecao?: boolean | null; 
    cotas: Cotas;
    gremio: boolean; 
    ead: boolean; 
    ed_inf_matricula_quantidade: number; 
    ed_inf_docentes_quantidade: number; 
    ed_inf_creche_matricula_quantidade: number; 
    ed_inf_creche_docentes_quantidade: number; 
    ed_inf_pre_escola_matricula_quantidade: number; 
    ed_inf_pre_escola_docentes_quantidade: number; 
    ed_fund_matricula_quantidade: number;
    ed_fund_docentes_quantidade: number;
    ed_fund_anos_iniciais_matricula_quantidade: number; 
    ed_fund_anos_iniciais_docentes_quantidade: number;
    ed_fund_anos_finais_matricula_quantidade: number; 
    ed_fund_anos_finais_docentes_quantidade: number; 
    medio_matricula_quantidade: number; 
    medio_docentes_quantidade: number; 
    medio_tecnico_matricula_quantidade: number; 
    medio_tecnico_docentes_quantidade: number; 
    ed_profissional_matricula_quantidade: number; 
    ed_profissional_docentes_quantidade: number; 
    ed_tecnica_matricula_quantidade: number;
    ed_tecnica_docentes_quantidade: number; 
    eja_matricula_quantidade: number; 
    eja_docentes_quantidade: number; 
    eja_fund_matricula_quantidade: number; 
    eja_fund_docentes_quantidade: number; 
    eja_fund_inicial_matricula_quantidade: number; 
    eja_fund_inicial_docentes_quantidade: number; 
    eja_fund_final_matricula_quantidade: number; 
    eja_fund_final_docentes_quantidade: number; 
    eja_medio_matricula_quantidade: number; 
    eja_medio_docentes_quantidade: number;
    ed_especial_matricula_quantidade: number; 
    ed_especial_docentes_quantidade: number; 
};

export interface Avaliacao {
    id: number;
    escola: Escola;
    email: string;
    nota: number;
    comentario?: string | null;
    data_criacao: string; 
};