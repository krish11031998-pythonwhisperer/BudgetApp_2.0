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
    backgroundColor: transparent;
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

    width: 75%;
    height: auto;
    padding: 5% 12.5%;

`