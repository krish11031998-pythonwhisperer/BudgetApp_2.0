import styled, {css} from 'styled-components'

export const PreScreening = styled.ul`
    list-style: none;
    li {
        display: flex;
        flex-flow: row;
        padding: 2% 0%;
    }
`;


export const TooltipPlace = styled.div`
  	position:relative;
    pointer-events:none;
    text-align:left;
    z-index: 100;
    padding-left: 2%;
    alignContent: 'center';
`;

export const DelButton = styled.button`
    border-radius: 4px;
    background-color: transparent;
`

export const Key = styled.span`
    font-size: large;
    margin: 0% 2.5%;
`;

export const Value = styled.span`
    font-size: large;
    color: ${props => props.color};
    margin: 0% 2.5%;
`

export const ToolTipPanel = styled.div`
    position:absolute;
    display:table;
    min-width:350px;
    height:auto;
    top:50%;
    left:50%;
    opacity: ${props => props.show ? 1 : 0};
    background-color:black;
    -webkit-box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
    -moz-box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
    color: white;
    transition: top 0.2s ease,
    left 0.2s ease,
    opacity 0.2s ease;

    box-sizing: border-box;

    & div {
        padding:9px;
    }

    p {
        font-size:9px;
        color:#1d3650;
        margin:6px 0;
        word-wrap: break-word;
    }
`

export const CircleContainer = styled.div`

    width: 100%;
    height: auto;
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;  
    text-align: center; 

`
export const BgModal = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
    position: absolute;
    top:0;
    display: flex;
    justify-content: center;
    align-items: center;
    display: ${props => props.show ? 'flex' : 'none'};

`

export const ModalContent = styled.div`
    width : 400px;
    height: 400px;
    background-color: white;
    border-radius : 4px;
    text-align: center;
    padding: 20px;
    position: relative;
    background: #fff;
    z-index:100;
    box-shadow: 5px 10px #888888;
`

export const Close = styled.div`
    position: absolute;
    top : 0;
    right: 25px;
    font-size: 22px;
    cursor: pointer;
`

export const TopSection = styled.div`
    background-image: url(${props => props.url});
    width: 100%;
    height: 350px;
    text-align: center;
    margin-top: -2%;
    padding: 5%;
`

export const LargeHeader = styled.h1`
    font-size: 50px;
    color: white;
`

export const NumberHeader = styled.h1`

    color: ${props => (props.color) ? props.color : 'white'}

`

export const TransactionBtn = styled.div`

    padding: 1.25% 2.5%;
    font-family : Avant Garde Demi BT;
    
`