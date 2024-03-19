import styled from 'styled-components'

export const Div = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    > h1 {
        font-size: 16vw;
        line-height: 32vw;
        font-family: Times;
    }
    > p {
        &:first-of-type {
            font-weight: bold;
       }
    }
`

export const Left = styled.div`
    left: 24px;
    top: 50%;
    position: fixed;
    font-size: 2vw;
    > a {
        text-decoration: none;
        color: #666;
        &:hover {
            color: #333;
        }
    }
`

export const Right = styled.div`
    right: 24px;
    top: 50%;
    position: fixed;
    font-size: 2vw;
    > a {
        text-decoration: none;
        color: #666;
        &:hover {
            color: #333;
        }
    }
`