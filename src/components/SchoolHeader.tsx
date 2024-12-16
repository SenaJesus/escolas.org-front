import { Box, Typography } from "@mui/material";
import SchoolItem from "./SchoolItem";
import { Escola, Infraestrutura } from '../types/interfaces';

interface SchoolHeaderProps {
    escola: Escola;
};

type InfraKey = keyof Infraestrutura;

const INFRAESTRUCTURE_DICTIONARY: Record<string, InfraKey> = {
    "Água potável": "agua_potavel",
    "Alimentação": "alimentacao",
    "Almoxarifado": "almoxarifado",
    "Área verde": "area_verde",
    "Auditório": "auditorio",
    "Banheiro": "banheiro",
    "Banheiro infantil": "banheiro_infantil",
    "Banheiro Funcionários": "banheiro_funcionarios",
    "Banheiro PNE": "banheiro_pne",
    "Chuveiro": "banheiro_chuveiro",
    "Biblioteca": "biblioteca",
    "Cozinha": "cozinha",
    "Dormitório aluno": "dormitorio_aluno",
    "Dormitório professor": "dormitorio_professor",
    "Lab. Ciências": "lab_ciencias",
    "Lab. Informática": "lab_informatica",
    "Pátio Coberto": "patio_coberto",
    "Pátio Descoberto": "patio_descoberto",
    "Parque infantil": "parque_infantil",
    "Piscina": "piscina",
    "Quadra coberta": "quadra_esportes_coberta",
    "Quadra descoberta": "quadra_esportes_descoberta",
    "Sala de Artes": "sala_artes",
    "Sala de Música": "sala_musica",
    "Sala de Dança": "sala_danca",
    "Sala Recreativa": "sala_recreativa",
    "Sala de Leitura": "sala_leitura",
    "Sala de Professores": "sala_professor",
    "Sala de Repouso": "sala_repouso_aluno",
    "Sala Secretaria": "sala_secretaria",
    "Terreirão Recreativo": "terreirao_recreativo",
    "Redes Sociais": "rede_social"
};

const SchoolHeader = ({ escola }: SchoolHeaderProps) => {
    const latestCenso = escola.censos.reduce((prev, curr) => (curr.ano > prev.ano ? curr : prev), escola.censos[0]);
    const infra = latestCenso.infraestrutura;
    const enderecoCompleto = `${escola.endereco}${escola.complemento ? `, ${escola.complemento}` : ''} - ${escola.cidade.nome} (${escola.cidade.estado.sigla})`;

    const infraItems: string[] = [];

    for (const [label, infraKey] of Object.entries(INFRAESTRUCTURE_DICTIONARY)) {
        if (infra[infraKey] === true) {
            infraItems.push(label);
        }
    };

    return (
        <Box
            sx={{
                height: '350px',
                padding: '50px 120px 60px 120px',
                display: 'flex',
                gap: '20px'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '35px',
                    paddingTop: '20px',
                    flex: '1'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: `'Rubik', sans-serif`,
                            fontWeight: '800',
                            color: '#373737',
                            fontSize: '32px'
                        }}
                        variant="h1"
                    >
                        {escola.nome}
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: `'Rubik', sans-serif`,
                            fontWeight: '400',
                            color: '#373737',
                            fontSize: '16px'
                        }}
                        variant="h2"
                    >
                        {enderecoCompleto}
                    </Typography>
                    {escola.ddd && escola.telefone &&
                        <Typography
                            sx={{
                                fontFamily: `'Rubik', sans-serif`,
                                fontWeight: '200',
                                color: '#373737',
                                fontSize: '16px',
                                marginTop: '6px'
                            }}
                            variant="h3"
                        >
                            ({escola.ddd}) {escola.telefone}
                        </Typography>
                    }
                </Box>
                <Box
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '8px',
                            height: '35px',
                            width: '360px',
                            padding: '8px 16px',
                            borderRadius: '40px',
                            bgcolor: '#FF7A3A',
                            alignItems: 'center'
                        }}
                    >
                        <Box 
                            sx={{
                                width: 15,
                                height: 15,
                                display: 'flex',
                                backgroundImage: `url('/notifications.png')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}
                        />
                        <Typography
                            sx={{
                                fontFamily: `'Rubik', sans-serif`,
                                fontWeight: '400',
                                color: 'white',
                                fontSize: '16px',
                                userSelect: 'none'
                            }}
                            variant="body1"
                        >
                            Receber atualizações sobre essa escola
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '8px',
                            height: '35px',
                            width: '220px',
                            padding: '8px 16px',
                            borderRadius: '40px',
                            bgcolor: '#D57D54',
                            alignItems: 'center'
                        }}
                    >
                        <Box 
                            sx={{
                                width: 15,
                                height: 15,
                                display: 'flex',
                                backgroundImage: `url('/document.png')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}
                        />
                        <Typography
                            sx={{
                                fontFamily: `'Rubik', sans-serif`,
                                fontWeight: '400',
                                color: 'white',
                                fontSize: '16px',
                                userSelect: 'none'
                            }}
                            variant="body1"
                        >
                            Baixar relatório geral
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flex: '1',
                    width: '650px',
                    gap: '5px',
                    flexWrap: 'wrap',
                    paddingTop: '20px',
                    alignContent: 'flex-start'
                }}
            >
                {
                    infraItems.map(item => <SchoolItem key={item} description={item} />)
                }
            </Box>
        </Box>
    );
};

export default SchoolHeader;
