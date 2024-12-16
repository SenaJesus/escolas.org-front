import React, { useRef, useState, useEffect } from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ReviewCard from "./ReviewCard";
import { Escola } from "../types/interfaces";
import EmailConfirmation from "./EmailConfirmation";
import InsertCode from "./InsertCode";
import DoneConfirmation from "./DoneConfirmation";
import FailCode from "./FailCode";
import InsertReview from "./InsertReview";
import DoneReview from "./DoneReview";
import { solicitarAutorizacao, confirmarAutorizacao, submeterAvaliacao } from '../services/escolasService';

interface Review {
    nota: number;
    texto: string;
    dataPublicacao: string;
    nomeUsuario: string;
}

type OrderType = 'Decrescente' | 'Crescente';

interface SchoolReviewProps {
    escola: Escola;
}

const SchoolReview: React.FC<SchoolReviewProps> = ({ escola }) => {
    const [order, setOrder] = useState<OrderType>('Decrescente');

    const avaliacaoPadrao = {
        nota: 0,
        texto: "Hey! Esta escola ainda não foi avaliada, seja a primeira pessoa a avaliar e ajude outras pessoas!",
        dataPublicacao: new Date().toLocaleDateString('pt-BR'),
        nomeUsuario: "escolas.org"
    };

    const [reviews, setReviews] = useState<Review[]>(() => {
        const avaliacoes = escola.avaliacoes;
        if (!avaliacoes || avaliacoes.length === 0) {
            return [avaliacaoPadrao];
        }

        return avaliacoes.map(av => ({
            nota: av.nota,
            texto: av.comentario ?? '',
            dataPublicacao: new Date(av.data_criacao).toLocaleDateString('pt-BR'),
            nomeUsuario: av.email.split('@')[0]
        }));
    });

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const [showModal, setShowModal] = useState(false);
    const [currentModal, setCurrentModal] = useState<
        'emailConfirmation' | 'insertCode' | 'doneConfirmation' | 'failCode' | 'insertReview' | 'doneReview' | ''
    >('');

    const [email, setEmail] = useState('');
    const [codigo, setCodigo] = useState('');
    const [nota, setNota] = useState(0);
    const [comentario, setComentario] = useState('');
    const [failMessage, setFailMessage] = useState('');

 
    const [showFullReviewModal, setShowFullReviewModal] = useState(false);
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);

    useEffect(() => {
        const sortedReviews = [...reviews].sort((a, b) => {
            return order === 'Decrescente' ? b.nota - a.nota : a.nota - b.nota;
        });
        setReviews(sortedReviews);
    }, [order]);

    const mediaAvaliacoes = reviews.length > 0
        ? (reviews.reduce((acc, review) => acc + review.nota, 0) / reviews.length).toFixed(1)
        : '0';

    const fecharModal = () => {
        setShowModal(false);
        setCurrentModal('');
        setEmail('');
        setCodigo('');
        setNota(0);
        setComentario('');
        setFailMessage('');
    };

    
    const fecharFullReviewModal = () => {
        setShowFullReviewModal(false);
        setSelectedReview(null);
    };

    
    const iniciarFluxoAvaliacao = () => {
        const token = localStorage.getItem('authorization');
        const savedEmail = localStorage.getItem('email');

        if (token) {
            
            if (!savedEmail) {
                setShowModal(true);
                setCurrentModal('emailConfirmation');
            } else {
               
                setEmail(savedEmail);
                setShowModal(true);
                setCurrentModal('insertReview');
            }
        } else {
            
            setShowModal(true);
            setCurrentModal('emailConfirmation');
        }
    };

   
    const solicitarCodigo = async () => {
        await solicitarAutorizacao(email);
        setCurrentModal('insertCode');
    };

   
    const confirmarCodigoFunc = async () => {
        const res = await confirmarAutorizacao(email, codigo);
        if (res && res.token) {
            localStorage.setItem('authorization', `Bearer ${res.token}`);
            localStorage.setItem('email', email);
            setCurrentModal('doneConfirmation');
        }
    };

    const reenviarCodigo = async () => {
        await solicitarAutorizacao(email);
        
    };

    const irParaAvaliacao = () => {
        
        setCurrentModal('insertReview');
    };

   
    const enviarAvaliacao = async () => {
        const token = localStorage.getItem('authorization');
        const savedEmail = localStorage.getItem('email');
        if (!token || !savedEmail) {
            setFailMessage('Token ou email não encontrados. Por favor, confirme o email novamente.');
            setCurrentModal('failCode');
            return;
        }

        try {
            await submeterAvaliacao(escola.id, savedEmail, nota, comentario, token);
            setCurrentModal('doneReview');
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                const errMessage = error.response.data.error;
                if (errMessage.includes('6 meses')) {
                    setFailMessage('Você avaliou essa mesma escola nos últimos seis meses. Mas fique tranquilo, daqui a pouquinho você já vai poder avaliar novamente!');
                } else if (errMessage.includes('Token inválido') || errMessage.includes('expirado')) {
                    setFailMessage('Seu token expirou. Por favor, confirme o email novamente para avaliar.');
                    localStorage.removeItem('authorization');
                    localStorage.removeItem('email');
                } else {
                    setFailMessage(errMessage);
                }
            } else {
                setFailMessage('Ocorreu um erro inesperado.');
            }
            setCurrentModal('failCode');
        }
    };

    const fecharDoneReview = () => {
        fecharModal();
        window.location.reload();
    };

    return (
        <Box
            sx={{
                height: '430px',
                padding: '20px 120px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                bgcolor: '#F4F3F3',
                overflow: 'hidden' 
            }}
        >
            {showModal && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(104,104,104,0.25)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999
                    }}
                >
                    {currentModal === 'emailConfirmation' && (
                        <EmailConfirmation
                            email={email}
                            setEmail={setEmail}
                            onClose={fecharModal}
                            onNext={solicitarCodigo}
                        />
                    )}

                    {currentModal === 'insertCode' && (
                        <InsertCode
                            codigo={codigo}
                            setCodigo={setCodigo}
                            onClose={fecharModal}
                            onNext={confirmarCodigoFunc}
                            onResend={reenviarCodigo}
                        />
                    )}

                    {currentModal === 'doneConfirmation' && (
                        <DoneConfirmation
                            onClose={fecharModal}
                            onNext={irParaAvaliacao}
                        />
                    )}

                    {currentModal === 'failCode' && (
                        <FailCode
                            message={failMessage}
                            onClose={fecharModal}
                        />
                    )}

                    {currentModal === 'insertReview' && (
                        <InsertReview
                            nota={nota}
                            setNota={setNota}
                            comentario={comentario}
                            setComentario={setComentario}
                            onClose={fecharModal}
                            onSubmit={async () => {
                                await enviarAvaliacao();
                            }}
                        />
                    )}

                    {currentModal === 'doneReview' && (
                        <DoneReview
                            onClose={fecharDoneReview}
                        />
                    )}
                </Box>
            )}

            {showFullReviewModal && selectedReview && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 10000
                    }}
                    onClick={fecharFullReviewModal}
                >
                    <Box
                        sx={{
                            margin: '10px',
                            display: 'flex',
                            width: '500px',
                            height: 'auto',
                            bgcolor: '#F3F3F3',
                            borderRadius: '10px',
                            padding: '15px',
                            flexDirection: 'column',
                            gap: '15px'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                height: '23px',
                                alignItems: 'center'
                            }}
                        >
                            <Box 
                                sx={{
                                    width: 23,
                                    height: 23,
                                    display: 'flex',
                                    backgroundImage: `url('/close.png')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'right center',
                                    backgroundRepeat: 'no-repeat',
                                    marginLeft: 'auto',
                                    cursor: 'pointer'
                                }}
                                onClick={fecharFullReviewModal}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '15px'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '4px'
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: `'Rubik', sans-serif`,
                                        fontWeight: '600',
                                        color: '#80685D',
                                        fontSize: '20px',
                                        userSelect: 'none'
                                    }}
                                    variant="h1"
                                >
                                    Avaliação completa
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: `'Rubik', sans-serif`,
                                        fontWeight: '200',
                                        color: '#373737',
                                        fontSize: '16px',
                                        userSelect: 'none',
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word'
                                    }}
                                    variant="h2"
                                >
                                    {selectedReview.texto}
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '10px'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    height: '35px',
                                    width: '102px',
                                    padding: '8px 20px',
                                    borderRadius: '50px',
                                    bgcolor: '#FF7A3A',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer'
                                }}
                                onClick={fecharFullReviewModal}
                            >
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
                                    Fechar
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}


            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                }}
            >
                <Typography
                    sx={{
                        fontFamily: `'Rubik', sans-serif`,
                        fontWeight: '600',
                        color: '#80685D',
                        fontSize: '20px',
                        userSelect: 'none'
                    }}
                    variant="h1"
                >
                    Opiniões da população
                </Typography>
                <Typography
                    sx={{
                        fontFamily: `'Rubik', sans-serif`,
                        fontWeight: '200',
                        color: '#373737',
                        fontSize: '16px',
                        userSelect: 'none'
                    }}
                    variant="h2"
                >
                    Veja abaixo o que as pessoas têm a dizer sobre essa instituição
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '7px'
                }}
            >
                <Typography
                    sx={{
                        fontFamily: `'Rubik', sans-serif`,
                        fontWeight: '400',
                        color: '#80685D',
                        fontSize: '16px',
                        userSelect: 'none'
                    }}
                    variant="h3"
                >
                    Avaliações dos usuários:  <strong style={{ fontWeight: 500, textDecoration: 'underline' }}>{mediaAvaliacoes}</strong>
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        gap: '18px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            height: '35px',
                            width: '160px',
                            padding: '8px 20px',
                            borderRadius: '50px',
                            bgcolor: '#FF7A3A',
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}
                        onClick={iniciarFluxoAvaliacao}
                    >
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
                            Fazer avaliação
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: `'Rubik', sans-serif`,
                                fontWeight: '200',
                                color: '#AD7A62',
                                fontSize: '20px',
                                userSelect: 'none'
                            }}
                            variant="body1"
                        >
                            |
                        </Typography>
                    </Box>
                    <Select
                        value={order}
                        onChange={(e) => setOrder(e.target.value as OrderType)}
                        IconComponent={ArrowDropDownIcon}
                        sx={{
                            width: '181px',
                            height: '36px',
                            borderRadius: '50px',
                            fontFamily: `'Rubik', sans-serif`,
                            fontSize: '16px',
                            backgroundColor: '#FFFFFF',
                            '& .MuiSelect-select': {
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 14px',
                                color: '#AD7A62'
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#AD7A62 !important',
                                borderWidth: '1px !important',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#AD7A62 !important',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#AD7A62 !important',
                                borderWidth: '1px !important'
                            },
                            '& .MuiOutlinedInput-root.Mui-focused': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#AD7A62 !important',
                                    borderWidth: '1px !important'
                                }
                            },
                            '& .MuiSvgIcon-root': {
                                fontSize: '26px',
                                color: '#AD7A62',
                            },
                            '&.Mui-focused': {
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#AD7A62 !important',
                                    borderWidth: '1px !important'
                                }
                            }
                        }}
                    >
                        <MenuItem
                            value="Decrescente"
                            sx={{
                                fontFamily: `'Rubik', sans-serif`,
                                fontSize: '16px',
                                color: '#373737',
                                '&.Mui-selected': {
                                    backgroundColor: '#F4DBCF !important',
                                    color: 'inherit',
                                },
                                '&.Mui-selected:hover': {
                                    backgroundColor: '#F4DBCF !important',
                                    color: 'inherit',
                                },
                                '&:hover': {
                                    backgroundColor: '#FBF2EE',
                                    color: '#373737',
                                },
                            }}
                        >
                            Decrescente
                        </MenuItem>
                        <MenuItem
                            value="Crescente"
                            sx={{
                                fontFamily: `'Rubik', sans-serif`,
                                fontSize: '16px',
                                color: '#373737',
                                '&.Mui-selected': {
                                    backgroundColor: '#F4DBCF !important',
                                    color: 'inherit',
                                },
                                '&.Mui-selected:hover': {
                                    backgroundColor: '#F4DBCF !important',
                                    color: 'inherit',
                                },
                                '&:hover': {
                                    backgroundColor: '#FBF2EE',
                                    color: '#373737',
                                },
                            }}
                        >
                            Crescente
                        </MenuItem>
                    </Select>
                </Box>
                <Box
                    ref={scrollContainerRef}
                    onWheel={(e) => {
                        if (scrollContainerRef.current) {
                            e.preventDefault();
                            e.stopPropagation();
                            scrollContainerRef.current.scrollLeft += e.deltaY;
                        }
                    }}
                    onMouseDown={(e) => {
                        if (scrollContainerRef.current) {
                            isDragging.current = true;
                            startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
                            scrollLeft.current = scrollContainerRef.current.scrollLeft;
                        }
                    }}
                    onMouseMove={(e) => {
                        if (!isDragging.current || !scrollContainerRef.current) return;
                        e.preventDefault();
                        const x = e.pageX - scrollContainerRef.current.offsetLeft;
                        const walk = (x - startX.current);
                        scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
                    }}
                    onMouseUp={() => isDragging.current = false}
                    onMouseLeave={() => isDragging.current = false}
                    sx={{
                        display: 'flex',
                        gap: '15px',
                        marginTop: '10px',
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        paddingBottom: '10px',
                        cursor: isDragging.current ? 'grabbing' : 'grab',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        '&::-webkit-scrollbar': {
                            display: 'none'
                        },
                        flexWrap: 'nowrap',
                        userSelect: 'none',
                        overscrollBehavior: 'none'
                    }}
                >
                    {reviews.map((review, index) => (
                        <ReviewCard 
                            key={index}
                            nota={review.nota} 
                            texto={review.texto} 
                            dataPublicacao={review.dataPublicacao} 
                            nomeUsuario={review.nomeUsuario}
                            onReadMore={() => {
                                setSelectedReview(review);
                                setShowFullReviewModal(true);
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default SchoolReview;
