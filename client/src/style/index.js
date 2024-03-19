import styled from 'styled-components'
import { Link } from 'react-router-dom'
import icon from './home.png'

export const Main = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100vw;
    height: 100%;
    font-family: Courier;
`

export const Grid = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 48px 10%;
    box-sizing: border-box;
    justify-content: center;
    align-items: flex-start;
    > div {
        font-family: Times;
        text-align: center;
        font-size: 12px;
        > a {
            color: #000;
            text-decoration: none;
            opacity: 0.5;
            &:hover {
                opacity: 1;
            }

        }
    }
    >  h1 {
        font-size: 24px;
        margin: 6px 24px;
        font-weight: bold;
    }
    >  h2 {
        font-size: 16px;
        margin: 6px 24px;
        font-weight: bold;
    }
`

export const C2A = styled(Link)`
    position: fixed;
    width: 20px;
    height: 20px;
    display: block;
    z-index: 101;
    &.left {
        left: 24px;
        background-image: url(${icon});
        background-size: 20px 20px;
    }
    &.right {
        right: 24px;
        &:hover {
            opacity: 0.75;
            text-decoration: underline;
        }
    }
    bottom: 20px;
    text-decoration: none;
    color: #333;
    &:hover {
        opacity: 0.75;
    }
    
`