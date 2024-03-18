import styled, { css } from 'styled-components'
import icon from './icon.svg'

export const Div = styled.div`
    position: fixed;
    height: 100vh;
    left: ${({ visible }) => visible === 'true' ? 0 : '-100%'};
    transition: left 0.3s ease-in-out;
    top: 0;
    padding: 72px 24px;
    border-right: 1px solid #EEE;
    background-color: rgba(255,255,255,0.8);
    z-index: 100;
    ${({ visible }) =>
        visible === 'false' &&
        css`
            pointer-events: none;
        `}
`

export const C2A = styled.div`
    position: fixed;
    width: 20px;
    height: 20px;
    z-index: 101;
    left: 24px;
    top: 20px;
    background-image: url(${icon});
    background-size: 20px 20px;
    cursor: pointer;
    &:hover {
        opacity: 0.75;
    }
`