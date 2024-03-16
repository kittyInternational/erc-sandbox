import styled from 'styled-components'

export const Div = styled.div`
    position: fixed;
    z-index: 1000;
    right: 20px;
    top: 10px;
    > button {
        background-color: #EEE;
        border: 0;
        padding: 8px 12px;
        display: flex;
        align-items: center;
        border-radius: 4px;
        > svg {
            margin-right: 8px;
            width: 30px;
        }
    }
`